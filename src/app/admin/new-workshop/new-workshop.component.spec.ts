import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NewWorkshopComponent } from './new-workshop.component';

describe('NewWorkshopComponent', () => {
  let component: NewWorkshopComponent;
  let fixture: ComponentFixture<NewWorkshopComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NewWorkshopComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NewWorkshopComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
