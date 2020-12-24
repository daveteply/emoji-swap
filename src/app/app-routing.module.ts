import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

const routes: Routes = [
  {
    path: 'game',
    loadChildren: () =>
      import('./areas/game/game.module').then((m) => m.GameModule),
  },
  {
    path: '',
    redirectTo: 'game',
    pathMatch: 'full',
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
