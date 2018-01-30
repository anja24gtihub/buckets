
export class Bucket {
    id: string;
    name: string;
    location: BucketLocation;
}

export class Buckets {
    buckets: Bucket[];
}

export class BucketLocation {
    id: string;
    name: string;
}

export class Locations {
    locations: BucketLocation[];
}
