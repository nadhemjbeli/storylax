// src/models/explore-place-map/test-data/explore-place-maps.data.ts

import request from 'supertest';
import { app } from '../../server';
import { describe, expect, test, beforeAll, afterAll } from '@jest/globals';
import { mapData } from './test-data/explore-place-maps.data';
import { ExplorePlaceMap } from "../../models/explore-place-map/explore-place-maps.model";
import * as fs from "fs";
import path from "path";

describe('Explore Place Maps API', () => {
    let mapIds: string[] = [];
    let mapId: string;

    test('should create maps', async () => {
        for (const mapDataItem of mapData) {
            const response = await request(app)
                .post('/api/explore-place-maps')
                .field('type', mapDataItem.type)
                .field('color', mapDataItem.color)
                .field('icon', mapDataItem.icon)
                .attach(
                    'cardIcon',
                    fs.readFileSync(path.join(__dirname, mapDataItem.cardIcon)),
                    mapDataItem.cardIcon
                );

            if (response.status !== 201) {
                console.log('Response body:', response.body);
            }

            expect(response.status).toBe(201);
            mapIds.push(response.body._id);
            mapId = response.body._id;
            for(let place of mapDataItem.list){
                const response = await request(app)
                    .post('/api/explore-place-map-details')
                    .field('title', place.title)
                    .field('explorePlace', place.explorePlace)
                    .field('exploreMap', mapId)
                    .field('description', place.description)
                    .field('transportation', place.transportation)
                    .field('location.lon', place.location.lon)
                    .field('location.lat', place.location.lat)
                    .attach(
                        'image',
                        fs.readFileSync(path.join(__dirname, place.image)),
                        place.image
                    );

                if (response.status !== 201) {
                    console.log('Response body:', response.body);
                }
            }
        }
    });

    test('should retrieve all maps', async () => {
        const response = await request(app).get('/api/explore-place-maps');
        console.log(response.body);
        expect(response.status).toBe(200);
        expect(response.body).toBeInstanceOf(Array);
    });

    test('should retrieve all map details', async () => {
        const response = await request(app).get('/api/explore-place-map-details');
        console.log(response.body);
        expect(response.status).toBe(200);
        // expect(response.body).toBeInstanceOf(Array);
    });

    test('should retrieve a map by ID', async () => {
        const response = await request(app).get(`/api/explore-place-maps/${mapIds[0]}`);
        expect(response.status).toBe(200);
        expect(response.body._id).toBe(mapIds[0]);
    });

    // Uncomment and adapt the following tests as needed

    // test('should update a map', async () => {
    //     const response = await request(app)
    //         .put(`/api/explore-place-maps/${mapIds[0]}`)
    //         .send({ type: 'Updated Map' });

    //     expect(response.status).toBe(200);
    //     expect(response.body.type).toBe('Updated Map');
    // });

    // test('should delete a map', async () => {
    //     const response = await request(app).delete(`/api/explore-place-maps/${mapIds[0]}`);
    //     expect(response.status).toBe(200);
    //     expect(response.body.message).toBe('Map deleted successfully');
    // });
});
