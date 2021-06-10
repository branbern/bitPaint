import React, {useState} from 'react';
import Cell from './Cell'


const Board = ({board, cellData}) => {
    const [cells, setCells] = useState(cellData);

    let styles= {
        board: {
            width: board.width,
            height: board.height,
            backgroundSize: `${board.cellSize}px ${board.cellSize}px`
        }
    }

    const handleClick = (event) => {

        const elemOffset = getElementOffset();
        const offsetX = event.clientX - elemOffset.x;
        const offsetY = event.clientY - elemOffset.y;
        
        const x = Math.floor(offsetX / board.cellSize);
        const y = Math.floor(offsetY / board.cellSize);

        if (x >= 0 && x <= this.cols && y >= 0 && y <= this.rows) {
            if (this.board[y][x].activated) {
                this.board[y][x].activated = false
            } else {
                this.board[y][x] = {
                    activated: this.board[y][x],
                    color: this.state.color
                }
            }
        }

        this.setState({ cells: this.makeCells() });
    }
    
    const getElementOffset = () => {
        const rect = this.boardRef.getBoundingClientRect();
        const doc = document.documentElement;

        return {
            x: (rect.left + window.pageXOffset) - doc.clientLeft,
            y: (rect.top + window.pageYOffset) - doc.clientTop,
        };
    }

    return (
        <div className="Board" style={styles.board} onClick={handleClick} ref={(n) => { this.boardRef = n; }}>
            {cells.map(cell => (
                <Cell data={cellData}/>
            ))}
        </div>
    );
}

export default Board;