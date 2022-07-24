export type MessagePublisherCallback = (data?: any) => Promise<void>

export interface IMessagePublisher {
    /**
     * Used to call the subscribed callbacks to the topic asynchronously.
     * @param topic the topic on which we subscribe and publish messages to
     * @param data the data to be used in the callbacks
     * @returns Promise with empty string
     */
    publish(topic: string, data?: any): Promise<string>;

    /**
     * Used to subscribe a given topic with a callback.
     * @param topic the topic on which we subscribe and publish messages to
     * @param callback the callback that will be added to the topic array
     * @returns Promise with void value
     */
    subscribe(topic: string, callback: MessagePublisherCallback): Promise<void>;

    /**
     * Unsubscribes the last callback subscribed to the topic 
     * @throws an error when no subscribers for the given topic are available
     * @param topic the topic on which we subscribe and publish messages to
     * @returns Promise with void value
     */
    unsubscribeOne(topic: string): Promise<void>;

    /**
     * Unsubscribes all callbacks subscribed to the topic 
     * @throws an error when no subscribers for the given topic are available
     * @param topic the topic on which we subscribe and publish messages to
     * @returns Promise with void value
     */
    unsubscribeAll(topic: string): Promise<void>;
}