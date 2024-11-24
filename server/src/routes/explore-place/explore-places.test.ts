// src/routes/explore-place/explore-places.test.ts

import request from 'supertest';
import { app } from '../../server';
// import { Place } from '../../models/explore-place/explore-place.model';
import { describe, expect, test, beforeAll, afterAll } from '@jest/globals';
import {placesToExplore} from "./test-data/header.data";
import fs from "fs";
import path from "path";

describe('Explore Places API', () => {
    let placeIds: string[] = [];

    test('should create places',async () => {
        // await Place.deleteMany({});

        for (const placeData of placesToExplore) {
            console.log(placeData)
            const response = await request(app)
                .post('/api/explore-places')
                .field('description', placeData.description)
                .field('city', placeData.city)
                .field('motivationalSentence', placeData.motivationalSentence)
                .attach(
                    'image',
                    fs.readFileSync(path.join(__dirname, placeData.image)),
                    placeData.image
                );

            if (response.status !== 201) {
                console.log('Response body:', response.body);
            }

            expect(response.status).toBe(201);
            placeIds.push(response.body._id);
        }
    });

    // afterAll(async () => {
    //     // await Place.deleteMany({});
    // });

    test('should retrieve all places', async () => {
        const response = await request(app).get('/api/explore-places');
        console.log(response.body);
        expect(response.status).toBe(200);
        expect(response.body).toBeInstanceOf(Array);
    });

    test('should retrieve a place by ID', async () => {
        const response = await request(app).get(`/api/explore-places/${placeIds[0]}`);
        expect(response.status).toBe(200);
        expect(response.body._id).toBe(placeIds[0]);
    });

    // test('should update a place', async () => {
    //     const response = await request(app)
    //         .put(`/api/explore-places/${placeIds[0]}`)
    //         .send({ title: 'Updated Place' });
    //
    //     expect(response.status).toBe(200);
    //     expect(response.body.title).toBe('Updated Place');
    // });

    // test('should delete a place', async () => {
    //     const response = await request(app).delete(`/api/explore-places/${placeIds[0]}`);
    //     expect(response.status).toBe(200);
    //     expect(response.body.message).toBe('Place deleted successfully');
    // });
});
