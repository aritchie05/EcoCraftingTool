import {Component, OnInit} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {environment} from '../../environments/environment';
import {Observable} from 'rxjs';
import {Release} from '../interface/release';

@Component({
  selector: 'app-release-notes',
  templateUrl: './release-notes.component.html',
  styleUrls: ['./release-notes.component.css']
})
export class ReleaseNotesComponent implements OnInit {

  releases: Release[];

  constructor(private httpClient: HttpClient) {
    this.releases = [];
  }

  ngOnInit(): void {
    this.getReleases().subscribe(releases => {
      this.releases = releases;
    });
  }

  getReleases(): Observable<Release[]> {
    return this.httpClient.get<Release[]>(environment.releasesUrl);
  }


}
