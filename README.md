# Dynamic RTL

A Chrome extension that automatically detects Persian/Arabic text on web pages and applies RTL (Right-to-Left) direction and appropriate font styling.

## Features

- Automatically detects Persian and Arabic text on any webpage
- Applies RTL direction and Vazirmatn font to detected text
- Only applies RTL to paragraphs that start with Persian/Arabic words
- Works with dynamic content that loads after the page is initially rendered
- Enhanced real-time detection for input fields, text areas, and contenteditable elements
- Option to disable the extension for specific websites
- Option to choose between default-enabled or default-disabled mode for all sites
- Compatible with Chrome's Manifest V3

## Installation

### From Chrome Web Store (Coming Soon)

1. Visit the Chrome Web Store
2. Search for "Dynamic RTL"
3. Click "Add to Chrome"

### From Firefox Add-ons (Coming Soon)

1. Visit the Firefox Add-ons website
2. Search for "Dynamic RTL"
3. Click "Add to Firefox"

### Manual Installation

#### Chrome

1. Download or clone this repository
2. Open Chrome and navigate to `chrome://extensions/`
3. Enable "Developer mode" in the top right corner
4. Click "Load unpacked" and select the folder containing the extension files
5. The extension should now be installed and active

#### Firefox

1. Download or clone this repository
2. For Firefox installation, you need to use the Firefox-specific manifest file:
   - Rename `manifest-firefox.json` to `manifest.json` temporarily (or make a copy with this name)
   - Or directly load the `manifest-firefox.json` file in the next step
3. Open Firefox and navigate to `about:debugging#/runtime/this-firefox`
4. Click "Load Temporary Add-on"
5. Navigate to the extension folder and select the `manifest.json` or `manifest-firefox.json` file
6. The extension should now be installed and active (note: this is a temporary installation that will be removed when Firefox is closed)

**Important Note**: If you want to use the extension in both Chrome and Firefox, keep separate copies of the extension folder with the appropriate manifest file for each browser.

For permanent installation in Firefox:
1. Make sure you're using the Firefox manifest file (`manifest-firefox.json` renamed to `manifest.json`)
2. Package the extension as a ZIP file
3. Visit `about:addons`
4. Click the gear icon and select "Install Add-on From File"
5. Select the ZIP file you created

## Usage

### Current Site Settings

- To enable or disable the extension on the current site, click on the extension icon in the toolbar and toggle the "Enabled on this site" switch
- Changes take effect immediately

### Global Settings

The extension has two default modes that you can switch between:

1. **Default Enabled on All Sites (with option to disable on specific sites)**:
   - In this mode, the extension is enabled on all sites unless you disable it on specific sites
   - To disable on a specific site, turn off the "Enabled on this site" switch

2. **Default Disabled on All Sites (with option to enable on specific sites)**:
   - In this mode, the extension is disabled on all sites unless you enable it on specific sites
   - To enable on a specific site, turn on the "Enabled on this site" switch

To switch between these two modes:
1. Click on the extension icon in the toolbar
2. Select one of the two radio button options in the "Global Settings" section

## Technical Details

- Uses MutationObserver to detect and process dynamically added content
- Enhanced text detection for input fields, text areas, and contenteditable elements
- Real-time RTL detection during typing in input fields
- Multiple event listeners (input, focus, blur, paste) for better text detection
- Smart detection that only applies RTL to text starting with Persian/Arabic words
- Implements Manifest V3 for Chrome extension compatibility
- Uses the Vazirmatn font for optimal Persian/Arabic text display

## Recent Improvements

### Version 1.2.0
- Added support for Firefox

### Version 1.1.0
- Changed the default mode selection from toggle switch to radio buttons
- Added X (Twitter) profile link
- Set "Default Enabled on All Sites" as the pre-selected option
- Added Vazirmatn font to the extension's user interface

### Version 1.0.0
- Added option to choose between default-enabled or default-disabled mode for all sites
- Added smart detection that only applies RTL to text starting with Persian/Arabic words
- Added real-time RTL detection for input fields and text areas
- Added support for contenteditable elements
- Improved handling of dynamically added input elements
- Enhanced CSS styling for better compatibility with various websites
- Added focus/blur/paste event handling for more reliable detection

## License

This project is open source and available under the MIT License.

## Credits

- Original script by Sorou-sh
- Vazirmatn font by Saber Rastikerdar
- Added Firefox compatibility by [sadegh19b](https://github.com/sadegh19b)

## Language

- [فارسی (Persian)](README.fa.md) 