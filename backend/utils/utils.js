module.exports.exclude = function(obj, ...fields) {
    fields.forEach(field => {
        delete obj[field];
    });
    return obj;
}