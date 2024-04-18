export interface Property {
  id?: string;
  art: string;
  quantity: string;
  description: string;
}

export interface Rack {
  id?: string;
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
