import React from 'react';
import { localStorageKey } from './constants';
import { IMessagePublisher } from './interfaces';
import './styles.css';

export type SettingsModalProps = {
    messagePublisher: IMessagePublisher;
    state: SettingsModalState;
}

export type SettingsModalState = {
    isAPIEnabled: boolean;
    defaultText: string;
}

export class SettingsModal extends React.Component<SettingsModalProps, SettingsModalState> {
    private readonly messagePublisher: IMessagePublisher;
    public static readonly componentName: string = 'SettingsModal';
    constructor(props: SettingsModalProps) {
        super(props);
        this.messagePublisher = props.messagePublisher;
        this.state = {
            isAPIEnabled: props.state.isAPIEnabled,
            defaultText: props.state.defaultText
        };
    }

    private onSettingChange(settingName: keyof SettingsModalState, settingValue: any) {
        this.setState({
            [settingName]: settingValue
        } as SettingsModalState);
        setTimeout(async () => {
            window.localStorage.setItem(localStorageKey, JSON.stringify(this.state));
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
                        className='label-wrapper'
                        onClick={() => this.onSettingChange('isAPIEnabled', !this.state.isAPIEnabled)}
                    ><span className='label'>Is API Enabled</span></div>
                </div>
                <div className='settings-modal-default-text'>
                    <div className='text'>
                        <input
                            type='text'
                            onInput={(e) => this.onSettingChange('defaultText', (e.target as any).value)}
                            value={this.state.defaultText}
                            placeholder={'Default Text'}
                        />
                    </div>
                </div>
            </div>
        );
    }
}