const router = require('express').Router();
const apiRoutes = require('./api/index');

router.use('/api', apiRoutes);

router.use((req, res) => {
    res.status(404).send({message: '404 err'});
})

module.exports = router;