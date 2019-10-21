exports.io = { webSocket : null}

exports.Message = function(type, payload) {
    this.type = type
    this.payload = payload
}

exports.sendInBuilding = function(buildingId, {type, payload}) {
    exports.io.webSocket.to("buildings/"+buildingId).emit(type, payload)
}

exports.sendToUser = function(userId, {type, payload}) {
    exports.io.webSocket.to("users/"+userId).emit(type, payload)
}
exports.init = function(ioPassed) {
    exports.io.webSocket = ioPassed
    console.log("Init sockets...")
    ioPassed.on('connection', function(socket) {
        console.log("New user connection")
        socket.on('joinBuilding', function(buildingId){
            socket.join("buildings/"+buildingId)
            console.log("join to building: " + buildingId)
        })
        socket.on("leaveBuilding", function(buildingId){
            socket.leave("buildings/"+buildingId)
            console.log("leave from building:"  + buildingId)
        })
        socket.on("joinUser", function(userId) {
            socket.join("users/" + userId)
            console.log("join with user: "  + userId)
        })
        socket.on("leaveUser", function(userId) {
            socket.leave("users/" + userId)
            console.log("user leaves: "  + userId)
        })
    })
}


