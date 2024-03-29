import {ComponentFixture, TestBed} from '@angular/core/testing';

import {RoutineV2Service} from 'app/core/services/routine-v2.service';
import {RoutineV2Argument, RoutineV2Category} from 'common/message';
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
    const testRoutineArgument: RoutineV2Argument = {
      category: RoutineV2Category.MEMORY,
      argument: {},
    };
    component.routineArgument = testRoutineArgument;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
