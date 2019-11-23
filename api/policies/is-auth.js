var jwt = require('jsonwebtoken');

module.exports = function(req, res, next) {

    if (req.headers && req.headers.authorization) {
        let parts = req.headers.authorization.split(' ');
        if (parts.length == 2) {
            let scheme = parts[0];
            let credentials = parts[1];
            if (/^Bearer$/i.test(scheme)) {
                jwt.verify(credentials, 'secret', function(err, decoded) {
                    if (err) {
                        return res.status(401).json(err);
                    }
                    req.user = decoded;
                    return next();
                });
            } else {
                return res.status(401)
                    .json({
                        err: 'The correct format is "Authorization: Bearer [token]"'
                    })
                ;
            }
        }
    } else {
        return res.status(401)
            .json({
                err: 'Authorization header not found'
            })
        ;
    }
}
