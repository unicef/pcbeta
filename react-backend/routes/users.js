// var express = require('express');
// var router = express.Router();
//
// /* GET users listing. */
// router.get('/', function(req, res, next) {
//   //res.send('respond with a resource');
//   res.json([{
//     id: 1,
//     username: "samsepi0l"
//   }, {
//     id: 2,
//     username: "D0loresH4ze"
//   }]);
//
// });
//
// module.exports = router;
var express = require('express');
var router = express.Router();
console.log("IN USER.JS");

/* GET users listing. */
router.get('/', function(req, res, next) {
  console.log("IN USER GET");
  // Comment out this line:
  //res.send('respond with a resource');

  // And insert something like this instead:
  res.json([{
    id: 1,
    username: "samsepi0l"
  }, {
    id: 2,
    username: "D0loresH4ze"
  }]);
});

module.exports = router;
