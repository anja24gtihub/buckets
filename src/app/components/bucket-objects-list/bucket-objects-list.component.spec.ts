import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BucketObjectsListComponent } from './bucket-objects-list.component';

describe('BucketObjectsListComponent', () => {
  let component: BucketObjectsListComponent;
  let fixture: ComponentFixture<BucketObjectsListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BucketObjectsListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BucketObjectsListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
