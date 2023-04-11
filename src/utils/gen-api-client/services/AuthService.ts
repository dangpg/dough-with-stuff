/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { CancelablePromise } from '../core/CancelablePromise';
import type { BaseHttpRequest } from '../core/BaseHttpRequest';

export class AuthService {

    constructor(public readonly httpRequest: BaseHttpRequest) {}

    /**
     * Create an access token
     * Create an access token for user to login
     * @param auth token to create
     * @returns any Successfully created token
     * @throws ApiError
     */
    public authLogin(
        auth: {
            /**
             * password of user
             */
            password?: string;
            /**
             * username of user
             */
            username?: string;
        },
    ): CancelablePromise<{
        /**
         * access token
         */
        access_token: string;
    }> {
        return this.httpRequest.request({
            method: 'POST',
            url: '/auth',
            body: auth,
        });
    }

}
