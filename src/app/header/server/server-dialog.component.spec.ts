import {ComponentFixture, TestBed} from '@angular/core/testing';

import {ServerDialogComponent} from './server-dialog.component';
import {provideHttpClient} from '@angular/common/http';
import {provideDialogTestingDependencies} from '../../test-utils.spec';
import {ServerConfig, serverGroups} from '../../model/server-api/server-config';

describe('ServerDialogComponent', () => {
  let component: ServerDialogComponent;
  let fixture: ComponentFixture<ServerDialogComponent>;

  beforeEach(async () => {
    const serverConfig: ServerConfig = serverGroups[0].servers()[0];
    await TestBed.configureTestingModule({
      imports: [ServerDialogComponent],
      providers: [provideHttpClient(), provideDialogTestingDependencies(serverConfig)]
    })
      .compileComponents();

    fixture = TestBed.createComponent(ServerDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
