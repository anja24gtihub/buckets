import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs/Observable';
import { Bucket, BucketObject } from '../bucket.model';
import { StorageService } from '../../services/storage.service';

@Component({
  selector: 'bucket-details',
  templateUrl: './bucket-details.component.html',
  styleUrls: ['./bucket-details.component.scss']
})
export class BucketDetailsComponent implements OnInit {

  fileToUpload: File = null;
  bucket: Bucket;
  bucketObjects: BucketObject[];
  bucketId: string;

  constructor(
    private route: ActivatedRoute,
    private storageService: StorageService
  ) { }

  ngOnInit() {
    this.bucketId = this.route.snapshot.paramMap.get('id');
    this.getBucket();
    this.getBucketObjects();
  }

  getBucket(): void {
    this.storageService.getBucket(this.bucketId)
      .subscribe((result: Bucket) => {
        this.bucket = result;
      });
  }
  
  getBucketObjects(): void {
    this.storageService.getBucketObjects(this.bucketId)
      .subscribe((result: BucketObject[]) => {
        this.bucketObjects = result;
      });
  }

  uploadBucketObject(files: FileList): void {
    this.fileToUpload = files.item(0);
    this.storageService.uploadBucketObject(this.fileToUpload, this.bucketId)
    .subscribe((bucketObject: BucketObject) => {
      this.bucketObjects.push(bucketObject);
    });
  }

  deleteBucketObject(bucketObject: BucketObject): void {
    this.bucketObjects = this.bucketObjects.filter(item => item !== bucketObject);
    this.storageService.deleteBucketObject(bucketObject, this.bucketId)
    .subscribe();
  }
}
