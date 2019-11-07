const folder = require('../imageStore.js').folder
const httpCode = require('../utils/httpCode')
exports.getPicture = function(req, res) {
    res.contentType('image/jpeg')
    folder.find(res.locals.imageId, ext = res.locals.ext).then(
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

exports.insertPicture = function(req, res) {
    buffer = null
    req.on('data', function(chunck){
        if(buffer == null) {
            buffer = chunck
        } else {
            buffer = Buffer.concat(buffer, chunck)
        }
    })

    req.on('end', function() {
        folder.save(buffer, res.locals.imageId).then(
            out => res.setOk()
        ).catch(err => console.log(err))
    })
    
}

exports.updatePicture = function(req, res) {
    //TODO
}