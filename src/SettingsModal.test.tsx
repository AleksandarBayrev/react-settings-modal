import React from 'react';
import renderer from 'react-test-renderer';
import { SettingsModal } from './SettingsModal';
import { MessagePublisher } from './utils/MessagePublisher';

describe('SettingsModal', () => {
    it('renders with settings on', () => {
        const component = renderer.create(<SettingsModal
            messagePublisher={new MessagePublisher}
            state={{
                isAPIEnabled: false,
                defaultText: 'Hello there'
        }} />).toJSON();
        expect(component).toMatchSnapshot();
    });
    it('renders with settings off', () => {
        const component = renderer.create(<SettingsModal
            messagePublisher={new MessagePublisher}
            state={{
                isAPIEnabled: true,
                defaultText: 'Hello there'
        }} />).toJSON();
        expect(component).toMatchSnapshot();
    });
})