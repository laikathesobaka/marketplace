import React from "react";
import styled from "styled-components";

export default function Image() {
  return (
    <Img src="https://previews.123rf.com/images/lineartestpilot/lineartestpilot1802/lineartestpilot180283523/95654927-a-cartoon-garlic-bulb-isolated-on-white-background.jpg" />
  );
}

const Img = styled.img`
  width: 400px;
`;
