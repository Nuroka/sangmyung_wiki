import React, { useState } from "react";
import styles from "./Board.module.css";

const BtnToggleComponent = ({ parameter, onSortByLikes }) => {
  const [isVisited, setIsVisited] = useState(false);

  const handleLike = () => {
    setIsVisited(!isVisited);
    onSortByLikes();
  };

  return (
    <button onClick={handleLike} className={isVisited ? styles.visited : ""}>
      {parameter}
    </button>
  );
};

export default BtnToggleComponent;
