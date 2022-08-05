// Copyright 2022 The Chromium Authors. All rights reserved.
// Use of this source code is governed by a BSD-style license that can be
// found in the LICENSE file.

/**
 * @fileoverview Defines interfaces and data for items to be displayed
 * in the side-nav component.
 */

export interface NavigationItem {
  icon: string;
  link: string;
  name: string;
}

export interface NavigationList {
  header?: string;
  items: NavigationItem[];
  hasHeader: boolean;
}

export const DASHBOARD_NAV_DATA: NavigationList = {
  hasHeader: false,
  items: [{ icon: 'laptop_chromebook', link: '/dashboard', name: 'Dashboard' }],
};

export const DIAGNOSTICS_NAV_DATA: NavigationList = {
  hasHeader: true,
  header: 'Diagnostics',
  items: [
    {
      icon: 'battery_full',
      link: '/diagnostics/battery',
      name: 'Battery',
    },
  ],
};
