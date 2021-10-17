import React, { useState, useEffect } from "react";
import axios from "axios";
import "./AllPosts.css";
import { Post } from "./Post";

function AllPosts() {
  const [detail, setDetail] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
    creatAt: "",
  });
  const [data, setData] = useState({
    id: "",
    content:""
  });
  const [postsList, setPostsList] = useState([]);
  const [allPosts, setAllPosts] = useState([]);
  const [check, setCheck] = useState(false);
  const [message, setMessage] = useState("");
  const [response, setResponse] = useState([]);
  const [isDataValid, setIsDataValid] = useState(false);

  useEffect(() => {
    setDetail(JSON.parse(localStorage.getItem("userInfo")));
    axios
      .get("http://localhost:5001/post/getAllPost")
      .then((response) => setResponse(response.data));
  }, []);
  useEffect(() => {
    // console.log(response);
  }, [response]);

  return (
    <div className="container1">
      <h1>{message}</h1>

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
