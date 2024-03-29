import React, { Component } from "react";

class AdminDashboard extends Component {
  state = {
    user: this.props.user,
  };

  render() {
    const { user } = this.state;
    return (
      <div className="mx-3">
        <h1 className="mb-5">Admin Dashboard</h1>
        <h3>Name: {user.name}</h3>
        <h3>Email: {user.email}</h3>
      </div>
    );
  }
}

export default AdminDashboard;
