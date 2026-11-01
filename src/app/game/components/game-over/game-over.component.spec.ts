import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { AudioType } from 'src/app/services/audio-data';
import { AudioService } from 'src/app/services/audio.service';
import { vi } from 'vitest';

import { GameOverComponent } from './game-over.component';

describe('GameOverComponent', () => {
  let component: GameOverComponent;
  let fixture: ComponentFixture<GameOverComponent>;
  let audioServiceStub: { PlayAudio: ReturnType<typeof vi.fn> };
  let dialogRefStub: { close: ReturnType<typeof vi.fn> };

  beforeEach(async () => {
    audioServiceStub = { PlayAudio: vi.fn().mockResolvedValue(undefined) };
    dialogRefStub = { close: vi.fn() };

    await TestBed.configureTestingModule({
      imports: [GameOverComponent],
      providers: [
        { provide: AudioService, useValue: audioServiceStub },
        { provide: MAT_DIALOG_DATA, useValue: { level: 2, noMoreMoves: true, levelScore: 45 } },
        { provide: MatDialogRef, useValue: dialogRefStub },
      ],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(GameOverComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create and play GameOver audio on init', () => {
    expect(component).toBeTruthy();
    expect(audioServiceStub.PlayAudio).toHaveBeenCalledWith(AudioType.GameOver);
  });

  it('should close dialog with true when newGame() is called', () => {
    component.newGame();
    expect(dialogRefStub.close).toHaveBeenCalledWith(true);
  });

  it('should close dialog with false when exit() is called', () => {
    component.exit();
    expect(dialogRefStub.close).toHaveBeenCalledWith(false);
  });
});
