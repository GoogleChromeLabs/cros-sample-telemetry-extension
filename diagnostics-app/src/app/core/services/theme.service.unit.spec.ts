// Copyright 2021 The Chromium Authors. All rights reserved.
// Use of this source code is governed by a BSD-style license that can be
// found in the LICENSE file.

/**
 * @fileoverview Unit tests for theme.service
 */

import { TestBed } from '@angular/core/testing';

import { Theme } from '../enums/global.enums';
import { ThemeService } from './theme.service';

describe('unit: service: theme', () => {
  let service: ThemeService;

  it('should be created', () => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ThemeService);
    expect(service).toBeTruthy();
    // default mode should be dark
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
      // passes defaultTheme to ThemeService constructor
      providers: [{ provide: 'defaultTheme', useValue: Theme.LIGHT }],
    });
    service = TestBed.inject(ThemeService);
    expect(service.theme).toBe(Theme.LIGHT);
    service.toggleTheme();
    expect(service.theme).toBe(Theme.DARK);
  });
});
