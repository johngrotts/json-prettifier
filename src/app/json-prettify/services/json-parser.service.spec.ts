import { TestBed } from '@angular/core/testing';

import { JsonParserService, PrettifiedJsonParams } from './json-parser.service';
import { BasicJsonObjectTestData } from '../test-data/basic-json-object-test-data';

describe('JsonParserService', () => {
  let service: JsonParserService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(JsonParserService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  describe('Basic Object Tests', () => {

    it('should make a copy of a basic json file', () => {
      const pp = new PrettifiedJsonParams();
      pp.lineBreak = '\n';
      pp.forHtml = false;
      const json = require('../test-data/basic-json-data.json');
      expect(JSON.parse(JsonParserService.parseAndPrettifyJson(json, pp))).toEqual(json);
    });

    it('should make a copy of a complex json file', () => {
      const pp = new PrettifiedJsonParams();
      pp.lineBreak = '\n';
      pp.forHtml = false;
      const json = require('../test-data/complex-json-data.json');
      expect(JSON.parse(JsonParserService.parseAndPrettifyJson(json, pp))).toEqual(json);
    });

    it('should make a copy of a random json file', () => {
      const pp = new PrettifiedJsonParams();
      pp.lineBreak = '\n';
      pp.forHtml = false;
      const json = require('../test-data/random-json-data.json');
      expect(JSON.parse(JsonParserService.parseAndPrettifyJson(json, pp))).toEqual(json);
    });

  });
});
