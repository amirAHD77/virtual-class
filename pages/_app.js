import "../styles/globals.css";

import "bootstrap/dist/css/bootstrap.css";

import React from "react";
import ReactDOM from "react-dom";
import App from "next/app";
import Router from "next/router";

class MyApp extends App {
  state = {
    history: [], // keep history items in state
  };

  componentDidMount() {
    const { asPath } = this.props.router;

    // lets add initial route to `history`
    this.setState((prevState) => ({ history: [...prevState.history, asPath] }));
  }

  componentDidUpdate() {
    const { history } = this.state;
    const { asPath } = this.props.router;

    // if current route (`asPath`) does not equal
    // the latest item in the history,
    // it is changed so lets save it
    if (history[history.length - 1] !== asPath) {
      this.setState((prevState) => ({
        history: [...prevState.history, asPath],
      }));
    }
  }

  render() {
    const { Component, pageProps, classes, store } = this.props;

    return (
      <React.Fragment>
        <Component history={this.state.history} {...pageProps} />
        {/*</Provider>*/}
      </React.Fragment>
    );
  }
}

export default MyApp;
