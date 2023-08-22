// 地址解析器
function UrlParamsFilter(url) {
    // 使用正则表达式将查询字符串分解成键值对数组
    const keyValuePairs = url.slice(1).split('&');
    const params = {};

    // 遍历键值对数组，将它们解析为 JSON 对象
    keyValuePairs.forEach(keyValuePair => {
        const [key, value] = keyValuePair.split('=');
        params[key] = value;
    });
    return params
}
export {
    UrlParamsFilter
}