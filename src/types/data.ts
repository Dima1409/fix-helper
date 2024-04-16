export interface Rack {
  id?: string;
  name: string;
  type: string;
  kit: {
    name: string;
    property: {
      id: string;
      art: string;
      quantity: string;
      description?: string;
    }[];
  };
  more: {
    name: string;
    property: {
      id: string;
      art: string;
      quantity: string;
      description?: string;
    }[];
  };
  application: string;
  oem: string;
  image: string;
}
