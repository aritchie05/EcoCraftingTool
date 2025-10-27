export interface ServerItemsResponse {
  AllItems: ServerItemResponse;
}

export interface ServerItemResponse {
  [key: string]: ServerItem;
}

export interface ServerItem {
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
