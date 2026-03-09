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

  it('localizes server dropdown group and add-new labels', () => {
    const predefinedGroup = component.serverGroups.find(group => group.id === 'predefined-servers');
    const customGroup = component.serverGroups.find(group => group.id === 'custom-servers');
    const addNewServer = customGroup?.servers().find(server => server.id === 'add-new');

    expect(predefinedGroup).toBeDefined();
    expect(customGroup).toBeDefined();
    expect(addNewServer).toBeDefined();
    expect(component.serverGroupLabel(predefinedGroup!)).toBe(component.message('predefinedServersGroupLabel'));
    expect(component.serverGroupLabel(customGroup!)).toBe(component.message('customServersGroupLabel'));
    expect(component.serverOptionLabel(addNewServer!)).toBe(component.message('addNewServerOption'));
  });
});
