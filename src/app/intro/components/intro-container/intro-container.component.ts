import { Component } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { RouterModule } from '@angular/router';
import { APP_TITLE, MATCH_MINIUM_LENGTH } from 'src/app/constants';

@Component({
  selector: 'app-intro-container',
  templateUrl: './intro-container.component.html',
  styleUrls: ['./intro-container.component.scss'],
  imports: [RouterModule, MatButtonModule],
})
export class IntroContainerComponent {
  public matchLength = MATCH_MINIUM_LENGTH;

  appTitle = APP_TITLE;
}
