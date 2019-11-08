import React from 'react';
import axios from 'axios'


class JokeList extends React.Component{

    static defaultProps = {
        numJokesToGet: 10
    }

    constructor(props){
        super(props);
        this.state = {
            jokes: []
        }
    }

    async componentDidMount(){
        let jokes = []
        while(jokes.length < this.props.numJokesToGet){
            let res = await axios.get("https://icanhazdadjoke.com/", {
            headers: {accept: "application/json"}
        }
        );
        jokes.push(res.data.joke);
        }
        this.setState({
            jokes
        })
        console.log(this.state.jokes);
    }

    render(){
        return (
            <div className="JokeList">
                <h1>Dad Jokes</h1>
                <div className = "JokeList-jokes">
                    {this.state.jokes.map(i=>(
                        <div>{i}</div>
                    ))}
                </div>
            </div>
        );
    }
}

export default JokeList;