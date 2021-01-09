import { ComponentFixture, TestBed } from '@angular/core/testing';

import { IntroContainerComponent } from './intro-container.component';

describe('IntroContainerComponent', () => {
  let component: IntroContainerComponent;
  let fixture: ComponentFixture<IntroContainerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [IntroContainerComponent],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(IntroContainerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
