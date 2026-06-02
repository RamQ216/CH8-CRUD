// Importamos Express para poder crear rutas.
const express = require("express");

// Creamos un router para agrupar las rutas.
const router = express.Router();

// Importamos el controlador de temas.
const topicController = require("../controllers/topicController");

// Importamos el controlador de enlaces.
const linkController = require("../controllers/linkController");

/*
  RUTAS DE TEMAS
*/

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

/*
  RUTAS DE ENLACES
*/

// Crea un enlace dentro de un tema.
router.post("/topics/:topicId/links", linkController.createLink);

// Muestra el formulario para editar un enlace.
router.get("/topics/:topicId/links/:linkId/edit", linkController.showEditLinkForm);

// Actualiza un enlace existente.
router.post("/topics/:topicId/links/:linkId/update", linkController.updateLink);

// Elimina un enlace existente.
router.post("/topics/:topicId/links/:linkId/delete", linkController.deleteLink);

// Suma un voto a un enlace.
router.post("/topics/:topicId/links/:linkId/vote", linkController.voteLink);

// Exportamos el router para usarlo en app.js.
module.exports = router;