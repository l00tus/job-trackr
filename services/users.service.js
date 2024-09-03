const UserModel = require("../data/users.model");
const { v4: uuidv4 } = require("uuid");
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
}

module.exports = usersService;