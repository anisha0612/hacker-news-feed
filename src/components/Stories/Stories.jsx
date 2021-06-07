import React, { useContext } from "react";
import useInfiniteScroll from "react-infinite-scroll-hook";
import StoryContext from "../StoryContext.js";
import StoryCard from "../StoryCard.jsx";
import loader from "../../assets/Loading.svg";
import "./Stories.css";

const Stories = () => {
  const { stories } = useContext(StoryContext);
  // console.log(stories);

  return (
    <>
      <h1 className='title'> Hacker News Feed</h1>
      {stories.length > 0 ? (
        <div>
          {stories.map((story) => (
            <StoryCard key={story.id} story={story}></StoryCard>
          ))}
        </div>
      ) : (
        <div>{<img src={loader} alt='Loading...' />}</div>
      )}
    </>
  );
};

export default Stories;
