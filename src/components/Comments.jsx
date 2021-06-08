import React from "react";
import EachComment from "./EachComment.jsx";
import PropTypes from "prop-types";
import { ListGroup } from "react-bootstrap";

/* Comments component maps through the comments fetched for the parent story and sends them to EachComment component */
const Comments = ({ comments }) => {
  // console.log(comments);
  return (
    <div>
      {comments.length > 0 ? (
        <>
          {comments.map((comment) => {
            if (comment.length !== 0) {
              return (
                <div key={comment.id}>
                  <EachComment {...comment} />
                </div>
              );
            } else {
              return (
                <div>
                  <ListGroup>
                    <ListGroup.Item>"No Comment"</ListGroup.Item>
                  </ListGroup>
                </div>
              );
            }
          })}
        </>
      ) : (
        <div>
          <p className='lead my-2'>Loading ...</p>
        </div>
      )}
    </div>
  );
};

export default Comments;

Comments.propTypes = {
  comments: PropTypes.array.isRequired,
};
