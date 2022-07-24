import React from 'react';
import { IMessagePublisher } from './interfaces';
import { SettingsModal, SettingsModalState } from './SettingsModal';
import './styles.css';

export type SettingsModalWrapperProps = {
    messagePublisher: IMessagePublisher;
    state: SettingsModalState;
}

export type SettingsModalWrapperState = {
    isModalOpen: boolean;
}

export class SettingsModalWrapper extends React.Component<SettingsModalWrapperProps, SettingsModalWrapperState> {
    private settingsStorage: SettingsModalState
    public static readonly componentName: string = 'SettingsModalWrapper'
    constructor(props: SettingsModalWrapperProps) {
        super(props);
        this.state = {
            isModalOpen: false            
        };
        this.settingsStorage = this.props.state;
        this.props.messagePublisher.subscribe('settingsUpdated', async (state: SettingsModalState) => {
            this.settingsStorage = state;
        });
    }

    private openModal() {
        this.setState({
            isModalOpen: true
        });
    }

    private closeModal() {
        this.setState({
            isModalOpen: false
        });
    }

    render() {
        return (
            <div className='settings-modal-wrapper'>
                <div className='open-modal' onClick={() => this.openModal()}>
                    <span className='label'>Open modal</span>
                </div>
                <div className='close-modal' onClick={() => this.closeModal()}>
                    <span className='label'>Close modal</span>
                </div>
                {this.state.isModalOpen ? <SettingsModal messagePublisher={this.props.messagePublisher} state={this.settingsStorage} /> : <></>}
            </div>
        )
    }
}