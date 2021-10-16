import React, { useState, useEffect } from "react";
import "./SignIn.css";
import axios from "axios";

function SignIn() {
  const [detail, setDetail] = useState({ email: "", password: "" });
  const [emailError, setEmailError] = useState("");
  // input filed promble
  const [passwordTypeError, setPasswordTypeError] = useState("");
  const [isClickSubmit, setIsClickSubmit] = useState(false);
  const [isCorrect, setIsCorrect] = useState(false);
  // found email but password did not match
  const [passwordWrong, setPasswordWrong] = useState(false);
  const [usersList, setUsersList] = useState([]);
  // const [position, setPosition] = useState(0);
  const [isLogIn, setIsLogIn] = useState(false);
  const [response, setResponse] = useState([]);


  const submitHandler = (e) => {
    e.preventDefault();
    const isValid = formValidation();
    setIsClickSubmit(isValid);
    console.log(passwordWrong);
  };
  useEffect(() => {
    localStorage.setItem("loginStatus", JSON.stringify(false));
    localStorage.removeItem("userInfo")
  }, []);

  useEffect(() => {
    if (isClickSubmit && formValidation()) {
      console.log(detail);
      callApi();
    }
  }, [isClickSubmit]);
  
  const callApi = (e) => {
      axios
      .post("http://localhost:5001/user/signIn", detail)
      .then((response) => setResponse(response.data));
  };
  useEffect(() => {
    if (isClickSubmit && formValidation()) {
      // setIsClickSubmit(false);
      console.log(response);
      if (response == "Email incorrect" || response=="Password incorrect") {
        setPasswordWrong(true);
      }  else  {
        setPasswordWrong(false);
        setIsCorrect(true);
        localStorage.setItem("userInfo", JSON.stringify(response));
        localStorage.setItem("loginStatus", JSON.stringify(true));

      }
      
    }
  }, [response]);
  

  // all validation functions
  const formValidation = () => {
    const emailError = "";
    var isValid = "true";

    if (detail.email.trim().length < 1) {
      setEmailError("Email is requied");
    } 
    else if (
      !detail.email.match(/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/)
    ) 
    {
      setEmailError("Email fromat not correct");
      isValid = false;
    } 

    return isValid;
  };

  return (
    <div>
      <div className="myForm">
        {!isCorrect && !passwordWrong ? (
          <form onSubmit={submitHandler}>
            <h2>Sign In Form</h2>

            <div className="form-group">
              <label htmlFor="email">Email: </label>
              <input
                type="text"
                name="email"
                id="email"
                onChange={(e) =>
                  setDetail({ ...detail, email: e.target.value })
                }
              />
            </div>

            <div className="errorMessage">{emailError}</div>
            <br />

            <div className="form-group">
              <label htmlFor="password">Password: </label>
              <input
                type="password"
                name="password"
                id="password"
                onChange={(e) =>
                  setDetail({ ...detail, password: e.target.value })
                }
              />
            </div>
            <br/>
            <button type="submit" className="btn"> SUBMIT </button>

          </form>
        ) : null}
      </div>
      <div>
        {passwordWrong ? (
          <div>
            <h1>Wrong Email or password ! </h1>
            <a href="signIn">
              <button className="btn">Try again</button>
            </a>
          </div>
        ) : null}
      </div>
      <div>
        {isCorrect ? (
          <div>
            <h1>Sign in successful </h1>
            <a href="myProfile">
              <button className="btn">Go to profile page</button>
            </a>
          </div>
        ) : null}
      </div>
    </div>
  );
}

export default SignIn;
