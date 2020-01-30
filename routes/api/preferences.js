const router = require("express").Router();
const preferencesController = require("../../controllers/preferencesController");

// Matches with "/api/preferences"
router.route("/")
  .get(preferencesController.findAll)
  .post(preferencesController.create);

// Matches with "/api/preferences/:id"
router
  .route("/:id")
  .get(preferencesController.findOne)
  .put(preferencesController.update)
  .delete(preferencesController.remove);

module.exports = router;
