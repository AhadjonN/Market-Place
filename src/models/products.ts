export interface IProducts {
  id: number,
  title: string,
  year: number,
  price: number,
  totalPrice: number,
  allTotalPrice: number,
  allTotalQuantity: number,
  image?: string,
  quantity: number,
  configure: IProductsConfig,
}

export interface IProductsConfig {
  chip: string,
  memory: string,
  display: string
}
