import "./App.css";
import Navbar from "./components/Navbar/Navbar";
import SignIn from "./components/SignIn/SignIn";
import SignUp from "./components/SignUp/SignUp";
import Profile from "./components/Profile/Profile";
import Post from "./components/PostPage/Post";
import Home from "./components/HomePage/HomePage";
import AllPost from "./components/AllPosts/AllPosts";

import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
// import axios from 'axios'
// const api = axios.create({
//   baseURL:`http://localhost:5001`
// })

function App() {
// console.log("ssstest");
// api.get('/').then(res=>{
//   console.log(res);
// })

  return (
    <div className="App">
      <Navbar />

      <Router>
          <Switch>
              <Route path="/signUp">
                <SignUp />
              </Route>

              <Route path="/signIn">
                <SignIn />
              </Route>
          


          
              <Route path="/myProfile">
                <Profile />
              </Route>
              <Route path="/post">
                <Post />
              </Route>
              <Route path="/home">
                <Home />
              </Route>
              <Route path="/allPosts">
                <AllPost />
              </Route>
              <Route path="/" />
          </Switch>




      </Router>
    </div>
  );
}

export default App;
