import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TestResultDetailsComponent } from './test-result-details.component';

describe('TestResultDetailsComponent', () => {
  let component: TestResultDetailsComponent;
  let fixture: ComponentFixture<TestResultDetailsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TestResultDetailsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TestResultDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
