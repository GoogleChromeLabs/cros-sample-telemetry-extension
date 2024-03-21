import {KeyValue} from '@angular/common';
import {Component, Input} from '@angular/core';

@Component({
  selector: 'app-json-viewer',
  templateUrl: './json-viewer.component.html',
  styleUrls: ['./json-viewer.component.css'],
})
export class JsonViewerComponent {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  @Input({required: true}) output!: any;
  @Input({required: true}) level!: number;

  // This function is used for maintaining the attributes' original order.
  /* eslint-disable @typescript-eslint/no-unused-vars */
  public originalOrder(
    a: KeyValue<number, string>,
    b: KeyValue<number, string>,
  ): number {
    return 0;
  }
  /* eslint-enable @typescript-eslint/no-unused-vars */

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  public isPrimitiveType(a: any) {
    return typeof a !== 'object';
  }
}
