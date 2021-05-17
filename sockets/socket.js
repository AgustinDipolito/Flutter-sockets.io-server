const { io }= require("../index");
//mensajes de sockets
io.on('connection', client => {
    console.log("Cliente conectado")

    client.on('disconnect', () => {
        console.log("Cliente desconectado")
    });

    client.on("msj", function (payload) {
        console.log("Escuchando..", payload);


    })
    io.emit("msj", { quien: "io" });
});