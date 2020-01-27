const router = require("express").Router();
const usersController = require("../../controllers/usersController");
const jwt = require("jsonwebtoken");

// Matches with "/api/users"
router.route("/")
  .get(usersController.findAll)
  .post(usersController.create)
// .post(usersController.logIn)

router.route('/signin')
  .post(usersController.logIn)


router.route("/validate").post((req, res) => {
  console.log("BODY", req.body)
  console.log(req.body.token)
  if (req.body.token) {
    jwt.verify(req.body.token, 'somesecretkey', (err, decoded) => {
      if (err) {
        return res
          .status(401)
          .json({ success: false, message: "Expired Token" });
      } else {
        const { username, email } = decoded;
        return res.status(200).json({ success: true, username, email });
      }
    });
  }
})

// Matches with "/api/users/:id"
router
  .route("/:id")
  // .get(usersController.findOne)
  .put(usersController.update)
  .delete(usersController.remove)
  .get(usersController.logOut);


module.exports = router;
