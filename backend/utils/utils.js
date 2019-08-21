module.exports.exclude = function(obj, ...fields) {
    fields.forEach(field => {
        delete obj[field];
    });
    return obj;
}

module.exports.sendResponseMessage = function (res, httpCode, message){
	console.log("HTTP-Status: " + httpCode +  " Message: " + message);
	return res.status(httpCode).json(message);
}