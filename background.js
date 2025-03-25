'use strict';

// Browser polyfill for cross-browser compatibility
const browserAPI = typeof browser !== 'undefined' ? browser : chrome;

// Initialize extension settings when installed
browserAPI.runtime.onInstalled.addListener(() => {
  // Set default settings
  browserAPI.storage.sync.get(['disabledSites', 'enabledSites', 'defaultEnabled'], function (result) {
    // Initialize disabledSites if not exists
    if (!result.disabledSites) {
      browserAPI.storage.sync.set({ disabledSites: [] });
    }

    // Initialize enabledSites if not exists
    if (!result.enabledSites) {
      browserAPI.storage.sync.set({ enabledSites: [] });
    }

    // Initialize defaultEnabled if not exists (true = enabled by default)
    if (result.defaultEnabled === undefined) {
      browserAPI.storage.sync.set({ defaultEnabled: true });
    }
  });
});

// Listen for messages from popup or content scripts
browserAPI.runtime.onMessage.addListener((message, sender, sendResponse) => {
  if (message.action === 'getCurrentTabInfo') {
    browserAPI.tabs.query({ active: true, currentWindow: true }, (tabs) => {
      if (tabs && tabs[0]) {
        const url = new URL(tabs[0].url);
        const hostname = url.hostname;

        browserAPI.storage.sync.get(['disabledSites', 'enabledSites', 'defaultEnabled'], function (result) {
          const defaultEnabled = result.defaultEnabled !== undefined ? result.defaultEnabled : true;
          const disabledSites = result.disabledSites || [];
          const enabledSites = result.enabledSites || [];

          let isEnabled;

          if (defaultEnabled) {
            // Default enabled mode: site is enabled unless in disabledSites
            isEnabled = !disabledSites.includes(hostname);
          } else {
            // Default disabled mode: site is disabled unless in enabledSites
            isEnabled = enabledSites.includes(hostname);
          }

          sendResponse({
            hostname: hostname,
            isEnabled: isEnabled,
            defaultEnabled: defaultEnabled
          });
        });
      }
    });
    return true; // Keep the message channel open for the async response
  }

  if (message.action === 'toggleSite') {
    const hostname = message.hostname;
    const enabled = message.enabled;

    browserAPI.storage.sync.get(['disabledSites', 'enabledSites', 'defaultEnabled'], function (result) {
      const defaultEnabled = result.defaultEnabled !== undefined ? result.defaultEnabled : true;
      let disabledSites = result.disabledSites || [];
      let enabledSites = result.enabledSites || [];

      if (defaultEnabled) {
        // Default enabled mode
        if (enabled) {
          // Remove from disabled sites
          disabledSites = disabledSites.filter(site => site !== hostname);
        } else {
          // Add to disabled sites if not already there
          if (!disabledSites.includes(hostname)) {
            disabledSites.push(hostname);
          }
        }

        browserAPI.storage.sync.set({ disabledSites: disabledSites }, function () {
          updateContentScript(enabled, tabs => {
            sendResponse({ success: true });
          });
        });
      } else {
        // Default disabled mode
        if (enabled) {
          // Add to enabled sites if not already there
          if (!enabledSites.includes(hostname)) {
            enabledSites.push(hostname);
          }
        } else {
          // Remove from enabled sites
          enabledSites = enabledSites.filter(site => site !== hostname);
        }

        browserAPI.storage.sync.set({ enabledSites: enabledSites }, function () {
          updateContentScript(enabled, tabs => {
            sendResponse({ success: true });
          });
        });
      }
    });
    return true; // Keep the message channel open for the async response
  }

  if (message.action === 'toggleDefaultMode') {
    const defaultEnabled = message.defaultEnabled;

    browserAPI.storage.sync.set({ defaultEnabled: defaultEnabled }, function () {
      sendResponse({ success: true });
    });
    return true; // Keep the message channel open for the async response
  }
});

// Helper function to update content script
function updateContentScript(enabled, callback) {
  browserAPI.tabs.query({ active: true, currentWindow: true }, (tabs) => {
    if (tabs && tabs[0]) {
      browserAPI.tabs.sendMessage(tabs[0].id, {
        action: 'toggleSite',
        enabled: enabled
      }, () => {
        if (callback) callback(tabs);
      });
    }
  });
} 