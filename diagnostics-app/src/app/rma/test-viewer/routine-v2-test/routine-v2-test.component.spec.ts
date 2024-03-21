import {ComponentFixture, TestBed} from '@angular/core/testing';

import {RoutineV2Category} from 'common/message';
import {RoutineV2TestComponent} from './routine-v2-test.component';

describe('RoutineV2TestComponent', () => {
  let component: RoutineV2TestComponent;
  let fixture: ComponentFixture<RoutineV2TestComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [RoutineV2TestComponent],
    });
    fixture = TestBed.createComponent(RoutineV2TestComponent);
    component = fixture.componentInstance;
    component.index = 0;
    component.title = 'test';
    component.argument = {category: RoutineV2Category.FAN, argument: {}};
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
