import express from 'express';
import {
  userRegister,
  userLogin,
  userChangePassword,
} from '../controllers/authController.js';
import checkAuth from '../middlewares/checkAuth.js';

const authRouter = express.Router();

authRouter.route('/signup').post(userRegister);
authRouter.route('/login').post(userLogin);
authRouter.route('/changePassword/:id').post(checkAuth, userChangePassword);

export default authRouter;
