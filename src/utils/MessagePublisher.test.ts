import { IMessagePublisher } from "../interfaces";
import { MessagePublisher } from "./MessagePublisher";

describe('MessagePublisher', () => {
    let publisher: IMessagePublisher;
    beforeEach(() => {
        publisher = new MessagePublisher();
    })
    it('subscribes to topic', async () => {
        const callback = jest.fn();
        await publisher.subscribe('test', callback);
        expect((publisher as any)['subscriptions']['test'].length).toEqual(1)
    });
    it('subscribes to topic', async () => {
        const callback = jest.fn(async (data) => {});
        const data = {test: 1};
        await publisher.subscribe('test', callback);
        await publisher.publish('test', data);
        expect(callback).toHaveBeenCalledTimes(1);
        expect(callback).toHaveBeenCalledWith(data);
        await publisher.publish('test');
        expect(callback).toHaveBeenCalledTimes(2);
        expect(callback).toHaveBeenCalledWith(undefined);
    });
    it('unsubscribes a single callback from topic', async () => {
        const callback = jest.fn(async (data) => {});
        await publisher.subscribe('test', callback);
        await publisher.subscribe('test', callback);
        expect((publisher as any)['subscriptions']['test'].length).toEqual(2);
        await publisher.unsubscribeOne('test');
        expect((publisher as any)['subscriptions']['test'].length).toEqual(1);
        await publisher.unsubscribeOne('test');
        expect((publisher as any)['subscriptions']['test'].length).toEqual(0);
    });
    it('unsubscribes all callbacks from topic', async () => {
        const callback = jest.fn(async (data) => {});
        const data = {test: 1};
        for (let i = 0; i < 1000; i++) {
            await publisher.subscribe('test', callback);
        }
        expect((publisher as any)['subscriptions']['test'].length).toEqual(1000);
        await publisher.unsubscribeAll('test');
        expect((publisher as any)['subscriptions']['test'].length).toEqual(0);
    });
});