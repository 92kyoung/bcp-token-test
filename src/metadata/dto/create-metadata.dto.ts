export class CreateMetadata {
    name: string;
    description : string;
    attributes : attribute[];
}

class attribute {
    trait_type: string;
    value: string;
    display_type: string;
}