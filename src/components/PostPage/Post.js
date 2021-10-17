import React, { useState, useEffect } from "react";
import "./Post.css";
import axios from "axios";

function Post() {
  const [detail, setDetail] = useState({
    id:0,
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  });
  const [post, setPost] = useState({
    content: "",
    user_id: "",
    image: "",
  });
  const [postDetail, setPostDetail] = useState("");
  const [postSuccessMeg, setPostSuccessMeg] = useState("");
  const [postError, setPostError] = useState("");
  const [isCorrect, setIsCorrect] = useState(false);
  const [isClickSubmit, setIsClickSubmit] = useState(false);

  const formValidation = () => {
    var isValid = "true";
    if (postDetail.trim().length < 1) {
      setPostError("Post must not empty");
      isValid = false;
    } else {
      setPostError("");
    }
    return isValid;
  };

  useEffect(() => {
    setDetail(JSON.parse(localStorage.getItem("userInfo")));
  }, []);
  useEffect(() => {
    if (isClickSubmit) {
      setPost({user_id:detail.id,content:postDetail})
      console.log(detail);
    }
  }, [isCorrect]);
  useEffect(() => {
    if (isClickSubmit) {
      console.log(post);
      axios
      .post("http://localhost:5001/post/addPost", post)
      updateStorage();
    }
  }, [post]);

  
  const postBtn = () => {
    const isValid = formValidation();
    setIsCorrect(isValid);
    setIsClickSubmit(true);
  };

  const updateStorage = () => {
      setPostSuccessMeg("Post send!!")
      setTimeout(() => {
        window.location.href = "allposts";
      }, 1500);

    }
  
  return (
    <div>
      <h1>{detail.name}</h1>

      <textarea
        rows="6"
        cols="100"
        onChange={(e) => setPostDetail(e.target.value)}
        placeholder="Please less than 600 letter"
      ></textarea>
<br/>
<br/>
<br/>
      <button className="btn2" onClick={postBtn}>POST</button>
      <h1>{postError}</h1>
      <h1>{postSuccessMeg}</h1>
    </div>
  );
}

export default Post;
