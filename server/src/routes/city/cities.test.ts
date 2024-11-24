// src/routes/city/cities.test.ts
import request from 'supertest';
import {describe, expect, test} from '@jest/globals';
import {app} from "../../server";
import {tunisianCities} from "../../models/city/test-data/city.data";

const prefixPath = "/api"
describe('City API', () => {
    let cityId: string;

    test('should create a new city', async () => {
        const response = await request(app)
            .post(`${prefixPath}/cities`)
            .send({
                name: 'Test City',
                location: { long: 12.34, lat: 56.78 }
            });

        expect(response.status).toBe(201);
        expect(response.body.name).toBe('Test City');
        cityId = response.body._id; // Save the city ID for further tests
    });

    test('should retrieve all cities', async () => {
        const response = await request(app).get(`${prefixPath}/cities`);
        expect(response.status).toBe(200);
        expect(response.body).toBeInstanceOf(Array);
    });

    test('should retrieve a city by ID', async () => {
        const response = await request(app).get(`${prefixPath}/cities/${cityId}`);
        expect(response.status).toBe(200);
        expect(response.body._id).toBe(cityId);
    });

    test('should update a city', async () => {
        const response = await request(app)
            .put(`${prefixPath}/cities/${cityId}`)
            .send({
                name: 'Updated City',
                location: { long: 23.45, lat: 67.89 }
            });

        expect(response.status).toBe(200);
        expect(response.body.name).toBe('Updated City');
    });

    test('should delete a city', async () => {
        const response = await request(app).delete(`${prefixPath}/cities/${cityId}`);
        expect(response.status).toBe(200);
        expect(response.body.message).toBe('City deleted successfully');
    });
});

describe('Tunisian Cities API', () => {
    // Loop through each Tunisian city and create it
    tunisianCities.forEach((city) => {
        test(`should create a new city: ${city.name}`, async () => {
            const response = await request(app)
                .post(`${prefixPath}/cities`)
                .send(city);

            expect(response.status).toBe(201);
            expect(response.body.name).toBe(city.name);
            expect(response.body.location).toEqual(city.location);
        });
    });
});
