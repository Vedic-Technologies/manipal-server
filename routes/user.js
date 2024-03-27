const express = require("express")
const {
    GetAllUsers,
    GetUserById,
    UpdateUserById,
    deleteUserById,
    CreateNewUser,
    ValidateUserLogin
} = require('../controllers/user')

const router = express.Router();

router.route("/")
    .get(GetAllUsers)

router.route("/signup")
    .post(CreateNewUser)

router.route("/login")
    .post(ValidateUserLogin)


router
    .route("/:id")
    .get(GetUserById)
    .patch(UpdateUserById)
    .delete(deleteUserById)


module.exports = router;