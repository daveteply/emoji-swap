import { ComponentFixture, TestBed } from '@angular/core/testing';
import { of } from 'rxjs';
import { ScoringService } from '../../services/scoring.service';

import { GameBoardSplashComponent } from './game-board-splash.component';

describe('GameBoardSplashComponent', () => {
  let component: GameBoardSplashComponent;
  let fixture: ComponentFixture<GameBoardSplashComponent>;

  let scoringServiceStub: Partial<ScoringService> = {};

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [GameBoardSplashComponent],
      providers: [{ provide: ScoringService, useValue: scoringServiceStub }],
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
