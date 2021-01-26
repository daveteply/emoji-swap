import { ComponentFixture, TestBed } from '@angular/core/testing';
import { AudioService } from 'src/app/services/audio.service';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

import { LevelCompleteComponent } from './level-complete.component';

describe('LevelCompleteComponent', () => {
  let component: LevelCompleteComponent;
  let fixture: ComponentFixture<LevelCompleteComponent>;

  let audioServiceStub: Partial<AudioService>;

  audioServiceStub = { PlayAudio: async () => {} };

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [LevelCompleteComponent],
      providers: [
        { provide: AudioService, useValue: audioServiceStub },
        { provide: MAT_DIALOG_DATA, useValue: {} },
        { provide: MatDialogRef, useValue: {} },
      ],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(LevelCompleteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
