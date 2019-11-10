import React from 'react';
import './Joke.css'

class Joke extends React.Component{

    getColor(){
        if(this.props.votes >= 15){
            return "#4CAF50";
        }
        else if(this.props.votes >= 12){
            return "#8BC34A"
        }
        else if(this.props.votes >= 9){
            return "#CDDC39"
        }
        else if(this.props.votes >= 6){
            return "#FFEB3B"
        }
        else if(this.props.votes >= 3){
            return "#FFC107"
        }
        else if(this.props.votes >= 0){
            return "#FF9800"
        }
        else{
            console.log(this.props.votes)
            return "#F44336"
        }
    }

    render(){
        return (
        <div className="Joke">
            <div className = "JokeButtons">
                <i onClick={this.props.upvote} className="fas fa-arrow-up"></i>
                <span className="JokeVote" style={{borderColor: this.getColor()}}>{this.props.votes}</span>
                <i onClick={this.props.downvote} className="fas fa-arrow-down"></i>
            </div>
            <div className="JokeText">{this.props.text}</div>
        </div>
        );
    }
}

export default Joke;
