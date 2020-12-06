// userfindorcreate
const db = require("../db-config");

const bcrypt = require("bcrypt");
const saltRounds = 10;

const hashPassword = async (password) => {
  return await bcrypt.hash(password, saltRounds);
};

const comparePassword = async (password, hash) => {
  return await bcrypt.compare(password, hash);
};

async function authenticateUser(email, password) {
  let queryRes;
  const query = {
    text: "SELECT * FROM USERS WHERE email = $1",
    values: [email],
  };
  try {
    queryRes = await db.query(query);
  } catch (err) {
    console.log(err.stack);
  }
  if (!queryRes.rows.length) {
    return null;
  }
  const passwordHash = queryRes.rows[0].password_hash;
  const compareRes = await comparePassword(password, passwordHash);
  if (!compareRes) {
    return false;
  }
  return queryRes.rows[0];
}

async function findOrCreateGoogleID(googleProfile) {
  let res;
  const query = {
    text: `INSERT INTO users(first_name, last_name, email, google_id) VALUES ($1, $2, $3, $4) ON CONFLICT (email) DO UPDATE SET google_id=${googleProfile.id} RETURNING * ;`,
    values: [
      googleProfile.name.givenName,
      googleProfile.name.familyName,
      googleProfile.emails[0].value,
      googleProfile.id,
    ],
  };
  try {
    res = await db.query(query);
  } catch (err) {
    console.log("Error ocurred inserting google id: ", err.stack);
  }
  return res.rows[0];
}

async function createUser(firstName, lastName, email, password = "") {
  let passwordHash;
  if (password.length) {
    passwordHash = await hashPassword(password);
  }
  const query = {
    text:
      "INSERT INTO users (first_name, last_name, email, password_hash) VALUES ($1, $2, $3, $4) RETURNING *;",
    values: [firstName, lastName, email, passwordHash],
  };
  let insertedUser;
  try {
    insertedUser = await db.query(query);
  } catch (err) {
    console.log(err.stack);
  }
  return insertedUser.rows[0];
}

// TODO: Implement updateUserContact
async function updateUserContact(userID, address, phoneNumber) {
  const query = {
    text:
      "UPDATE users SET address = $1, phone_number = $2 WHERE user_id = $3;",
    values: [address, phoneNumber, userID],
  };
  try {
    await db.query(query);
  } catch (err) {
    console.log(err.stack);
  }
}
async function getUserByID(userID) {
  let user;
  const query = {
    text: "SELECT * FROM users WHERE id = $1;",
    values: [userID],
  };
  try {
    user = await db.query(query);
  } catch (err) {
    console.log(err.stack);
  }
  return user.rows[0];
}

async function getUserByEmail(email) {
  let user;
  const query = {
    text: "SELECT * FROM users WHERE email = $1;",
    values: [email],
  };
  try {
    user = await db.query(query);
  } catch (err) {
    console.log(err.stack);
  }
  return user.rows[0];
}

module.exports = {
  authenticateUser,
  createUser,
  getUserByID,
  getUserByEmail,
  updateUserContact,
  findOrCreateGoogleID,
};
