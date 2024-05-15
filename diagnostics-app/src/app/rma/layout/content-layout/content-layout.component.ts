/**
 * Copyright 2024 Google LLC
 *
 * Use of this source code is governed by a BSD-style
 * license that can be found in the LICENSE file or at
 * https://developers.google.com/open-source/licenses/bsd
 */

/**
 * @fileoverview Defines the Content Layout Component.
 * This is the root layout component which holds the entire app.
 * Imported by app.module.ts
 */

import {BreakpointObserver, Breakpoints} from '@angular/cdk/layout';
import {Component} from '@angular/core';

import {Observable} from 'rxjs';
import {map, shareReplay} from 'rxjs/operators';

@Component({
  selector: 'rma-app-content-layout',
  templateUrl: './content-layout.component.html',
  styleUrls: ['./content-layout.component.css'],
})
export class ContentLayoutComponent {
  isHandset$: Observable<boolean> = this.breakpointObserver
    .observe(Breakpoints.Handset)
    .pipe(
      map((result) => result.matches),
      shareReplay(),
    );

  public constructor(private breakpointObserver: BreakpointObserver) {}
}
