import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { AudioService } from 'src/app/services/audio.service';

@Component({
  selector: 'app-intro-container',
  templateUrl: './intro-container.component.html',
  styleUrls: ['./intro-container.component.scss'],
})
export class IntroContainerComponent implements OnInit, OnDestroy {
  private subscription: Subject<boolean> = new Subject<boolean>();

  public audioLoaded = false;

  constructor(private audioService: AudioService) {}

  ngOnInit(): void {
    this.audioService
      .AudioLoaded()
      .pipe(takeUntil(this.subscription))
      .subscribe(() => {
        this.audioLoaded = true;
      });
  }

  ngOnDestroy(): void {
    this.subscription.next(true);
    this.subscription.complete();
  }
}
