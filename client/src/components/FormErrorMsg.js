import React from "react";
import styled from "styled-components";

const FormErrorMsg = ({ message }) => {
  return <Message>{message}</Message>;
};

export default FormErrorMsg;

const Message = styled.div`
  font-size: 10px;
  color: red;
`;
