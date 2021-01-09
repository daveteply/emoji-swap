import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';
import { IntroContainerComponent } from './components/intro-container/intro-container.component';

const routes: Routes = [
  {
    path: '',
    component: IntroContainerComponent,
  },
];

@NgModule({
  declarations: [],
  imports: [CommonModule, RouterModule.forChild(routes)],
})
export class IntroRoutingModule {}
