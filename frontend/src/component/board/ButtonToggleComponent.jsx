import React, { useState } from 'react';
import styles from './Board.module.css'; // CSS 모듈 임포트
const BtnToggleComponent = (props) => {
    const [isVisited, setIsVisited] = useState(false);

    const handleLike = () => {
        setIsVisited(!isVisited);
    };

    return (
        <button onClick={handleLike} className={isVisited ? styles.visited : ""}>
            {props.parameter}
        </button>
    );
};

export default BtnToggleComponent;