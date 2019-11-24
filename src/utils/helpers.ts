import {FormValidationError, ServerUnreachableError, UnauthorizedError} from "./errors";

/**
 * API Request handler
 * @param url - api endpoint
 * @param method - http method
 * @param bodyParams - body parameters of request
 * @param bearerToken
 */
export const apiRequest = async (
    url: string,
    method: string,
    bodyParams?: object | null,
    bearerToken?: string
): Promise<any> => {
    try {
        const response = await fetch(url, {
            method,
            headers: {
                Accept: "application/json",
                "Content-Type": "application/json",
                ...(bearerToken && {Authorization: "Bearer " + bearerToken})
            },
            body: bodyParams ? JSON.stringify(bodyParams) : undefined
        });
        return {
            ...(response.status !== 204 && {...await response.json()}),
            status_code: response.status
        };
    } catch (e) {
        if (e.message === "Failed to fetch") {
            throw new ServerUnreachableError("The API is unreachable, is the server up ?");
        } else {
            console.error(e)
        }
    }
};

export const handleApiErrors = (response: any) => {
    if (response.status_code === 401) {
        throw new UnauthorizedError(response.message)
    } else if (response.status_code === 422) {
        throw new FormValidationError(response.errors)
    } else if (response.status_code === 500) {
        console.error(response);
    } else {
        console.error(response.status_code);
        console.error(response);
    }
};


