import { Injectable } from '@angular/core';
import { GameBoard } from '../models/game-board';

@Injectable({
  providedIn: 'root',
})
export class GameUtilityService {
  public WithinGrid(
    rowInx: number,
    colInx: number,
    gameBoard: GameBoard
  ): boolean {
    const rowInxLim = gameBoard?.grid?.length;
    const colInxLim = gameBoard?.grid[0]?.length;
    return (
      rowInx > -1 && colInx > -1 && rowInx < rowInxLim && colInx < colInxLim
    );
  }
}
