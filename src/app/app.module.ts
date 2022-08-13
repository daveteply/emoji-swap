import { NgModule } from '@angular/core';
import { BrowserModule, HammerModule, HAMMER_GESTURE_CONFIG } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HammerConfig } from './hammer-config';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { ConfirmNavComponent } from './components/confirm-nav/confirm-nav.component';

import { MatToolbarModule } from '@angular/material/toolbar';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatDialogModule } from '@angular/material/dialog';

@NgModule({
  declarations: [AppComponent, ConfirmNavComponent],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HammerModule,
    BrowserAnimationsModule,
    MatToolbarModule,
    MatTooltipModule,
    MatIconModule,
    MatButtonModule,
    MatDialogModule,
  ],
  providers: [
    {
      provide: HAMMER_GESTURE_CONFIG,
      useClass: HammerConfig,
    },
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
