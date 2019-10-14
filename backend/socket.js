
module.exports.io = undefined;

module.exports.init = function(io) {
    console.log("Init sockets...")
    io.on('connection', function(socket) {
        console.log("New user connection")
        socket.on('join building', function(buildingId){
            socket.join("room/"+buildingId)
            console.log("Richiesta ricevuta")
            //io.in("test room").emit('res from room')
        })
        socket.on('chat message', function(msg){
            io.emit('chat message', { nickname: socket.nickname, content: msg});
        });
        socket.on("leave building", function(buildingId){
            socket.leave("room/"+buildingId)
        })
    })
}
