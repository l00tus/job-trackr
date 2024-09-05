const UserModel = require("../data/users.model");
const { v4: uuidv4 } = require("uuid");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const saltRounds = 10;

const usersService = {
    registerUser: async (userObject) => {
        const existingUserEmail = await UserModel.findOne( {email: userObject.email} );
        const existingUserName = await UserModel.findOne( {username: userObject.username });

        if(existingUserEmail || existingUserName) {
            return null;
        }

        userObject.id = uuidv4();

        const salt = await bcrypt.genSalt(saltRounds);
        const hashedPassword = await bcrypt.hash(userObject.password, salt);

        userObject.password = hashedPassword;
        
        const newUser = new UserModel(userObject);

        try {
            return await newUser.save();
        } catch (error) {
            throw error;
        }
    },
    loginUser: async (userObject) => {
        const user = await UserModel.findOne( {username: userObject.username });

        if(!user) {
            return null;
        }

        const isPasswordValid = await bcrypt.compare(userObject.password, user.password);

        if(!isPasswordValid) {
            return null;
        }

        const token = jwt.sign(
            { "id": user.id, "username": user.username, "email": user.email },
            process.env.JWT_SECRET,
            { "expiresIn": "24h"}
        );

        return token;
    },
}

module.exports = usersService;