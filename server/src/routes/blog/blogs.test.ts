// src/routes/blog/blogs.test.ts

import request from 'supertest';
import {app} from '../../server';
import { Blog } from '../../models/blog/blogs.model';
import { BlogTag } from '../../models/blog/blog-tag/blog-tags.model';
import {describe, expect, test, beforeAll, afterAll} from '@jest/globals';
import {response} from "express";
import fs from "fs";
import path from "path";
import {tunisianBlogs} from "./test-data/blog.data";

describe('Blog API', () => {
    let blogId: string;


    beforeAll( async () => {
        const response = await request(app)
            .post('/api/blogs')
            .field('title', 'Test Blog')
            .field('subtitle', 'Test Subtitle Blog')
            .field('excerpt', 'This is a test blog content.')
            .field('author', 'Test Author')
            .attach('image', Buffer.from('test image'), 'test.jpg');

        if (response.status !== 201) {
            console.log('Response body:', response.body);
        }

        expect(response.status).toBe(201);
        expect(response.body.title).toBe('Test Blog');
    });

    test('create tag',async () => {
        const tagResponse = await request(app)
            .post('/api/blog-tags')
            .send({ name: 'Test Tag', blog:blogId });
    });

    afterAll(async () => {
        await Blog.deleteMany({});
        await BlogTag.deleteMany({});
    });


    test('should retrieve all blogs', async () => {
        const response = await request(app).get('/api/blogs');
        console.log(response.body)
        expect(response.status).toBe(200);
        expect(response.body).toBeInstanceOf(Array);
    });

    test('should retrieve a blog by ID', async () => {
        const response = await request(app).get(`/api/blogs/${blogId}`);
        expect(response.status).toBe(200);
        expect(response.body._id).toBe(blogId);
    });

    test('should update a blog', async () => {
        const response = await request(app)
            .put(`/api/blogs/${blogId}`)
            .send({ title: 'Updated Blog' });

        expect(response.status).toBe(200);
        expect(response.body.title).toBe('Updated Blog');
    });

    test('should delete a blog', async () => {
        const response = await request(app).delete(`/api/blogs/${blogId}`);
        expect(response.status).toBe(200);
        expect(response.body.message).toBe('Blog deleted successfully');
    });



});

// Function to create a delay
const delay = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));
describe('Add blogs from test data', () => {
    // beforeEach(async () => {
    //     await Blog.deleteMany({});
    //     await BlogTag.deleteMany({});
    // });

    let counter = 0
    tunisianBlogs.forEach((blogData) => {
        counter++
        test(`should create blog titled "${blogData.title}" and associate tags`, async () => {
            const blogResponse = await request(app)
                .post('/api/blogs')
                .field('title', blogData.title)
                .field('description', blogData.description)
                .field('resume', blogData.resume)
                .field('city', blogData.city)
                .field('tags', blogData.tags)
                .field('author', blogData.author)
                .field('promoted', blogData.promoted)
                .attach(
                    'defaultImage',
                    fs.readFileSync(path.join(__dirname, blogData.principalImage)),
                    blogData.principalImage
                )
                .attach(
                    'smallImage',
                    fs.readFileSync(path.join(__dirname, blogData.principalImage)),
                    blogData.principalImage
                )
                .attach(
                    'mediumImage',
                    fs.readFileSync(path.join(__dirname, blogData.principalImage)),
                    blogData.principalImage
                )
                .attach(
                    'largeImage',
                    fs.readFileSync(path.join(__dirname, blogData.principalImage)),
                    blogData.principalImage
                );

            expect(blogResponse.status).toBe(201);
            const createdBlogId = blogResponse.body._id;
            expect(blogResponse.body.title).toBe(blogData.title);
            expect(blogResponse.body.resume).toBe(blogData.resume);
            expect(blogResponse.body.promoted).toBe(blogData.promoted);

            // // Create and associate tags with the newly created blog
            // for (const tagName of blogData.tags) {
            //     const tagResponse = await request(app)
            //         .post('/api/blog-tags')
            //         .send({ name: tagName, blog: createdBlogId });
            //
            //     expect(tagResponse.status).toBe(201);
            //     expect(tagResponse.body.name).toBe(tagName);
            // }

            // Create and associate tags with the newly created blog
            if (blogData.images){
                for (const img of blogData.images) {
                    let imgResponse;
                    img.size?
                    imgResponse = await request(app)
                        .post(`/api/blog-images/${createdBlogId}`)
                        .field('size', img.size)
                        .attach(
                            'image',
                            fs.readFileSync(path.join(__dirname, img.image)),
                            img.image
                        )
                    :
                        imgResponse = await request(app)
                            .post(`/api/blog-images/${createdBlogId}`)
                            .attach(
                                'image',
                                fs.readFileSync(path.join(__dirname, img.image)),
                                img.image
                            )

                    expect(imgResponse.status).toBe(201);
                    // expect(imgResponse.body.image).toBe(img.image);
                }
            }
        });
    });
});
