import { Component, Input } from '@angular/core';
import { GameTile } from '../../models/game-tile';

@Component({
  selector: 'app-game-board-row',
  templateUrl: './game-board-row.component.html',
  styleUrls: ['./game-board-row.component.scss'],
})
export class GameBoardRowComponent {
  @Input() tileRow!: Array<GameTile>;
  @Input() disabled!: boolean;
}
