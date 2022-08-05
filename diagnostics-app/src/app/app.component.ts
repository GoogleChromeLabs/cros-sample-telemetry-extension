// Copyright 2021 The Chromium Authors. All rights reserved.
// Use of this source code is governed by a BSD-style license that can be
// found in the LICENSE file.

/**
 * @fileoverview Global app.component which loads as the root component.
 * Imported by app.module.ts
 */

import { Component, HostBinding, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';

import { Theme } from 'src/app/core/enums/global.enums';
import { ThemeService } from './core/services/theme.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent implements OnInit {
  @HostBinding('class') private _cssClass!: Theme;
  private _themeSubscription!: Subscription;

  get cssClass() {
    return this._cssClass;
  }

  constructor(private _themeService: ThemeService) {}

  ngOnInit() {
    this._cssClass = this._themeService.theme;
    // listen to theme updates from themeService
    this._themeSubscription = this._themeService.subscribeOnThemeChange(
      (theme: Theme) => {
        this._cssClass = theme;
      }
    );
  }

  ngOnDestroy() {
    this._themeSubscription.unsubscribe();
  }
}
