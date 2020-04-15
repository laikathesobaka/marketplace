import React, { useState } from "react";
import { Link } from "@reach/router";
import SignInPopUp from "./SignInPopUp";

const SignIn = ({ signedIn, receiveUser }) => {
  const [showForm, setShowForm] = useState(false);
  const onSignInClick = async () => {
    setShowForm(true);
  };
  return (
    <div>
      <button onClick={() => onSignInClick()}>Sign In</button>
      {showForm && (
        <SignInPopUp
          showPopUp={setShowForm}
          signedIn={signedIn}
          receiveUser={receiveUser}
        />
      )}
    </div>
  );
};

export default SignIn;
