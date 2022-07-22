import React from 'react';
import { sessionStorageKey } from './constants';

export type SettingsModalProps = {
    isAPIEnabled: boolean;
}

export type SettingsModalState = {
    isAPIEnabled: boolean;
}

export class SettingsModal extends React.Component<SettingsModalProps, SettingsModalState> {
    private checkboxRef: React.LegacyRef<HTMLInputElement> | null = null;
    constructor(props: SettingsModalProps) {
        super(props);
        this.checkboxRef = React.createRef();
        this.state = {
            isAPIEnabled: props.isAPIEnabled
        };
    }

    private onSettingChange(settingName: keyof SettingsModalState, settingValue: any, checkboxRef: React.LegacyRef<HTMLInputElement> | null = null) {
        this.setState({
            [settingName]: settingValue
        });
        setTimeout(() => {
            window.sessionStorage.setItem(sessionStorageKey, JSON.stringify(this.state));
            if (checkboxRef) {
                (checkboxRef as any).checked = Boolean(settingValue)
            }
        });
    }

    render(): React.ReactNode {
        return (
            <div className='settings-modal-container'>
                <div className='settings-modal-api-enabled'>
                    <div className='checkbox'>
                        <input 
                            ref={this.checkboxRef}
                            type='checkbox'
                            onChange={(e) => this.onSettingChange('isAPIEnabled', !this.state.isAPIEnabled)}
                            checked={this.state.isAPIEnabled}
                        />
                    </div>
                    <div
                        className='label'
                        onClick={() => this.onSettingChange('isAPIEnabled', !this.state.isAPIEnabled, this.checkboxRef)}
                    >Is API Enabled</div>
                </div>
            </div>
        )
    }
}