const express = require("express");
const router = express.Router();

const linkController = require("../controllers/linkController");

router.post("/links", linkController.createLink);

router.get("/links/:id/edit", linkController.showEditLinkForm);

router.post("/links/:id/update", linkController.updateLink);

router.post("/links/:id/delete", linkController.deleteLink);

router.post("/links/:id/vote", linkController.voteLink);

module.exports = router;