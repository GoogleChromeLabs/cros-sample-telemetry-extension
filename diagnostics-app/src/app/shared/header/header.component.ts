/**
 * Copyright 2022 Google LLC
 *
 * Use of this source code is governed by a BSD-style
 * license that can be found in the LICENSE file or at
 * https://developers.google.com/open-source/licenses/bsd
 */

/**
 * @fileoverview Defines the Header component.
 * Imported by app.module.ts
 */

import {Component, EventEmitter, Input, Output} from '@angular/core';
import {MatSlideToggleChange} from '@angular/material/slide-toggle';
import {Router} from '@angular/router';
import {Theme} from 'app/core/enums/global.enums';
import {ThemeService} from 'app/core/services/theme.service';
import {APP_NAME} from 'common/config/common';
import {Request, RequestType} from 'common/message';
import {environment} from 'environments/environment';

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

  public onRequestPermission() {
    const message: Request = {
      type: RequestType.TELEMETRY,
      requestPermission: true,
    };
    const id = environment.extensionId;

    chrome.runtime.sendMessage(id, message, (response) => {
      if (chrome.runtime.lastError) {
        console.error(
          'Error sending message to extension:',
          chrome.runtime.lastError,
        );
      } else {
        console.log('Response from extension:', response);
      }
    });
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
