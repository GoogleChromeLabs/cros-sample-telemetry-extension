/**
 * Copyright 2022 Google LLC
 *
 * Use of this source code is governed by a BSD-style
 * license that can be found in the LICENSE file or at
 * https://developers.google.com/open-source/licenses/bsd
 */

/**
 * @fileoverview Core service for managing theme related operations for the app.
 */

import {Inject, Injectable, Optional} from '@angular/core';
import {Subject, Subscription} from 'rxjs';
import {Theme} from '../enums/global.enums';

@Injectable({
  providedIn: 'root',
})
export class ThemeService {
  public theme!: Theme;
  private themeChangedSource = new Subject<Theme>();

  public constructor(@Inject('defaultTheme') @Optional() defaultTheme: Theme) {
    this.theme = defaultTheme || Theme.DARK;
  }

  public subscribeOnThemeChange(cb: (theme: Theme) => void): Subscription {
    return this.themeChangedSource.subscribe(cb);
  }

  // Executed by header component and publishes theme change events to entire
  // app.
  public toggleTheme() {
    this.theme = this.theme === Theme.LIGHT ? Theme.DARK : Theme.LIGHT;
    this.themeChangedSource.next(this.theme);
  }
}
