import React from 'react'

const Button = ({onloadMoreImg}) => {
    return (
        
        <button className="Button" onClick={onloadMoreImg} type="button">Load more</button>
       
    );
}

export default Button;