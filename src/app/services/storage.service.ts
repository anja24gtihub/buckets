import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs/Rx';
import { Bucket, Buckets, Locations, BucketLocation } from '../components/bucket-list/bucket-list.model'

import "rxjs/add/operator/retry";

@Injectable()
export class StorageService {
  private baseURL = 'https://challenge.3fs.si/storage/';
  private options = { headers: new HttpHeaders().set('Authorization', 'Token E296B9D9-D727-4166-8FBB-A56633C98824').set('Content-Type', 'application/json') };

  constructor(private httpClient: HttpClient) { }

  getLocations(): Observable<Locations> {
    let url = this.baseURL + 'locations';

    return this.httpClient
      .get<Locations>(url, this.options)
      .retry(3);
  }

  getBuckets(): Observable<Buckets> {
    let url = this.baseURL + 'buckets';

    return this.httpClient
      .get<Buckets>(url, this.options)
      .retry(3);
  }

  createBucket(bucket: Bucket) {
    let url = this.baseURL + 'buckets';
    let body = { name: bucket.name, location: bucket.location.id };
    this.httpClient.post<Bucket>(url, body, this.options).subscribe(
      data => {
        console.log(data);
      },
      err => {
        console.log("Error occured." + err.error.message)
      }
    );
  }

}