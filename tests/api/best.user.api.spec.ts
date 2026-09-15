import {test, expect, request} from "@playwright/test";
import { log } from "../helpers/logger.js";
import constants from "../../data/constants.json" with { type: "json" };
import TestData from "../../data/test-data.js";



test.describe("REST API Tests Demo", () => {
    // baseURL from test env ---> test.playwright.config.ts with hook, before each test set the baseURL.
    let envConfig = undefined;
    test.beforeEach("Get the env config", async ({ request }, testInfo) => {
        envConfig = testInfo.project.use as any;
    });
    //const baseURL = "https://reqres.in/api";
    test("Should get list of users", async({request}) => {
    //get call
    await log("info", `GET call to fetch all users using ${envConfig.apiURL}`);
    // endpoint it is a constant value so must be inserted in constants.json file    
    let resp = await request.get(`${envConfig.apiURL}${constants.REQ_RES_ENDPOINTS.GET_USERS_LIST}`, {
        headers:{
            //sensitive data like API key should not be hardcoded in the test, it will be stored in .env file and accessed using process.env.<env_variable_name>
            'x-api-key': process.env.REQ_RES_API_KEY   // This is the header for the API key, which is required for authentication. (documentation -->  https://reqres.in/)   
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
        //const baseURL = "https://reqres.in/api";
        await log("info", `POST call to create a new user using ${envConfig.apiURL}`);

        // payload stored in test-data.ts file and not hardcoded in the test file, so that it can be reused in other tests as well
        let postpayload = TestData.apiUserCreation()[0]  // returns an array of objects, so we are taking the first object from the array
        
        //post call
        let resp = await request.post(`${envConfig.apiURL}${constants.REQ_RES_ENDPOINTS.POST_USER}`, {
        headers:{
            'x-api-key': process.env.REQ_RES_API_KEY,   // This is the header for the API key, which is required for authentication. (documentation -->  https://reqres.in/)
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
