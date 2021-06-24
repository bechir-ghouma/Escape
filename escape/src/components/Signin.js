// eslint-disable-next-line
import React, { Component, useEffect, useState } from "react";
import axios from "axios";
import { useHistory } from "react-router-dom";

import './auth.css'










function Signin(props) {

  // let history = useHistory();



  // useEffect(() => {
  //   if (props.id !== "") {
  //     history.push("/UserAccount");
  //   }
  // }, [])

  console.log("singin", props)


  const [email, setemail] = useState("");
  const [password, setpassword] = useState("");

  const signin = (e) => {
    e.preventDefault()
    axios
      .post("http://localhost:3001/signin", {
        email,
        password
      })
      .then((res) => {
        console.log("helloooo", res.data.result[0].userID)
        props.setId(res.data.result[0].userID);


      });
  };

  console.log("id here", props.id)

  return (
    <div className='signin'>
      <form>
        <h3>Sign In</h3>

        <div className="form-group">
          <label>Email address</label>
          <input
            type="email"
            className="form-control"
            placeholder="Enter email"
            onChange={(e) => {
              setemail(e.target.value)
            }}
          />
        </div>

        <div className="form-group">
          <label>Password</label>
          <input
            type="password"
            className="form-control"
            placeholder="Enter password"
            onChange={(e) => {
              setpassword(e.target.value)
            }}
          />
        </div>

        <div className="form-group">
          <div className="custom-control custom-checkbox">
            <input
              type="checkbox"
              className="custom-control-input"
              id="customCheck1"
            />
            <label className="custom-control-label" htmlFor="customCheck1">
              Remember me
            </label>
          </div>
        </div>

        <button
          type="submit"
          className="btn btn-primary btn-block"
          onClick={signin}
        >
          Sign In
        </button>
        <p className="forgot-password text-right"></p>
      </form>
      <br />
    </div>

  );
}
export default Signin;
