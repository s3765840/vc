import React, { useState, useEffect } from "react";
import "./Profile.css";
import { BsFillTrashFill } from "react-icons/bs";
import { BsFillPersonFill } from "react-icons/bs";
import { BsBrush } from "react-icons/bs";

function Profile() {
  const [detail, setDetail] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
    creatAt: "",
  });
  const [editFrom, setEditFrom] = useState({
    name: "",
    password: "",
    confirmPassword: "",
  });
  const [edit, setEdit] = useState(false);
  const [usersList, setUsersList] = useState([]);
  const [nameError, setNameError] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const [confirmPasswordError, setConfirmPasswordError] = useState("");
  const [isClickSubmit, setIsClickSubmit] = useState(false);
  // find index of user in users list
  const [position, setPosition] = useState(0);
  //display Edit sucessly div
  const [display1, setDisplay1] = useState();
  // disaplay Delete and Delete cancel
  const [display2, setDisplay2] = useState();
  // disaplay EditForm
  const [display3, setDisplay3] = useState();
  // disaplay Profile
  const [display4, setDisplay4] = useState({ display: "block" });
  // back to home page visual cue
  const [display5, setDisplay5] = useState({ display: "none" });
  useEffect(() => {
    setDetail(JSON.parse(localStorage.getItem("userInfo")));
  }, []);

  // disaplay EditForm
  const editInfo = () => {
    setDisplay3({ display: "block" });
    setDisplay4({ display: "none" });
  };
  // disaplay EditForm

  const cancelEdit = () => {
    setDisplay3({ display: "none" });
    setDisplay4({ display: "block" });
  };
  useEffect(() => {}, [edit]);

  useEffect(() => {
    if (isClickSubmit) {
      console.log("EF called");
      getAllDate();
    }
  }, [isClickSubmit]);
  useEffect(() => {
    isMatch();
  }, [usersList]);
  useEffect(() => {
    if (isClickSubmit) {
      changeData();
    }
  }, [position]);

  const submitHandler = (e) => {
    e.preventDefault();
    const isValid = formValidation();
    setIsClickSubmit(isValid);
  };

  const getAllDate = () => {
    setUsersList(JSON.parse(localStorage.getItem("usersList")));
  };
  const isMatch = () => {
    console.log("match is working");

    console.log(usersList);
    console.log(position);
    for (let i = 0; i < usersList.length; i++) {
      if (usersList[i].email == detail.email) {
        console.log("position is working");

        setPosition(i + 1);
      } else {
        console.log("position ending");
      }
    }
  };

  const changeData = () => {
    console.log(usersList);
    const temArray = [];
    for (let j = 0; j < usersList.length; j++) {
      if (j != position - 1) {
        temArray.push(usersList[j]);
      } else {
        const a = {
          name: editFrom.name,
          email: usersList[j].email,
          password: editFrom.password,
          confirmPassword: editFrom.password,
          creatAt: usersList[j].creatAt,
        };
        temArray.push(a);

        localStorage.setItem("userInfo", JSON.stringify(a));
      }
      localStorage.setItem("usersList", JSON.stringify(temArray));
      setDetail(JSON.parse(localStorage.getItem("userInfo")));

      setDisplay1({ display: "block" });
      setTimeout(() => {
        setDisplay4({ display: "block" });
      }, 2000);
      setDisplay3({ display: "none" });

      setTimeout(() => {
        setDisplay1({ display: "none" });
      }, 2000);
    }
  };

  const deletUser = () => {
    setDisplay4({ display: "none" });
    setDisplay2({ display: "block" });
    getAllDate();
  };
  const cancel = () => {
    setDisplay2({ display: "none" });
    setDisplay4({ display: "block" });
  };
  const confirmDelet = () => {
    deletUserLocalStorage();
    setDisplay2({ display: "none" });
  };

  const deletUserLocalStorage = () => {
    const temArray = [];
    for (let k = 0; k < usersList.length; k++) {
      if (k != position - 1) {
        temArray.push(usersList[k]);
      }
      const a = temArray;
      localStorage.setItem("usersList", JSON.stringify(a));
      localStorage.setItem("loginStatus", JSON.stringify(false));
      localStorage.removeItem("userInfo");
      setDisplay5({ display: "block" });

      setTimeout(() => {
        window.location.href = "/";
      }, 1500);
    }
  };

  const formValidation = () => {
    const nameError = "";
    const passwordError = "";
    const confirmPasswordError = "";

    var isValid = "true";
    if (editFrom.name.trim().length < 1) {
      setNameError("Name is requied");
      isValid = false;
    } else {
      setNameError("");
    }
    if (editFrom.password.trim().length < 1) {
      setPasswordError("Password is requied");
      isValid = false;
    } else if (
      // !editFrom.password.match(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{6,}$/
      !editFrom.password.match(/^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{6,}$/

      )
    ) {
      setPasswordError("Password at least 6, include Upcase, lower case and one special character(@$!%*#?&)");
      isValid = false;
    }  else {
      setPasswordError("");
    }
    if (editFrom.confirmPassword.trim().length < 1) {
      setConfirmPasswordError("Confirm Password is requied");
      isValid = false;
    } else if (editFrom.password != editFrom.confirmPassword) {
      setConfirmPasswordError("The password confimation does not match");
      isValid = false;
    } else {
      setConfirmPasswordError("");
    }

    if (editFrom.confirmPassword.trim().length < 1) {
      setConfirmPasswordError("Confirm Password is requied");
      isValid = false;
    } else if (editFrom.password != editFrom.confirmPassword) {
      setConfirmPasswordError("The password confimation does not match");
      isValid = false;
    } else {
      setConfirmPasswordError("");
    }

    return isValid;
  };
  return (
    <div>
      <div className="div1">
        <h1>Profile</h1>
        <div style={display4} className="test1">
          <div className="persionInfo1">
            <div className="photo">
              <BsFillPersonFill color="gray" size="6rem" />
            </div>
            <div className="detail">
              <h2>{detail.name}</h2>

              <p>{detail.email}</p>
              <p>
                <b>Joined: </b>
                {detail.creatAt}
              </p>
            </div>
          </div>
          <div className="persionInfo2">
            <div className="icons">
              <BsBrush
                className="icon"
                onClick={editInfo}
                color="black"
                size="2rem"
              />
              <BsFillTrashFill onClick={deletUser} color="black" size="2rem" />
            </div>
          </div>
        </div>
        <br />
        <br />
        <br />
        <br />
        <div>
          <div className="myForm">
            <form
              onSubmit={submitHandler}
              className="editForm"
              style={display3}
            >
              <div className="form-inner"></div>
              <h2>Edit profile</h2>
              <label htmlFor="name">Name: </label>
              <input
                type="text"
                name="name"
                id="name"
                onChange={(e) => {
                  setEditFrom({ ...editFrom, name: e.target.value });
                }}
              />
              <div className="errorMessage">{nameError}</div>
              <br />

              <div className="form-group">
                <label htmlFor="password">Password: </label>
                <input
                  type="password"
                  name="password"
                  id="password"
                  onChange={(e) =>
                    setEditFrom({ ...editFrom, password: e.target.value })
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
                    setEditFrom({
                      ...editFrom,
                      confirmPassword: e.target.value,
                    })
                  }
                />
              </div>
              <div className="errorMessage">{confirmPasswordError}</div>
              <br />

              <button className="btn1" type="submit">
                SUBMIT
              </button>
              <button className="btn1" onClick={cancelEdit}>
                CANCEL
              </button>
            </form>
          </div>

          <div className="editSucess" id="edit" style={display1}>
            <h1>Edit sucessful </h1>
          </div>

          <div className="delete" id="delet" style={display2}>
            <button className="btn1" onClick={cancel}>
              CANCEL
            </button>
            <button className="btn1" onClick={confirmDelet}>
              CONFIRM
            </button>
          </div>

          <div className="backToHomePage" style={display5}>
            <h1>You delete sucessful!</h1>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Profile;
