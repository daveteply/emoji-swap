import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GameBoardSplashComponent } from './game-board-splash.component';

describe('GameBoardSplashComponent', () => {
  let component: GameBoardSplashComponent;
  let fixture: ComponentFixture<GameBoardSplashComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [GameBoardSplashComponent],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(GameBoardSplashComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
