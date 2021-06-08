import React, { useContext, useEffect, useState } from "react";
import StoryContext from "../../context/StoryContext.js";
import StoryCard from "../StoryCard.jsx";
import loader from "../../assets/Loading.svg";
import InfiniteScroll from "react-infinite-scroll-component";
import PropTypes from "prop-types";
import "./Stories.css";

/* Stories component - handles stories fetched from the API */

const Stories = () => {
  const { stories } = useContext(StoryContext);
  // boolean variable used to check if there are more stories to fetch on scroll
  const [hasMore, setHasMore] = useState(true);
  // Variable to handle the count of stories fetched
  const [fetchedStories, setFetchedStories] = useState(0);
  // array to store the stories fetched after "fetchMoreData" is called
  const [items, setItems] = useState([]);

  // Callback function that is run to fetch the next set of stories and is stored in  a new array
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
