const express = require("express");

const { users } = require('../Data/users.json');

const router = express.Router();





/**
 * Routes :/users
 * Method : GET
 * Description: Getting all the users.
 * Access: Public
 * Parameters: none
 */
router.get("/", (req, res) => {
    res.status(200).json({
        success: true,
        data: users,
    })
});

/**
 * Route: /users/:id
 * Method: GET
 * Description: Get single user by id
 * Access: Public
 * Parameters: id
 */
router.get("/:id", (req, res) => {
    const { id } = req.params;
    const user = users.find((each) => each.id === id);
    if (!user) {
        return res.status(404).json({
            success: false,
            message: "User Not found",
        });
    }
    return res.status(200).json({
        success: true,
        data: user,
    })
});

/**
 * Routes : http://localhost:8000/users
 * Method : POSt
 * Description: Creating new user.
 * Access: Public
 * Parameters: none
 */

router.post("/", (req, res) => {
    const { id, name, surname, email, issuedBook, issuedDate, returnDate, subscriptionType, subscriptionDate } = req.body;

    const user = users.find((each) => each.id === id);
    if (user) {
        return res.status(404).json({
            success: false,
            message: "User Exsist with this id."
        });
    };
    users.push({
        id,
        name,
        surname,
        email,
        issuedBook,
        issuedDate,
        returnDate,
        subscriptionType,
        subscriptionDate,
    });
    return res.status(201).json({
        success: true,
        data: users,
    });
});

/**
 * Route: /users/:id
 * Method: PUT
 * Description: Updating user data
 * Access: Public
 * Parameters: id
 */
router.put("/:id", (req, res) => {
    const { id } = req.params;
    const { data } = req.body;

    const user = users.find((each) => each.id === id);

    if (!user)
        return res.status(404).json({ success: false, message: "User not found" });

    const updatedUser = users.map((each) => {
        if (each.id === id) {
            return {
                ...each,
                ...data,
            };
        }
        return each;
    });


    return res.status(200).json({
        success: true,

        data: updatedUser,
    });
});


/**
* Route: /users/:id
* Method: DELETE
* Description: DEleting user data
* Access: Public
* Parameters: id
*/
router.delete('/:id', (req, res) => {
    const { id } = req.params;
    const user = users.find((each) => each.id == id);


    if (!user) {
        return res.status(404).json({
            success: false,
            message: "user to be deleted not found",
        });
    }

    const index = users.indexOf(user);
    users.splice(index, 1);

    return res.status(200).json({
        success: true,
        data: users,
    });
});

/**
 * Route : /users/subscription-details/:id
 * method : GET 
 * Description : Get all the user subscription details
 * Access : Public
 * Parameters id
 */

router.get("/subscription-details/:id", (req, res) => {
    const { id } = req.params;

    const user = users.find((each) => each.id === id);
    if (!user)
        return res.status(404).json({
            success: false,
            message: "user not found",

        });

    const getDateInDays = (data = "") => {
        let date;
        if (data === "") {
            // current Date 
            date = new Date();

        }
        else {
            // getting date on the basis of given data variable
            date = new Date(data);
        }
        let days = Math.floor(date / (1000 * 60 * 60 * 24));
        return days;

    };

    const subscriptionEnd = (date) => {
        if (user.subscriptionType === "Basic") {
            date += 90;
        }
        else if (user.subscriptionType === "Standard") {
            date = date + 180;

        }
        else if (user.subscriptionType === "Premium") {
            date += 365;
        }
        return date;
    };


    //    subscription Expiration Calculation 
    let returnDate = getDateInDays(user.returnDate);
    let currentDate = getDateInDays();
    let subscriptionDate = getDateInDays(user.subscriptionDate);
    let subscriptionExpiration = subscriptionEnd(subscriptionDate);


    console.log("Return Date ", returnDate);
    console.log("Current Date ", currentDate);
    console.log("Subscription Date ", subscriptionDate);
    console.log("Subscription expiry date", subscriptionExpiration);

    const data = {
        ...user,
        subscriptionExpired: subscriptionExpiration < currentDate,
        daysLeftForExpiration:
            subscriptionExpiration <= currentDate
                ? 0
                : subscriptionExpiration - currentDate,
        fine:
            returnDate < currentDate
                ? subscriptionExpiration <= currentDate
                    ? 200
                    : 100
                : 0,
    };

    res.status(200).json({
        success: true,
        data,
    });
});



module.exports = router;
