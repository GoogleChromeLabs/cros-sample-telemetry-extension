/**
 * Copyright 2022 Google LLC
 *
 * Use of this source code is governed by a BSD-style
 * license that can be found in the LICENSE file or at
 * https://developers.google.com/open-source/licenses/bsd
 */

/**
 * @fileoverview Integration tests for header.component
 */

import {NO_ERRORS_SCHEMA} from '@angular/core';
import {ComponentFixture, TestBed} from '@angular/core/testing';
import {By} from '@angular/platform-browser';
import {ThemeService} from 'app/core/services/theme.service';

import {HeaderComponent} from './header.component';

describe('integration: component: header', () => {
  let component: HeaderComponent;
  let fixture: ComponentFixture<HeaderComponent>;
  let service: ThemeService;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [HeaderComponent],
      providers: [ThemeService],
      schemas: [NO_ERRORS_SCHEMA],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(HeaderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
    service = TestBed.inject(ThemeService);
  });

  it('service should emit event on click', () => {
    const button: HTMLButtonElement = fixture.debugElement.query(
      By.css('#btnToggleTheme'),
    ).nativeElement;
    spyOn(service, 'toggleTheme').and.callThrough();
    expect(component.isDarkModeActivated()).toBeTrue();
    button.click();
    expect(service.toggleTheme).toHaveBeenCalled();
    expect(component.isDarkModeActivated()).toBeFalse();
  });

  it('renders correct theme icon', () => {
    let iconEl: HTMLElement = fixture.debugElement.query(
      By.css('#iconTheme'),
    ).nativeElement;
    const button: HTMLButtonElement = fixture.debugElement.query(
      By.css('#btnToggleTheme'),
    ).nativeElement;
    expect(component.isDarkModeActivated()).toBeTrue();
    // It renders on DOM as <mat-icon>light_mode</mat-icon>.
    expect(iconEl.textContent).toBe('light_mode');
    button.click();
    fixture.detectChanges();
    iconEl = fixture.debugElement.query(By.css('#iconTheme')).nativeElement;
    expect(component.isDarkModeActivated()).toBe(false);
    expect(iconEl.textContent).toBe('dark_mode');
  });
});
