import React, { useState, useEffect } from "react";
// import FlipMove from "react-flip-move";
import Post from "./Post";

function Posts(props) {
  const POST_URL = "https://post-up-server.herokuapp.com/feed/post";
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    fetch(POST_URL)
      .then((res) => res.json())
      .then((result) => {
        setPosts(result);
      });
  }, []);
  return (
    <div className="main-post">
      <h1>Posts</h1>
      <div>
        {posts.map((post) => (
            <Post
              key={post._id}
              _id={post._id}
              username={post.username}
              title={post.title}
              description={post.description}
            />
        ))}
      </div>
    </div>
  );
}

export default Posts;
