import { IMessagePublisher, MessagePublisherCallback } from "../interfaces";

export type MessagePublisherSubscriptions = {
    [key: string]: MessagePublisherCallback[];
}

export class MessagePublisher implements IMessagePublisher {
    private readonly subscriptions: MessagePublisherSubscriptions
    constructor() {
        this.subscriptions = {};
    }
    async publish(topic: string, data?: any): Promise<string> {
        if (!this.subscriptions[topic]) {
            return Promise.reject(`No subscribers for ${topic} available`);
        }
        await Promise.all(this.subscriptions[topic].map(async (x) => await x(data)));
        return Promise.resolve('');
    }
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