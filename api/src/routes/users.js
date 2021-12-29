const router = require('express-promise-router')();
const { user } = require('../controllers');
const { body } = require('express-validator');
const adminMiddleware = require('../middlewares/admin.middleware');

router
  .route('/registration')
  .post(
    body('email').isEmail(),
    body('password').isLength({ min: 3, max: 16 }),
    user.registration,
  );
router.route('/activate/:link').get(user.activate);
router.route('/login').post(user.login);
router.route('/logout').get(user.logout);
router.route('/').get(adminMiddleware, user.getUsers);
router.route('/refresh').get(user.refresh);
router.route('/:id').put(adminMiddleware, user.updateStatus);

module.exports = router;
