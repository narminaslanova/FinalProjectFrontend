import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { Link, useHistory } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { userActions } from "../actions/userActions";


const Login = (props) => {
  let history = useHistory();
  const [logged, setLogged] = useState(false);
  const [values, setValues] = useState({ email: "", password: "" });
  const { email, password } = values;
  const user = useSelector((state) => state.authentication);
  const dispatch = useDispatch();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setValues({
      ...values,
      [name]: value,
    });
  };

  useEffect(() => {
    if (user.loggedIn) {
      history.push("/home");
    }
  }, [user]);

  const submit = (e) => {
    e.preventDefault();
    if (email && password) {
      dispatch(userActions.login(email, password));
      setLogged(true);
    }
  };

  return (
    <>
      <Container>
        <Nav>
          <a href="/">
            <img
              src="/images/linkedin.png"
              style={{ width: "135px", height: "33.75px" }}
              alt=""
            />
          </a>
          <div>
            <Link to="/signup" style={{ textDecoration: "none" }}>
              <Join>Join now</Join>
            </Link>
            <SignIn>Sign in</SignIn>
          </div>
        </Nav>
        <Section>
          <Hero>
            <h1>Welcome to your professional community</h1>
            <img src="/images/login-hero2.svg" alt="" />
          </Hero>
          <Form>
            <LoginForm>
              <form onSubmit={submit}>
                <input
                  type="email"
                  placeholder="Email"
                  id="email"
                  name="email"
                  value={values.email}
                  onChange={handleChange}
                />
                <input
                  type="password"
                  placeholder="Password"
                  id="password"
                  name="password"
                  value={values.password}
                  onChange={handleChange}
                />
                <LoginButton type="submit">Log In</LoginButton>
              </form>
            </LoginForm>
            <Google onClick={() => props.signIn()}>
              <img src="/images/google.svg" alt="" />
              Sign in with google
            </Google>
          </Form>
        </Section>
      </Container>
    </>
  );
};

const Container = styled.div`
  padding: 0px;
`;

const Nav = styled.nav`
  max-width: 1128px;
  margin: auto;
  padding: 12px 0 16px;
  display: flex;
  align-items: center;
  position: relative;
  justify-content: space-between;
  flex-wrap: nowrap;

  & > a {
    width: 135px;
    height: 34px;
    @media (max-width: 768px) {
      padding: 0 5px;
    }
  }
`;

const Join = styled.a`
  font-size: 16px;
  padding: 10px 12px;
  text-decoration: none;
  border-radius: 4px;
  color: rgba(0, 0, 0, 0.6);
  margin-right: 12px;
  &:hover {
    background-color: rgba(0, 0, 0, 0.08);
    color: rgba(0, 0, 0, 0.9);
    text-decoration: none;
    cursor: pointer;
  }
`;

const SignIn = styled.a`
  box-shadow: inset 0 0 0 1px #0a66c2;
  color: #0a66c2;
  border-radius: 24px;
  transition-duration: 167ms;
  font-size: 16px;
  font-weight: 600;
  line-height: 40px;
  padding: 10px 24px;
  text-align: center;
  background-color: rgba(0, 0, 0, 0);
  &:hover {
    background-color: rgba(112, 181, 249, 0.15);
    color: #0a66c2;
    text-decoration: none;
    cursor: pointer;
  }
`;

const Section = styled.section`
  display: flex;
  align-content: start;
  min-height: 700px;
  padding-bottom: 140px;
  padding-top: 40px;
  padding: 60px 0;
  position: relative;
  flex-wrap: wrap;
  width: 100%;
  max-width: 1128px;
  align-items: center;
  margin: auto;
  @media (max-width: 768px) {
    margin: auto;
    min-height: 0px;
  }
`;

const Hero = styled.div`
  width: 100%;
  h1 {
    padding-bottom: 0;
    width: 55%;
    font-size: 56px;
    color: #2977c9;
    font-weight: 200;
    line-height: 70px;
    @media (max-width: 768px) {
      text-align: center;
      font-size: 20px;
      width: 100%;
      line-height: 2;
    }
  }

  img {
    //z-index: -1;
    width: 700px;
    height: 670px;
    position: absolute;
    top: 0px;
    bottom: -2px;
    right: -150px;
    @media (max-width: 768px) {
      top: 50px;
      width: 100%;
      position: initial;
      height: initial;
    }
  }
`;

const Form = styled.div`
  margin-top: 100px;
  width: 400px;
  @media (max-width: 768px) {
    margin-top: 70px;
  }
`;

const Google = styled.button`
  border: 2px solid grey;
  cursor: pointer;
  display: flex;
  justify-content: center;
  background-color: #fff;
  align-items: center;
  height: 56px;
  width: 100%;
  border-radius: 28px;
  vertical-align: middle;
  box-shadow: inset 0 0 0 1px rgb(0 0 0 / 60%),
    inset 0 0 0 2px rgb(0 0 0 / 0%) inset 0 0 0 1px rgb(0 0 0 / 0);
  z-index: 0;
  transition-duration: 167ms;
  font-size: 20px;
  color: rgba(0, 0, 0, 0.6);
  &:hover {
    background-color: rgba(207, 207, 207, 0.25);
    color: rgba(0, 0, 0, 0.75);
  }
`;

const LoginForm = styled.div`
  margin-top: -20%;
  input {
    display: flex;
    height: 100%;
    width: 100%;
    border-radius: 3px;
    padding: 12px 20px;
    margin: 8px 0;
    box-sizing: border-box;
    border: 2px solid #ccc;
    -webkit-transition: 0.5s;
    transition: 0.5s;
    outline: none;
    border-radius: 5px;
  }
`;
const LoginButton = styled.button`
  margin: 20px 0px;
  border: 2px solid #2977c9;
  cursor: pointer;
  display: flex;
  justify-content: center;
  background-color: #2977c9;
  align-items: center;
  height: 56px;
  width: 100%;
  border-radius: 28px;
  vertical-align: middle;
  box-shadow: inset 0 0 0 1px rgb(0 0 0 / 60%),
    inset 0 0 0 2px rgb(0 0 0 / 0%) inset 0 0 0 1px rgb(0 0 0 / 0);
  z-index: 0;
  transition-duration: 167ms;
  font-size: 20px;
  color: white;
  &:hover {
    background-color: white;
    color: #2977c9;
  }
`;

export default Login;
