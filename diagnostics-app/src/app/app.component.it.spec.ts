// Copyright 2021 The Chromium Authors. All rights reserved.
// Use of this source code is governed by a BSD-style license that can be
// found in the LICENSE file.

/**
 * @fileoverview Integration tests for app.component
 */

import { NO_ERRORS_SCHEMA } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';

import { Theme } from './core/enums/global.enums';
import { ThemeService } from './core/services/theme.service';

import { AppComponent } from './app.component';

describe('integration: component: app', () => {
  let fixture: ComponentFixture<AppComponent>;
  let component: AppComponent;
  let themeService: ThemeService;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RouterTestingModule],
      declarations: [AppComponent],
      schemas: [NO_ERRORS_SCHEMA],
      providers: [ThemeService],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AppComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
    themeService = TestBed.inject(ThemeService);
  });

  it('set cssClass on receiving update from themeService', () => {
    expect(component.cssClass).toBe(Theme.DARK);
    themeService.toggleTheme();
    fixture.detectChanges();
    expect(component.cssClass).toBe(Theme.LIGHT);
  });
});
