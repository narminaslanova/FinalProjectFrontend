import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import "./App.css";
import "./index.css";
import Login from "./components/Login";
import JoinNow from "./components/JoinNow";
import Header from "./components/Header";
import Home from "./components/Home";
import Profile from "./components/Profile";

function App(props) {
  // useEffect(() => {
  //   props.getUserAuth();
  // }, []);

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
        </Switch>
      </Router>
    </div>
  );
}

// const mapStateToProps = (state)=>{
//   return {};
// }

// const mapDispatchToProps = (dispatch)=>({
//   getUserAuth: ()=> dispatch(getUserAuth())
// })

export default App;
