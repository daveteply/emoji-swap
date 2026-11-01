import { ComponentFixture, TestBed } from '@angular/core/testing';
import { vi } from 'vitest';
import { GameInteractionsService, PlayerSwipeDirection } from '../../services/game-interactions.service';
import { GameBoardTileComponent } from './game-board-tile.component';

describe('GameBoardTileComponent', () => {
  let component: GameBoardTileComponent;
  let fixture: ComponentFixture<GameBoardTileComponent>;
  let gameInteractionServiceStub: {
    registerGestureElement: ReturnType<typeof vi.fn>;
    TileSwiped: ReturnType<typeof vi.fn>;
  };

  beforeEach(async () => {
    gameInteractionServiceStub = {
      registerGestureElement: vi.fn(),
      TileSwiped: vi.fn(),
    };

    await TestBed.configureTestingModule({
      imports: [GameBoardTileComponent],
      providers: [
        {
          provide: GameInteractionsService,
          useValue: gameInteractionServiceStub,
        },
      ],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(GameBoardTileComponent);
    component = fixture.componentInstance;
    component.tile = { code: '1', title: 'test title', html: 'html', colInx: 0, rowInx: 0, score: { baseScore: 1 } };
    fixture.detectChanges();
  });

  it('should create and register its gesture element after view init', () => {
    expect(component).toBeTruthy();
    expect(gameInteractionServiceStub.registerGestureElement).toHaveBeenCalledWith(
      expect.any(HTMLElement),
      component.tile
    );
  });

  it('should call TileSwiped when onTileSwiped is triggered while enabled', () => {
    component.disabled = false;
    component.onTileSwiped();
    expect(gameInteractionServiceStub.TileSwiped).toHaveBeenCalledWith({
      tile: component.tile,
      direction: PlayerSwipeDirection.Left,
    });
  });

  it('should ignore onTileSwiped when disabled is true', () => {
    component.disabled = true;
    component.onTileSwiped();
    expect(gameInteractionServiceStub.TileSwiped).not.toHaveBeenCalled();
  });
});
