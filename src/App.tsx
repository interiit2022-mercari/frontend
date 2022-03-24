import React from "react";
import { useAuth } from "./hooks/Auth";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  useRouteMatch,
} from "react-router-dom";
import PrivateRoute from "./component/PrivateRoute";
import Navbar from "./component/Navbar";
import Footer from "./component/Footer";

import Home from "./views/Home";
import Login from "./views/Login";
import Register from "./views/Register";

import "./styles/main.scss";
import BottomNavbar from "./component/BottomNavbar";
import SearchSME from "./views/SearchSME";
import SearchSHG from "./views/SearchSHG";
import ProfileSME from "./views/ProfileSME";
import ScrollToTop from "./component/ScrollToTop";
import { Toaster } from "react-hot-toast";

function App() {
  let auth = useAuth();

  return (
    <Router>
      <ScrollToTop />
      <Toaster
        position="bottom-center"
        reverseOrder={false}
        toastOptions={{
          style: {
            marginBottom: "100px",
          },
        }}
      />
      <div className="App">
        <Navbar />
        <Switch>
          {/* Authentication and Signup */}
          <Route exact path="/login">
            <Login />
          </Route>
          <Route exact path="/register">
            <Register />
          </Route>

          <PrivateRoute exact path="/search/">
            {auth?.user?.user_type === "SME" ? <SearchSME /> : <SearchSHG />}
          </PrivateRoute>

          <Route exact path="/profile">
            <ProfileSME />
          </Route>

          <Route exact path="/">
            <Home />
          </Route>
        </Switch>
        {auth?.user != null && <BottomNavbar />}
        {/* TODO: decide what to add in footer and uncomment it here */}
        {/* <Footer /> */}
      </div>
    </Router>
  );
}

export default App;
