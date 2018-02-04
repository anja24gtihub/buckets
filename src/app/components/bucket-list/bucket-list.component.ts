import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
/*FormBuilder, Validators, AbstractControl, ValidatorFn, FormArray */
import { Bucket, BucketLocation } from '../bucket.model';
import { StorageService } from '../../services/storage.service';
import { Local } from 'protractor/built/driverProviders';

import { Observable } from 'rxjs/Observable';

@Component({
  selector: 'bucket-list',
  templateUrl: './bucket-list.component.html',
  styleUrls: ['./bucket-list.component.scss']
})
export class BucketListComponent implements OnInit {
  bucketListForm: FormGroup;
  buckets: Bucket[];
  locations: BucketLocation[];
  showAddBucket: boolean = false;

  constructor(private formBuilder: FormBuilder, private storageService: StorageService) { }

  ngOnInit() {
    this.bucketListForm = this.formBuilder.group({
      name: ['', [Validators.required, Validators.minLength(4)]],
      location: ['', Validators.required]
    });

    this.getBuckets();
    this.getLocations();
  }

  getLocations(): void {
    this.storageService.getLocations()
      .subscribe((result) => {
        this.locations = result;
      });
  }

  getBuckets(): void {
    this.storageService.getBuckets()
      .subscribe(result => {
        this.buckets = result
      });
  }

  save(): void {
    let location = new BucketLocation();
    location.id = this.bucketListForm.controls.location.value;
    let bucket = new Bucket();
    bucket.name = this.bucketListForm.controls.name.value;
    bucket.location = location;

    if (!bucket) { return; }

    this.storageService.createBucket(bucket)
      .subscribe(
      bucket => {
        this.showAddBucket = false;
        this.buckets.push(bucket);
      }
      );
  }

  deleteBucket(bucket: Bucket): void {
    this.buckets = this.buckets.filter(item => item !== bucket);
    this.storageService.deleteBucket(bucket)
      .subscribe();
  }

}
