import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LevelCompleteComponent } from './level-complete.component';

describe('LevelCompleteComponent', () => {
  let component: LevelCompleteComponent;
  let fixture: ComponentFixture<LevelCompleteComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ LevelCompleteComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(LevelCompleteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
