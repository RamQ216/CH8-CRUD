// Importamos Express para poder crear rutas.
const express = require("express");

// Creamos un router para agrupar las rutas.
const router = express.Router();

// Importamos el controlador de temas.
const topicController = require("../controllers/topicController");

// Importamos el controlador de enlaces.
const linkController = require("../controllers/linkController");



// Muestra la pagina principal con todos los temas.
router.get("/", topicController.showHome);

// Crea un nuevo tema.
router.post("/topics", topicController.createTopic);

// Muestra el formulario para editar un tema.
router.get("/topics/:id/edit", topicController.showEditForm);

// Actualiza un tema existente.
router.post("/topics/:id/update", topicController.updateTopic);

// Elimina un tema existente.
router.post("/topics/:id/delete", topicController.deleteTopic);

// Suma un voto a un tema.
router.post("/topics/:id/vote", topicController.voteTopic);


module.exports = router;