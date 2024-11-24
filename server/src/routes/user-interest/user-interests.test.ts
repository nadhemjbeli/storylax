// src/routes/blog-tag/blog-tags.test.ts

import request from 'supertest';
import { describe, expect, test, afterAll } from '@jest/globals';
import { app } from '../../server';
import {BlogTag} from "../../models/blog/blog-tag/blog-tags.model";
import {userInterestsData} from "./test-data/user-interests.data";

describe('Blog Tag API', () => {
    let tagId: string;
    const prefixPath = '/api';

    // Clean up after all tests
    afterAll(async () => {
        await BlogTag.deleteMany({});
    });

    test('should create a new blog tag', async () => {
        const response = await request(app)
            .post(`${prefixPath}/blog-tags`)
            .send({ name: 'Test Tag' });

        expect(response.status).toBe(201);
        expect(response.body.name).toBe('Test Tag');
        tagId = response.body._id; // Save the tag ID for further tests
    });

    test('should retrieve all blog tags', async () => {
        const response = await request(app).get(`${prefixPath}/blog-tags`);
        expect(response.status).toBe(200);
        expect(response.body).toBeInstanceOf(Array);
    });

    test('should retrieve a blog tag by ID', async () => {
        const response = await request(app).get(`${prefixPath}/blog-tags/${tagId}`);
        expect(response.status).toBe(200);
        expect(response.body._id).toBe(tagId);
    });

    test('should update a blog tag', async () => {
        const response = await request(app)
            .put(`${prefixPath}/blog-tags/${tagId}`)
            .send({ name: 'Updated Tag' });

        expect(response.status).toBe(200);
        expect(response.body.name).toBe('Updated Tag');
    });

    test('should delete a blog tag', async () => {
        const response = await request(app).delete(`${prefixPath}/blog-tags/${tagId}`);
        expect(response.status).toBe(200);
        expect(response.body.message).toBe('Tag deleted successfully');
    });
});

describe('Add blog interests from test data', () => {
    test('should create a new interest', async () => {
        // Create tags
        for (const interest of userInterestsData) {
            const interestResponse = await request(app)
                .post('/api/user-interests')
                .send({ name: interest.name });

            expect(interestResponse.status).toBe(201);
            expect(interestResponse.body.name).toBe(interest.name);
        }
    })
})
