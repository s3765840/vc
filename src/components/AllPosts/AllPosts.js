import React, { useState, useEffect } from "react";
import axios from "axios";
import "./AllPosts.css";
import { Post } from "./Post";

function AllPosts() {
  const [response, setResponse] = useState([]);

  useEffect(() => {
    axios
      .get("http://localhost:5001/post/getAllPost")
      .then((response) => setResponse(response.data));
  }, []);
  useEffect(() => {
    // console.log(response);
  }, [response]);

  return (
    <div className="container1">
      <div>
        {response.map((post) => (
          <div  key={post.id} className="text2">
            <Post post={post}/>
          </div>
        ))}
      </div>
    </div>
  );
}

export default AllPosts;
