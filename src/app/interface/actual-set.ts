export interface SetItem<T> {
  equals(other: T): boolean;
}


export class ActualSet<T extends SetItem<T>> extends Set<T> {

  constructor() {
    super();
  }

  addUnique(value: T): this {
    let found = false;
    for (let item of this) {
      if (value.equals(item)) {
        found = true;
        break;
      }
    }

    if (!found) {
      this.add(value);
    }

    return this;
  }
}
