/**
 * Copyright 2024 Google LLC
 *
 * Use of this source code is governed by a BSD-style
 * license that can be found in the LICENSE file or at
 * https://developers.google.com/open-source/licenses/bsd
 */

/**
 * @fileoverview chrome.os.events* types definitions.
 */

/**
 * Types of event categories
 */
export enum EventCategory {
  audio_jack = 'audio_jack',
  external_display = 'external_display',
  keyboard_diagnostic = 'keyboard_diagnostic',
  lid = 'lid',
  sd_card = 'sd_card',
  stylus_connected = 'stylus_connected',
  stylus_garage = 'stylus_garage',
  stylus_touch = 'stylus_touch',
  touchpad_button = 'touchpad_button',
  touchpad_connected = 'touchpad_connected',
  touchpad_touch = 'touchpad_touch',
  touchscreen_connected = 'touchscreen_connected',
  touchscreen_touch = 'touchscreen_touch',
  usb = 'usb',
  power = 'power',
}

/**
 * Types of event support status
 */
export enum EventSupportStatus {
  supported = 'supported',
  unsupported = 'unsupported',
}

/**
 * Response of chrome.os.events.isEventSupported(<EventCategory>)
 */
export interface EventSupportStatusInfo {
  status?: EventSupportStatus;
}

/**
 * Types of audio jack events
 */
export enum AudioJackEvent {
  connected = 'connected',
  disconnected = 'disconnected',
}

/**
 * Types of audio jack device types
 */
export enum AudioJackDeviceType {
  headphone = 'headphone',
  microphone = 'microphone',
}

/**
 * Types of keyboard connections
 */
export enum KeyboardConnectionType {
  internal = 'internal',
  usb = 'usb',
  bluetooth = 'bluetooth',
  unknown = 'unknown',
}

/**
 * Types of physical keyboard layouts
 */
export enum PhysicalKeyboardLayout {
  unknown = 'unknown',
  chrome_os = 'chrome_os',
}

/**
 * Types of mechanical keyboard layouts
 */
export enum MechanicalKeyboardLayout {
  unknown = 'unknown',
  ansi = 'ansi',
  iso = 'iso',
  jis = 'jis',
}

/**
 * Types of keyboard number pad presence
 */
export enum KeyboardNumberPadPresence {
  unknown = 'unknown',
  present = 'present',
  not_present = 'not_present',
}

/**
 * Types of keyboard top row keys
 */
export enum KeyboardTopRowKey {
  no_key = 'no_key',
  unknown = 'unknown',
  back = 'back',
  forward = 'forward',
  refresh = 'refresh',
  fullscreen = 'fullscreen',
  overview = 'overview',
  screenshot = 'screenshot',
  screen_brightness_down = 'screen_brightness_down',
  screen_brightness_up = 'screen_brightness_up',
  privacy_screen_toggle = 'privacy_screen_toggle',
  microphone_mute = 'microphone_mute',
  volume_mute = 'volume_mute',
  volume_down = 'volume_down',
  volume_up = 'volume_up',
  keyboard_backlight_toggle = 'keyboard_backlight_toggle',
  keyboard_backlight_down = 'keyboard_backlight_down',
  keyboard_backlight_up = 'keyboard_backlight_up',
  next_track = 'next_track',
  previous_track = 'previous_track',
  play_pause = 'play_pause',
  screen_mirror = 'screen_mirror',
  delete = 'delete',
}

/**
 * Types of keyboard top right keys
 */
export enum KeyboardTopRightKey {
  unknown = 'unknown',
  power = 'power',
  lock = 'lock',
  control_panel = 'control_panel',
}

/**
 * Info of keyboard
 */
export interface KeyboardInfo {
  id?: number;
  connectionType?: KeyboardConnectionType;
  name?: string;
  physicalLayout?: PhysicalKeyboardLayout;
  mechanicalLayout?: MechanicalKeyboardLayout;
  regionCode?: string;
  numberPadPresent?: KeyboardNumberPadPresence;
  topRowKeys: KeyboardTopRowKey[];
  topRightKey?: KeyboardTopRightKey;
  hasAssistantKey: boolean;
}

/**
 * Info of keyboard diagnostics event
 */
export interface KeyboardDiagnosticEventInfo {
  keyboardInfo?: KeyboardInfo;
  testedKeys: number[];
  testedTopRowKeys: number[];
}

