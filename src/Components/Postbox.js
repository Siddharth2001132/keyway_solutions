import React from "react";
import { useForm } from "react-hook-form";
import "../App.css";
import avatar from "../assets/avatar.png";

function Postbox({user}) {
  const { register, handleSubmit, reset } = useForm();
  const FEED_URL = "http://localhost:4000/feed/post";

  const refreshPage = ()=>{
    window.location.reload();
 }

  const onSubmit = (data) => {
    const body = {
      username: user,
      title: data.title,
      description: data.description,
    };

    console.log(body);

    fetch(FEED_URL, {
      method: "POST",
      body: JSON.stringify(body),
      headers: {
        "content-type": "application/json",
      },
    }).then((response) => {
      if (response.ok) {
        console.log('done');
        return response.json();
      } else {
        return response.json().then((error) => {
          console.log(error);
          throw new Error(error.message);
        });
      }
    }).then(() => {
      console.log("Success");
    }).catch((error) => {
      console.log(error);
    });

    reset();
    refreshPage();
    
  };

  return (
    <div className="postbox">
      <nav className="navbar navbar-expand-lg navbar-dark bg-primary blank-bar">
        <img src={avatar} alt="avatar" className="avatar-img" />
      </nav>

      <form className="postbox-group" onSubmit={handleSubmit(onSubmit)}>
        <div className="form-group">
          <label htmlFor="title">Title</label>
          <input
            className="form-control"
            name="title"
            id="title"
            placeholder="Enter a Title"
            type="text"
            required={true}
            ref={register}
          />
        </div>

        <div className="form-group">
          <label htmlFor="description">Description</label>
          <textarea
            className="form-control"
            name="description"
            id="description"
            type="text"
            placeholder="Enter description"
            rows={3}
            required={true}
            ref={register}
          />
        </div>

        <button type="submit" className="btn btn-primary mb-2">
          Post
        </button>
      </form>
    </div>
  );
}

export default Postbox;
