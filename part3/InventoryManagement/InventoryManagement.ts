import { HashTable } from "../HashTable/HashTable";

interface IProduct {
  id: string;
  stock: number;
}

interface IInventory {
  getAllProduct: () => IProduct[];
  addProduct: (id: string, stock: number) => void;
  removeProduct: (id: string) => Product | null;
  buyProduct: (id: string, quantity: number) => boolean;
  addStock: (id: string, quantity: number) => boolean;
  setStock: (id: string, quantity: number) => boolean;
  getStock: (id: string) => number;
}

class Product implements IProduct {
  constructor(public id: string, public stock: number = 0) {}
}

class NewHashTable<T> extends HashTable<T> {
  constructor() {
    super();
  }

  values(): T[] {
    const val: T[] = [];
    for (let bucket of this.table) {
      if (bucket) {
        for (let [_, value] of bucket.entries()) {
          val.push(value as T);
        }
      }
    }
    return val;
  }
}

export class InventoryManagement implements IInventory {
  private table: NewHashTable<IProduct> = new NewHashTable<IProduct>();
  private _size: number = 0;
  constructor() {}

  get size(): number {
    return this._size;
  }

  getAllProduct(): IProduct[] {
    return this.table.values() as IProduct[];
  }
  addProduct(id: string, stock: number): void {
    if (stock <= 0) {
      throw Error("stock must be greater than 0");
    }
    const product = this.findProduct(id);
    if (product) {
      this.addStock(id, stock);
      return;
    }
    const newProduct = new Product(id, stock);
    this.table.set(id, newProduct);
    this._size++;
  }
  removeProduct(id: string): IProduct | null {
    const product = this.findProduct(id);
    if (!product) return null;
    this.table.remove(id);
    this._size--;
    return product;
  }

  buyProduct(id: string, quantity: number): boolean {
    const stocks = this.getStock(id);
    if (stocks <= 0) {
      throw new Error("stock is not available");
    }
    if (stocks < quantity) {
      throw new Error("insufficient stock");
    }
    return this.removeStock(id, quantity);
  }

  addStock(id: string, quantity: number): boolean {
    if (quantity <= 0) {
      throw Error("stock must be greater than 0");
    }
    const find = this.findProduct(id);
    if (!find) return false;
    find.stock = find.stock + quantity;
    return true;
  }

  removeStock(id: string, quantity: number): boolean {
    const find = this.table.get(id);
    if (!find) {
      throw new Error("invalid product id");
    }
    if (find.stock < quantity) {
      throw new Error("stock is not available");
    }

    find.stock -= quantity;
    return true;
  }

  setStock(id: string, quantity: number): boolean {
    const find = this.table.get(id);
    if (!find) {
      throw new Error("invalid product id");
    }
    find.stock = quantity;
    return true;
  }

  findProduct(id: string): IProduct | null {
    return this.table.get(id);
  }

  getStock(id: string): number {
    return this.table.get(id)?.stock || 0;
  }
}
