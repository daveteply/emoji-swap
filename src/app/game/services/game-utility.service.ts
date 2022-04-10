import { Injectable } from '@angular/core';
import { GameBoard } from '../models/game-board';

@Injectable({
  providedIn: 'root',
})
export class GameUtilityService {
  public WithinGrid(rowInx: number, colInx: number, gameBoard: GameBoard): boolean {
    const rowInxLim = gameBoard?.grid?.length;
    const colInxLim = gameBoard?.grid[0]?.length;
    return rowInx > -1 && colInx > -1 && rowInx < rowInxLim && colInx < colInxLim;
  }

  // public DebugColumn(colInx: number, gameBoard: GameBoard): void {
  //   for (let rowInx = 0; rowInx < gameBoard.grid.length; rowInx++) {
  //     console.log('    ', rowInx, gameBoard.grid[rowInx][colInx]);
  //   }
  // }
}
