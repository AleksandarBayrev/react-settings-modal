declare interface Window {
    RenderSettingsModal(elementId: string): void
    messagePublisherInstance: import('./interfaces').IMessagePublisher
    settingsModalConstants: typeof import('./constants')
}