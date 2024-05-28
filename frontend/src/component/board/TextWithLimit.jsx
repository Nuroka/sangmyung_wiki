import React from 'react';
import boardStyles from "./Board.module.css";

const TextWithLimit = ({ text, maxLength }) => {
    const displayText = text.length > maxLength ? text.substring(0, maxLength) + '...' : text;

    return (
        <span className={boardStyles.boardTitlePreview}>{displayText}</span>
    );
};

export default TextWithLimit;
