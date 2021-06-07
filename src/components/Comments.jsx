import React from "react";
import EachComment from "./EachComment.jsx";
import PropTypes from "prop-types";

const Comments = ({ comments }) => {
  // console.log(comments);
  return (
    <div>
      {comments.length > 0 ? (
        <>
          {comments.map((comment) => (
            <div key={comment.id}>
              <EachComment {...comment} />
            </div>
          ))}
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
