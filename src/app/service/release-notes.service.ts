import {afterNextRender, Injectable, signal, WritableSignal} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Release} from '../model/release';
import {environment} from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ReleaseNotesService {

  readonly releases: WritableSignal<Release[]> = signal([]);

  constructor(private http: HttpClient) {
    afterNextRender(() => this.loadReleases());
  }

  private loadReleases(): void  {
    this.http.get<Release[]>(environment.releasesUrl).subscribe(releases => this.releases.set(releases));
  }

}
