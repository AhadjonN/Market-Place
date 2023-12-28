export interface IProducts {
  id: number,
  title: string,
  year: number,
  price: number,
  image?: string,
  configure: IProductsConfig
}

export interface IProductsConfig {
  chip: string,
  memory: string;
  display: string
}
