import React from 'react';
import ReactDOM from 'react-dom/client';
import { sessionStorageKey } from './constants';
import reportWebVitals from './reportWebVitals';
import { SettingsModal, SettingsModalState } from './SettingsModal';

window.RenderSettingsModal = function(elementId: string) {
  let modalSettingsStorage: string | null = window.sessionStorage.getItem(sessionStorageKey);
  let modalSettings: SettingsModalState = {
    isAPIEnabled: false
  };
  if (modalSettingsStorage) {
    modalSettings = JSON.parse(modalSettingsStorage);
  }
  const root = ReactDOM.createRoot(
    document.getElementById(elementId) as HTMLElement
  );
  root.render(
    <React.StrictMode>
      <SettingsModal isAPIEnabled={modalSettings.isAPIEnabled} />
    </React.StrictMode>
  );
}

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
