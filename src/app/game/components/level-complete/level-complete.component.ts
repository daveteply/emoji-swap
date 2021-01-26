import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { AudioType } from 'src/app/services/audio-data';
import { AudioService } from 'src/app/services/audio.service';
import { GameStats } from '../../models/game-stats';

@Component({
  selector: 'app-level-complete',
  templateUrl: './level-complete.component.html',
  styleUrls: ['./level-complete.component.scss'],
})
export class LevelCompleteComponent implements OnInit {
  constructor(
    public dialogRef: MatDialogRef<LevelCompleteComponent>,
    @Inject(MAT_DIALOG_DATA) public gameStats: GameStats,
    private audioService: AudioService
  ) {}

  ngOnInit(): void {
    this.audioService.PlayAudio(
      this.gameStats?.noMoreMoves ? AudioType.GameOver : AudioType.LevelModal
    );
  }

  newGame(): void {
    this.dialogRef.close(true);
  }

  nextLevel(): void {
    this.dialogRef.close(false);
  }
}
