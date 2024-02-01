// Copyright 2022 The Chromium Authors. All rights reserved.
// Use of this source code is governed by a BSD-style license that can be
// found in the LICENSE file.

/**
 * @fileoverview Defines the Header component.
 * Imported by app.module.ts
 */

import {Component, EventEmitter, Input, Output} from '@angular/core';
import {MatSlideToggleChange} from '@angular/material/slide-toggle';
import {Router} from '@angular/router';
import {Theme} from 'app/core/enums/global.enums';
import {ThemeService} from 'app/core/services/theme.service';
import {APP_NAME} from 'common/config';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css'],
})
export class HeaderComponent {
  @Input() showToggleSideNavButton = true; // Default to showing the toggle button
  @Output() toggleDrawer = new EventEmitter<void>();
  readonly appName = APP_NAME;

  get isSupportAssistMode(): boolean {
    return this.router.url.startsWith('/support-assist');
  }

  public constructor(
    private themeService: ThemeService,
    private router: Router,
  ) {}

  public onToggleTheme() {
    this.themeService.toggleTheme();
  }

  public onToggleDrawer() {
    this.toggleDrawer.emit();
  }

  public onToggleModeChange(event: MatSlideToggleChange) {
    if (event.checked) {
      this.router.navigateByUrl('/support-assist');
    } else {
      this.router.navigateByUrl('/rma');
    }
  }

  public isDarkModeActivated() {
    return this.themeService.theme === Theme.DARK;
  }
}
