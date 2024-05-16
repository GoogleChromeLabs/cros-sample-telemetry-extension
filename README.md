# ChromeOS reference Diagnostics app

This is the reference implementation for [ChromeOS Telemetry Extension API platform](https://chromium.googlesource.com/chromium/src/+/HEAD/docs/telemetry_extension/).


The reference app act as a guidance on how to build and utilize the telemetry extension service. 

## Source Code Headers
Every file containing source code must include copyright and license information. This includes any JS/CSS files that you might be serving out to browsers. (This is to help well-intentioned people avoid accidental copying that doesn't comply with the license.)

header:
```
Copyright 2022 Google LLC

Use of this source code is governed by a BSD-style
license that can be found in the LICENSE file or at
https://developers.google.com/open-source/licenses/bsd
```

# Background

The Telemetry Extension API provides a set of APIs that allows for telemetry, diagnostics and event detection. These APIs can only be utilized in production by allowlisted OEMs who have signed formal legal agreements. This project allows developers to test the API **in developer mode**.

# Installation

Visit the [wiki page](https://github.com/GoogleChromeLabs/cros-sample-telemetry-extension/wiki) to see various tutorials on setting up and running the project. 

# Code Contribution

- In the repository root, run
1. ```git config --unset-all core.hooksPath```
2. ```git config --add core.hooksPath .githooks```

    This will set up `.githooks` as the default directory for git hooks in this repository.

- In case git hooks don't work as intended, run this command to set necessary permissions:
 `cd .githooks && chmod +x *`

To run the code formatter on either the Diagnostics App or the Diagnostics extension project, Run:
```npm run format```
