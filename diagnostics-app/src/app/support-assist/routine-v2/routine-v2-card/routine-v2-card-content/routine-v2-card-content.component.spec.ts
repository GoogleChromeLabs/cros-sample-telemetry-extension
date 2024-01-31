import {ComponentFixture, TestBed} from '@angular/core/testing';

import {RoutineV2CardContentComponent} from './routine-v2-card-content.component';

describe('RoutineV2CardContentComponent', () => {
  let component: RoutineV2CardContentComponent;
  let fixture: ComponentFixture<RoutineV2CardContentComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [RoutineV2CardContentComponent],
    });
    fixture = TestBed.createComponent(RoutineV2CardContentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
