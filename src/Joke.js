import React from 'react';
import './Joke.css'

class Joke extends React.Component{
  render(){
    return (
      <div className="Joke">
          <div className = "JokeButtons">
            <i onClick={this.props.upvote} class="fas fa-arrow-up"></i>
            <span className="JokeVote">{this.props.votes}</span>
            <i onClick={this.props.downvote} class="fas fa-arrow-down"></i>
          </div>
          <div className="JokeText">{this.props.text}</div>
      </div>
    );
  }
}

export default Joke;
