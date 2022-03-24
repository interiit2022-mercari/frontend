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

import Home from "./views/Home";
import Login from "./views/Login";
import Register from "./views/Register";

import "./styles/main.scss";
import BottomNavbar from "./component/BottomNavbar";
import ScrollToTop from "./component/ScrollToTop";
import { Toaster } from "react-hot-toast";
import SearchDoctor from "./views/SearchDoctor";
import SearchPatient from "./views/SearchPatient";
import Profile from "./views/Profile";

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
            {auth?.user?.role === "Patient" ? (
              <SearchDoctor />
            ) : (
              <SearchPatient />
            )}
          </PrivateRoute>

          <Route exact path="/profile">
            <Profile />
          </Route>

          <Route exact path="/">
            <Home />
          </Route>
        </Switch>
        {auth?.user != null && <BottomNavbar />}
      </div>
    </Router>
  );
}

export default App;
