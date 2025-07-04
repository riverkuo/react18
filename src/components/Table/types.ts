export type Key<T> = KeyOfNoSymbol<T>;

// mapped type：根據既有型別動態產生新型別的語法
// type NewType<T> = {
//   [K in keyof T]: T[K];
// };
// 對型別 T 的每個屬性鍵 K，建立一個新屬性，型別與原本 T[K] 相同

export type TableColumn<T extends ObjectType> = {
  [K in Key<T>]: {
    // 可以接收其他的 key 值
    // 讓 key 是泛型物件的 key 或任意字串 => & 交叉型別會阻止合併，讓字面量型別保留在聯集中。
    key: K | (string & {});
    header: React.ReactNode;
    cell?: (params: { value?: T[K]; originValue?: T }) => React.ReactNode;
  };
}[Key<T>];

export type TableColumns<T extends ObjectType> = Array<TableColumn<T>>;
