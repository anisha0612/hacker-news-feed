import React from "react";
import { ListGroup } from "react-bootstrap";

const Comments = ({ comments }) => {
  // console.log(comments);
  return (
    <div>
      {comments.map((comment) => (
        <div>
          <ListGroup className='my-4'>
            <ListGroup.Item>
              {comment.text}
              <p className='text-secondary bold-text'>By {comment.by}</p>
            </ListGroup.Item>
          </ListGroup>
        </div>
      ))}
    </div>
  );
};

export default Comments;
