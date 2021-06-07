import React, { useState } from "react";
import axios from "axios";
import "./Form.css";
function Form() {
  const [info, setInfo] = useState({
    username: "",
    email: "",
    dob: "",
    agreement: false,
  });
  const [submitted, setSubmitted] = useState(false);

  const handleChange = (e) => {
    setInfo({
      ...info,
      [e.target.name]: e.target.value,
    });
  };
  const handleCheck = (e) => {
    // allows to edit values
    setInfo({ ...info, [e.target.name]: e.target.checked });
  };
  const submitForm = (e) => {
    // submiting form
    e.preventDefault();
    let { username, email, dob, agreement } = info;
    axios
      .post(
        "https://my-json-server.typicode.com/JustUtahCoders/interview-users-api/users",
        { username, email, dob, agreement }
      )
      .then((res) => {
        console.log(res);
        setInfo({
          username: "",
          email: "",
          dob: "",
          agreement: false,
        });
        setSubmitted(true);
      })
      .catch((err) => {
        console.error(err);
      });
  };
  const clearForm = (e) => {
    // clearing forms
    e.preventDefault();
    setInfo({
      username: "",
      email: "",
      dob: "",
      agreement: false,
    });
  };
  return (
    <>
      <div className="form">
        <form onSubmit={submitForm}>
          <h2>Contact Us</h2>
          <label htmlFor="username">
            Name <br />
            <input
              className="input"
              type="text"
              name="username"
              label="username"
              value={info.username}
              required
              onChange={handleChange}
            />
          </label>
          <label htmlFor="email">
            Email
            <br />
            <input
              className="input"
              type="email"
              name="email"
              label="email"
              value={info.email}
              required
              onChange={handleChange}
            />
          </label>{" "}
          <label htmlFor="dob">
            Birth Date
            <br />
            <input
              className="input"
              type="date"
              name="dob"
              label="dob"
              value={info.dob}
              required
              onChange={handleChange}
            />
          </label>
          <label htmlFor="agreement">
            <div className="bottom">
              <input
                className="checkbox"
                type="checkbox"
                name="agreement"
                label="agreement"
                checked={info.agreement}
                required
                onChange={handleCheck}
              />
              I agree to be contacted via email.
            </div>
          </label>
          <div className="buttons">
            <button className="button" onClick={clearForm}>
              Clear
            </button>
            <button className="button" onSubmit={submitForm}>
              Submit
            </button>
          </div>
        </form>
      </div>
      {submitted && <h3>Succeed!!</h3>}
    </>
  );
}

export default Form;
