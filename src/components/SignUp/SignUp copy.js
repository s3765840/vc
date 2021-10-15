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
  const [usersList, setUsersList] = useState([]);
  //api test
  const [totalReactPackages, setTotalReactPackages] = useState([]);
  const [articleId, setArticleId] = useState([]);
// api test end 
  const [nameError, setNameError] = useState("");
  const [emailError, setEmailError] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const [confirmPasswordError, setConfirmPasswordError] = useState("");
  const [isClickSubmit, setIsClickSubmit] = useState(false);
  const [isEmailExists, setIsEmailExists] = useState(false);
  const [isLocalStorageEmpty, setIsLocalStorageEmpty] = useState(true);

  const submitHandler = (e) => {
    e.preventDefault();
    const isValid = formValidation();
    setIsClickSubmit(isValid);
    setIsLocalStorageEmpty(true);
    setIsEmailExists(false);
  };

  const test1 = () => {
    console.log(totalReactPackages);
    console.log("Ccc");
  };
  const test2 = () => {
    console.log("TEST 2");
    console.log(articleId);

  };
  useEffect(() => {
    // GET request using axios inside useEffect React hook
    // axios
    //   .get("http://localhost:5001/test")
    //   .then((response) => setTotalReactPackages(response.data))
    //   .then(console.log("test1"));

    const article = { title: "React Hooks POST Request Example" };
    axios
      .post("http://localhost:5001/user", article)
      .then((response) => setArticleId(response.data));
      // .post("https://reqres.in/api/articles", article)
      // .then((response) => setArticleId(response.data.id));

    // setTimeout(() => {

    // }, 550);
    // empty dependency array means this effect will only run once (like componentDidMount in classes)
  }, []);

  useEffect(() => {
    localStorage.setItem("loginStatus", JSON.stringify(false));
  }, []);

  // when pass validation then got to set create date

  useEffect(() => {
    if (isClickSubmit) {
      console.log("ddddd");
      addDate();
    }
  }, [isClickSubmit]);
  // After detail.createDate updated, find or creat localStorage.
  useEffect(() => {
    if (isClickSubmit) {
      creatOrFindStorage();
      console.log("rrr");
    }
  }, [detail.creatAt]);
  useEffect(() => {
    if (isClickSubmit) {
      updateStorage();
    }
  }, [usersList]);

  useEffect(() => {
    if (isClickSubmit) {
    }
  }, [isEmailExists]);

  const addDate = () => {
    const today = Date.now();
    setDetail({
      ...detail,
      creatAt: new Intl.DateTimeFormat("en-US", {
        year: "numeric",
        month: "2-digit",
        day: "2-digit",
      }).format(today),
    });
  };
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
    } else if (
      !detail.password.match(
        /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{6,}$/

        // !detail.password.match(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{6,}$/
      )
    ) {
      setPasswordError(
        "Password at least 6, include Upcase, lower case and one special character(@$!%*#?&)"
      );
      console.log(detail.password);
      isValid = false;
    } else {
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

  const creatOrFindStorage = () => {
    if ("usersList" in localStorage) {
      setUsersList(JSON.parse(localStorage.getItem("usersList")));
      setIsLocalStorageEmpty(false);
    } else {
      setUsersList(usersList.concat(detail));
    }
  };
  function checkAvailability(arr, val) {
    return arr.some(function (arrVal) {
      return val === arrVal;
    });
  }
  // update usersList to localStorage
  const updateStorage = () => {
    if (isLocalStorageEmpty) {
      console.log(usersList);
      localStorage.setItem("usersList", JSON.stringify(usersList));
    } else {
      var data = JSON.parse(localStorage.getItem("usersList"));
      var updateData = [];
      data.forEach((item) => {
        updateData.push(item.email);
      });

      var isMatch = checkAvailability(updateData, detail.email);
      setIsEmailExists(isMatch);
      if (isMatch === false) {
        var updateData2 = [];
        data.forEach((item) => {
          updateData2.push(item);
        });
        updateData2.push(detail);
        localStorage.setItem("usersList", JSON.stringify(updateData2));
      }
    }
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
            <button className="btn" onClick={test1}>
              {" "}
              Test get{" "}
            </button>
            <button className="btn" onClick={test2}>
              {" "}
              Test post{" "}
            </button>
            {/* <h1>{detail.password}</h1> */}
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
