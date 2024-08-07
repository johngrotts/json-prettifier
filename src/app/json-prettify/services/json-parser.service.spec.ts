import { TestBed } from '@angular/core/testing';

import { JsonParserService, PrettifiedJsonParams } from './json-parser.service';
import { JsonObjectTestData } from '../test-data/json-object-test-data';
import { JsonObject } from '../models/json-object';

describe('JsonParserService', () => {
  let service: JsonParserService;
  let basicPP: PrettifiedJsonParams = {
    spacesMultiplier: 0,
    forHtml: false
  }

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(JsonParserService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  describe('Basic Object Tests', () => {

    it('should find an empty object', () => {
      const response = JsonParserService.prettifyJson(
        JsonObjectTestData.EMPTY_OBJECT.toString(), basicPP);
      expect(response).toEqual(new JsonObject());
    });
    it('should find an empty array', () => {
      const response = JsonParserService.prettifyJson(
        JsonObjectTestData.EMPTY_ARRAY.toString(), basicPP);
      expect(response).toEqual(new JsonObject());
    });
    it('should find string : string', () => {
      const response = JsonParserService.prettifyJson(
        JsonObjectTestData.STRING_X_STRING.toString(), basicPP);
      const objectKVMap = new Map<string, string>();
      objectKVMap.set('name1', 'value1');
      expect(response.nameValueMap).toEqual(objectKVMap);
    });
    fit('should find string : string with escape', () => {
      const response = JsonParserService.prettifyJson(
        JsonObjectTestData.STRING_X_STRING_WITH_ESCAPE.toString(), basicPP);
      const objectKVMap = new Map<string, string>();
      objectKVMap.set('name1', `val\\\"ue1`);
      expect(response.nameValueMap).toEqual(objectKVMap);
    });
    it('should find string : num (pos int)', () => {
      const response = JsonParserService.prettifyJson(
        JsonObjectTestData.STRING_X_NUM.toString(), basicPP);
      const objectKVMap = new Map<string, number>();
      objectKVMap.set('name1', 123);
      expect(response.nameValueMap).toEqual(objectKVMap);
    });
    it('should find string : num (neg int)', () => {
      const response = JsonParserService.prettifyJson(
        JsonObjectTestData.STRING_X_NEG_NUM.toString(), basicPP);
      const objectKVMap = new Map<string, number>();
      objectKVMap.set('name1', -123);
      expect(response.nameValueMap).toEqual(objectKVMap);
    });
    it('should find string : num (dec)', () => {
      const response = JsonParserService.prettifyJson(
        JsonObjectTestData.STRING_X_DEC_NUM.toString(), basicPP);
      const objectKVMap = new Map<string, number>();
      objectKVMap.set('name1', 0.123);
      expect(response.nameValueMap).toEqual(objectKVMap);
    });
    it('should find string : num (neg dec)', () => {
      const response = JsonParserService.prettifyJson(
        JsonObjectTestData.STRING_X_NEG_DEC_NUM.toString(), basicPP);
      const objectKVMap = new Map<string, number>();
      objectKVMap.set('name1', -0.123);
      expect(response.nameValueMap).toEqual(objectKVMap);
    });
    it('should find string : num (power)', () => {
      const response = JsonParserService.prettifyJson(
        JsonObjectTestData.STRING_X_NUM_POWER.toString(), basicPP);
      const objectKVMap = new Map<string, number>();
      objectKVMap.set('name1', 123e2);
      expect(response.nameValueMap).toEqual(objectKVMap);
      objectKVMap.set('name1', 123E2);
      expect(response.nameValueMap).toEqual(objectKVMap);
    });
    it('should find string : num (neg power)', () => {
      const response = JsonParserService.prettifyJson(
        JsonObjectTestData.STRING_X_NEG_NUM_POWER.toString(), basicPP);
      const objectKVMap = new Map<string, number>();
      objectKVMap.set('name1', -123e2);
      expect(response.nameValueMap).toEqual(objectKVMap);
      objectKVMap.set('name1', -123E2);
      expect(response.nameValueMap).toEqual(objectKVMap);
    });
    it('should find string : num (power)', () => {
      const response = JsonParserService.prettifyJson(
        JsonObjectTestData.STRING_X_NUM_NEG_POWER.toString(), basicPP);
      const objectKVMap = new Map<string, number>();
      objectKVMap.set('name1', 123e-2);
      expect(response.nameValueMap).toEqual(objectKVMap);
      objectKVMap.set('name1', 123E-2);
      expect(response.nameValueMap).toEqual(objectKVMap);
    });
    it('should find string : num (power)', () => {
      const response = JsonParserService.prettifyJson(
        JsonObjectTestData.STRING_X_NEG_NUM_NEG_POWER.toString(), basicPP);
      const objectKVMap = new Map<string, number>();
      objectKVMap.set('name1', -123e-2);
      expect(response.nameValueMap).toEqual(objectKVMap);
      objectKVMap.set('name1', -123E-2);
      expect(response.nameValueMap).toEqual(objectKVMap);
    });


    it('should find string : true(bool)', () => {
      const response = JsonParserService.prettifyJson(
        JsonObjectTestData.STRING_X_TRUE.toString(), basicPP);
      const objectKVMap = new Map<string, boolean>();
      objectKVMap.set('name1', true);
      expect(response.nameValueMap).toEqual(objectKVMap);
    });
    it('should find string : false(bool)', () => {
      const response = JsonParserService.prettifyJson(
        JsonObjectTestData.STRING_X_FALSE.toString(), basicPP);
      const objectKVMap = new Map<string, boolean>();
      objectKVMap.set('name1', false);
      expect(response.nameValueMap).toEqual(objectKVMap);
    });
    it('should find string : null', () => {
      const response = JsonParserService.prettifyJson(
        JsonObjectTestData.STRING_X_NULL.toString(), basicPP);
      const objectKVMap = new Map<string, null>();
      objectKVMap.set('name1', null);
      expect(response.nameValueMap).toEqual(objectKVMap);
    });
    it('should find string : {}', () => {
      const response = JsonParserService.prettifyJson(
        JsonObjectTestData.STRING_X_EMPTY_OBJ.toString(), basicPP);
      const objectKVMap = new Map<string, any>();
      const emptyObj = new JsonObject();
      objectKVMap.set('name1', emptyObj);
      expect(response.nameValueMap).toEqual(objectKVMap);
    });
    it('should find string : []', () => {
      const response = JsonParserService.prettifyJson(
        JsonObjectTestData.STRING_X_EMPTY_ARRAY.toString(), basicPP);
      const objectKVMap = new Map<string, any>();
      const emptyObj = new JsonObject();
      objectKVMap.set('name1', emptyObj);
      expect(response.nameValueMap).toEqual(objectKVMap);
    });

  });
});
