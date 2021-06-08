import React, { useState, useEffect, useContext } from "react";
import { Card, Accordion, Button } from "react-bootstrap";
import Comments from "./Comments.jsx";
import StoryContext from "../context/StoryContext.js";
import PropTypes from "prop-types";

/* StoryCard component - displays the content of each story on a card*/

const StoryCard = ({ story }) => {
  const [comments, setComments] = useState([]);
  const [bookmarks, setBookmarks] = useState([]);
  const [isClicked, setIsClicked] = useState(false);
  const { fetchComments } = useContext(StoryContext);

  useEffect(() => {
    // API call to fetch comments for the story received as prop
    if (story.kids) {
      fetchComments(story, setComments);
      localStorage.getItem(story.id) ? setIsClicked(true) : setIsClicked(false);
    }
  }, [bookmarks]);

  /* function run when bookmark icon is clicked. 
  If Bookmark icon is un-clicked remove story from localStorage */
  const handleBookMark = () => {
    setIsClicked(!isClicked);
    //
    if (!isClicked) {
      /* check if the story ID is present in the localStorage
      if its not present then add to localStorage */
      if (!localStorage.getItem(story.id)) {
        setBookmarks(bookmarks.concat(story.id));
        localStorage.setItem(story.id, JSON.stringify(story));
      }
    } else {
      localStorage.removeItem(story.id);
      setBookmarks((bookmarks) =>
        bookmarks.filter((bookmark) => bookmark.id !== story.id)
      );

      setIsClicked(!isClicked);
    }
  };
  console.log(bookmarks);
  return (
    <Accordion>
      <Card className='story-card' bg='light'>
        <Card.Body>
          <Card.Title className='bold-text'>{story.title}</Card.Title>
          <Card.Text className='text-end'>
            <i
              style={{ cursor: "pointer" }}
              className={
                isClicked
                  ? `fas fa-bookmark fa-2x yellow`
                  : `far fa-bookmark fa-2x yellow`
              }
              onClick={handleBookMark}></i>
          </Card.Text>
          <Card.Subtitle className='my-2 text-secondary bold-text'>
            By {story.by}
          </Card.Subtitle>

          <Button
            variant='outline-warning'
            href={story.url}
            target='_blank'
            className='m-3 orange bold-text'>
            Story Link
          </Button>
          {/* Using accordion to toggle comments */}
          <Accordion.Toggle
            as={Button}
            variant='link'
            eventKey={story.id}
            className='m-3 bold-text comments'>
            Comments
          </Accordion.Toggle>
          <Accordion.Collapse eventKey={story.id}>
            {/* comments prop sent to Comments component */}
            <Comments comments={comments} />
          </Accordion.Collapse>
        </Card.Body>
      </Card>
    </Accordion>
  );
};

export default StoryCard;
StoryCard.propTypes = {
  story: PropTypes.object,
};
