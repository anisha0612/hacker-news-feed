import React, { useState, useEffect } from "react";
import { Card, Accordion, Button } from "react-bootstrap";
import Comments from "./Comments.jsx";
import axios from "axios";

const StoryCard = ({ story }) => {
  const [comments, setComments] = useState([]);

  useEffect(() => {
    const fetchComments = async () => {
      const promises = story.kids.map((commentID) =>
        axios
          .get(
            `https://hacker-news.firebaseio.com/v0/item/${commentID}.json?print=pretty`
          )
          .then((response) => response.data)
      );
      const result = await Promise.all(promises);
      // console.log(result);
      setComments(result);
    };
    if (story.kids) {
      fetchComments();
    }
  }, [story]);

  return (
    <Accordion>
      <Card className='story-card'>
        <Card.Body>
          <Card.Title className='bold-text'>{story.title}</Card.Title>
          <Card.Subtitle className='my-2 text-secondary bold-text'>
            By {story.by}
          </Card.Subtitle>
          <Button variant='outline-warning' href={story.url} target='_blank'>
            Story Link
          </Button>
          <Accordion.Toggle as={Button} variant='link' eventKey={story.id}>
            Comments
          </Accordion.Toggle>
          <Accordion.Collapse eventKey={story.id}>
            <Comments comments={comments} />
          </Accordion.Collapse>
        </Card.Body>
      </Card>
    </Accordion>
  );
};

export default StoryCard;
