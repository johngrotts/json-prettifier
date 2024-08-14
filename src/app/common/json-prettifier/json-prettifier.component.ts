import { Component } from '@angular/core';
import { JsonParserService, PrettifiedJsonParams } from '../../json-prettify/services/json-parser.service';

@Component({
  selector: 'app-json-prettifier',
  standalone: true,
  imports: [],
  templateUrl: './json-prettifier.component.html',
  styleUrl: './json-prettifier.component.css'
})
export class JsonPrettifierComponent {

  public jsonStr = '';

  public prettifyJson(): void {
    const pp = new PrettifiedJsonParams();
    pp.forHtml = true;
    pp.spacesMultiplier = 2;
    const randomJson = require('../../json-prettify/test-data/random-json-data.json');
    const complexJson = require('../../json-prettify/test-data/complex-json-data.json');
    this.jsonStr = JsonParserService.parseAndPrettifyJson(randomJson, pp);
  }
}
