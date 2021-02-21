import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { GameRoutingModule } from './game-routing.module';
import { GameContainerComponent } from './components/game-container/game-container.component';
import { GameBoardComponent } from './components/game-board/game-board.component';
import { GameBoardTileComponent } from './components/game-board-tile/game-board-tile.component';
import { GameBoardSplashComponent } from './components/game-board-splash/game-board-splash.component';

import { MatButtonModule } from '@angular/material/button';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { MatDialogModule } from '@angular/material/dialog';
import { GameOverComponent } from './components/game-over/game-over.component';
import { MatIconModule } from '@angular/material/icon';

@NgModule({
  declarations: [
    GameContainerComponent,
    GameBoardComponent,
    GameBoardTileComponent,
    GameBoardSplashComponent,
    GameOverComponent,
  ],
  imports: [
    CommonModule,
    GameRoutingModule,
    MatButtonModule,
    MatProgressBarModule,
    MatDialogModule,
    MatIconModule,
  ],
})
export class GameModule {}
