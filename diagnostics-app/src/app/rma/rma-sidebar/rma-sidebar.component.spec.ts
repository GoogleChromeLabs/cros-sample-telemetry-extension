import {ComponentFixture, TestBed} from '@angular/core/testing';

import {RmaSidebarComponent} from './rma-sidebar.component';

describe('RmaSidebarComponent', () => {
  let component: RmaSidebarComponent;
  let fixture: ComponentFixture<RmaSidebarComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [RmaSidebarComponent],
    });
    fixture = TestBed.createComponent(RmaSidebarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
