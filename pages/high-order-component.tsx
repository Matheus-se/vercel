  import { Console } from "console";
  import { userInfo } from "os";
  import React from "react";
  import Endpoints from "../helpers/endpoints";
  import { User } from "../models/user-model";
  import ApiService from "../pages/api/api";


  const endpoints = Endpoints;  

  const HighOrderComponent = (Component) => {
    return class Wrapper extends React.Component<User> {

      constructor(props) {
          super(props);
          this.state = {data: []};
      }

      componentDidMount() {
        ApiService
          .get(endpoints.getUser + this.props.userName + "/repos")
          .then((res) => {
            this.setState({data: res.data})
            console.log(this.state);
          });
      }

      render() {
        return <Component userData={this.state} {...this.props}/>;
      }
    }
  };

  export default HighOrderComponent;