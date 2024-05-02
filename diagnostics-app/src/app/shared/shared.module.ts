/**
 * @fileoverview SharedModule exists to make commonly used components, directives
 * and pipes available for use in the templates of components in many other modules.
 * Imported by app.module.ts
 */

import {CommonModule} from '@angular/common';
import {NgModule} from '@angular/core';

import {HeaderComponent} from './header/header.component';
import {MaterialModule} from './material.module';

@NgModule({
  declarations: [HeaderComponent],
  imports: [CommonModule, MaterialModule],
  exports: [CommonModule, MaterialModule, HeaderComponent],
})
export class SharedModule {}
