import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { AudioService } from 'src/app/services/audio.service';

import { GameOverComponent } from './game-over.component';

describe('GameOverComponent', () => {
  let component: GameOverComponent;
  let fixture: ComponentFixture<GameOverComponent>;

  let audioServiceStub: Partial<AudioService>;

  audioServiceStub = { PlayAudio: async () => {} };

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [GameOverComponent],
      providers: [
        { provide: AudioService, useValue: audioServiceStub },
        { provide: MAT_DIALOG_DATA, useValue: {} },
        { provide: MatDialogRef, useValue: {} },
      ],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(GameOverComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
