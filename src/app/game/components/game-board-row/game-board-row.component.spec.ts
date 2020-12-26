import { ComponentFixture, TestBed } from '@angular/core/testing';
import { GameBoardTileComponent } from '../game-board-tile/game-board-tile.component';
import { GameBoardRowComponent } from './game-board-row.component';

describe('GameBoardRowComponent', () => {
  let component: GameBoardRowComponent;
  let fixture: ComponentFixture<GameBoardRowComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [GameBoardRowComponent, GameBoardTileComponent],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(GameBoardRowComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
