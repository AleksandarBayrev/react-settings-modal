import React from 'react';
import { sessionStorageKey } from './constants';
import { IMessagePublisher } from './interfaces';

export type SettingsModalProps = {
    messagePublisher: IMessagePublisher
    state: SettingsModalState
}

export type SettingsModalState = {
    isAPIEnabled: boolean;
}

export class SettingsModal extends React.Component<SettingsModalProps, SettingsModalState> {
    private readonly messagePublisher: IMessagePublisher;
    constructor(props: SettingsModalProps) {
        super(props);
        this.messagePublisher = props.messagePublisher;
        this.state = {
            isAPIEnabled: props.state.isAPIEnabled
        };
    }

    private onSettingChange(settingName: keyof SettingsModalState, settingValue: any) {
        this.setState({
            [settingName]: settingValue
        });
        setTimeout(async () => {
            window.sessionStorage.setItem(sessionStorageKey, JSON.stringify(this.state));
            await this.messagePublisher.publish('settingsUpdated', this.state);
        });
    }

    render(): React.ReactNode {
        return (
            <div className='settings-modal-container'>
                <div className='settings-modal-api-enabled'>
                    <div className='checkbox'>
                        <input 
                            type='checkbox'
                            onChange={(e) => this.onSettingChange('isAPIEnabled', !this.state.isAPIEnabled)}
                            checked={this.state.isAPIEnabled}
                        />
                    </div>
                    <div
                        className='label'
                        onClick={() => this.onSettingChange('isAPIEnabled', !this.state.isAPIEnabled)}
                    >Is API Enabled</div>
                </div>
            </div>
        )
    }
}