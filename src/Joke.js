import React from 'react';


class Joke extends React.Component{
  render(){
    return (
      <div className="Joke">
          <i onClick={this.props.upvote} class="fas fa-arrow-up"></i>
          {this.props.votes}
          <i onClick={this.props.downvote} class="fas fa-arrow-down"></i>
          <div>{this.props.text}</div>
      </div>
    );
  }
}

export default Joke;
