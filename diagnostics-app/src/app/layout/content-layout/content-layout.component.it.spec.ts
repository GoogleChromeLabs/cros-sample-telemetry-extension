// Copyright 2022 The Chromium Authors. All rights reserved.
// Use of this source code is governed by a BSD-style license that can be
// found in the LICENSE file.

/**
 * @fileoverview Integration tests for Content Layout Component.
 */

import { NO_ERRORS_SCHEMA } from '@angular/core';
import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { MatSidenav } from '@angular/material/sidenav';
import { By } from '@angular/platform-browser';

import { SharedModule } from 'src/app/shared/shared.module';

import { HeaderComponent } from '../header/header.component';
import { ContentLayoutComponent } from './content-layout.component';

describe('integration: component ContentLayout', () => {
  let component: ContentLayoutComponent;
  let fixture: ComponentFixture<ContentLayoutComponent>;

  beforeEach(
    waitForAsync(() => {
      TestBed.configureTestingModule({
        imports: [SharedModule],
        declarations: [ContentLayoutComponent, HeaderComponent],
        schemas: [NO_ERRORS_SCHEMA],
      }).compileComponents();
    })
  );

  beforeEach(() => {
    fixture = TestBed.createComponent(ContentLayoutComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('opens the drawer on receiving toggleDrawer event', () => {
    let header = fixture.debugElement.query(By.directive(HeaderComponent));
    let drawerToggle: HTMLButtonElement = header.query(
      By.css('#btnToggleDrawer')
    ).nativeElement;
    let sidenavComponent: MatSidenav = fixture.debugElement.query(
      By.directive(MatSidenav)
    ).componentInstance;
    // sidenav should be closed by default
    expect(sidenavComponent.opened).toBeFalse();

    // should open the drawer
    drawerToggle.click();
    fixture.detectChanges();
    expect(sidenavComponent.opened).toBeTrue();

    // should close the drawer
    drawerToggle.click();
    fixture.detectChanges();
    // update handle
    sidenavComponent = fixture.debugElement.query(
      By.directive(MatSidenav)
    ).componentInstance;
    expect(sidenavComponent.opened).toBeFalse();
  });
});
