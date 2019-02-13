import React from 'react';
import './Game.css';
import Board from './Board.js';

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

class Game extends React.Component {
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

  render() {
    console.log("from render" + this.state.winned);
    let status;
    let winne = winner(this.state.squares);
    if (winne !== null) {
      status = 'Winner: ' + winne;
    } else {
      status = 'Next player: ' + this.state.status;
    }
    if(this.state.winned !==  null && this.state.winned !==  ''){
      window.location.reload();
    }

    return (
      <div className="game">
        <div className="game-board">
          <Board status={status} onClick={(i) => this.handleClick(i)} squares={this.state.squares}/>
        </div>
        <div className="game-info">
          <div>{/* status */}</div>
          <ol>{/* TODO */}</ol>
        </div>
      </div>
    );
  }
}

export default Game;