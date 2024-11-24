import request from 'supertest';
import { app } from '../../server';
import { describe, expect, test, beforeAll, afterAll } from '@jest/globals';
import {ExplorePlace} from "../../models/explore-place/explore-places.model";
import {ExplorePlaceEvent} from "../../models/explore-place-event/explore-place-events.model";
import fs from "fs";
import path from "path";
import {explorePlaceEvents} from "./test-data/explore-place-events.data";

describe('Explore Place Events API', () => {
    let eventIds: string[] = [];

    test('should create events', async () => {
        // Ensure previous events are cleaned up
        // await Event.deleteMany({});

        for (const eventData of explorePlaceEvents) {
            const response = await request(app)
                .post('/api/explore-place-events')
                .field('explorePlace', eventData.explorePlace)
                .field('title', eventData.title)
                .field('exactPlace', eventData.exactPlace)
                .field('price', eventData.price)
                .field('rate', eventData.rate)
                .attach(
                    'image',
                    fs.readFileSync(path.join(__dirname, eventData.image)),
                    eventData.image);

            if (response.status !== 201) {
                console.log('Response body:', response.body);
            }

            expect(response.status).toBe(201);
            eventIds.push(response.body._id);
        }
    });

    // Clean up after tests
    // afterAll(async () => {
    //     await ExplorePlaceEvent.deleteMany({});
    // });

    test('should retrieve all events', async () => {
        const response = await request(app).get('/api/explore-place-events');
        console.log(response.body);
        expect(response.status).toBe(200);
        expect(response.body).toBeInstanceOf(Array);
    });

    test('should retrieve an event by ID', async () => {
        const response = await request(app).get(`/api/explore-place-events/${eventIds[0]}`);
        expect(response.status).toBe(200);
        expect(response.body._id).toBe(eventIds[0]);
    });

    // Uncomment and adapt the following tests as needed

    // test('should update an event', async () => {
    //     const response = await request(app)
    //         .put(`/api/explore-place-events/${eventIds[0]}`)
    //         .send({ title: 'Updated Event' });

    //     expect(response.status).toBe(200);
    //     expect(response.body.title).toBe('Updated Event');
    // });

    // test('should delete an event', async () => {
    //     const response = await request(app).delete(`/api/explore-place-events/${eventIds[0]}`);
    //     expect(response.status).toBe(200);
    //     expect(response.body.message).toBe('Event deleted successfully');
    // });
});
