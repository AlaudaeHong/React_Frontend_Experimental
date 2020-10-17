import React, { Component } from "react";
import NavigationBar from "./navigation";

class App extends Component {
    constructor(props) {
        super(props);
        this.state = { apiResponse: "" };
    }
    
    callAPI() {
        fetch("http://localhost:10000/testAPI")
            .then((res) => res.text())
            .then((res) => this.setState({ apiResponse: res }));
    }

    componentDidMount() {
        this.callAPI();
    }

    render(){
      return(
        <div className="App">
            <NavigationBar isLoggedIn={true} />
            <p className="App-intro">{this.state.apiResponse}</p>
        </div>
      )
    }
}

export default App;
