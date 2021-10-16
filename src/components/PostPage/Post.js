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
  // const [postData, setPostData] = useState({ email: "", post: "" });
  const [postDetail, setPostDetail] = useState("");
  const [postSuccessMeg, setPostSuccessMeg] = useState("");
  const [response, setResponse] = useState([]);

  const [postError, setPostError] = useState("");
  const [isCorrect, setIsCorrect] = useState(false);
  const [isClickSubmit, setIsClickSubmit] = useState(false);
  const [postsList, setPostsList] = useState([]);
  // const [isLocalStorageEmpty, setIsLocalStorageEmpty] = useState(true);

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
      // setPostData({ email: detail.email, post: postDetail });
      setPost({user_id:detail.id,content:postDetail})
      console.log(detail);
    }
  }, [isCorrect]);
  useEffect(() => {
    if (isClickSubmit) {
      console.log(post);
      axios
      .post("http://localhost:5001/post/addPost", post)
      .then((response) => setResponse(response.data));
      updateStorage();
    }
  }, [post]);
  useEffect(() => {
    if (isClickSubmit) {
      console.log(response);
    }
  }, [response]);
  // useEffect(() => {
  //   if (isClickSubmit) {
  //     console.log(postData);
  //     // creatOrFindStorage();
  //   }
  // }, [postData]);
  // useEffect(() => {
  //   if (isClickSubmit) {
  //     // updateStorage();
  //   }
  // }, [postsList]);
  
  const postBtn = () => {
    console.log(post);
    const isValid = formValidation();
    setIsCorrect(isValid);
    console.log(isCorrect);
    setIsClickSubmit(true);
    // setIsLocalStorageEmpty(true);
  };

  // const creatOrFindStorage = () => {
  //   if ("postsList" in localStorage) {
  //     setPostsList(JSON.parse(localStorage.getItem("postsList")));
  //     setIsLocalStorageEmpty(false);
  //   } else {
  //     setPostsList(postsList.concat(postData));
  //   }
  // };

  // const updateStorage = () => {
  //   console.log("Xxx");
  //   if (isLocalStorageEmpty) {
  //     localStorage.setItem("postsList", JSON.stringify(postsList));
  //   } else {
  //     var data = JSON.parse(localStorage.getItem("postsList"));
  //     var updateData = [];
  //     data.forEach((item) => {
  //       updateData.push(item);
  //     });
  //     updateData.push(postData);
  //           localStorage.setItem("postsList", JSON.stringify(updateData));
  //     }
  //     setPostSuccessMeg("Post send!!")
  //     setTimeout(() => {
  //       window.location.href = "allposts";
  //     }, 1500);

  //   }
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
