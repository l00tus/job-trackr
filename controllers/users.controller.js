const usersService = require("../services/users.service");

const usersController = {
    registerUser: async (req, res) => {
        const { username, email, password } = req.body;

        if(!username || !email || !password) {
            res.status(400).send({ error: "All fields are required" });
            return;
        }

        const userObject = { username, email, password };
        
        try {
            const newUser = await usersService.registerUser(userObject);
            
            if(newUser) {
                res.status(201).send({ "message": "User created successfully", "user": newUser });
            } else {
                res.status(400).send({ "error": "Username or email already in use" });
            }
        } catch (error) {
            if(error.name == "ValidationError") {
                res.status(400).send({ "error": "Please fill a valid email address" });
            } else {
                res.status(500).send({ "error": error });
            }
        }
    },
}

module.exports = usersController;