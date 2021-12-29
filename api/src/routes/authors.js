const router = require('express-promise-router')();
const authMiddleware = require('../middlewares/auth.middleware');

const { author } = require('../controllers');

router.route('/:id').get(authMiddleware, author.get);
router.route('/').post(authMiddleware, author.create);
router.route('/').get(authMiddleware, author.getAll);
router.route('/:id').put(authMiddleware, author.update);
router.route('/:id').delete(authMiddleware, author.delete);

module.exports = router;
