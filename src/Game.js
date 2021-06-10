import React from 'react';
import './Game.css';
import Cell from './Cell'
import ColorSketch from './Comps/ColorSketch'

const CELL_SIZE = 20;
const WIDTH = 800;
const HEIGHT = 600;

class Game extends React.Component {

    constructor() {
        super();
        this.rows = HEIGHT / CELL_SIZE;
        this.cols = WIDTH / CELL_SIZE;
        this.board = this.makeEmptyBoard();
    }

    state = {
        cells: [],
        color: "grey",
        displayColorPicker: false,
        saves: []
    }

    makeEmptyBoard() {
        let board = [];
        for (let y = 0; y < this.rows; y++) {
            board[y] = [];
            for (let x = 0; x < this.cols; x++) {
                board[y][x] = {
                    activated: false,
                };
            }
        }

        return board;
    }

    makeTinyBoard(savedBoard) {
        let board = [];
        for (let y = 0; y < this.rows; y++) {
            board[y] = [];
            for (let x = 0; x < this.cols; x++) {
                board[y][x] = savedBoard[y][x]
            }
        }

        return board
    }

    makeCells() {
        let cells = [];
        for (let y = 0; y < this.rows; y++) {
            for (let x = 0; x < this.cols; x++) {
                if (this.board[y][x].activated) {
                    cells.push({x, y, color: this.board[y][x].color});
                }
            }
        }
        console.log(cells);

        return cells;
    }

    handleChange=(color, event) => {
        console.log(event, 'handleChange')
        this.setState({color: color.hex})
    }

    handleClick = (event) => {

        const elemOffset = this.getElementOffset();
        const offsetX = event.clientX - elemOffset.x;
        const offsetY = event.clientY - elemOffset.y;
        
        const x = Math.floor(offsetX / CELL_SIZE);
        const y = Math.floor(offsetY / CELL_SIZE);

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
    
    getElementOffset() {
        const rect = this.boardRef.getBoundingClientRect();
        const doc = document.documentElement;

        return {
            x: (rect.left + window.pageXOffset) - doc.clientLeft,
            y: (rect.top + window.pageYOffset) - doc.clientTop,
        };
    }

    handleClear = () => {
        this.board = this.makeEmptyBoard();
        this.setState({ cells: this.makeCells() });
    }

    handleSave = () => {
        let s = [...this.state.saves]
        s.push(this.board)
        this.setState({ saves: s });
    }

    handleRandom = () => {
        for (let y = 0; y < this.rows; y++) {
            for (let x = 0; x < this.cols; x++) {
                this.board[y][x].activated = (Math.random() >= 0.5);
                this.board[y][x].color = "#" + Math.floor(Math.random()*16777215).toString(16);
            }
        }

        this.setState({ cells: this.makeCells() });
    }

    handleSetColor = (color) => {
        this.setState({ color: color.hex })
      };

    render() {
        const { cells} = this.state;
        return (
            <div>
                <div>
                    <div className="Board"
                        style={{ width: WIDTH, height: HEIGHT, backgroundSize: `${CELL_SIZE}px ${CELL_SIZE}px`}}
                        onClick={this.handleClick}
                        ref={(n) => { this.boardRef = n; }}>

                        {cells.map(cell => (
                            <Cell x={cell.x} y={cell.y} color={cell.color} size={20} key={`${cell.x},${cell.y}`}/>
                        ))}
                    </div>
                    <div className='Saves'>
                        {this.state.saves.map(save => (
                            <div>
                                <img> /</img>
                            </div>
                        ))}
                    </div>
                </div>
               
                <div className="controls">
                    <ColorSketch setColor={this.handleSetColor} color={this.state.color}/>
                    <button className="button" onClick={this.handleRandom}>Random</button>
                    <button className="button" onClick={this.handleClear}>Clear</button>
                    <button className="button" onClick={this.handleSave}>Save</button>
                </div>
            </div>
        );
    }
}


export default Game;