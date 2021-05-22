const { io }= require("../index");
const Band = require("./models/band");
const Bands = require("./models/bands");

const bands = new Bands();
bands .addBand(new Band("Maroon5"));
bands .addBand(new Band("Queen"));
bands .addBand(new Band("BTS"));

//mensajes de sockets
io.on('connection', client => {
    console.log("Cliente conectado");

    client.emit("active bands",bands.getBands());

    client.on('disconnect', () => {
        console.log("Cliente desconectado")
    });

    client.on("msj", function (payload) {
        console.log("Escuchando..", payload);
        io.emit("msj", { quien: "io" });

    });
    
    client.on("mensajeDesdeApp", (payload)=>{
        console.log(payload);
        io.emit("reenvio",payload);
    });

    client.on ("vote band", (payload)=> {
        bands.voteBand(payload.id);
        io.emit("active bands", bands.getBands());
    });
    client.on("addBand",(payload)=>{
        const newBand=new Band(payload.name);
        bands.addBand(newBand);
        io.emit("active bands", bands.getBands());
    });

    client.on("deleteBand",(payload)=>{
        bands.deleteBand(payload.id);
        io.emit("active bands", bands.getBands());
    });
});