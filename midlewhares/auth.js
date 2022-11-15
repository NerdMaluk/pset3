const jwt = require('jsonwebtoken');

module.exports = async (req, res, next) => {

    const authToken = req.headers.authorization;


    const token = authToken.split(' ');


    jwt.verify(token[1], "bbef357897e532a60da4830fac13623e", function (err, decoded) {
        
        if (err) {
            return res.status(401).json({
                error: 'Token Invalid'
            })
        }

        req.user_id = decoded.id;
        next();
    });
}