import { Component, useEffect, useState } from "react";
import { User } from "../models/user-model";
import HighOrderComponent from "./high-order-component";

interface UserInfo {
  data?: any[]
}

class ExampleWrapper extends Component<{userData: UserInfo}, UserInfo> {
  constructor(props) {
    super(props);
    this.state = {data: []};
  }

  componentDidUpdate(prevProps) {
      if (prevProps !== this.props) {
        this.setState({data: this.props?.userData.data});
      }
  }

  render() {

    return this.state.data.length > 0 ? (
      <div>
        <ul>
          {this.state?.data?.map((userData) => 
            <li key={userData.id.toString()}>{userData.name}</li>
          )}
        </ul>
      </div>
    ) : (
      <div>Loading...</div>
    )
  }
}

export default HighOrderComponent(ExampleWrapper);
