import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MatDialogModule } from '@angular/material/dialog';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { RouterModule } from '@angular/router';
import { AudioService } from 'src/app/services/audio.service';
import { GameBoardSplashComponent } from '../game-board-splash/game-board-splash.component';
import { GameBoardTileComponent } from '../game-board-tile/game-board-tile.component';
import { GameBoardComponent } from '../game-board/game-board.component';
import { GameOverComponent } from '../game-over/game-over.component';

import { GameContainerComponent } from './game-container.component';

describe('GameContainerComponent', () => {
  let component: GameContainerComponent;
  let fixture: ComponentFixture<GameContainerComponent>;

  let audioServiceStub: Partial<AudioService>;

  audioServiceStub = { PlayAudio: async () => {} };

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        GameContainerComponent,
        GameBoardComponent,
        GameBoardTileComponent,
        GameBoardSplashComponent,
        GameOverComponent,
        MatProgressBarModule,
        MatDialogModule,
        RouterModule.forRoot([]),
      ],
      providers: [{ provide: AudioService, useValue: audioServiceStub }],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(GameContainerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
