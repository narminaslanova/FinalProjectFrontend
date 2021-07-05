import React from "react";
import styled from "styled-components";

function FormConfirm() {
  return (
    <Container>
      <a>
        <img
          src="/images/linkedin.png"
          style={{ width: "135px", height: "34px" }}
          alt=""
        />
      </a>
      <div className="item">
        <h4 className="confirmation">
          Confirmation link has been sent to your email
        </h4>
      </div>
    </Container>
  );
}

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  width: 100%;
  height: 100%;
  text-align: center;
`;
export default FormConfirm;
