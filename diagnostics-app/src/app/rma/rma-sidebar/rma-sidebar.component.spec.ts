/**
 * Copyright 2024 Google LLC
 *
 * Use of this source code is governed by a BSD-style
 * license that can be found in the LICENSE file or at
 * https://developers.google.com/open-source/licenses/bsd
 */

import {ComponentFixture, TestBed} from '@angular/core/testing';

import {RmaSidebarComponent} from './rma-sidebar.component';

describe('RmaSidebarComponent', () => {
  let component: RmaSidebarComponent;
  let fixture: ComponentFixture<RmaSidebarComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [RmaSidebarComponent],
    });
    fixture = TestBed.createComponent(RmaSidebarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
