const router = require('express-promise-router')();
const { user } = require('../controllers');
const { body } = require('express-validator');
const path = require('path');
const adminMiddleware = require('../middlewares/admin.middleware');
const multer = require('multer');

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, './uploads/');
  },
  filename: function (req, file, cb) {
    cb(
      null,
      file.fieldname + '-' + Date.now() + path.extname(file.originalname),
    );
  },
});
const upload = multer({
  storage: storage,
});

router
  .route('/registration')
  .post(
    upload.single('logo'),
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
