import * as request from 'request';
export declare type RequestAsyncResponse = {
    error?: any;
    response?: request.RequestResponse;
    body?: any;
};
export declare const RequestAsync: (options: any) => Promise<RequestAsyncResponse>;
