// Importa el modelo de enlaces.
// El modelo se encarga de crear, editar, eliminar y votar enlaces.
const linkModel = require("../models/linkModel");

// Crea un nuevo enlace dentro de un tema.
function createLink(req, res) {
  // Toma el id del tema desde la URL.
  const { topicId } = req.params;

  // Toma los datos del enlace desde el formulario.
  const { title, url } = req.body;

  // Pide al modelo que cree el enlace dentro del tema.
  linkModel.createLink(topicId, title, url);

  // Redirige al usuario a la página principal.
  res.redirect("/");
}

// Muestra el formulario para editar un enlace.
function showEditLinkForm(req, res) {
  // Toma el id del tema y del enlace desde la URL.
  const { topicId, linkId } = req.params;

  // Busca el enlace dentro del tema.
  const link = linkModel.getLinkById(topicId, linkId);

  // Si el enlace no existe, vuelve al inicio.
  if (!link) {
    return res.redirect("/");
  }

  // Renderiza la vista editLink.ejs y le pasa el enlace y el topicId.
  res.render("editLink", { link, topicId });
}

// Actualiza un enlace existente.
function updateLink(req, res) {
  // Toma el id del tema y del enlace desde la URL.
  const { topicId, linkId } = req.params;

  // Toma los nuevos datos desde el formulario.
  const { title, url } = req.body;

  // Pide al modelo que actualice el enlace.
  linkModel.updateLink(topicId, linkId, title, url);

  // Redirige al usuario a la página principal.
  res.redirect("/");
}

// Elimina un enlace existente.
function deleteLink(req, res) {
  // Toma el id del tema y del enlace desde la URL.
  const { topicId, linkId } = req.params;

  // Pide al modelo que elimine el enlace.
  linkModel.deleteLink(topicId, linkId);

  // Redirige al usuario a la página principal.
  res.redirect("/");
}

// Suma un voto a un enlace.
function voteLink(req, res) {
  // Toma el id del tema y del enlace desde la URL.
  const { topicId, linkId } = req.params;

  // Pide al modelo que sume un voto al enlace.
  linkModel.voteLink(topicId, linkId);

  // Redirige al usuario a la página principal.
  res.redirect("/");
}

// Exporta las funciones para usarlas desde las rutas.
module.exports = {
  createLink,
  showEditLinkForm,
  updateLink,
  deleteLink,
  voteLink
};