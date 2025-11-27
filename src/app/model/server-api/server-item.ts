export interface ServerItemsResponse {
  AllItems: ServerItemResponse;
}

export interface ServerItemResponse {
  [key: string]: ServerItem;
}

export interface ServerItem {
  PropertyInfos: ServerItemPropertyInfos;
  Tags: string[];
}

export interface ServerItemPropertyInfos {
  Category: StringType;
  DisplayName: LocStringType;
  Name: StringType;
}

export interface StringType {
  String: string
}

export interface LocStringType {
  LocString: string;
}
