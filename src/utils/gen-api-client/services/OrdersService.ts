/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { CancelablePromise } from '../core/CancelablePromise';
import type { BaseHttpRequest } from '../core/BaseHttpRequest';

export class OrdersService {

    constructor(public readonly httpRequest: BaseHttpRequest) {}

    /**
     * Return list of Pizza orders
     * Read the entire set of orders, sorted by timestamp.
     * @returns any Successfully read orders set operation
     * @throws ApiError
     */
    public ordersReadAll(): CancelablePromise<Array<{
        /**
         * Crust for the pizza
         */
        Crust: string;
        /**
         * Flavor of the pizza
         */
        Flavor: string;
        /**
         * Id of the order
         */
        Order_ID: number;
        /**
         * Size of the pizza
         */
        Size: string;
        /**
         * Customer's table number
         */
        Table_No: number;
        /**
         * Creation/Update timestamp of the order
         */
        Timestamp: string;
    }>> {
        return this.httpRequest.request({
            method: 'GET',
            url: '/orders',
        });
    }

    /**
     * Create an order
     * Create a new person
     * @param order Order to create
     * @returns any Successfully created order
     * @throws ApiError
     */
    public ordersCreate(
        order: {
            /**
             * Crust for the pizza
             */
            Crust?: string;
            /**
             * Flavor of the pizza
             */
            Flavor?: string;
            /**
             * Size of the pizza
             */
            Size?: string;
            /**
             * Customer's table number
             */
            Table_No?: number;
        },
    ): CancelablePromise<{
        /**
         * Crust for the pizza
         */
        Crust: string;
        /**
         * Flavor of the pizza
         */
        Flavor: string;
        /**
         * Id of the order
         */
        Order_ID: number;
        /**
         * Size of the pizza
         */
        Size: string;
        /**
         * Customer's table number
         */
        Table_No: number;
        /**
         * Creation/Update timestamp of the order
         */
        Timestamp: string;
    }> {
        return this.httpRequest.request({
            method: 'POST',
            url: '/orders',
            body: order,
        });
    }

    /**
     * Delete an order from the orders list
     * Delete an order
     * @param orderId ID of order to delete
     * @returns any Successfully deleted an order
     * @throws ApiError
     */
    public ordersDelete(
        orderId: number,
    ): CancelablePromise<any> {
        return this.httpRequest.request({
            method: 'DELETE',
            url: '/orders/{Order_ID}',
            path: {
                'Order_ID': orderId,
            },
        });
    }

}
