import React, { Component } from "react";

class CompletedBtn extends Component {
  render() {
    let classes = "btn btn-sm mt-2";
    if (this.props.completed) {
      classes += " btn-success";
      return (
        <button className={classes} onClick={this.props.onClick}>
          Complete
        </button>
      );
    } else {
      classes += " btn-warning";
      return (
        <button className={classes} onClick={this.props.onClick}>
          Incomplete
        </button>
      );
    }
  }
}

export default CompletedBtn;
