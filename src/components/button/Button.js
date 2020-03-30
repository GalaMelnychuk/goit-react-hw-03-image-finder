import React from 'react';
import styles from '../button/Button.module.css';

const Button = ({onloadMoreImg}) => {
    return (
        
        <button className={styles.Button} onClick={onloadMoreImg} type="button">Load more</button>

    );
}

export default Button;