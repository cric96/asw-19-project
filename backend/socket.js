exports.io = { webSocket : null}

exports.init = function(ioPassed) {
    exports.io.webSocket = ioPassed
    console.log("Init sockets...")
    ioPassed.on('connection', function(socket) {
        console.log("New user connection")
        socket.on('joinBuilding', function(buildingId){
            socket.join("room/"+buildingId)
            console.log("Richiesta di join ricevuta da building: " + buildingId)
        })
        socket.on("leaveBuilding", function(buildingId){
            socket.leave("room/"+buildingId)
            console.log("Richiesta di leave ricevuta")
        })
    })
}
