import express from 'express'
import { adminAddUser, adminDeleteUser, adminLogin, adminLogout, adminUpdatingUser, getUsers } from '../controllers/admin.controller.js';
import { verifyAdmin } from '../utils/verifyAdmin.js';

const adminRoute = express.Router()

adminRoute.post('/adminLogin', adminLogin)
adminRoute.get('/users', verifyAdmin, getUsers)
adminRoute.put('/users/:userId', verifyAdmin ,adminUpdatingUser)
adminRoute.delete('/users/delete/:id' , verifyAdmin, adminDeleteUser)
adminRoute.post('/user/add-user', verifyAdmin, adminAddUser)
adminRoute.get('/logout', verifyAdmin, adminLogout)

export default adminRoute;