const jwt = require("jsonwebtoken");

const authMiddleware = (req, res, next) => {
    const token = req.cookies.token;

    if(!token) {
        res.status(401).send({ "error": "No token provided" });
    }

    try {
        const decodedUser = jwt.verify(token, process.env.JWT_SECRET);
        req.user = decodedUser;
        next();
    } catch (error) {
        res.status(401).send({ "error": "Invalid token" });
    }
}

module.exports = authMiddleware;