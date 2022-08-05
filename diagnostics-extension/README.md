# ChromeOS Diagnotics Companion Extension

## Development Instructions

**Prerequisites**

1. NodeJS 14.0+

**Instructions**

1. `npm install`
2. `npm build`  
  The build command will re-build the extension in `build/` directory.
3. Head over to `chrome://extensions` and enable Developer Mode on the top right menu.
4. Now click on Load Unpacked and select the diagnostics-extension/build directory. This will load and start the extension on the device.

## Rebuild the extension

1. `npm run build`
2. Go to `chrome://extensions` and find the extension.
3. Press the `Refresh` button to reload the extension from source.
