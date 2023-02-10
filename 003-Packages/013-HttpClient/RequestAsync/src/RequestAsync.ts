
import * as request from 'request';

export type RequestAsyncResponse = { error ?: any, response ?: request.RequestResponse, body ?: any };
export const RequestAsync = async (options: request.Options) : Promise<RequestAsyncResponse> => {
    return new Promise<RequestAsyncResponse>((resolve, reject) => {
        request(options, (error, response, body) => {
            resolve({ error, response, body });
        });
    });
}