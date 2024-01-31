// Copyright 2022 The Chromium Authors. All rights reserved.
// Use of this source code is governed by a BSD-style license that can be
// found in the LICENSE file.

/**
 * @fileoverview Integration tests for Content Layout Component.
 */

import {NO_ERRORS_SCHEMA} from '@angular/core';
import {ComponentFixture, TestBed, waitForAsync} from '@angular/core/testing';
import {MatSidenav} from '@angular/material/sidenav';
import {By} from '@angular/platform-browser';

import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {HeaderComponent} from '@shared/header/header.component';
import {SharedModule} from '@shared/shared.module';

import {ContentLayoutComponent} from './content-layout.component';

describe('integration: component ContentLayout', () => {
  let fixture: ComponentFixture<ContentLayoutComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      imports: [SharedModule, BrowserAnimationsModule],
      declarations: [ContentLayoutComponent],
      schemas: [NO_ERRORS_SCHEMA],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ContentLayoutComponent);
    fixture.detectChanges();
  });

  it('opens the drawer on receiving toggleDrawer event', () => {
    const header = fixture.debugElement.query(By.directive(HeaderComponent));
    const drawerToggle: HTMLButtonElement = header.query(
      By.css('#btnToggleDrawer'),
    ).nativeElement;
    let sidenavComponent: MatSidenav = fixture.debugElement.query(
      By.directive(MatSidenav),
    ).componentInstance;

    // Sidenav will be opened or closed by default depending on screen
    // resolution.
    const defaultSidenavIsOpened = sidenavComponent.opened;

    // Should flip the open state of the drawer.
    drawerToggle.click();
    fixture.detectChanges();
    expect(sidenavComponent.opened).toBe(!defaultSidenavIsOpened);

    // Should flip the open state of the drawer.
    drawerToggle.click();
    fixture.detectChanges();
    // Update handle.
    sidenavComponent = fixture.debugElement.query(
      By.directive(MatSidenav),
    ).componentInstance;
    expect(sidenavComponent.opened).toBe(defaultSidenavIsOpened);
  });
});
