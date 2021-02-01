import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RadiobasesHomeComponent } from './radiobases-home.component';

describe('RadiobasesHomeComponent', () => {
  let component: RadiobasesHomeComponent;
  let fixture: ComponentFixture<RadiobasesHomeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RadiobasesHomeComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(RadiobasesHomeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
