module.exports.dropboxFolder = function() {
    const dropboxV2Api = require('dropbox-v2-api');
    var Readable = require('stream').Readable
    
    this.dropbox = dropboxV2Api.authenticate({
        token: 'xZUXN5rU7PQAAAAAAAACANg2yYSRa6eHWYFFkzl3WQ8R4oZTa2CRucyshg1xek9-'
    });

    this.save = function(image, id, ext = "jpg") {
        return new Promise((resolve, reject) => {
            var imageStream = new Readable()
            imageStream.push(image)  
            imageStream.push(null)
            this.dropbox({
                resource: 'files/upload',
                parameters: {
                    path: '/dropbox/picture/img' + id + "." + ext
                },
                readStream: imageStream
            }, (err, result, response) => {
                if(err) {
                    reject(err)
                } else {
                    resolve(result)
                }
            });
        })
         
    }

    this.find = function(imageId, ext = "jpg") {
        var lamdaDropbox = this.dropbox
        console.log('/dropbox/picture/img' + imageId + "." + ext)
        return new Promise((resolve, reject) => {
            var stream = lamdaDropbox({
                resource: 'files/download',
                parameters: {
                    path: '/dropbox/picture/img' + imageId + "." + ext
                }
            }, (err, result, response) => {
                if(err) {reject(err)}
            })
            const chunks = []
            stream.on('data', chunk => chunks.push(chunk))
            stream.on('error', reject)
            stream.on('end', () => resolve(Buffer.concat(chunks)))
        })
        
    }
}

module.exports.fileSystemFolder = function() {
    const fs = require('fs')
    this.init = function() { }
    this.save = function(image, id, ext = "jpg") {
        return new Promise((resolve, reject) => {
            fs.writeFile('./assets/'+id + "." + ext, image, 'binary', function(err){
                if (err) reject(err)
                else resolve()
            })
        })
        
    }

    this.find = function(imageId, ext = "jpg") {
        return new Promise((resolve, reject) => {
            console.log("Here (inner)")
            fs.readFile('./assets/' + imageId + "." + ext, function(err, data) {
                if(err) {
                    console.log("here (reject)")
                    reject(err)
                } else {
                    resolve(data)
                }
            })
        })
    }
}

module.exports.init = function(imageStore) {
    module.exports.folder = imageStore
}
module.exports.folder = undefined