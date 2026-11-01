import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Subject } from 'rxjs';
import { GameSplash, GameSplashService, SplashType } from '../../services/game-splash.service';
import { ScoringService } from '../../services/scoring.service';

import { GameBoardSplashComponent } from './game-board-splash.component';

describe('GameBoardSplashComponent', () => {
  let component: GameBoardSplashComponent;
  let fixture: ComponentFixture<GameBoardSplashComponent>;
  let splashSubject: Subject<GameSplash>;

  const scoringServiceStub: Partial<ScoringService> = {};

  beforeEach(async () => {
    splashSubject = new Subject<GameSplash>();

    await TestBed.configureTestingModule({
      imports: [GameBoardSplashComponent],
      providers: [
        { provide: ScoringService, useValue: scoringServiceStub },
        {
          provide: GameSplashService,
          useValue: { gameSplashState$: splashSubject.asObservable() },
        },
      ],
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

  it('should append new splash items and prune expired items older than DECAY_TIME', () => {
    // Seed an expired item (older than 4000ms)
    component.splashItems.push({
      splashType: SplashType.HintLoss,
      scoreValue: 10,
      timestamp: Date.now() - 5000,
    });

    splashSubject.next({
      splashType: SplashType.TimeBonus,
      scoreValue: 25,
    });

    expect(component.splashItems.length).toBe(1);
    expect(component.splashItems[0].splashType).toBe(SplashType.TimeBonus);
    expect(component.splashItems[0].scoreValue).toBe(25);
    expect(component.splashItems[0].timestamp).toBeDefined();
  });

  it('should unsubscribe on destroy', () => {
    component.ngOnDestroy();
    splashSubject.next({ splashType: SplashType.CascadeBonus, scoreValue: 50 });
    expect(component.splashItems.length).toBe(0);
  });
});
