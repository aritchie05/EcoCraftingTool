export interface ServerItemsResponse {
  allItems: ServerItemResponse;
}

export interface ServerItemResponse {
  [key: string]: ServerApiItem;
}

export interface ServerApiItem {
  PropertyInfos: ServerItemPropertyInfos;
}

export interface ServerItemPropertyInfos {
  DisplayName: LocStringType;
  Name: StringType;
}

export interface StringType {
  String: string
}

export interface LocStringType {
  LocString: string;
}
