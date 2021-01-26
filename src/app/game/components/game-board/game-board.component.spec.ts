import { ComponentFixture, TestBed } from '@angular/core/testing';
import {
  MAT_DIALOG_DATA,
  MatDialogRef,
  MatDialogModule,
} from '@angular/material/dialog';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { of } from 'rxjs';
import { AudioService } from 'src/app/services/audio.service';
import { GameInteractionsService } from '../../services/game-interactions.service';
import { GameLoopService } from '../../services/game-loop.service';
import { GameService } from '../../services/game.service';
import { ScoringService } from '../../services/scoring.service';
import { TileRemoveService } from '../../services/tile-remove.service';
import { GameBoardTileComponent } from '../game-board-tile/game-board-tile.component';

import { GameBoardComponent } from './game-board.component';

describe('GameBoardComponent', () => {
  let component: GameBoardComponent;
  let fixture: ComponentFixture<GameBoardComponent>;

  let gameServiceStub: Partial<GameService>;
  let gameLoopServiceStub: Partial<GameLoopService>;
  let tileRemoveServiceStub: Partial<TileRemoveService>;
  let gameInteractionsServiceStub: Partial<GameInteractionsService>;
  let scoringServiceStub: Partial<ScoringService>;
  let audioServiceStub: Partial<AudioService>;

  gameServiceStub = {
    CreateGame: () => {
      return { grid: [] };
    },
  };
  gameLoopServiceStub = { gameLoopState$: of(), DoStep: () => {} };
  tileRemoveServiceStub = { tileRemoveState$: of() };
  gameInteractionsServiceStub = { gameInteractionState$: of() };
  scoringServiceStub = { TimerReset: () => {} };
  audioServiceStub = { PlayAudio: async () => {} };

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [GameBoardComponent, GameBoardTileComponent],
      providers: [
        { provide: GameService, useValue: gameServiceStub },
        { provide: GameLoopService, useValue: gameLoopServiceStub },
        { provide: TileRemoveService, useValue: tileRemoveServiceStub },
        {
          provide: GameInteractionsService,
          useValue: gameInteractionsServiceStub,
        },
        { provide: ScoringService, useValue: scoringServiceStub },
        { provide: AudioService, useValue: audioServiceStub },
      ],
      imports: [MatProgressBarModule, MatDialogModule],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(GameBoardComponent);
    component = fixture.componentInstance;

    component.gameBoard = { grid: [] };

    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
