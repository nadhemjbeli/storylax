// src/routes/city/cities.router.ts
import { Router } from 'express';
import { getCities, getCityById, addCity, updateCity, deleteCity } from './cities.controller';
import { validateCity } from './cities.validation';

const router = Router();

router.get('/cities', getCities);
router.get('/cities/:id', getCityById);
router.post('/cities', validateCity, addCity);
router.put('/cities/:id', validateCity, updateCity);
router.delete('/cities/:id', deleteCity);

export default router;
