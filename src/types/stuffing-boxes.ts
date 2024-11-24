export interface Property {
    _id?: string;
    art: string;
    quantity: string;
    description: string;
}

export interface Analog {
    name: string;
    type: string;
}

export interface Stuff {
    _id?: string;
    name: string;
    type: string;
    position: string;
    d1: string;
    d2?: string;
    D: string;
    h1?: string;
    H: string;
    analogs?: Analog[];
    createdAt?: string;
    updatedAt?: string;
}

export const initialState: Stuff = {
    name: "",
    type: "",
    position: "",
    d1: "",
    d2: "",
    D: "",
    h1: "",
    H: "",
    analogs: []
};