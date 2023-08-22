/**
 * 网络请求配置
 */
import axios from "axios";

// 请求超时的时间
axios.defaults.timeout = 10000;
// 请求接口
axios.defaults.baseURL = "/api";

/**
 * http request 拦截器
 */
axios.interceptors.request.use(
    (config) => {
        if (config.url !== "/files/uploadFile") {
            config.headers = {
                "Content-Type": "application/json;charset=utf-8",
            };
        }
        return config;
    },
    (error) => {
        return Promise.reject(error);
    }
);

/**
 * http response 拦截器
 */
axios.interceptors.response.use(
    (response) => {
        return response;
    },
    (error) => {
        console.log("请求出错：", error);
    }
);

/**
 * 封装get方法
 * @param url  请求url
 * @param params  请求参数
 * @returns {Promise}
 */
export function get(url, params = {}) {
    return new Promise((resolve, reject) => {
        axios.get(url, {
            params: params,
        }).then((response) => {
            resolve(response?.data)
        })
            .catch((error) => {
                reject(error);
            });
    });
}

/**
 * 封装post请求
 * @param url
 * @param data
 * @returns {Promise}
 */

export function post(url, data) {
    return new Promise((resolve, reject) => {
        axios.post(url, data).then(
            (response) => {
                resolve(response?.data);
            },
            (err) => {
                reject(err);
            }
        );
    });
}

/**
 * 封装delete请求
 * @param url
 * @param data
 * @returns {Promise}
 */

export function apiDelete(url, data) {
    return new Promise((resolve, reject) => {
        axios.delete(url, data).then(
            (response) => {
                resolve(response?.data);
            },
            (err) => {
                reject(err);
            }
        );
    });
}

/**
 * 封装patch请求
 * @param url
 * @param data
 * @returns {Promise}
 */
export function patch(url, data = {}) {
    return new Promise((resolve, reject) => {
        axios.patch(url, data).then(
            (response) => {
                resolve(response.data);
            },
            (err) => {
                msag(err);
                reject(err);
            }
        );
    });
}

/**
 * 封装put请求
 * @param url
 * @param data
 * @returns {Promise}
 */

export function put(url, data = {}) {
    return new Promise((resolve, reject) => {
        axios.put(url, data).then(
            (response) => {
                resolve(response.data);
            },
            (err) => {
                msag(err);
                reject(err);
            }
        );
    });
}

//统一接口处理，返回数据
export default function (method, url, param) {
    return new Promise((resolve, reject) => {
        switch (method) {
            case "get":
                get(url, param)
                    .then(function (response) {
                        resolve(response);
                    })
                    .catch(function (error) {
                        console.log("get request GET failed.", error);
                        reject(error);
                    });
                break;
            case "post":
                post(url, param)
                    .then(function (response) {
                        resolve(response);
                    })
                    .catch(function (error) {
                        console.log("get request POST failed.", error);
                        reject(error);
                    });
                break;
            case "delete":
                apiDelete(url, param)
                    .then(function (response) {
                        resolve(response);
                    })
                    .catch(function (error) {
                        console.log("get request DELETE failed.", error);
                        reject(error);
                    });
                break;
            case "put":
                put(url, param)
                    .then(function (response) {
                        resolve(response);
                    })
                    .catch(function (error) {
                        console.log("get request PUT failed.", error);
                        reject(error);
                    });
                break;
            case "patch":
                patch(url, param)
                    .then(function (response) {
                        resolve(response);
                    })
                    .catch(function (error) {
                        console.log("get request PUT failed.", error);
                        reject(error);
                    });
                break;
            default:
                break;
        }
    });
}

//失败提示
function msag(err) {
    if (err?.response) {
        switch (err.response.status) {
            case 400:
                alert(err.response.data.msg);
                break;
            case 401:
                alert("未授权，请登录");
                break;

            case 403:
                alert("拒绝访问");
                break;

            case 404:
                alert("请求地址出错");
                break;

            case 408:
                alert("请求超时");
                break;

            case 500:
                alert("服务器内部错误");
                break;

            case 501:
                alert("服务未实现");
                break;

            case 502:
                alert("网关错误");
                break;

            case 503:
                alert("服务不可用");
                break;

            case 504:
                alert("网关超时");
                break;

            case 505:
                alert("HTTP版本不受支持");
                break;
            default:
        }
    }
}
