import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
/*FormBuilder, Validators, AbstractControl, ValidatorFn, FormArray */
import { Bucket, Buckets, Locations, BucketLocation } from './bucket-list.model';
import { StorageService } from '../../services/storage.service';
import { Local } from 'protractor/built/driverProviders';

@Component({
  selector: 'app-bucket-list',
  templateUrl: './bucket-list.component.html',
  styleUrls: ['./bucket-list.component.scss']
})
export class BucketListComponent implements OnInit {
  bucketListForm: FormGroup;
  buckets: Bucket[];
  locations: BucketLocation[];
  showAddBucket: boolean = false;
  defaultLocation: BucketLocation = new BucketLocation();

  constructor(private formBuilder: FormBuilder, private storageService: StorageService) { }

  ngOnInit() {
    this.defaultLocation = { id: '541909F3-20FC-4382-A8E8-18042F5E7677', name: 'Kranj' };

    this.bucketListForm = this.formBuilder.group({
      name: ['', [Validators.required, Validators.minLength(4)]],
      location: ['', Validators.required] // this.defaultLocation
    });

    /* this.bucketListForm = new FormGroup({
      name: new FormControl(),
      location: new FormControl()// new FormControl(this.defaultLocation)
    }); */
    this.getBuckets();
    this.getLocations();

  }

  getLocations() {
    this.storageService.getLocations()
      .subscribe((result: Locations) => {
        this.locations = result.locations;
      });
  }

  getBuckets() {
    this.storageService.getBuckets()
      .subscribe((result: Buckets) => {
        this.buckets = result.buckets;
      });
  }

  save() {
    let location = new BucketLocation();
    location.id = this.bucketListForm.controls.location.value;
    let bucket = new Bucket();
    bucket.name = this.bucketListForm.controls.name.value;
    bucket.location = location;
    this.storageService.createBucket(bucket);
  }

  populateFormData() {
    this.bucketListForm.patchValue({
      name: 'bucket'
      // location.id = '571E30F3-7A96-45FF-8FDE-0A3F0E6BBDF4' // : { id: '571E30F3-7A96-45FF-8FDE-0A3F0E6BBDF4', name: 'Ljubljana' }
    });
  }

}
