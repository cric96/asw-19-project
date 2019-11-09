const folder = require('../imageStore.js').folder
const httpCode = require('../utils/httpCode')
exports.getPicture = function(req, res) {
    res.contentType('image/jpeg')
    folder.find(res.locals.folder + "/" + res.locals.imageId, ext = res.locals.ext).then(
        image => {
            res.status(httpCode.OK)
            res.end(image,'binary')   
        }
    ).catch(
        err => {
            res.setNotFound()
        }
    )
}
exports.insertUserAvatar = function(req, res) {
    insertPicturePromise(res.locals.folder + "/" + res.locals.imageId, req)
        .then(() => {
            res.locals.userAuth.avatarUrl = "/users/" + res.locals.imageId + "/picture"
            res.locals.userAuth.save()
        })
        .then(() => res.setOk())
        .catch(err => {
            console.log(err)
            res.setInternalError("Error in image upload")
        })
}
exports.insertPicture = function(req, res) {
    insertPicturePromise(res.locals.folder + "/" + res.locals.imageId, req)
        .then(res => res.setOk())
        .catch(res => res.setInternalError("Error in image upload"))
}

function insertPicturePromise(id, req) {
    return new Promise((resolve, reject) => {
        buffer = null
        req.on('data', function(chunck){
            if(buffer == null) {
                buffer = chunck
            } else {
                buffer = Buffer.concat(buffer, 
                    new Buffer(chunck))
            }
        })

        req.on('end', function() {
            console.log("HERE")
            console.log(id)
            folder.save(buffer, id).then(
                out => resolve(out)
            ).catch(err =>
                reject(err)
            )
        })
    })
}