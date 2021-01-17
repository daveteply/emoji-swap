import { ComponentFixture, TestBed } from '@angular/core/testing';
import { GameInteractionsService } from '../../services/game-interactions.service';
import { GameBoardTileComponent } from './game-board-tile.component';

describe('GameBoardTileComponent', () => {
  let component: GameBoardTileComponent;
  let fixture: ComponentFixture<GameBoardTileComponent>;

  let gameInteractionServiceStub: Partial<GameInteractionsService>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [GameBoardTileComponent],
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
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
