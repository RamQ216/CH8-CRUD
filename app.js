//importamos la libreria express
const express= require("express");
//creamos la app de express
const app=express();

//PUERTO CONFIGURABLE
const PORT=process.env.PORT || 5000;

//creamos la ruta principal
app.get("/",function (req,res){
    //enviamos respuesta al servidor
    res.send("servidor funcionando");
});

app.use(function (req,res){
    res.status(404).send("404-PAGINA NO ENCONTRADA");
});


app.use(function(err,res,req,next){
    console.error(err);
    res.status(500).send("500-error interno del servidor");
});


//lo ponemos en modo escucha al servidor en el puerto sin parametros
app.listen(PORT, function (){
    //mostramos en terminal que arranca el servidor
    console.log("servidor en funcionamiento en http://localhost:5000")
});