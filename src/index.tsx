import React from 'react';
import ReactDOM from 'react-dom/client';
import { sessionStorageKey } from './constants';
import { IMessagePublisher } from './interfaces';
import reportWebVitals from './reportWebVitals';
import { SettingsModalState } from './SettingsModal';
import { SettingsModalWrapper } from './SettingsModalWrapper';
import { MessagePublisher } from './utils/MessagePublisher';

const messagePublisher: IMessagePublisher = new MessagePublisher();
let isComponentRendered = false;
let root: ReactDOM.Root | undefined 
window.messagePublisherInstance = messagePublisher;
window.settingsModalConstants = {
  sessionStorageKey
};
window.RenderSettingsModal = function(elementId: string) {
  if (isComponentRendered) {
    throw new Error('Component SettingsModalState is already rendered!');
  }
  let modalSettingsStorage: string | null = window.sessionStorage.getItem(sessionStorageKey);
  let modalSettings: SettingsModalState = {
    isAPIEnabled: false
  };
  if (modalSettingsStorage) {
    modalSettings = JSON.parse(modalSettingsStorage);
  }
  if (!root) {
    root = ReactDOM.createRoot(
      document.getElementById(elementId) as HTMLElement
    );
  }
  root.render(
    <React.StrictMode>
      <SettingsModalWrapper 
        messagePublisher={messagePublisher}
        state={modalSettings}
      />
    </React.StrictMode>
  );
  isComponentRendered = true;
}

window.DestroySettingsModal = async function(elementId: string) {
  if (root) {
    root.unmount();
    isComponentRendered = false;
    await messagePublisher.unsubscribeAll('settingsUpdated');
    root = undefined;
  }
}

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
