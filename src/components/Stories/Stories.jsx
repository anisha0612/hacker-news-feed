import React, { useContext, useEffect, useState } from "react";
import StoryContext from "../../context/StoryContext.js";
import StoryCard from "../StoryCard.jsx";
import loader from "../../assets/Loading.svg";
import InfiniteScroll from "react-infinite-scroll-component";
import PropTypes from "prop-types";
import "./Stories.css";

const Stories = () => {
  const { stories } = useContext(StoryContext);
  const [hasMore, setHasMore] = useState(true);
  const [fetchedStories, setFetchedStories] = useState(0);
  const [items, setItems] = useState([]);

  function fetchMoreData() {
    const fetchItems = stories.slice(fetchedStories, fetchedStories + 2);
    setFetchedStories(fetchedStories + 2);
    setItems(items.concat(fetchItems));
    // console.log(items, fetchedStories);
    if (fetchedStories >= stories.length) {
      setHasMore(false);
      return;
    }
  }

  useEffect(() => {
    if (stories.length > 0) {
      fetchMoreData();
    }
    // console.log(items);
  }, [stories]);

  return (
    <>
      <h1 className='title orange text-uppercase bold-text'>
        {" "}
        Hacker News Feed
      </h1>

      {items.length > 0 && stories.length > 0 ? (
        <div>
          <InfiniteScroll
            dataLength={stories.length}
            next={fetchMoreData}
            hasMore={hasMore}
            loader={<h4 className='my-4'>Loading ...</h4>}>
            {items.map((story) => (
              <StoryCard key={story.id} story={story}></StoryCard>
            ))}
          </InfiniteScroll>
        </div>
      ) : (
        <div>{<img src={loader} alt='Loading...' />}</div>
      )}
    </>
  );
};

export default Stories;

Stories.propTypes = {
  stories: PropTypes.array,
  storyIDs: PropTypes.array,
};
