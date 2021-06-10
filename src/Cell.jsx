import React from 'react';

const Cell = ({x, y, color, size}) => {
    return (
        <div className="Cell" style={{
            left: `${size * x + 1}px`,
            top: `${size * y + 1}px`,
            width: `${size - 1}px`,
            height: `${size - 1}px`,
            backgroundColor: color
        }}/>
    );
}

export default Cell;