import React, { createContext, useState, useEffect } from "react";
import axios from "axios";

const StoryContext = createContext();

export const StoryProvider = (props) => {
  const [storyIDs, setStoryIDs] = useState([]);
  const [stories, setStories] = useState([]);

  useEffect(() => {
    // Fetch all the top stories ( only IDs) from the Hacker news API
    const fetchStoriesIDs = async () => {
      const { data } = await axios.get(
        "https://hacker-news.firebaseio.com/v0/topstories.json?print=pretty"
      );
      setStoryIDs(data);
      fetchStories();
    };
    const fetchStories = async () => {
      const promises = storyIDs.map((storyID) =>
        axios
          .get(
            `https://hacker-news.firebaseio.com/v0/item/${storyID}.json?print=pretty`
          )
          .then((response) => response.data)
          .catch((err) => console.error(err))
      );
      const result = await Promise.all(promises);
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
