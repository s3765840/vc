import React, { useState, useEffect } from "react";
import axios from "axios";
import "./AllPosts.css";

function AllPosts() {
  const [detail, setDetail] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
    creatAt: "",
  });
  const [postsList, setPostsList] = useState([]);
  const [allPosts, setAllPosts] = useState([]);
  const [check, setCheck] = useState(false);
  const [message, setMessage] = useState("");
  const [response, setResponse] = useState([]);


  useEffect(() => {
    axios
    .get("http://localhost:5001/post/getAllPost")
    .then((response) => setResponse(response.data));
  }, []);
  
  useEffect(() => {
   
      console.log(response);
    
  }, [response]);
  
  return (
    <div className="container1">
      <h1>{message}</h1>
      <div>
        {response.map((post) => (
          <div id="post" key={post.id} className="text2"> {post.content} </div>
        ))}
      </div>
    </div>
  );
}

export default AllPosts;
