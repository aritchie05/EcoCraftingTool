import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Release} from '../model/release';
import {environment} from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ReleaseNotesService {

  constructor(private http: HttpClient) {
  }

  getReleases() {
    return this.http.get<Release[]>(environment.releasesUrl);
  }
}
