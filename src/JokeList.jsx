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
      jokes: JSON.parse(window.localStorage.getItem("jokes") || "[]"),
      loading: false
    };
    this.seenjoke = new Set(this.state.jokes.map(j => j.text));

    this.handleClick = this.handleClick.bind(this);
  }

  async componentDidMount() {
    if (this.state.jokes.length === 0) this.getJokes();
  }
  async getJokes() {
    let jokes = [];

    while (jokes.length < this.props.numJokesToFetch) {
      let res = await axios.get("https://icanhazdadjoke.com/", {
        headers: { Accept: "application/json" }
      });
      if (!this.seenjoke.has(res.data.joke)) {
        jokes.push({ text: res.data.joke, votes: 0, id: uuid() });
        this.seenjoke.add(res.data.joke);
        console.log(this.seenjoke);
      } else {
        console.log("found duplicate");
        console.log(res.data.joke);
      }
    }
    this.setState(
      st => ({
        jokes: [...st.jokes, ...jokes],
        loading: false
      }),
      () =>
        window.localStorage.setItem("jokes", JSON.stringify(this.state.jokes))
    );
    window.localStorage.setItem("jokes", JSON.stringify(jokes));
  }
  handleVote(id, delta) {
    this.setState(
      st => {
        return {
          jokes: st.jokes.map(j =>
            j.id === id ? { ...j, votes: j.votes + delta } : j
          )
        };
      },
      () =>
        window.localStorage.setItem("jokes", JSON.stringify(this.state.jokes))
    );
  }
  handleClick() {
    this.setState({ loading: true }, this.getJokes);
  }
  render() {
    if (this.state.loading) {
      return (
        <div className="loader">
          <i
            className="fa fa-8x fa-laugh fa-spin"
            style={{ color: "#fcf787" }}
          ></i>
          <h1 className="jokelist-title">loading....</h1>
        </div>
      );
    }
    let jokes = this.state.jokes.sort((a, b) => b.votes - a.votes);
    return (
      <div className="joke-list">
        <div className="jokelist-sidebar">
          <h1 className="jokelist-title">
            <span>Joke</span> Shop
          </h1>
          <img src={Laugh} alt="some laughing emoji" />
          <button className="jokelist-getmore" onClick={this.handleClick}>
            New jokes
          </button>
        </div>
        <div className="jokelist-jokes">
          {jokes.map(j => (
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
