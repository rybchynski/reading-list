const router = require('express-promise-router')();

const { book } = require('../controllers');

router.route('/:id').get(book.get);
router.route('/').post(book.create);
router.route('/').get(book.getAll);
router.route('/:id').put(book.update);
router.route('/:id').delete(book.delete);

module.exports = router;
