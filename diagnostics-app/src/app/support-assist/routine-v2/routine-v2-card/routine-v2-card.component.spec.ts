import {ComponentFixture, TestBed} from '@angular/core/testing';

import {RoutineV2Service} from 'app/core/services/routine-v2.service';
import {RoutineV2Category} from 'common/message';
import {CreateRoutineArgumentsUnion} from 'common/telemetry-extension-types/routines';
import {RoutineV2CardComponent} from './routine-v2-card.component';

describe('RoutineV2CardComponent', () => {
  let component: RoutineV2CardComponent;
  let fixture: ComponentFixture<RoutineV2CardComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [RoutineV2CardComponent],
      providers: [RoutineV2Service],
    });
    fixture = TestBed.createComponent(RoutineV2CardComponent);
    component = fixture.componentInstance;
    const testRoutineArgument: CreateRoutineArgumentsUnion = {
      [RoutineV2Category.MEMORY]: {},
    };
    component.routineArgument = testRoutineArgument;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
