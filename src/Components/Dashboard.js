import React, { useState, useEffect } from "react";
import { useHistory } from "react-router-dom";
import "../App.css";
import Postbox from "./Postbox";
import Posts from "./Posts";

function Dashboard(props) {
  const [user, setUser] = useState(" ");
  const history = useHistory();
  const API_URL = "https://post-up-server.herokuapp.com/";

  const signOut = () => {
    localStorage.removeItem("token");
    history.push("/signin");
  };

  useEffect(() => {
    fetch(API_URL, {
      headers: {
        authorization: `Bearer ${localStorage.token}`,
      },
    })
      .then((res) => res.json())
      .then((result) => {
        if (result.user) {
          setUser(result.user);
        } else {
          localStorage.removeItem("token");
          history.push("/signin");
        }
      });
  }, [history]);

  return (
    <div className="container Feed">
      <div className="signout_button">
        <button
          type="submit"
          onClick={signOut}
          className="btn btn-primary mb-2"
        >
          Sign out
        </button>
      </div>
      <div className="feed-header">
        <Postbox user={user.username}/>
      </div>
      <div className="feed-box">
        <Posts/>
      </div>
      <h2>Hello, {user.username}</h2>
    </div>
  );
}

export default Dashboard;
