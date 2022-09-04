const { UserModel, BookModel } = require("../models")

exports.getAllUSers = async (req, res) => {
    const users = await UserModel.find();
    console.log(users)
    if (users.length === 0) {
        return res.status(404).json({
            success: false,
            message: "No users Found",
        });
    }

    res.status(200).json({
        success: true,
        data: users,
    })
};

exports.getSingleUserById = async (req, res) => {
    const { id } = req.params;
    const user = await UserModel.findById({ _id: id });
    if (!user) {
        return res.status(404).json({
            success: false,
            message: "User Not found",
        });
    }
    return res.status(200).json({
        success: true,
        data: user,
    });
};

exports.createNewUser = async (req, res) => {
    const { data } = req.body;
    console.log(data);
    const newUser = await UserModel.create(data);

    return res.status(201).json({
        success: true,
        data: newUser,
    });
};


exports.updateUSerById = async (req, res) => {
    const { id } = req.params;
    const { data } = req.body;

    const updatedUserData = await UserModel.findOneAndUpdate(
        { _id: id }, { $set: { ...data, }, }, { new: true, }
    );

    return res.status(200).json({
        success: true,
        data: updatedUserData,
    });
};


exports.deleteUser = async (req, res) => {
    const { id } = req.params;
    const user = await UserModel.deleteOne({
        _id: id,
    });

    if (!user) {
        return res.status(404).json({
            success: false,
            message: "User to be deleted not Found",
        });
    }

    return res.status(200).json({
        success: true,
        data: user,
    });
};


exports.getSubscriptionDetailById = async (req, res) => {
    const { id } = req.params;

    const user = await UserModel.findById(id);
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
        ...user._doc,
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
    console.log(data)

    res.status(200).json({
        success: true,
        data,
    });
}