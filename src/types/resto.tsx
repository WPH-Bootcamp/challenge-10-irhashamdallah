export interface Restaurant {
  id: string;
  name: string;
  image: string;
  location: string;
  rating: number;
  category: string;
  priceRange: string;
}

export interface RestoResponse {
  data: Restaurant[];
  meta: {
    page: number;
    limit: number;
    totalData: number;
    totalPage: number;
  };
}
