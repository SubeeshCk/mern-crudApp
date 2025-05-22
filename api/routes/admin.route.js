import express from 'express';
import { adminLogin } from '../controllers/admin.controller.js';

const adminRoute = express();

adminRoute.post('/admin-logIn',adminLogin)

export default adminRoute;