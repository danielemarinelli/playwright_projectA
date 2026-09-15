import {test, expect, request} from "@playwright/test";
import { log } from "../helpers/logger.js";

// not best practice hardcoding the baseURL in the test, but for demo purpose we are doing it here. In real world scenario, we can use env variable or config file to store the baseURL. Another spec file is created to test the baseURL and other env variables.
test.describe("REST API Tests Demo", () => {
    const baseURL = "https://reqres.in/api";
    test("Should get list of users", async({request}) => {
    //get call
    await log("info", `GET call to fetch all users using ${baseURL}`);
    let resp = await request.get(`${baseURL}/users?page=2`, {
        headers:{
            'x-api-key': 'reqres-free-v1'   // This is the header for the API key, which is required for authentication. (documentation -->  https://reqres.in/)
            }
        })  
        // Assert status code
        expect(resp.status()).toBe(200)  
        await log("info", `The GET call is succesfull with ${resp.status()}`)

        //Get list of users
        const userData = await resp.json()
        await log("info", `List of users: ${JSON.stringify(userData)}`)
    });

    test("Should create a new user", async({request}) => {
        const baseURL = "https://reqres.in/api";
        await log("info", `POST call to create a new user using ${baseURL}`);

        let postpayload = {
            "name": "Josh Allen",
            "job": "NFL Quarterback",
            "id": "17",
            "createdAt": "2026-09-05T12:00:00.000Z"
        }
        //post call
        let resp = await request.post(`${baseURL}/users`, {
        headers:{
            'x-api-key': 'reqres-free-v1',   // This is the header for the API key, which is required for authentication. (documentation -->  https://reqres.in/)
            'Content-Type': 'application/json'
            },
        data: postpayload   // Playwright sends JSON automatically for objects
        }) 

        // Assert status code
        expect(resp.status()).toBe(201)  
        await log("info", `The POST call is succesfull with ${resp.status()}`)
        //Response post data 
        const respData = await resp.json()
        await log("info", `Response from POST call: ${JSON.stringify(respData)}`)
    })    
});
