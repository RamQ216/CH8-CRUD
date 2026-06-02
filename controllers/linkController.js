const linkModel = require("../models/linkModel");

function createLink(req, res) {
  const { title, url, description } = req.body;

  linkModel.createLink(title, url, description);

  res.redirect("/");
}

function showEditLinkForm(req, res) {
  const { id } = req.params;

  const link = linkModel.getLinkById(id);

  if (!link) {
    return res.redirect("/");
  }

  res.render("editLink", { link });
}

function updateLink(req, res) {
  const { id } = req.params;
  const { title, url, description } = req.body;

  linkModel.updateLink(id, title, url, description);

  res.redirect("/");
}

function deleteLink(req, res) {
  const { id } = req.params;

  linkModel.deleteLink(id);

  res.redirect("/");
}

function voteLink(req, res) {
  const { id } = req.params;

  const link = linkModel.voteLink(id);

  res.json({ success: true, link });
}

module.exports = {
  createLink,
  showEditLinkForm,
  updateLink,
  deleteLink,
  voteLink
};