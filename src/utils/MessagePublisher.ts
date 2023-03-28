import { IMessagePublisher, MessagePublisherCallback } from "../interfaces";

export type MessagePublisherSubscriptions = {
    [key: string]: MessagePublisherCallback[];
}

export class MessagePublisher implements IMessagePublisher {
    private readonly subscriptions: MessagePublisherSubscriptions
    constructor() {
        this.subscriptions = {};
    }

    /**
     * Used to call the subscribed callbacks to the topic asynchronously.
     * @param topic the topic on which we subscribe and publish messages to
     * @param data the data to be used in the callbacks
     * @returns Promise with empty string
     */
    async publish(topic: string, data?: any): Promise<string> {
        if (!this.subscriptions[topic]) {
            return Promise.reject(`No subscribers for ${topic} available`);
        }
        await Promise.all(this.subscriptions[topic].map((x) => x(data)));
        return Promise.resolve('');
    }

    /**
     * Used to subscribe a given topic with a callback.
     * @param topic the topic on which we subscribe and publish messages to
     * @param callback the callback that will be added to the topic array
     * @returns Promise with void value
     */
    subscribe(topic: string, callback: MessagePublisherCallback): Promise<void> {
        return new Promise((resolve, reject) => {
            setTimeout(() => {
                if (!this.subscriptions[topic]) {
                    this.subscriptions[topic] = [
                        callback
                    ];
                    return resolve();
                }
                this.subscriptions[topic].push(callback);
                return resolve();
            })
        });
    }

    /**
     * Unsubscribes the last callback subscribed to the topic 
     * @throws an error when no subscribers for the given topic are available
     * @param topic the topic on which we subscribe and publish messages to
     * @returns Promise with void value
     */
    unsubscribeOne(topic: string): Promise<void> {
        return new Promise((resolve, reject) => {
            setTimeout(() => {
                if (!this.subscriptions[topic]) {
                    return reject(`No subscribers for ${topic} available`);
                }
                this.subscriptions[topic].pop();
                return resolve();
            });
        });
    }

    /**
     * Unsubscribes all callbacks subscribed to the topic 
     * @throws an error when no subscribers for the given topic are available
     * @param topic the topic on which we subscribe and publish messages to
     * @returns Promise with void value
     */
    unsubscribeAll(topic: string): Promise<void> {
        return new Promise((resolve, reject) => {
            setTimeout(() => {
                if (!this.subscriptions[topic]) {
                    return reject(`No subscribers for ${topic} available`);
                }
                while (this.subscriptions[topic].length !== 0) {
                    this.subscriptions[topic].pop();
                }
                return resolve();
            });
        });
    }

}