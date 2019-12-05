import React, { Component } from "react";
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
                  <NavLink to="/" exact>
                    Info
                  </NavLink>
                </li>
                <li>
                  <NavLink to="/app">App</NavLink>
                </li>
                <li>
                  <NavLink to="/admin">Admin</NavLink>
                </li>
              </ul>
            </nav>
          </header>
          <section>
            <Route path="/" exact component={Info} />
            <Route path="/app" component={App} />
            <Route path="/admin" component={Admin} />
          </section>
        </div>
      </Router>
    );
  }
}

export default Spa;
