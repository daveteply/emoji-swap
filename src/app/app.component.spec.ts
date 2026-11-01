import { TestBed } from '@angular/core/testing';
import { MatDialog, MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatTooltipModule } from '@angular/material/tooltip';
import { Router, RouterModule } from '@angular/router';
import { of } from 'rxjs';
import { vi } from 'vitest';
import { AppComponent } from './app.component';
import { APP_TITLE } from './constants';

describe('AppComponent', () => {
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AppComponent, RouterModule.forRoot([]), MatToolbarModule, MatTooltipModule, MatDialogModule],
    }).compileComponents();
  });

  it('should create the app with default title and web flag', () => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.componentInstance;
    expect(app).toBeTruthy();
    expect(app.isWeb).toBe(true);
    expect(app.appTitle).toBe(APP_TITLE);
  });

  it('should not open confirm dialog when navigating home from outside /game', () => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.componentInstance;
    const dialog = (app as unknown as { dialog: MatDialog }).dialog;
    const openSpy = vi.spyOn(dialog, 'open');

    app.navHome();
    expect(openSpy).not.toHaveBeenCalled();
  });

  it('should open confirm dialog on /game and navigate home when confirmed', () => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.componentInstance;
    const router = (app as unknown as { router: Router }).router;
    const dialog = (app as unknown as { dialog: MatDialog }).dialog;

    vi.spyOn(router, 'url', 'get').mockReturnValue('/game');
    const navigateSpy = vi.spyOn(router, 'navigate').mockResolvedValue(true);
    const openSpy = vi.spyOn(dialog, 'open').mockReturnValue({
      afterClosed: () => of(true),
    } as MatDialogRef<unknown>);

    app.navHome();
    expect(openSpy).toHaveBeenCalled();
    expect(navigateSpy).toHaveBeenCalledWith(['/']);
  });

  it('should not navigate home when confirm dialog is cancelled', () => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.componentInstance;
    const router = (app as unknown as { router: Router }).router;
    const dialog = (app as unknown as { dialog: MatDialog }).dialog;

    vi.spyOn(router, 'url', 'get').mockReturnValue('/game');
    const navigateSpy = vi.spyOn(router, 'navigate').mockResolvedValue(true);
    const openSpy = vi.spyOn(dialog, 'open').mockReturnValue({
      afterClosed: () => of(false),
    } as MatDialogRef<unknown>);

    app.navHome();
    expect(openSpy).toHaveBeenCalled();
    expect(navigateSpy).not.toHaveBeenCalled();
  });
});
