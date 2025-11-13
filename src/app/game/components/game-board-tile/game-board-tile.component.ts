import { Component, Input } from '@angular/core';
import { GameTile } from '../../models/game-tile';
import { GameInteractionsService } from '../../services/game-interactions.service';

@Component({
    selector: 'app-game-board-tile',
    templateUrl: './game-board-tile.component.html',
    styleUrls: ['./game-board-tile.component.scss'],
    standalone: false
})
export class GameBoardTileComponent {
  constructor(private gameInteractionsService: GameInteractionsService) {}

  @Input() tile!: GameTile;
  @Input() disabled!: boolean;

  private isPanning = false;

  onPan(event: any): void {
    if (!event?.isFinal && !this.isPanning) {
      this.isPanning = true;
      this.gameInteractionsService.TileSwiped({
        tile: this.tile,
        direction: event?.direction,
      });
    } else if (event?.isFinal) {
      this.isPanning = false;
    }
  }
}
