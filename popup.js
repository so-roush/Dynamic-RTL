'use strict';

// Browser polyfill for cross-browser compatibility
const browserAPI = typeof browser !== 'undefined' ? browser : chrome;

document.addEventListener('DOMContentLoaded', function () {
  const siteToggle = document.getElementById('site-toggle');
  const defaultEnabledRadio = document.getElementById('default-enabled');
  const defaultDisabledRadio = document.getElementById('default-disabled');
  const currentSiteElement = document.getElementById('current-site');

  let currentHostname = '';
  let defaultEnabled = true;

  // Get current tab information
  browserAPI.runtime.sendMessage({ action: 'getCurrentTabInfo' }, function (response) {
    if (response) {
      currentHostname = response.hostname;
      currentSiteElement.textContent = currentHostname;
      siteToggle.checked = response.isEnabled;
      defaultEnabled = response.defaultEnabled;

      // Set the correct radio button based on the default mode
      if (defaultEnabled) {
        defaultEnabledRadio.checked = true;
      } else {
        defaultDisabledRadio.checked = true;
      }
    }
  });

  // Handle site toggle change
  siteToggle.addEventListener('change', function () {
    const isEnabled = this.checked;

    browserAPI.runtime.sendMessage({
      action: 'toggleSite',
      hostname: currentHostname,
      enabled: isEnabled
    }, function (response) {
      if (response && response.success) {
        console.log(`Site ${currentHostname} is now ${isEnabled ? 'enabled' : 'disabled'}`);
      }
    });
  });

  // Handle default mode radio button changes
  defaultEnabledRadio.addEventListener('change', function () {
    if (this.checked) {
      setDefaultMode(true);
    }
  });

  defaultDisabledRadio.addEventListener('change', function () {
    if (this.checked) {
      setDefaultMode(false);
    }
  });

  // Function to set the default mode
  function setDefaultMode(isEnabled) {
    browserAPI.runtime.sendMessage({
      action: 'toggleDefaultMode',
      defaultEnabled: isEnabled
    }, function (response) {
      if (response && response.success) {
        defaultEnabled = isEnabled;

        // Refresh site toggle status after changing default mode
        browserAPI.runtime.sendMessage({ action: 'getCurrentTabInfo' }, function (response) {
          if (response) {
            siteToggle.checked = response.isEnabled;
          }
        });

        console.log(`Default mode is now ${isEnabled ? 'enabled' : 'disabled'} for all sites`);
      }
    });
  }
}); 