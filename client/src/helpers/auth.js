export const checkSignedIn = async () => {
  const res = await fetch("/authenticated");
  const user = await res.json();
  return user;
};
