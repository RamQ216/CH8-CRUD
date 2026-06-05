// Importa Express, el framework que usamos para crear el servidor web.
const express = require("express");

// Importa el modulo path de Node.js para construir rutas de archivos de forma segura.
const path = require("path");

// Importa las rutas relacionadas con los temas.
const topicRoutes = require("./routes/topicRoutes");

// Importa las rutas relacionadas con los links.
const linkRoutes = require("./routes/linkRoutes");

// Crea la aplicacion de Express; desde esta variable configuramos el servidor.
const app = express();

// Configura EJS como motor de plantillas para renderizar vistas dinamicas.
app.set("view engine", "ejs");

// Indica que las vistas EJS estan dentro de la carpeta views.
app.set("views", path.join(__dirname, "views"));

// Permite que Express lea datos enviados desde formularios HTML.
app.use(express.urlencoded({ extended: true }));

// Permite que Express lea datos enviados en formato JSON.
app.use(express.json());

// Hace publica la carpeta public para servir archivos estaticos como JS, CSS e imagenes.
app.use(express.static(path.join(__dirname, "public")));

// Usa las rutas de temas desde la raiz del sitio.
app.use("/", topicRoutes);

// Usa las rutas de links desde la raiz del sitio.
app.use("/", linkRoutes);

// Define el puerto donde va a ejecutarse el servidor.
const PORT = 3000;

// Inicia el servidor y lo deja escuchando peticiones en el puerto definido.
app.listen(PORT, () => {
  // Muestra en consola la URL donde esta funcionando el servidor.
  console.log(`Servidor funcionando en http://localhost:${PORT}`);
});
