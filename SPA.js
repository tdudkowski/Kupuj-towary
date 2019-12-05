import React, { Component } from "react";
import { Helmet } from "react-helmet";

import {
  BrowserRouter as Router,
  NavLink,
  Route
  // Switch
} from "react-router-dom";
import "./SPA.css";

import Info from "./Info.js";
import App from "./App.js";
import Admin from "./Admin.js";

class Spa extends Component {
  render() {
    return (
      <>
        <Helmet>
          <title>
            Kupuj towary try your Black Friday experience : React App
          </title>
          <meta charset="UTF-8" />
          <meta
            name="viewport"
            content="width=device-width, initial-scale=1.0"
          />
          <meta http-equiv="X-UA-Compatible" content="ie=edge" />
          <meta
            property="og:url"
            content="https://tdudkowski.github.io/Kupuj-towary/"
          />
          <meta property="og:type" content="application" />
          <meta
            property="og:title"
            content="Kupuj towary try your Black Friday experience"
          />
          <meta
            property="og:description"
            content="my first React app - data flow and structuring components"
          />
          <meta name="twitter:card" content="app" />
          <meta name="twitter:site" content="@tdudkowski" />
          <meta name="twitter:creator" content="@tdudkowski" />
          <meta
            property="og:image"
            content="https://tdudkowski.github.io/Kupuj-towary/kupujtowary.jpg"
          />
        </Helmet>

        <Router>
          <div className="container">
            <header>
              <nav>
                <a href="https://tdudkowski.github.io/">to Github Page</a> |
                <a href="https://github.com/tdudkowski/Kupuj-towary">
                  repo of Kupuj towary
                </a>
              </nav>
              <nav>
                <ul>
                  <li>
                    <NavLink to="/Kupuj-towary" exact>
                      Info
                    </NavLink>
                  </li>
                  <li>
                    <NavLink to="/Kupuj-towary/app">App</NavLink>
                  </li>
                  <li>
                    <NavLink to="/Kupuj-towary/admin">Admin</NavLink>
                  </li>
                </ul>
              </nav>
            </header>
            <section>
              <Route path="/Kupuj-towary/" exact component={Info} />
              <Route path="/Kupuj-towary/app" component={App} />
              <Route path="/Kupuj-towary/admin" component={Admin} />
            </section>
          </div>
        </Router>
      </>
    );
  }
}

export default Spa;
