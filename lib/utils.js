module.exports.callbackSuccess = (cb, data, headers) => {
    const response = {
        statusCode: "200",
        body: JSON.stringify(data || {}),
        headers: Object.assign({
            "Content-Type": "application/json",
            "Access-Control-Allow-Origin": "*"
        }, headers || {})
    };
    cb(null, response);
};