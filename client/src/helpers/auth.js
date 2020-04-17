export const checkSignedIn = async () => {
  const res = await fetch("/authenticated");
  const user = await res.json();
  console.log("CHECK SIGNED IN USER RES ", user);
  //   let preloadedState = {};
  //   if (user) {
  //     preloadedState = {
  //       user,
  //     };
  //   }
  return user;
};
