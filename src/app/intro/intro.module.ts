import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IntroRoutingModule } from './intro-routing.module';
import { IntroContainerComponent } from './components/intro-container/intro-container.component';

import { RouterModule } from '@angular/router';

import { MatButtonModule } from '@angular/material/button';

@NgModule({
  declarations: [IntroContainerComponent],
  imports: [CommonModule, IntroRoutingModule, RouterModule, MatButtonModule],
})
export class IntroModule {}
