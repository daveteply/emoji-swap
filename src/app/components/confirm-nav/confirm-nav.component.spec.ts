import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ConfirmNavComponent } from './confirm-nav.component';

describe('ConfirmNavComponent', () => {
  let component: ConfirmNavComponent;
  let fixture: ComponentFixture<ConfirmNavComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ConfirmNavComponent],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ConfirmNavComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
