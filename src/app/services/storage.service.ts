import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { MessageService } from './message.service';
import { Observable } from 'rxjs/Rx';
import { of } from 'rxjs/observable/of';
import { catchError, map, tap, retry } from 'rxjs/operators';
import { Bucket, BucketLocation, BucketObject } from '../components/bucket.model'

@Injectable()
export class StorageService {
  private baseURL = 'https://challenge.3fs.si/storage';
  private options = { headers: new HttpHeaders().set('Authorization', 'Token E296B9D9-D727-4166-8FBB-A56633C98824') };

  constructor(
    private httpClient: HttpClient,
    private messageService: MessageService
  ) { }

  getLocations(): Observable<BucketLocation[]> {
    let url = `${this.baseURL}/locations`;

    return this.httpClient
      .get<BucketLocation[]>(url, this.options)
      .pipe(
      retry(3),
      map(result => result['locations']),
      tap(locations => this.log(`fetched locations`)),
      catchError(this.handleError('getLocations', []))
      );

  }

  getBuckets(): Observable<Bucket[]> {
    let url = `${this.baseURL}/buckets`;
    
    return this.httpClient
      .get<Bucket[]>(url, this.options)
      .pipe(
      retry(3),
      map(result => result['buckets']),
      tap(buckets => this.log(`fetched buckets`)),
      catchError(this.handleError('getBuckets', []))
      );
  }

  getBucket(bucketId: string): Observable<Bucket> {
    let url = `${this.baseURL}/buckets/${bucketId}`;

    return this.httpClient
      .get<Bucket>(url, this.options)
      .pipe(
      retry(3),
      map(result => result['bucket']),
      tap((bucket: Bucket) => this.log(`Fetched bucket id=${bucket.id}`)),
      catchError(this.handleError<Bucket>(`getBucket id=${bucketId}`))
      );
  }

  /** GET bucket by id. Return `undefined` when id not found */
  getBucketNo404<Data>(bucketId: string): Observable<Bucket> {
    const url = `${this.baseURL}/buckets/${bucketId}`;

    return this.httpClient.get<Bucket>(url)
      .pipe(
      map(result => result[0]),
      tap(bucket => {
        const outcome = bucket ? `Fetched` : `did not find`;
        this.log(`${outcome} bucket id=${bucketId}`);
      }),
      catchError(this.handleError<Bucket>(`getHero id=${bucketId}`))
      );
  }

  getBucketObjects(bucketId: string): Observable<BucketObject[]> {
    let url = `${this.baseURL}/buckets/${bucketId}/objects`;

    return this.httpClient
      .get<BucketObject[]>(url, this.options)
      .pipe(
      retry(3),
      map(result => result['objects']),
      tap(result => this.log(`Fetched bucketObjects for bucket with id=${bucketId}`)),
      catchError(this.handleError<BucketObject>(`getBucketObjects for bucket with id=${bucketId}`))
      );
  }

  createBucket(bucket: Bucket): Observable<Bucket> {
    let url = `${this.baseURL}/buckets`;
    let body = { name: bucket.name, location: bucket.location.id };
    let options = this.options;
    options.headers.set('Content-Type', 'application/json');

    return this.httpClient.post<Bucket>(url, body, options)
      .pipe(
      retry(3),
      tap((bucket: Bucket) => this.log(`Bucket w/ ${bucket.id} created`)),
      catchError(this.handleError<Bucket>('createBucket'))
      );
  }

  uploadBucketObject(file: File, bucketId: string): Observable<BucketObject> {
    let url = `${this.baseURL}/buckets/${bucketId}/objects`;
    let options = this.options;
    options.headers.set('Content-Type', 'multipart/form-data');
    const formData: FormData = new FormData();
    formData.append('file', file, file.name);

    return this.httpClient.post<BucketObject>(url, formData, options)
      .pipe(
      tap((bucketObject: BucketObject) => this.log(`Bucket object w/ ${bucketObject.name} created`)),
      catchError(this.handleError<BucketObject>('uploadBucketObject'))
      );
  }

  deleteBucket(bucket: Bucket): Observable<any> {
    let url = `${this.baseURL}/buckets/${bucket.id}`;

    return this.httpClient.delete<Bucket>(url, this.options)
      .pipe(
      tap(_ => this.log(`Deleted bucket id=${bucket.id}`)),
      catchError(this.handleError<Bucket>('deleteBucket'))
      );
  }

  deleteBucketObject(bucketObject: BucketObject, bucketId: string): Observable<any> {
    let url = `${this.baseURL}/buckets/${bucketId}/objects/${bucketObject.name}`;

    return this.httpClient.delete<Bucket>(url, this.options)
      .pipe(
      tap(_ => this.log(`Deleted bucket object ${bucketObject.name}`)),
      catchError(this.handleError<Bucket>('deleteBucketObject'))
      );
  }

  /**
   * Handle Http operation that failed.
   * Let the app continue.
   * @param operation - name of the operation that failed
   * @param result - optional value to return as the observable result
   */
  private handleError<T>(operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {

      // TODO: send the error to remote logging infrastructure
      console.error(error); // log to console instead

      // TODO: better job of transforming error for user consumption
      this.log(`${operation} failed: ${error.error.message}`);

      // Let the app keep running by returning an empty result.
      return of(result as T);
    };
  }

  /** Log a StorageService message with the MessageService */
  private log(message: string) {
    this.messageService.add('StorageService: ' + message);
  }
}