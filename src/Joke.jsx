import React, { Component } from "react";
import "./Joke.css";
export default class Joke extends Component {
  getColor() {
    if (this.props.votes >= 15) {
      return "#4CAF50";
    } else if (this.props.votes >= 12) {
      return "#8BC34A";
    } else if (this.props.votes >= 9) {
      return "#CDDC39";
    } else if (this.props.votes >= 6) {
      return "#FFEB38";
    } else if (this.props.votes >= 3) {
      return "#FFC107";
    } else if (this.props.votes >= 0) {
      return "#FF9800";
    } else {
      return "#F44336";
    }
  }
  getEmoji() {
    if (this.props.votes >= 15) {
      return "em em-rolling_on_the_floor_laughing";
    } else if (this.props.votes >= 12) {
      return "em em-laughing";
    } else if (this.props.votes >= 9) {
      return "em em-smiley";
    } else if (this.props.votes >= 6) {
      return "em em-smile";
    } else if (this.props.votes >= 3) {
      return "em em-neutral_face";
    } else if (this.props.votes >= 0) {
      return "em em-confused";
    } else {
      return "em em-angry";
    }
  }
  render() {
    return (
      <div className="joke">
        <div className="joke-buttons">
          <i className="fa fa-arrow-up" onClick={this.props.upvote}></i>
          <span className="joke-votes" style={{ borderColor: this.getColor() }}>
            {this.props.votes}
          </span>
          <i className="fa fa-arrow-down" onClick={this.props.downvote}></i>
        </div>
        <div className="joke-text">{this.props.text}</div>
        <div className="joke-smiley">
          <i className={this.getEmoji()}></i>
        </div>
      </div>
    );
  }
}
