module.exports = (res, statusCode, statusMessage, data) => res.json({
    statusCode,
    statusMessage,
    data
})