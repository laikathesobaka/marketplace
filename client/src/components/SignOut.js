import React from "react";

const SignOut = ({ signedIn, removeUser }) => {
  const onSignOutClick = async () => {
    try {
      await fetch("/signout");
    } catch (err) {
      throw err;
    }
    signedIn(false);
    removeUser();
  };
  return <button onClick={() => onSignOutClick()}>Sign Out</button>;
};

export default SignOut;
