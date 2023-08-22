const jwt = require('jsonwebtoken');
const { JWT_SECRET_KEY } = require('../config/config')
const jsonCreator = require('../../utils/jsonCreator')

const { notAuthenticatedJSON, notLoginJSON } = jsonCreator()

function checkTokenMiddleware(req, res, next) {
    const token = req.cookies?.access_token
    if (!token) return res.json(notLoginJSON('暂未登陆'))

    jwt.verify(token, JWT_SECRET_KEY, (err, userInfo) => {
        if (err) return res.json(notAuthenticatedJSON('登陆已过期'))
        req.user = userInfo;
        next()
    })
}

module.exports = checkTokenMiddleware