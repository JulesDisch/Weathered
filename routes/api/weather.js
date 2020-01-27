const axios = require("axios");
const router = require("express").Router();

router.get("/users", (req, res) => {
  axios
    .get("https://api.openweathermap.org/data/2.5/forecast?", { params: req.query })
    .then(({ data: { results } }) => res.json(results))
    .catch(err => res.status(422).json(err));
});

module.exports = router;

