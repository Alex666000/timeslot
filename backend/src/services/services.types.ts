export type ServiceItem = {
  id: number;
  name: string;
  price: number;
};

export type GetServicesResult = {
  items: ServiceItem[];
  total: number;
  page: number;
  pageSize: number;
  pagesCount: number;
};