import { Component, ElementRef, Input, ViewChild } from '@angular/core';
import { GameTile } from '../../models/game-tile';
import { GameInteractionsService, PlayerSwipeDirection } from '../../services/game-interactions.service';

@Component({
  selector: 'app-game-board-tile',
  templateUrl: './game-board-tile.component.html',
  styleUrls: ['./game-board-tile.component.scss'],
  standalone: false,
})
export class GameBoardTileComponent {
  constructor(private gameInteractionsService: GameInteractionsService) {}

  @ViewChild('tileElement', { read: ElementRef }) tileElement!: ElementRef;

  @Input() tile!: GameTile;
  @Input() disabled!: boolean;

  ngAfterViewInit(): void {
    if (this.tileElement && this.tile) {
      this.gameInteractionsService.registerGestureElement(this.tileElement.nativeElement, this.tile);
    }
  }

  onTileSwiped(): void {
    if (!this.disabled) {
      this.gameInteractionsService.TileSwiped({
        tile: this.tile,
        direction: PlayerSwipeDirection.Left, // Direction will be updated by gesture service
      });
    }
  }
}
