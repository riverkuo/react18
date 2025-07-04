declare type ObjectType = Record<string, any>;

type KeyOfNoSymbol<T> = Exclude<keyof T, symbol>;
