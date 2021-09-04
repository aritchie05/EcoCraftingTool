import {Component, OnInit} from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {environment} from '../../environments/environment';
import {Observable} from 'rxjs';

@Component({
  selector: 'app-release-notes',
  templateUrl: './release-notes.component.html',
  styleUrls: ['./release-notes.component.css']
})
export class ReleaseNotesComponent implements OnInit {

  data: any;

  constructor(private httpClient: HttpClient) {
    this.data = '';
  }

  ngOnInit(): void {
    this.getReleaseRssFeed().subscribe((xmlData) => {
      console.log('Received xml data ' + xmlData);
      this.data = xmlData;
    });
  }

  getReleaseRssFeed(): Observable<any> {
    console.log('Getting from url ' + environment.releasesRssUrl);
    return this.httpClient.get(environment.releasesRssUrl, {
      headers: new HttpHeaders({
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Methods': 'GET, POST, PATCH, PUT, DELETE, OPTIONS',
        'Access-Control-Allow-Headers': 'Origin, Content-Type'
      }),
      responseType: 'text'
    });
  }


}
