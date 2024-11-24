// src/routes/city/cities.validation.ts
import { Request, Response, NextFunction } from 'express';
import { body, validationResult } from 'express-validator';

export const validateBlog = [
    body('name').notEmpty().withMessage('Name is required'),
    body('location.long').isFloat({ min: -180, max: 180 }).withMessage('Longitude must be between -180 and 180'),
    body('location.lat').isFloat({ min: -90, max: 90 }).withMessage('Latitude must be between -90 and 90'),
    (req: Request, res: Response, next: NextFunction) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }
        next();
    },
];
