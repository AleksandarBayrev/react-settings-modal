import React from 'react';
import renderer from 'react-test-renderer';
import { SettingsModal } from './SettingsModal';

describe('SettingsModal', () => {
    it('renders with settings on', () => {
        const component = renderer.create(<SettingsModal isAPIEnabled={true} />).toJSON();
        expect(component).toMatchSnapshot();
    });
    it('renders with settings off', () => {
        const component = renderer.create(<SettingsModal isAPIEnabled={false} />).toJSON();
        expect(component).toMatchSnapshot();
    });
})