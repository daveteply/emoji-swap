import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ConfirmNavComponent } from './confirm-nav.component';

describe('ConfirmNavComponent', () => {
  let component: ConfirmNavComponent;
  let fixture: ComponentFixture<ConfirmNavComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ConfirmNavComponent],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ConfirmNavComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create and render confirmation buttons', () => {
    expect(component).toBeTruthy();
    const buttons = fixture.nativeElement.querySelectorAll('button');
    expect(buttons.length).toBe(2);
  });
});
