import React from "react";
import { useState } from "react";
import styled from "styled-components";
import { Link, useHistory } from "react-router-dom";
import useForm from "../hooks/useForm";
import validateInfo from "../validateinfo";
import FormConfirm from "../components/FormConfirm";
import axios from "axios";
import { Redirect } from "react-router";

const JoinNow = ({submitForm}) => {
  const [redirect, setRedirect] = useState(false);
  const history = useHistory();
  const [isSubmitted, setIsSubmitted] = useState(false);
  
  const { handleChange, values, handleSubmit, errors } = useForm(
    submitForm,
    validateInfo
  );
  function submitForm() {
    setIsSubmitted(true);
  }
  
   const signUp = async () => {
     await axios.post("https://localhost:44331/api/Authenticate/register", {
       ...values,
     });

     setRedirect(true);
   };

   if (redirect) {
     return <Redirect to="/" />;
   }

  return !isSubmitted ? (
    <Container submitForm={submitForm}>
      <a href="/">
        <img
          src="/images/linkedin.png"
          style={{ width: "135px", height: "34px" }}
          alt=""
        />
      </a>
      <h4>Make the most of your professional life</h4>
      <div className="item">
        <form className="join-form" onSubmit={handleSubmit}>
          <input
            id="firstName"
            type="text"
            name="firstName"
            placeholder="First Name"
            value={values.firstName}
            onChange={handleChange}
          />
          {errors.firstName && <p className="error">{errors.firstName}</p>}
          <input
            id="lastName"
            type="text"
            name="lastName"
            placeholder="Last Name"
            value={values.lastName}
            onChange={handleChange}
          />
          {errors.lastName && <p className="error">{errors.lastName}</p>}
          <input
            id="birthDay"
            type="date"
            name="birthDay"
            placeholder="BirthDay"
            value={values.birthDay}
            onChange={handleChange}
          />
          {errors.birthDay && <p className="error">{errors.birthDay}</p>}
          <input
            id="email"
            type="email"
            name="email"
            placeholder="Email"
            value={values.email}
            onChange={handleChange}
          />
          {errors.email && <p className="error">{errors.email}</p>}
          <input
            id="password"
            type="password"
            name="password"
            placeholder="Password"
            value={values.password}
            onChange={handleChange}
          />
          {errors.password && <p className="error">{errors.password}</p>}
          <input
            id="confirmPassword"
            type="password"
            name="confirmPassword"
            placeholder="Confirm Password"
            value={values.confirmPassword}
            onChange={handleChange}
          />
          {errors.confirmPassword && (
            <p className="error">{errors.confirmPassword}</p>
          )}
          <button type="submit" className="join-btn" onClick={signUp}>
            Agree & Join
          </button>
          <p>
            By clicking Agree & Join, you agree to the LinkedIn User Agreement,
            Privacy Policy, and Cookie Policy.
          </p>
          <button type="button" className="google">
            <img src="/images/google.svg" alt="" />
            Join with google
          </button>
        </form>
        <h6>
          Already on LinkedIn?<Link to="/signIn">Sign in</Link>
        </h6>
      </div>
    </Container>
  ) : (
    <FormConfirm />
  );
};

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  width: 100%;
  height: 100%;
  text-align: center;
  a {
    width: 135px;
    height: 34px;
  }
  h4 {
    padding-top: 10px;
    font-size: 2rem;
    line-height: 1.25;
    font-weight: 400;
    margin-bottom: -15px;
  }
`;

export default JoinNow;
