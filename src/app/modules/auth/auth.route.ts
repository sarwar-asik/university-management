import express from 'express'


import validateRequest from '../../middlesWare/validateUserRequest'
import { AuthValidation } from './auth.validation'
import { authController } from './auth.controller'


const router = express.Router()

router.post(
'/login',
validateRequest(AuthValidation.createUserZodSchema),
authController.loginController
)



// router.get("/",userController.getUser)

export const AuthRouter = router