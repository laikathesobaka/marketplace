// userfindorcreate
const pool = require("../dbConfig").pool;

const bcrypt = require("bcrypt");
const saltRounds = 10;

const hashPassword = async (password) => {
  return await bcrypt.hash(password, saltRounds);
};

const comparePassword = async (password, hash) => {
  return await bcrypt.compare(password, hash);
};

const userPurchasesQuery = `
  SELECT
    users.first_name,
    users.last_name,
    users.email,
    users.address,
    products.id product_id,
    products.unit_cost,
    products.name product_name,
    amount,
    subscription,
    purchase_date
  FROM
    users
  INNER JOIN purchases ON purchases.user_id = users.id
  INNER JOIN products ON purchases.product_id = products.id
  ;
`;

async function authenticateUser(email, password) {
  console.log("EMAIL ", email);
  let queryRes;
  const query = {
    text: "SELECT * FROM USERS WHERE email = $1",
    values: [email],
  };
  try {
    queryRes = await pool.query(query);
    console.log("AUTH USER QUERY RES ------ ", queryRes);
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
    insertedUser = await pool.query(query);
  } catch (err) {
    console.log(err.stack);
  }
  return insertedUser.rows[0];
}

async function updateUserContact(userID, address, phoneNumber) {
  const query = {
    text:
      "UPDATE users SET address = $1, phone_number = $2 WHERE user_id = $3;",
    values: [address, phoneNumber, userID],
  };
  try {
    await pool.query();
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
    user = await pool.query(query);
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
    user = await pool.query(query);
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
};
