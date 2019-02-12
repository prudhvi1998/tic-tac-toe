import React from 'react';
import './Board.css';
import Square from './Square.js';

function winner(squares) {
  console.log("from function");
  const lines = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6],
  ];
  for (let i = 0; i < lines.length; i++) {
    const [a, b, c] = lines[i];
    if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
      return squares[a];
    }
  }
  return null;
}

class Board extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      squares: Array(9).fill(''),
      status: 'X',
      winned: '',
    };
  }

  setWinned(winne) {
    this.setState({winned:winne});
    return;
  }

  handleClick(i) {
    console.log("from handleclick");
    const squares = this.state.squares.slice();
    let winne = winner(this.state.squares);
      if(winne !== null) {
        this.setWinned(winne);
        return;
      }
    if (squares[i] === '' && this.state.winned === '') {
      squares[i] = this.state.status;
      this.setState({squares: squares});
      if (this.state.status === 'X'){
        this.setState({status:'O'});
      }
      else if (this.state.status === 'O'){
        this.setState({status:'X'});
      }
    }
  }

  renderSquare(i) {
    return (
      <Square
        value={this.state.squares[i]}
        onClick={() => this.handleClick(i)}
      />
    );
  }

  render() {
    console.log("from render" + this.state.winned);
    let status;
    let winne = winner(this.state.squares);
    if (winne !== null) {
      status = 'Winner: ' + winne;
    } else {
      status = 'Next player: ' + this.state.status;
    }

    return (
      <div>
        <div className="status">{status}</div>
        <div className="board-row">
          {this.renderSquare(0)}
          {this.renderSquare(1)}
          {this.renderSquare(2)}
        </div>
        <div className="board-row">
          {this.renderSquare(3)}
          {this.renderSquare(4)}
          {this.renderSquare(5)}
        </div>
        <div className="board-row">
          {this.renderSquare(6)}
          {this.renderSquare(7)}
          {this.renderSquare(8)}
        </div>
      </div>
    );
  }
}

export default Board;