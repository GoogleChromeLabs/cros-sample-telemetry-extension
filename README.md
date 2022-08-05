# cros-diag-app
Third party Diagnostics App for ChromeOS

# Source Code Headers
Every file containing source code must include copyright and license information. This includes any JS/CSS files that you might be serving out to browsers. (This is to help well-intentioned people avoid accidental copying that doesn't comply with the license.)

header:
```
// Copyright 2021 The Chromium Authors. All rights reserved.
// Use of this source code is governed by a BSD-style license that can be
// found in the LICENSE file.
```
# Instructions to set up project

### Prerequisite Configuration

- In the repository root, run   
1. ```git config --unset-all core.hooksPath```
2. ```git config --add core.hooksPath .githooks```

    This will set up `.githooks` as the default directory for git hooks in this repository.

- In case git hooks don't work as intended, run this command to set necessary permissions:  
 `cd .githooks && chmod +x *`  

### Diagnostics App PWA

1. ```cd diagnostics-app```
2. ```npm install```
3. ```ng serve```
