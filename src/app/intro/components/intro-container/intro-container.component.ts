import { Component } from '@angular/core';
import { APP_TITLE, MATCH_MINIUM_LENGTH } from 'src/app/constants';

@Component({
  selector: 'app-intro-container',
  templateUrl: './intro-container.component.html',
  styleUrls: ['./intro-container.component.scss'],
})
export class IntroContainerComponent {
  public matchLength = MATCH_MINIUM_LENGTH;

  appTitle = APP_TITLE;
}
