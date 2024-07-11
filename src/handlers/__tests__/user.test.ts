import { userInfo } from "os";
import app from "../../server";
import request from "supertest";
import { createNewUser } from "../user";

/** integration testing in Supertest */

describe("POST /user", function () {

  /**
   *  should use local db and clean before and after each
   */


	it("responds with json", async function () {
		const res = await request(app)
			.post("/user")
			.send({ username: "hello", password: "hola" })
			.set("Accept", "application/json");

		expect(res.headers["Content-Type"]).toMatch(/json/);
		expect(res.status).toEqual(200);
	});
  it('shoudl create new user', async () => {
    const req = {body: {username: 'hello', password: 'hi'}}
    const res = {json({token}) {
      expect(token).toBeTruthy()
    }}

    const newUser = await createNewUser(req, res, () => {

    })
  })
});
