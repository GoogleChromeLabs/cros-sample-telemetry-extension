# ChromeOS reference Diagnostics app

This is the reference implementation for [ChromeOS Extension API platform](https://chromium.googlesource.com/chromium/src/+/HEAD/docs/telemetry_extension/) which enables 3rd party to build their own app on the top of it. 

<!---
TODO: Give rough idea about PWA + extension and IWA + extension and overview?
TODO: Do we have public doc about how to run PWA + extension and IWA + extension? The following is focusing on building code.
-->

## Source Code Headers
Every file containing source code must include copyright and license information. This includes any JS/CSS files that you might be serving out to browsers. (This is to help well-intentioned people avoid accidental copying that doesn't comply with the license.)

header:
```
// Copyright 2022 The Chromium Authors. All rights reserved.
// Use of this source code is governed by a BSD-style license that can be
// found in the LICENSE file.
```

# Instructions to set up project

### Prerequisite Configuration for code contribution (optional)

- In the repository root, run
1. ```git config --unset-all core.hooksPath```
2. ```git config --add core.hooksPath .githooks```

    This will set up `.githooks` as the default directory for git hooks in this repository.

- In case git hooks don't work as intended, run this command to set necessary permissions:
 `cd .githooks && chmod +x *`

To run the code formatter on either the Diagnostics App or the Diagnostics extension project, Run:
```npm run format```

### Diagnostics App PWA

1. ```cd diagnostics-app```
2. ```npm ci```
3. ```npm run build```

At this point, you should be able to see a folder with all the resources in `diagnostics-app/dist/diagnostics-app` directory. You can now open a server to serve these resources to the client.

To develop against a real extension, you should make sure the URL is allowlisted and the url-scheme is secure (HTTPS).

See the link below for more information on how to configure the PWA.
https://chromium.googlesource.com/chromium/src/+/HEAD/docs/telemetry_extension/README.md

### Diagnostics App IWA

1. ```cd diagnostics-app```
2. ```npm ci```
3. ```npm run build```

At this point, you should be able to see a `sample-iwa.swbn` file. This file is directly installable as an IWA image.


### Diagnostics Extension

1. ```cd diagnostics-extension```
2. ```npm ci```
3. ```npm run build```

At this point, all the resources needed for the extension will be in `diagnostics-extension/build`.

Copy the files into your chromeOS device, and try to load an unpacked extension from the `chrome://extensions` page.

See the link below for more information on how to configure the extension.
https://chromium.googlesource.com/chromium/src/+/HEAD/docs/telemetry_extension/README.md

### Common Issues
If you are having trouble installing or accessing the correct API, below are some common issues.

Check that each item is configured correctly.
1. The extension ID is an allowlisted ID. You can view the extension ID on the `chrome://extensions` page.
2. The PWA/IWA origin is an allowlisted origin.
3. The PWA origin is using a secure protocol (HTTPS).
4. The file permissions are set to be `r+x` for the `chronos` user for all the build folders and files.
5. The `externally_connectable` attribute matches the PWA/IWA origin.
