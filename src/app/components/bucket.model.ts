
export class Bucket {
    id: string;
    name: string;
    location: BucketLocation;
}

export class BucketLocation {
    id: string;
    name: string;
}

export class BucketObject {
    name: string;
    last_modified: string;
    size: number;
}