import React, { createContext, useState, useEffect } from "react";
import axios from "axios";

const StoryContext = createContext();

export const StoryProvider = (props) => {
  const [storyIDs, setStoryIDs] = useState([]);
  const [stories, setStories] = useState([]);

  // const [comments, setComments] = useState([]);

  useEffect(() => {
    // Fetch all the top stories ( only IDs) from the Hacker news API
    const fetchStoriesIDs = async () => {
      const { data } = await axios.get(
        "https://hacker-news.firebaseio.com/v0/topstories.json?print=pretty"
      );
      setStoryIDs(data);
      fetchStories();
    };

    // Fetch all the top stories from the API with the above fetched story IDS
    const fetchStories = async () => {
      const promises = storyIDs.map((storyID) =>
        axios
          .get(
            `https://hacker-news.firebaseio.com/v0/item/${storyID}.json?print=pretty`
          )
          .then((response) => response.data)
      );
      const result = await Promise.all(promises);
      // console.log(result);
      setStories(result);
    };

    fetchStoriesIDs();
  }, [storyIDs]);

  return (
    <StoryContext.Provider
      value={{
        storyIDs,
        stories,
      }}>
      {props.children}
    </StoryContext.Provider>
  );
};
export default StoryContext;
