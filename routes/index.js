const router = require('express').Router();
// import all of the API routes from /api/index.js
const apiRoutes = require('./api');

// add prefix of 'api' to all of the api routes
router.use('/api', apiRoutes);

router.use((req, res) => {
  res.status(404).send('<h1>Ya done messed up, son! 404 Error!🤢🤮</h1>');
});

module.exports = router;
