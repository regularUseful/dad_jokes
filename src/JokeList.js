import React from 'react';
import axios from 'axios'
import './JokeList.css'
import Joke from './Joke'
import uuid from 'uuid/v4'


class JokeList extends React.Component{

    static defaultProps = {
        numJokesToGet: 10
    }

    constructor(props){
        super(props);
        this.state = {
            loading: false,
            jokes: JSON.parse(window.localStorage.getItem("jokes") || "[]") 
        }
        this.handleClick = this.handleClick.bind(this);
    }

    componentDidMount(){
        if(this.state.jokes.length === 0){
           this.getJokes()
        }
    }

    async getJokes(){
        console.log(this.state.loading)
        let jokes = []
        while(jokes.length < this.props.numJokesToGet){
            let res = await axios.get("https://icanhazdadjoke.com/", {
            headers: {accept: "application/json"}
        }
        );
        jokes.push({
            joke:res.data.joke,
            votes: 0,
            id: uuid()
        });
        window.localStorage.setItem("jokes", JSON.stringify(jokes))
        }
        this.setState(st => ({
            loading: false,
            jokes: [...st.jokes, ...jokes]
        }), ()=> window.localStorage.setItem( "jokes", JSON.stringify(this.state.jokes)))
   
        console.log(this.state.loading);
    }

    handleClick(){
        this.setState({
            loading: true
        },  this.getJokes)
       
    }

    handleVote(id, num){
        this.setState(st=> ({
            jokes: st.jokes.map(i=>
                i.id === id ? {...i, votes: i.votes + num} : i
                )
        }),  ()=> window.localStorage.setItem( "jokes", JSON.stringify(this.state.jokes)))
    }

    render(){
        if(this.state.loading){
            return(
                <div className = "spinner">
                    <i className="fa-8x far fa-laugh fa-spin"></i>
                    <h1 className="Jokelist-Title">Loading...</h1>
                </div>
            )
        }
        return (
            <div className="JokeList">
                <div className="JokeList-Sidebar">
                    <h1 className="JokeList-Title"><span>Dad</span> Jokes</h1>
                    <img src="https://assets.dryicons.com/uploads/icon/svg/8927/0eb14c71-38f2-433a-bfc8-23d9c99b3647.svg" />
                    <button onClick={this.handleClick} className="JokeList-getMore">Jokes</button>
                </div>
                <div className = "JokeList-jokes">
                    {this.state.jokes.map(i=>(
                        <Joke key={i.id} upvote={()=> this.handleVote(i.id, 1)} downvote={()=> this.handleVote(i.id, -1)} text={i.joke} votes={i.votes} />
                    ))}
                </div>
            </div>
        );
    }
}

export default JokeList;