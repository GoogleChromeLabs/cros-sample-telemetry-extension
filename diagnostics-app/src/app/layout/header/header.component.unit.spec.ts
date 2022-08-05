// Copyright 2022 The Chromium Authors. All rights reserved.
// Use of this source code is governed by a BSD-style license that can be
// found in the LICENSE file.

/**
 * @fileoverview Unit tests for header.component
 */

import { NO_ERRORS_SCHEMA } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { HeaderComponent } from './header.component';

describe('unit: component: header', () => {
  let component: HeaderComponent;
  let fixture: ComponentFixture<HeaderComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [HeaderComponent],
      schemas: [NO_ERRORS_SCHEMA],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(HeaderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
    expect(component.isDarkModeActivated()).toBeTrue();
  });

  it('calls onToggleTheme on button click', () => {
    spyOn(component, 'onToggleTheme');
    let button: HTMLButtonElement = fixture.debugElement.query(
      By.css('#btnToggleTheme')
    ).nativeElement;
    button.click();
    fixture.detectChanges();
    expect(component.onToggleTheme).toHaveBeenCalled();
  });

  it('should emit event on btnToggleDrawer click', () => {
    spyOn(component, 'onToggleDrawer').and.callThrough();
    spyOn(component.toggleDrawer, 'emit');

    let button: HTMLButtonElement = fixture.debugElement.query(
      By.css('#btnToggleDrawer')
    ).nativeElement;

    button.click();
    expect(component.onToggleDrawer).toHaveBeenCalled();
    expect(component.toggleDrawer.emit).toHaveBeenCalled();
  });
});
