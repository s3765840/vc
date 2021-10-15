import React, { useState, useEffect } from "react";

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
  const [allmyPosts, setAllmyPosts] = useState([]);
  const [check, setCheck] = useState(false);
  const [message, setMessage] = useState("");
  const [isLocalStorageEmpty, setIsLocalStorageEmpty] = useState(true);


  useEffect(() => {
    if ("postsList" in localStorage) {
      setIsLocalStorageEmpty(false)
    }
    else{
      localStorage.setItem("postsList", JSON.stringify(postsList));
      setMessage("Click Go Post to start your fisrt post!");

      setIsLocalStorageEmpty(true)
    }

    setCheck(true);
  }, []);
  useEffect(() => {
   
    setDetail(JSON.parse(localStorage.getItem("userInfo")));
    setPostsList(JSON.parse(localStorage.getItem("postsList")));
    setCheck(true);
  }, [isLocalStorageEmpty]);
  useEffect(() => {
    if (check) {
      findMyPosts();
    }
  }, [check]);
  useEffect(() => {
    if (check) {
      if (allmyPosts.length < 1) {
        setMessage("Click Go Post to start your fisrt post!");
      }
      setMessage("All my posts : ");
    }
  }, [allmyPosts]);

  const findMyPosts = () => {
    console.log(postsList);
    var temArray = [];
    for (let i = 0; i < postsList.length; i++) {
      if (postsList[i].email == detail.email) {
        temArray.push(postsList[i]);
      }
      setAllmyPosts(temArray);
    }
  };

  return (
    <div className="container1">
      <h1>{message}</h1>
      <div>
        {allmyPosts.map((post) => (
          <div key={post.post} className="text2"> {post.post} </div>
        ))}
      </div>
    </div>
  );
}

export default AllPosts;
