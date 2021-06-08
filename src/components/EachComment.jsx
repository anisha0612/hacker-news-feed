import React from "react";
import { ListGroup } from "react-bootstrap";
import PropTypes from "prop-types";

// EachComment component displays the each child comment for the parent parent story received as prop
const EachComment = ({ id, text, by }) => {
  //   console.log(id, text, by);
  return (
    <>
      {/* conditional to check if the props are null and display the data accordingly */}
      {id !== "null" && text !== "null" && by !== "null" ? (
        <ListGroup className='my-4'>
          <ListGroup.Item>
            {text}
            <p className='text-secondary bold-text'>By {by}</p>
          </ListGroup.Item>
        </ListGroup>
      ) : (
        <ListGroup className='my-4'>
          <ListGroup.Item>
            {"No Comment"}
            <p className='text-secondary bold-text'>By {"Anonymous"}</p>
          </ListGroup.Item>
        </ListGroup>
      )}
    </>
  );
};

export default EachComment;

EachComment.propTypes = {
  id: PropTypes.number,
  text: PropTypes.string,
  by: PropTypes.string,
};
