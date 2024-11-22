const jwt = require("jsonwebtoken");
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
    loginUser: async (req, res) => {
        const { username, password } = req.body;

        if(!username || !password) {
            res.status(400).send({ "error": "All fields are required" });
            return;
        }

        const userObject = { username, password };

        try {
            const token = await usersService.loginUser(userObject);

            if(!token) {
                res.status(401).send({ "error": "Invalid username or password" });
                return;
            }

            res.cookie('token', token, {
                httpOnly: true,
                sameSite: 'strict',
                maxAge: 24 * 60 * 60 * 1000
            })

            res.status(200).send({ "message": "Token created successfully!" });
        } catch (error) {
            res.status(500).send({ "error": error });
        }
    },
    logoutUser: async (req, res) => {
        res.clearCookie('token');
        res.status(200).send({ "message": "Logout successful! "});
    },
    getInfo: async (req, res) => {
        const token = req.cookies.token;

        if(!token) {
            res.status(401).send({ "error": "No token!"});
            return;
        }
        
        try {
            const decoded = jwt.verify(token, process.env.JWT_SECRET);
            res.status(200).send(decoded);
        } catch (err) {
            res.status(401).send({ "error": "Invalid token" })
        }
    },
    checkAuth: async (req, res) => {
        const token = req.cookies.token;

        if(!token) {
            res.status(402).send({ "error": "No token!", "isLoggedIn": false });
            return;
        }

        try {
            const decoded = jwt.verify(token, process.env.JWT_SECRET);
            res.status(200).send({ "isLoggedIn": true});
        } catch (err) {
            res.status(401).send({ "error": "Invalid token", "isLoggedIn": false });
        }
    }
}

module.exports = usersController;