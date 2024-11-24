import request from 'supertest';
import { app } from '../../server';
import { describe, expect, test, beforeAll, afterAll } from '@jest/globals';
import fs from "fs";
import path from "path";
import {events} from "./test-data/events.data";

describe('Events API', () => {
    let eventIds: string[] = [];

    test('should create events', async () => {
        // Ensure previous events are cleaned up
        // await Event.deleteMany({});

        for (const eventData of events) {

            const response = await request(app)
                .post('/api/events')
                .field('city', eventData.city)
                .field('title', eventData.title)
                .field('description', eventData.description)
                .field('author', "66ac08a5e7abf5633e3d967a")
                .field('startDate', eventData.startDate)
                .field('endDate', eventData.endDate)
                .field('resume', eventData.resume)
                .attach(
                    'defaultImage',
                    fs.readFileSync(path.join(__dirname, eventData.principalImage)),
                    eventData.principalImage
                )
                .attach(
                    'smallImage',
                    fs.readFileSync(path.join(__dirname, eventData.principalImage)),
                    eventData.principalImage
                )
                .attach(
                    'mediumImage',
                    fs.readFileSync(path.join(__dirname, eventData.principalImage)),
                    eventData.principalImage
                )
                .attach(
                    'largeImage',
                    fs.readFileSync(path.join(__dirname, eventData.principalImage)),
                    eventData.principalImage
                );

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

    // test('should retrieve all events', async () => {
    //     const response = await request(app).get('/api/events');
    //     console.log(response.body);
    //     expect(response.status).toBe(200);
    //     expect(response.body).toBeInstanceOf(Array);
    // });
    //
    // test('should retrieve an event by ID', async () => {
    //     const response = await request(app).get(`/api/events/${eventIds[0]}`);
    //     expect(response.status).toBe(200);
    //     expect(response.body._id).toBe(eventIds[0]);
    // });

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
