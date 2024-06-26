/**
 * Copyright 2022 Google LLC
 *
 * Use of this source code is governed by a BSD-style
 * license that can be found in the LICENSE file or at
 * https://developers.google.com/open-source/licenses/bsd
 */

/**
 * @fileoverview Unit tests for theme.service
 */

import {TestBed} from '@angular/core/testing';

import {Theme} from '../enums/global.enums';
import {ThemeService} from './theme.service';

describe('unit: service: theme', () => {
  let service: ThemeService;

  it('should be created', () => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ThemeService);
    expect(service).toBeTruthy();
    // Default mode should be dark.
    expect(service.theme).toBe(Theme.DARK);
  });

  it('should switch from dark to light', () => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ThemeService);
    expect(service.theme).toBe(Theme.DARK);
    service.toggleTheme();
    expect(service.theme).toBe(Theme.LIGHT);
  });

  it('should switch from light to dark', () => {
    TestBed.configureTestingModule({
      // Passes defaultTheme to ThemeService constructor.
      providers: [{provide: 'defaultTheme', useValue: Theme.LIGHT}],
    });
    service = TestBed.inject(ThemeService);
    expect(service.theme).toBe(Theme.LIGHT);
    service.toggleTheme();
    expect(service.theme).toBe(Theme.DARK);
  });
});
