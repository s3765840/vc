import React, { useState, useEffect } from "react";
import "./SignIn.css";

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
  // const [isLogIn, setIsLogIn] = useState(false);


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
    if (isClickSubmit) {
      getAllDate();
    }
  }, [isClickSubmit]);
  useEffect(() => {
    if (isClickSubmit) {
      isMatch();
    }
  }, [usersList]);
  // useEffect(() => {
  //   if (isClickSubmit) {
  //     localStorage.setItem("LoginStatus", JSON.stringify(usersList));
  //   }
  // }, [isLogIn]);
  // useEffect(() => {
  //   props. changeWord('ani')
  //     console.log(position);
  //     // props.setPosition(position);
    
  // }, [position]);

  const getAllDate = () => {
    setUsersList(JSON.parse(localStorage.getItem("usersList")));
  };
  const isMatch = () => {
    console.log(detail);
    console.log(usersList);
    for (let i = 0; i < usersList.length; i++) {
      console.log(usersList[i].email);
      console.log(usersList[i].password);
      if (
        usersList[i].email == detail.email &&
        usersList[i].password != detail.password
      ) {
        setPasswordWrong(true);
        console.log("ree");
      }
      if (
        
        usersList[i].email == detail.email &&
        usersList[i].password == detail.password
      ) {
        console.log("ree1");

        setIsCorrect(true);
        localStorage.setItem("loginStatus", JSON.stringify(true));
        localStorage.setItem("userInfo", JSON.stringify(usersList[i]));
      }
      else{
        
      }
    }
  };

  // all validation functions
  const formValidation = () => {
    const emailError = "";
    var isValid = "true";

    if (detail.email.trim().length < 1) {
      setEmailError("Email is requied");
    } else if (
      !detail.email.match(/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/)
    ) {
      setEmailError("Email fromat not correct");
      isValid = false;
    } else {
      setEmailError("Email not found");
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
            <h1>Wrong password ! </h1>
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
