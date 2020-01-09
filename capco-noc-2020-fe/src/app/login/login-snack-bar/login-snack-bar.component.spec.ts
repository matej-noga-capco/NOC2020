import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LoginSnackBarComponent } from './login-snack-bar.component';

describe('LoginSnackBarComponent', () => {
  let component: LoginSnackBarComponent;
  let fixture: ComponentFixture<LoginSnackBarComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LoginSnackBarComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LoginSnackBarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
