import React, { useState } from "react";
import SignUpPopUp from "./SignUpPopUp";

const SignUp = ({ signedIn, receiveUser }) => {
  const [showPopUp, setShowPopUp] = useState(false);
  const onSignUpClick = () => {
    setShowPopUp(true);
  };

  return (
    <div>
      <button onClick={() => onSignUpClick()}>Sign Up</button>
      {showPopUp && (
        <SignUpPopUp
          showPopUp={setShowPopUp}
          signedIn={signedIn}
          receiveUser={receiveUser}
        />
      )}
    </div>
  );
};

export default SignUp;
