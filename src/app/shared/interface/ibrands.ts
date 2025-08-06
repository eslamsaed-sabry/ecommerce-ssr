export interface IBrandResponse {
  data: IBrand;
}

export interface IBrands {
  results: number;
  data: IBrand[];
}

export interface IBrand {
  _id: string;
  name: string;
  slug: string;
  image: string;
  createdAt: string;
  updatedAt: string;
}
