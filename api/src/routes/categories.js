const router = require('express-promise-router')();
const authMiddleware = require('../middlewares/auth.middleware');
const { category } = require('../controllers');

router.route('/:id').get(authMiddleware, category.get);
router.route('/').post(authMiddleware, category.create);
router.route('/').get(authMiddleware, category.getAll);
router.route('/:id').put(authMiddleware, category.update);
router.route('/:id').delete(authMiddleware, category.delete);

module.exports = router;
