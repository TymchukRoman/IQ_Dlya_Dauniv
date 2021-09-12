const jwt = require("jsonwebtoken");

const config = process.env;

const verifyToken = (req, res, next) => {
    const token = req.body.token || req.query.token || req.headers["x-access-token"];
    if (!token) {
        return res.send({ err: "A token is required for authentication" });
    }
    try {
        const decoded = jwt.verify(token, config.TOKEN_SECRET);
        if (decoded.role !== "admin") {
            return res.send({err: "You must be an admin"});
        }
        req.user = decoded;
    } catch (err) {
        return res.send({ err: "Invalid Token" });
    }
    return next();
};

module.exports = verifyToken;