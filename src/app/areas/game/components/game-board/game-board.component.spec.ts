import { ComponentFixture, TestBed } from '@angular/core/testing';
import { GameBoardRowComponent } from '../game-board-row/game-board-row.component';
import { GameBoardTileComponent } from '../game-board-tile/game-board-tile.component';

import { GameBoardComponent } from './game-board.component';

describe('GameBoardComponent', () => {
  let component: GameBoardComponent;
  let fixture: ComponentFixture<GameBoardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [
        GameBoardComponent,
        GameBoardRowComponent,
        GameBoardTileComponent,
      ],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(GameBoardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
