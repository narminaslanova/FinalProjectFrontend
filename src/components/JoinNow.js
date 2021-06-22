import React from "react";
import styled from "styled-components";
import { Link } from "react-router-dom";

const JoinNow = () => {
  return (
    <Container>
      <a href="/">
        <img
          src="/images/linkedin.png"
          style={{ width: "135px", height: "34px" }}
          alt=""
        />
      </a>
      <h4>Make the most of your professional life</h4>
      <div className="item">
        <form className="join-form">
          <input type="text" value="" placeholder="First Name" />
          <input type="text" value="" placeholder="Last Name" />
          <input type="email" value="" placeholder="Email" />
          <input type="password" value="" placeholder="Password" />
          <input type="password" value="" placeholder="Confirm Password" />
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
  }
`;

export default JoinNow;
