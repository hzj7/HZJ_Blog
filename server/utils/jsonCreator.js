const apiJSON = function () {

    // 成功返回
    const successJSON = (msg, data) => {
        return {
            code: 200,
            msg,
            data
        }
    }

    // 失败返回
    const errorJSON = (msg) => {
        return {
            msg,
            code: 500
        }
    }

    // 暂未登陆返回
    const notLoginJSON = (msg) => {
        return {
            msg,
            code: 401
        }
    }

    // 权限不足返回
    const notAuthenticatedJSON = (msg) => {
        return {
            msg,
            code: 403
        }
    }

    return {
        successJSON,
        errorJSON,
        notLoginJSON,
        notAuthenticatedJSON
    }
}

module.exports = apiJSON;