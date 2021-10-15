import React, { useState, useEffect } from "react";
import "./SignUp.css";
import axios from "axios";

function SignUp({}) {
  const [detail, setDetail] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
    creatAt: "",
  });
  //api test
  const [response, setResponse] = useState([]);

  const [nameError, setNameError] = useState("");
  const [emailError, setEmailError] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const [confirmPasswordError, setConfirmPasswordError] = useState("");
  const [isClickSubmit, setIsClickSubmit] = useState(false);
  const [isEmailExists, setIsEmailExists] = useState(false);


  const submitHandler = (e) => {
    e.preventDefault();
    const isValid = formValidation();
    setIsClickSubmit(isValid);
  };




  useEffect(() => {
    localStorage.setItem("loginStatus", JSON.stringify(false));
  }, []);

  // when pass validation then got to set create date

  useEffect(() => {
    if (isClickSubmit && formValidation()) {
      axios
      .post("http://localhost:5001/user/signUp", detail)
      .then((response) => setResponse(response.data));
    }
    
  }, [isClickSubmit]);

  useEffect(() => {
    if (isClickSubmit && formValidation()) {
      console.log(response);
      if (response == "Emial is exists, Please contact admin") {
        setIsEmailExists(true)
        // console.log("WWWW");
      }
    }
  }, [response]);
  
  // all validation functions
  const formValidation = () => {
    var isValid = "true";
    if (detail.name.trim().length < 1) {
      setNameError("Name is requied");
      isValid = false;
    } else {
      setNameError("");
    }

    if (detail.email.trim().length < 1) {
      setEmailError("Email is requied");
    } else if (
      !detail.email.match(/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/)
    ) {
      setEmailError("Email fromat not correct");
      isValid = false;
    } else {
      setEmailError("");
    }
    if (detail.password.trim().length < 1) {
      setPasswordError("Password is requied");
      isValid = false;
    } 
    // else if (
    //   !detail.password.match(
    //     /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{6,}$/

    //     // !detail.password.match(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{6,}$/
    //   )
    // ) {
    //   setPasswordError(
    //     "Password at least 6, include Upcase, lower case and one special character(@$!%*#?&)"
    //   );
    //   console.log(detail.password);
    //   isValid = false;
    // } 
    else {
      setPasswordError("");
    }

    if (detail.confirmPassword.trim().length < 1) {
      setConfirmPasswordError("Confirm Password is requied");
      isValid = false;
    } else if (detail.password !== detail.confirmPassword) {
      setConfirmPasswordError("The password confimation does not match");
      console.log(detail.confirmPassword);

      isValid = false;
    } else {
      setConfirmPasswordError("");
    }

    return isValid;
  };

  

  return (
    <div>
      <div className="myForm">
        {!isClickSubmit ? (
          <form onSubmit={submitHandler}>
            <h2>Sign Up Form</h2>
            <div className="form-group">
              <label htmlFor="name">Name: </label>
              <input
                type="text"
                name="name"
                id="name"
                onChange={(e) => {
                  setDetail({ ...detail, name: e.target.value });
                }}
              />
            </div>
            <div className="errorMessage">{nameError}</div>
            <br />

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
            <div className="errorMessage">{passwordError}</div>
            <br />

            <div className="form-group">
              <label htmlFor="confirmPassword">Confirm Password: </label>
              <input
                type="password"
                name="confirmPassword"
                id="confirmPassword"
                onChange={(e) =>
                  setDetail({ ...detail, confirmPassword: e.target.value })
                }
              />
            </div>
            <div className="errorMessage">{confirmPasswordError}</div>
            <br />
            <button type="submit" className="btn">
              {" "}
              SUBMIT{" "}
            </button>
          
          </form>
        ) : null}
      </div>
      <div>
        {isClickSubmit && !isEmailExists ? (
          <div>
            <h1>Sign up successful </h1>
            <a href="signIn">
              <button className="btn">Go to Sign In page</button>
            </a>
          </div>
        ) : null}
      </div>
      <div>
        {isClickSubmit && isEmailExists ? (
          <div>
            <h1>Emial is exists, Please contact admin </h1>
            <a href="signUp">
              <button className="btn">Back to sign up page</button>
            </a>
          </div>
        ) : null}
      </div>
      
    </div>
  );
}

export default SignUp;
