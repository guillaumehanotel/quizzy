import {apiRequest} from "./helpers";
import * as env from '../config/env';

const API_URL = env.MODE === "dev" ? env.DEV_API_URL : env.PRODUCTION_API_URL;

export async function registerUser(body: any) {
    return await apiRequest(API_URL + 'register', 'POST', body);
}

export async function loginUser(body: any) {
    return await apiRequest(API_URL + 'login', 'POST', body);
}
