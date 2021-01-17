import { TestBed } from '@angular/core/testing';
import { MatToolbarModule } from '@angular/material/toolbar';
import { RouterTestingModule } from '@angular/router/testing';
import { AppComponent } from './app.component';
import { ScoringService } from './game/services/scoring.service';
import { AudioService } from './services/audio.service';

describe('AppComponent', () => {
  let audioServiceStub: Partial<AudioService>;
  let scoringServiceStub: Partial<ScoringService>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RouterTestingModule, MatToolbarModule],
      declarations: [AppComponent],
      providers: [
        { provide: AudioService, useValue: audioServiceStub },
        { provide: ScoringService, useValue: scoringServiceStub },
      ],
    }).compileComponents();
  });

  it('should create the app', () => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.componentInstance;
    expect(app).toBeTruthy();
  });

  // it('should render title', () => {
  //   const fixture = TestBed.createComponent(AppComponent);
  //   fixture.detectChanges();
  //   const compiled = fixture.nativeElement;
  //   expect(compiled.querySelector('.content span').textContent).toContain('emoji-swap app is running!');
  // });
});
