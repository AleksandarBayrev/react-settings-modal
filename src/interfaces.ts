export type MessagePublisherCallback = (data?: any) => Promise<void>

export interface IMessagePublisher {
    publish(topic: string, data?: any): Promise<string>;
    subscribe(topic: string, callback: MessagePublisherCallback): Promise<void>;
    unsubscribeOne(topic: string): Promise<void>;
    unsubscribeAll(topic: string): Promise<void>;
}