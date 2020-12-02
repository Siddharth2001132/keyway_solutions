import React, { useState } from "react";
import { useForm } from "react-hook-form";
import Joi from "joi";
import { useHistory } from "react-router-dom";

function Signin(props) {
  const [errorView, setErrorView] = useState(false);
  const [error, setError] = useState(" ");

  const { register, handleSubmit } = useForm();
  let history = useHistory();
  const SIGNIN_URL = "https://post-up-server.herokuapp.com/auth/signin";

  const onSubmit = (data) => {
    if (validUser(data)) {
      console.log("Signed in");
      // send data to the server
      const body = {
        username: data.username,
        password: data.password,
      };

      fetch(SIGNIN_URL, {
        method: "POST",
        body: JSON.stringify(body),
        headers: {
          "content-type": "application/json",
        },
      })
        .then((response) => {
          if (response.ok) {
            return response.json();
          } else {
            return response.json().then((error) => {
              throw new Error(error.message);
            });
          }
        })
        .then((result) => {
          localStorage.token = result.token;
          history.push("/dashboard");
        })
        .catch((error) => {
          setError(error.message);
          setErrorView(true);
        });
    }
  };

  const schema = Joi.object({
    username: Joi.string()
      .pattern(new RegExp("^[a-zA-Z0-9_]+$"))
      .min(3)
      .max(30)
      .required(),

    password: Joi.string()
      .pattern(new RegExp("^[a-zA-Z0-9!@_-]+$"))
      .min(8)
      .max(30)
      .required(),
  });

  const handleChange = () => {
    setErrorView(false);
  };

  const validUser = (data) => {
    const result = schema.validate(data);

    if (result.error == null) {
      console.log("Username and password are perfectly as required");
      return true;
    } else {
      if (result.error.message.includes("username")) {
        setError(" Username is invalid. 😭️");
        setErrorView(true);
      } else {
        setError(" Password is invalid. 🙈️");
        setErrorView(true);
      }
      return false;
    }
  };

  return (
    <div className="container">
      <h1>Login</h1>
      {errorView && (
        <div className="alert alert-danger" role="alert">
          {error}
        </div>
      )}

      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="form-group">
          <label htmlFor="username">Username</label>
          <input
            className="form-control"
            name="username"
            id="username"
            placeholder="Enter a username"
            type="text"
            onChange={handleChange}
            required={true}
            ref={register}
          />
          <small id="usernameHelp" className="form-text text-muted">
            We'll never share your username with anyone else.
          </small>
        </div>

        <div className="form-group">
          <label htmlFor="password">Password</label>
          <input
            className="form-control"
            name="password"
            id="password"
            type="password"
            placeholder="Enter password"
            onChange={handleChange}
            required={true}
            ref={register}
          />
          <small id="passwordHelp" className="form-text text-muted">
            Password must be 10 characters long.
          </small>
        </div>

        <button type="submit" className="btn btn-primary mb-2">
          Sign In
        </button>
      </form>
    </div>
  );
}

export default Signin;
