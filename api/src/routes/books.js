const router = require('express-promise-router')();
const authMiddleware = require('../middlewares/auth.middleware');

const { book } = require('../controllers');

router.route('/:id').get(authMiddleware, book.get);
router.route('/').post(authMiddleware, book.create);
router.route('/').get(authMiddleware, book.getAll);
router.route('/:id').put(authMiddleware, book.update);
router.route('/:id').delete(authMiddleware, book.delete);

module.exports = router;
