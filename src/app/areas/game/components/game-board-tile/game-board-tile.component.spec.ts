import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GameBoardTileComponent } from './game-board-tile.component';

describe('GameBoardTileComponent', () => {
  let component: GameBoardTileComponent;
  let fixture: ComponentFixture<GameBoardTileComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [GameBoardTileComponent],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(GameBoardTileComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
