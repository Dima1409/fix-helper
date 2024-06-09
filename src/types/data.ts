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
  mainImage?: string;
  mainImageId?: string;
  mainCenterImage?: string;
  mainCenterImageId?: string;
  imgFile: File;
  createdAt?: string;
  updatedAt?: string;
}

export const initialState: Rack = {
  name: "",
  type: "",
  kit: {
    name: "",
    property: [{ art: "", quantity: "", description: "" }],
  },
  more: {
    name: "",
    property: [{ art: "", quantity: "", description: "" }],
  },
  application: "",
  oem: "",
  mainImage: "-",
  mainCenterImage: "-",
  mainImageId: "-",
  mainCenterImageId: "-",
  imgFile: new File([], "placeholder"),
};
