import React, { useState, useEffect } from "react";
import axios from "axios";
import "./AllPosts.css";

export const Post = (props) => {
   
  const [detail, setDetail] = useState({
    name: "",
    email: "",
  });
  const [data, setData] = useState({
    UserId: "",
    content: "",
    PostId: "",
  });
  const [postDetail, setPostDetail] = useState([]);
  const [replies, setReplies] = useState([]);
  const [isDataDownload, setIsDataDownload] = useState(false);
  const [displayInput, setDisplayInput] = useState({ display: "none" });
  const [displaySendBtn, setDisplaySendBtn] = useState({ display: "none" });
  const [displayAddBtn, setDisplayAddBtn] = useState({ display: "block" });

  useEffect(() => {
    console.log(props.post);
    setDetail(JSON.parse(localStorage.getItem("userInfo")));
    setPostDetail(props.post);
    setReplies(props.post.Replies);
    setIsDataDownload(true);
  }, []);
  useEffect(() => {
    if (isDataDownload) {
        setData({ ...data, UserId: detail.id ,PostId:props.post.id})
    }
  }, [postDetail]);

  const addInput = () => {
    console.log("xxxx");
    setDisplayInput({ display: "block" });
    setDisplaySendBtn({ display: "block" });
    setDisplayAddBtn({ display: "none" });
  };
  const addNewReply = () => {
    console.log(data);
    callApi()
    setTimeout(() => {
        window.location.reload(false)
      }, 500);
  };
  const callApi = (e) => {
    axios
    .post("http://localhost:5001/post/addReply", data)
    
};

  return (
    <div className="post">
      <div className="postdetail">
        <p>Post ID : {postDetail.id}</p>
        <p>Post Detail : {postDetail.content}</p>
        <div className="reply">
          {replies.map((reply) => (
            <div key={reply.id}>
              <p>Reply ID : {reply.id}</p>
              <p>Reply Detail : {reply.content}</p>
            </div>
          ))}
        </div>
        <div className="input" style={displayInput}  >
          <textarea
            id="w3review"
            name="w3review"
            rows="6"
            cols="100"
            onChange={(e) =>setData({ ...data, content: e.target.value })}
          ></textarea>
        </div>

        <button className="btn" onClick={addInput} style={displayAddBtn}>
          Add a reply
        </button>
        <button className="btn" onClick={addNewReply} style={displaySendBtn}>
          Send
        </button>
      </div>
    </div>
  );
};
