import React, { Component } from "react";
import axios from "axios";
import Laugh from "./image.svg";
import Joke from "./Joke";
import "./JokeList.css";
import uuid from "uuid";
class JokeList extends Component {
  static defaultProps = {
    numJokesToFetch: 10
  };
  constructor(props) {
    super(props);
    this.state = {
      jokes: []
    };
  }

  async componentDidMount() {
    let jokes = [];

    while (jokes.length < this.props.numJokesToFetch) {
      let res = await axios.get("https://icanhazdadjoke.com/", {
        headers: { Accept: "application/json" }
      });
      jokes.push({ text: res.data.joke, votes: 0, id: uuid() });
    }
    this.setState({
      jokes: jokes
    });
  }
  handleVote(id, delta) {
    this.setState(st => {
      return {
        jokes: st.jokes.map(j =>
          j.id === id ? { ...j, votes: j.votes + delta } : j
        )
      };
    });
  }
  render() {
    return (
      <div className="joke-list">
        <div className="jokelist-sidebar">
          <h1 className="jokelist-title">
            <span>Dad</span> Jokes
          </h1>
          <img src={Laugh} alt="some laughing emoji" />
          <button className="jokelist-getmore">New jokes</button>
        </div>
        <div className="jokelist-jokes">
          {this.state.jokes.map(j => (
            <Joke
              votes={j.votes}
              text={j.text}
              key={j.id}
              upvote={() => this.handleVote(j.id, +1)}
              downvote={() => this.handleVote(j.id, -1)}
            />
          ))}
        </div>
      </div>
    );
  }
}
export default JokeList;
