import express from 'express';
import * as DepartmentControllers from '../controllers';

const router = express.Router();

router.get('/', DepartmentControllers.GetDepartmentsController);


export default router;