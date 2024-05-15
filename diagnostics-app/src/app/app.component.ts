/**
 * Copyright 2022 Google LLC
 *
 * Use of this source code is governed by a BSD-style
 * license that can be found in the LICENSE file or at
 * https://developers.google.com/open-source/licenses/bsd
 */

/**
 * @fileoverview Global app.component which loads as the root component.
 * Imported by app.module.ts
 */

import {Component, HostBinding, OnInit} from '@angular/core';
import {Subscription} from 'rxjs';

import {Theme} from 'app/core/enums/global.enums';
import {ThemeService} from './core/services/theme.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent implements OnInit {
  @HostBinding('class') public cssClass!: Theme;
  private themeSubscription!: Subscription;

  public constructor(private themeService: ThemeService) {}

  ngOnInit() {
    this.cssClass = this.themeService.theme;
    // Listen to theme updates from themeService.
    this.themeSubscription = this.themeService.subscribeOnThemeChange(
      (theme: Theme) => {
        this.cssClass = theme;
      },
    );
  }

  ngOnDestroy() {
    this.themeSubscription.unsubscribe();
  }
}
