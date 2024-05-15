/**
 * Copyright 2024 Google LLC
 *
 * Use of this source code is governed by a BSD-style
 * license that can be found in the LICENSE file or at
 * https://developers.google.com/open-source/licenses/bsd
 */

export class PortService {
  private static instance: PortService | null = null;

  private ports: Map<string, chrome.runtime.Port> = new Map();

  private heartbeatInterval: null | ReturnType<typeof setInterval> = null;

  constructor() {}

  startHeartbeat() {
    this.heartbeatInterval = setInterval(() => {
      console.log('heartbeat');
      chrome.runtime.getPlatformInfo(() => {});
    }, 25 * 1000);
  }

  public static getInstance(): PortService {
    if (PortService.instance === null) {
      PortService.instance = new PortService();
    }
    return PortService.instance;
  }

  registerPort(port: chrome.runtime.Port) {
    if (this.heartbeatInterval === null) {
      this.startHeartbeat();
    }
    this.ports.set(port.name, port);
    port.onDisconnect.addListener((port) => {
      this.ports.delete(port.name);
      if (this.ports.size === 0 && this.heartbeatInterval !== null) {
        clearInterval(this.heartbeatInterval);
        this.heartbeatInterval = null;
      }
    });
  }

  getPort(portName: string): chrome.runtime.Port | undefined {
    return this.ports.get(portName);
  }
}
