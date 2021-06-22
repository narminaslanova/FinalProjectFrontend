import React from "react";
import { useState } from "react";
import styled from "styled-components";
import { Link } from "react-router-dom";
import useForm from "../hooks/useForm";
import validateInfo from "../validateinfo";
import FormConfirm from "../components/FormConfirm";

const JoinNow = ({ submitForm }) => {
  const [isSubmitted, setIsSubmitted] = useState(false);
  function submitForm() {
    setIsSubmitted(true);
  }
  const { handleChange, values, handleSubmit, errors } = useForm(
    submitForm,
    validateInfo
  );

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
            id="password2"
            type="password"
            name="password2"
            placeholder="Confirm Password"
            value={values.passowrd2}
            onChange={handleChange}
          />
          {errors.password2 && <p className="error">{errors.password2}</p>}
          <button type="submit" className="join-btn">
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
