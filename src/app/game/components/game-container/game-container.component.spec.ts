import { ComponentFixture, TestBed } from '@angular/core/testing';
import { GameBoardTileComponent } from '../game-board-tile/game-board-tile.component';
import { GameBoardComponent } from '../game-board/game-board.component';

import { GameContainerComponent } from './game-container.component';

describe('GameContainerComponent', () => {
  let component: GameContainerComponent;
  let fixture: ComponentFixture<GameContainerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [
        GameContainerComponent,
        GameBoardComponent,
        GameBoardTileComponent,
      ],
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
