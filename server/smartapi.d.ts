declare module "smartapi-javascript" {
    export class SmartAPI {
        constructor(config: { api_key: string });
        generateSession(
            clientCode: string,
            password: string,
            totp: string
        ): Promise<any>;
        placeOrder(orderParams: {
            variety: string;
            tradingsymbol: string;
            symboltoken: string;
            transactiontype: string;
            exchange: string;
            ordertype: string;
            producttype: string;
            duration: string;
            price: number;
            quantity: number;
        }): Promise<any>;
    }
}
