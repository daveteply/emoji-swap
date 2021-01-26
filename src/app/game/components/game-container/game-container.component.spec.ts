import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MatDialogModule } from '@angular/material/dialog';
import { AudioService } from 'src/app/services/audio.service';
import { GameBoardSplashComponent } from '../game-board-splash/game-board-splash.component';
import { GameBoardTileComponent } from '../game-board-tile/game-board-tile.component';
import { GameBoardComponent } from '../game-board/game-board.component';
import { LevelCompleteComponent } from '../level-complete/level-complete.component';

import { GameContainerComponent } from './game-container.component';

describe('GameContainerComponent', () => {
  let component: GameContainerComponent;
  let fixture: ComponentFixture<GameContainerComponent>;

  let audioServiceStub: Partial<AudioService>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [
        GameContainerComponent,
        GameBoardComponent,
        GameBoardTileComponent,
        GameBoardSplashComponent,
        LevelCompleteComponent,
      ],
      imports: [MatDialogModule],
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
