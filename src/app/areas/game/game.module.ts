import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { GameRoutingModule } from './game-routing.module';
import { GameContainerComponent } from './components/game-container/game-container.component';
import { GameBoardComponent } from './components/game-board/game-board.component';
import { GameBoardTileComponent } from './components/game-board-tile/game-board-tile.component';
import { GameBoardRowComponent } from './components/game-board-row/game-board-row.component';

@NgModule({
  declarations: [
    GameContainerComponent,
    GameBoardComponent,
    GameBoardTileComponent,
    GameBoardRowComponent,
  ],
  imports: [CommonModule, GameRoutingModule],
})
export class GameModule {}
