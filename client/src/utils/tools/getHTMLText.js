// html解析器
function getHTMLText(html) {
    const doc = new DOMParser().parseFromString(html, "text/html")
    return doc.body.textContent
}

export {
    getHTMLText
}