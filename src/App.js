import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import "./App.css";
import "./index.css";
import Login from "./components/Login";
import JoinNow from "./components/JoinNow";
import Header from "./components/Header";
import Home from "./components/Home";
import Profile from "./components/Profile";
import Connections from "./components/Connections";
import { useSelector } from "react-redux";
import { Redirect } from "react-router";

function App() {
  //const user = useSelector((state) => state.authentication);

  return (
    <div className="App">
      <Router>
        <Switch>
          <Route exact path="/">
            <Login />
          </Route>
          <Route path="/signup">
            <JoinNow />
          </Route>

          <Route path="/home">
            <Header />
            <Home />
          </Route>

          <Route path="/myprofile">
            <Header />
            <Profile />
          </Route>
          <Route path="/connections">
            <Header />
            <Connections />
          </Route>
        </Switch>
      </Router>
    </div>
  );
}

export default App;
