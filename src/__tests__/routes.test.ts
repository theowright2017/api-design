import supertest from "supertest";
import app from "../server";
import request from "supertest";

describe('GET /', () => {
    it('should send something back', async () => {
        const res = await supertest(app)
        .get('/')

        expect(res.body.message).toEqual('hello')
    })
})