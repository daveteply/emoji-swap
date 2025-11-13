import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { AudioType } from 'src/app/services/audio-data';
import { AudioService } from 'src/app/services/audio.service';
import { GameStats } from '../../models/game-stats';

@Component({
    selector: 'app-game-over',
    templateUrl: './game-over.component.html',
    styleUrls: ['./game-over.component.scss'],
    standalone: false
})
export class GameOverComponent implements OnInit {
  constructor(
    public dialogRef: MatDialogRef<GameOverComponent>,
    @Inject(MAT_DIALOG_DATA) public gameStats: GameStats,
    private audioService: AudioService
  ) {}

  ngOnInit(): void {
    this.audioService.PlayAudio(AudioType.GameOver);
  }

  newGame(): void {
    this.dialogRef.close(true);
  }

  exit(): void {
    this.dialogRef.close(false);
  }
}
