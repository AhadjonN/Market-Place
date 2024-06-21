export interface IProducts {
  id: number,
  title: string,
  year: number,
  price: number,
  totalPrice: number,
  allTotalPrice: number,
  allTotalQuantity: number,
  image?: any,
  quantity: number,
  configure: IProductsConfig,
  configureMouse: IProductsMouseConfig,
  configureKeyboard: IProductsKeyboardConfig
}

export interface IProductsConfig {
  chip: string,
  memory: string,
  memoryRam: string,
  videoCard: string,
  oc: string,
  display: string
}

export interface IProductsMouseConfig {
  sensitivity: string,
  ConnectionType: string,
  ConnectionInterface: string,
  color: string
}

export interface IProductsKeyboardConfig {
  TypeOfKeyboard: string,
  ConnectionInterface: string,
  GameModel: string
  KeyboardLayout: string,
  color: string
}

