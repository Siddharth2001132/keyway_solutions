import React from "react";
import { Link } from "react-router-dom";
import "../App.css";

function Home(props) {
  return (
    <div className="container pt-2">
      <div className="jumbotron text-center">
        <h1 className="display-3">Post Up App</h1>
        <p className="lead">➡️ This is a just a posting app.📱️</p>
        <hr className="my-4" />
        <p>Developed by Siddharth Rathod</p>
        <div className="lead lead-buttons">
            <div className="button">
              <Link
                to="/signup"
                className="btn btn-primary btn-lg"
                role="button"
              >
                Sign Up
              </Link>
            </div>
            <div className="button">
              <Link
                to="/signin"
                className="btn btn-primary btn-lg"
                role="button"
              >
                Sign In
              </Link>
            </div>
          
        </div>
      </div>
    </div>
  );
}

export default Home;
