import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MatButtonModule } from '@angular/material/button';
import { RouterModule } from '@angular/router';
import { APP_TITLE, MATCH_MINIUM_LENGTH } from 'src/app/constants';

import { IntroContainerComponent } from './intro-container.component';

describe('IntroContainerComponent', () => {
  let component: IntroContainerComponent;
  let fixture: ComponentFixture<IntroContainerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [IntroContainerComponent, RouterModule.forRoot([]), MatButtonModule],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(IntroContainerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create and bind appTitle and matchLength', () => {
    expect(component).toBeTruthy();
    expect(component.appTitle).toBe(APP_TITLE);
    expect(component.matchLength).toBe(MATCH_MINIUM_LENGTH);
  });
});
