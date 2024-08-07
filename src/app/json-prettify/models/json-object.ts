import { ValueType } from "./value-type";

export class JsonObject {
    nameValueMap?: Map<string, JsonObject | [] | number | string | boolean | null>;
    nameLevel?: number;
    valueLevel?: number;
    valueType?: ValueType;
}