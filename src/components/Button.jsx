import React from 'react'
import "./button.css"

const Button = ({ button, handleClick }) => {
    
    return (
        <button className={button.className + " " + button.type} onClick={() => handleClick(button)}>{button.text}</button>
    )
}

export default Button