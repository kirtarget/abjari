export interface Item {
  _id: string;
  name: string;
  pricegel: number;
  mainImage: string;
  images: Image[];
  description: string;
}

interface Image {
  _key: string;
  _type: string;
  asset: Asset;
}

interface Asset {
  _ref: string;
  _type: string;
}

export interface OrderItem {
  data: {
    amount: string;
    currency: string;
    lang: string;
    info: {
      description: string;
      image: string;
      name: string;
    };
  };
}
