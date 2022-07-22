import { IMessagePublisher, MessagePublisherCallback } from "../interfaces";

export type MessagePublisherSubscriptions = {
    [key: string]: MessagePublisherCallback[]
}

export class MessagePublisher implements IMessagePublisher {
    private readonly subscriptions: MessagePublisherSubscriptions
    constructor() {
        this.subscriptions = {};
    }
    async publish(topic: string, data?: any): Promise<string> {
        if (!this.subscriptions[topic]) {

        }
        await Promise.all(this.subscriptions[topic].map(async (x) => await x(data)));
        return Promise.resolve('');
    }
    subscribe(topic: string, callback: MessagePublisherCallback): Promise<void> {
        if (!this.subscriptions[topic]) {
            this.subscriptions[topic] = [
                callback
            ];
            return Promise.resolve();
        }
        this.subscriptions[topic].push(callback);
        return Promise.resolve();
    }
    unsubscribeOne(topic: string): Promise<void> {
        if (!this.subscriptions[topic]) {
            return Promise.resolve();
        }
        this.subscriptions[topic].pop();
        return Promise.resolve();
    }
    unsubscribeAll(topic: string): Promise<void> {
        if (!this.subscriptions[topic]) {
            return Promise.resolve();
        }
        while (this.subscriptions[topic].length !== 0) {
            this.subscriptions[topic].pop();
        }
        return Promise.resolve();
    }

}