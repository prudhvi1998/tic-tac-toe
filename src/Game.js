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

function checkEmpty(squares) {
  for (let i=0;i<squares.length;i++){
    if(squares[i]==='')
      return false;
  }
  return true;
}

class Game extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      history: [ { squares: Array(9).fill('') }, ],
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
    const history1 = this.state.history;
    const current = history1[history1.length - 1];
    const squares1 = current.squares.slice();
    let winne = winner(squares1);
      if(winne !== null) {
        this.setWinned(winne);
        return;
      }
    if (squares1[i] === '' && this.state.winned === '') {
      squares1[i] = this.state.status;
      this.setState( { history: history1.concat([{squares: squares1}]) } );
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
    const history1 = this.state.history;
    const current = history1[history1.length - 1];
    const squares1 = current.squares.slice();
    let winne = winner(squares1);
    if (winne !== null) {
      status = 'Winner: ' + winne;
    } else {
      status = 'Next player: ' + this.state.status;
    }
    if(this.state.winned !==  null && this.state.winned !==  ''){
      window.location.reload();
    }
    let checkempty = checkEmpty(squares1);
    if(checkempty && winne === null)
      window.location.reload();
    const moves = history1.map( (step, move) => {
      const desc = move ? "Go to move : " + move : "Go to start";
      return (
        <li key={move}>
          <button onClick={() => console.log('clicked for move : ' + move)}>{desc}</button>
        </li>
      )
    } );

    return (
      <div className="game">
        <div className="game-board">
          <Board status={status} onClick={(i) => this.handleClick(i)} squares={squares1}/>
        </div>
        <div className="game-info">
          <ol>{moves}</ol>
        </div>
      </div>
    );
  }
}

export default Game;