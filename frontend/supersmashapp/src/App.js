
import React from 'react';
import { BrowserRouter as Router, Route } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";

// Bootstrap imports
import Navbar from "./components/shell/navbar.component.js"

// Custom Component Imports
import MatchList from "./components/core/matches-list.component";
import EditMatch from "./components/core/edit-match.component";
import CreateMatch from "./components/core/create-match.component";
import CreateUser from "./components/core/create-user.component";

function App() {
  return (
    <Router>
        <Navbar />
        <br />
        <Route path="/" exact component={MatchList} />
        <Route path="/edit/:id" component={EditMatch} />
        <Route path="/create" component={CreateMatch} />
        <Route path="/user" component={CreateUser} />
    </Router>
  );
}

export default App;
