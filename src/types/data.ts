export interface Property {
  _id?: string;
  art: string;
  quantity: string;
  description: string;
}

export interface Rack {
  _id?: string;
  name: string;
  type: string;
  kit: {
    name: string;
    property: Property[];
  };
  more: {
    name: string;
    property: Property[];
  };
  application: string;
  oem: string;
}
