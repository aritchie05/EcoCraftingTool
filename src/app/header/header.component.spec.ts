import {ComponentFixture, TestBed} from '@angular/core/testing';

import {HeaderComponent} from './header.component';
import {provideHttpClient} from '@angular/common/http';
import {of} from 'rxjs';

describe('HeaderComponent', () => {
  let component: HeaderComponent;
  let fixture: ComponentFixture<HeaderComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HeaderComponent],
      providers: [provideHttpClient()]
    })
      .compileComponents();

    fixture = TestBed.createComponent(HeaderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('restores server selection when dialog is canceled', () => {
    const committedServerId = component.selectedServer().id;
    const openSpy = vi.spyOn(component.dialog, 'open').mockReturnValue({
      afterClosed: () => of(undefined)
    } as any);

    component.onServerChange('greenleaf');

    expect(openSpy).toHaveBeenCalled();
    expect(component.selectedServerId()).toBe(committedServerId);
  });
});
