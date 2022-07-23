import React from 'react';
import renderer from 'react-test-renderer';
import { SettingsModalWrapper } from './SettingsModalWrapper';
import { MessagePublisher } from './utils/MessagePublisher';

describe('SettingsModalWrapper', () => {
    it('does not render SettingsModal', () => {
        const component = renderer.create(<SettingsModalWrapper
            messagePublisher={new MessagePublisher}
            state={{
                isAPIEnabled: false
        }} />).toJSON();
        expect(component).toMatchSnapshot();
    });
    it('renders SettingsModal on clicking openModal', () => {
        const component = renderer.create(<SettingsModalWrapper
            messagePublisher={new MessagePublisher}
            state={{
                isAPIEnabled: false
        }} />);
        expect(component.toJSON()).toMatchSnapshot();
    });
})