/**
 * Types of lid events
 */
export enum LidEvent {
  closed = 'closed',
  opened = 'opened',
}

/**
 * Types of usb events
 */
export enum UsbEvent {
  connected = 'connected',
  disconnected = 'disconnected',
}

/**
 * Types of display inputs
 */
export enum DisplayInputType {
  unknown = 'unknown',
  digital = 'digital',
  analog = 'analog',
}

/**
 * Types of external display events
 */
export enum ExternalDisplayEvent {
  connected = 'connected',
  disconnected = 'disconnected',
}

/**
 * Types of sd card events
 */
export enum SdCardEvent {
  connected = 'connected',
  disconnected = 'disconnected',
}

/**
 * Types of power events
 */
export enum PowerEvent {
  ac_inserted = 'ac_inserted',
  ac_removed = 'ac_removed',
  os_suspend = 'os_suspend',
  os_resume = 'os_resume',
}

/**
 * Types of stylus garage events
 */
export enum StylusGarageEvent {
  inserted = 'inserted',
  removed = 'removed',
}

/**
 * Info of audio jack event
 */
export interface AudioJackEventInfo {
  event?: AudioJackEvent;
  deviceType?: AudioJackDeviceType;
}

/**
 * Info of lid event
 */
export interface LidEventInfo {
  event?: LidEvent;
}

/**
 * Info of usb event
 */
export interface UsbEventInfo {
  vendor?: string;
  name?: string;
  vid?: number;
  pid?: number;
  categories: string[];
  event?: UsbEvent;
}

/**
 * Info of external display
 */
export interface ExternalDisplayInfo {
  displayWidth?: number;
  displayHeight?: number;
  resolutionHorizontal?: number;
  resolutionVertical?: number;
  refreshRate?: number;
  manufacturer?: string;
  modelId?: number;
  serialNumber?: number;
  manufactureWeek?: number;
  manufactureYear?: number;
  edidVersion?: string;
  inputType: DisplayInputType;
  displayName?: string;
}

/**
 * Info of external display event
 */
export interface ExternalDisplayEventInfo {
  event?: ExternalDisplayEvent;
  display_info?: ExternalDisplayInfo;
}

/**
 * Info of sd card event
 */
export interface SdCardEventInfo {
  event?: SdCardEvent;
}

/**
 * Info of power event
 */
export interface PowerEventInfo {
  event?: PowerEvent;
}

/**
 * Info of stylus garage event
 */
export interface StylusGarageEventInfo {
  event?: StylusGarageEvent;
}

/**
 * Types of input touch buttons
 */
export enum InputTouchButton {
  left = 'left',
  middle = 'middle',
  right = 'right',
}

/**
 * Types of input touch button states
 */
export enum InputTouchButtonState {
  pressed = 'pressed',
  released = 'released',
}

/**
 * Info of touchpad button event
 */
export interface TouchpadButtonEventInfo {
  button?: InputTouchButton;
  state?: InputTouchButtonState;
}

/**
 * Info of touch point
 */
export interface TouchPointInfo {
  trackingId?: number;
  x?: number;
  y?: number;
  pressure?: number;
  touchMajor?: number;
  touchMinor?: number;
}

/**
 * Info of touchpad touch event
 */
export interface TouchpadTouchEventInfo {
  touchPoints: TouchPointInfo[];
}

/**
 * Info of touchpad connected event
 */
export interface TouchpadConnectedEventInfo {
  maxX?: number;
  maxY?: number;
  maxPressure?: number;
  buttons: InputTouchButton[];
}

/**
 * Info of touchscreen touch event
 */
export interface TouchscreenTouchEventInfo {
  touchPoints: TouchPointInfo[];
}

/**
 * Info of touchscreen connected event
 */
export interface TouchscreenConnectedEventInfo {
  maxX?: number;
  maxY?: number;
  maxPressure?: number;
}

/**
 * Info of stylus touch point
 */
export interface StylusTouchPointInfo {
  x?: number;
  y?: number;
  pressure?: number;
}

/**
 * Info of stylus touch point
 */
export interface StylusTouchEventInfo {
  touchPoint?: StylusTouchPointInfo;
}

/**
 * Info of stylus connected event
 */
export interface StylusConnectedEventInfo {
  maxX?: number;
  maxY?: number;
  maxPressure?: number;
}
