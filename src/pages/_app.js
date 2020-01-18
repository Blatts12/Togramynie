import React from "react";
import App from "next/app";
import Head from "next/head";
import Container from "react-bootstrap/Container";
import Jumbotron from "react-bootstrap/Jumbotron";
import Navbar from "../components/Navbar";

class MyApp extends App {
  static async getInitialProps({ Component, ctx }) {
    let pageProps = {};
    if (Component.getInitialProps) {
      pageProps = await Component.getInitialProps(ctx);
    }
    if (ctx.req && ctx.req.session.passport) {
      pageProps.user = ctx.req.user;
      pageProps.user.password = "admin 100% legit";
      pageProps.user.__v = "-1";
    }
    return { pageProps };
  }

  constructor(props) {
    super(props);
    this.state = {
      user: props.pageProps.user
    };
  }

  render() {
    const { Component, pageProps } = this.props;

    const props = {
      ...pageProps,
      user: this.state.user
    };

    return (
      <div>
        <Head>
          <title>Togramynie</title>
        </Head>
        <Navbar user={this.state.user} />
        <Component {...props} />
      </div>
    );
  }
}

export default MyApp;
