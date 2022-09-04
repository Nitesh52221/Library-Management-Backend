const express = require("express");
const { getAllUSers, getSingleUserById, updateUSerById, createNewUser, deleteUser, getSubscriptionDetailById } = require("../controllers/user-controller");

// const { users } = require('../Data/users.json');

const router = express.Router();





/**
 * Routes :/users
 * Method : GET
 * Description: Getting all the users.
 * Access: Public
 * Parameters: none
 */
router.get("/", getAllUSers);

/**
 * Route: /users/:id
 * Method: GET
 * Description: Get single user by id
 * Access: Public
 * Parameters: id
 */
router.get("/:id", getSingleUserById);

/**
 * Routes : /users
 * Method : POST
 * Description: Creating new user.
 * Access: Public
 * Parameters: none
 */

router.post("/", createNewUser);

/**
 * Route: /users/:id
 * Method: PUT
 * Description: Updating user data
 * Access: Public
 * Parameters: id
 */
router.put("/:id", updateUSerById);

/**
* Route: /users/:id
* Method: DELETE
* Description: DEleting user data
* Access: Public
* Parameters: id
*/
router.delete('/:id', deleteUser);

/**
 * Route : /users/subscription-details/:id
 * method : GET 
 * Description : Get all the user subscription details
 * Access : Public
 * Parameters id
 */

router.get("/subscription-details/:id", getSubscriptionDetailById);



module.exports = router;
