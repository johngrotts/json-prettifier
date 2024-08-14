export class BasicJsonObjectTestData {
    public static EMPTY_OBJECT = '{}';
    public static EMPTY_ARRAY = '[]';
    public static STRING_X_STRING = '{ "name1" : "value1" }';
    public static STRING_X_STRING_WITH_ESCAPE = `{ "name1" : "val\\\"ue1" }`;
    public static STRING_X_NUM = '{ "name1" : 123 }';
    public static STRING_X_NEG_NUM = '{ "name1" : -123 }';
    public static STRING_X_DEC_NUM = '{ "name1" : 0.123 }';
    public static STRING_X_NEG_DEC_NUM = '{ "name1" : -0.123 }';
    public static STRING_X_NUM_POWER = '{ "name1" : 123e2 }';
    public static STRING_X_NEG_NUM_POWER = '{ "name1" : -123e2 }';
    public static STRING_X_NUM_NEG_POWER = '{ "name1" : 123e-2 }';
    public static STRING_X_NEG_NUM_NEG_POWER = '{ "name1" : -123e-2 }';
    public static STRING_X_NUM_DEC_POWER = '{ "name1" : 123.4e2 }';
    public static STRING_X_NEG_NUM_DEC_POWER = '{ "name1" : -123.4e3 }';
    public static STRING_X_NUM_DEC_NEG_POWER = '{ "name1" : 123.4e-2 }';
    public static STRING_X_NEG_NUM_DEC_NEG_POWER = '{ "name1" : -123.4e-2 }';
    public static STRING_X_TRUE = '{ "name1" : true }';
    public static STRING_X_FALSE = '{ "name1" : false }';
    public static STRING_X_NULL = '{ "name1" : null }';
    public static STRING_X_EMPTY_OBJ = '{ "name1" : {} }';
    public static STRING_X_EMPTY_ARRAY = '{ "name1" : [] }';

    public static INVALID_JSON = '{ "string1": "Bad Format", [] }';
}