import { Injectable } from '@angular/core';

export class PrettifiedJsonParams {
  public spacesMultiplier?: number;
  public forHtml?: boolean;
  public lineBreak?: string;
}
@Injectable({
  providedIn: 'root'
})
export class JsonParserService {

  public static prettifyJson(json: JSON, pp: PrettifiedJsonParams): string {
    let display = '';
    const j = json as any;
    if(!this.isValidJson(JSON.stringify(json))) {
      return `{ "error": true, "message": "The JSON you submitted is invalid" }`;
    }
    let jsonType = '';
    if(JSON.stringify(json).trim().startsWith('[')) {
      jsonType = 'ARRAY';
    } else if(JSON.stringify(json).trim().startsWith('{')) {
      jsonType = 'OBJECT';
    } else {
      return `{ "error": true, "message": "The JSON you submitted is invalid" }`;
    }
    console.log('JSON TYPE: ', jsonType)
    if(pp.lineBreak === null || pp.lineBreak === undefined) {
      pp.lineBreak = `\n`;
    }
    if(pp.forHtml) {
      pp.lineBreak = `<br />\n`;
    }
    const endChar = jsonType === 'OBJECT' ? '}' : ']';
    const beginChar = jsonType === 'ARRAY' ? `${this.addCharBreak('[', pp)}` : '';
    display = `${beginChar}${this.createJsonString(j, 0, pp, jsonType === 'ARRAY')}${endChar}`;
    return display;
  }

  public static createJsonString(json: any, currentIndent: number, pp: PrettifiedJsonParams, insideArray?: boolean): string {
    let display = '';
    Object.keys(json).forEach((j: any, index0: number) => {
      console.log('CURRENT OBJECT: ', j, json[j], insideArray)
      let key = '';
      let value = '';

      // CHECK FOR ARRAY FIRST
      if(json[j] !== null && this.isObject(json[j]) && this.isArray(json[j])) {
        const t = this.typeOfArray(json[j]);
        if(t === 'ARRAY') {
          console.log('ARRAY OF ARRAYS', j, json[j], insideArray, Object.entries(json[j]).length);
          if(insideArray) {
            value = `${value}${this.createLeadSpaces(currentIndent + 1, pp)}[`;
          } else {
            key = `${key}${this.createLeadSpaces(currentIndent + 1, pp)}${this.createKey(j)}`;
            value = `${value}${this.addCharBreak('[', pp)}`;
          }

          value = `${value}${this.createJsonString(json[j], currentIndent + 1, pp, true)}`;

          const isLast0 = index0 + 1 === Object.entries(json).length;
          value = `${value}${this.createLeadSpaces(currentIndent + 1, pp)}${this.addCharCommaBreak(']', pp, isLast0)}`;
          display = `${display}${key}${value}`;


        } else if(t === 'OBJECT') {
          console.log('ARRAY OF OBJECTS', j, json[j], insideArray);
          key = `${key}${this.createLeadSpaces(currentIndent + 1, pp)}${this.createKey(j)}`;
          value = `${value}${this.addCharBreak('[', pp)}`;

          json[j].forEach((k: any, index1: number) => {
            value = `${value}${this.createLeadSpaces(currentIndent + 2, pp)}${this.addCharBreak('{', pp)}`;

            Object.keys(k).forEach((l: any, index2: number) => {
              const subKey = `${this.createLeadSpaces(currentIndent + 3, pp)}${this.createKey(l)}`;
              let subValue = '';
              if(this.isObject(k[l]) && this.isArray(k[l])) {
                console.log('----- Recursive Array Call -----');
                subValue = this.createJsonString(l, currentIndent, pp);
              } else {
                const isLast2 = index2 + 1 === Object.entries(k).length;
                subValue = this.createBasicValue(k[l]);
                subValue = `${subValue}${this.addCharCommaBreak('', pp, isLast2)}`;
              }
              value = `${value}${subKey}${subValue}`;
            });

            const isLast1 = index1 + 1 === Object.entries(json[j]).length;
            value = `${value}${this.createLeadSpaces(currentIndent + 2, pp)}${this.addCharCommaBreak('}', pp, isLast1)}`;
          });

          const isLast0 = index0 + 1 === Object.entries(json).length;
          value = `${value}${this.createLeadSpaces(currentIndent + 1, pp)}${this.addCharCommaBreak(']', pp, isLast0)}`;
          display = `${display}${key}${value}`;


        } else if(t === 'BASIC') {
          console.log('ARRAY OF BASIC VALUES', j, json[j], insideArray);
          if(!insideArray) {
            key = `${key}${this.createLeadSpaces(currentIndent + 1, pp)}${this.createKey(j)}`;
            value = `${value}${this.addCharBreak('[', pp)}`;
          } else {
          value = `${value}${this.createLeadSpaces(currentIndent + 1, pp)}${this.addCharBreak('[', pp)}`;
          }

          json[j].forEach((k: any, index1: number) => {
            let val = '';
            if(k === null || this.isNumber(k) || this.isBoolean(k)) {
              val = `${this.createLeadSpaces(currentIndent + 2, pp)}${k}`;
            } else if(this.isString(k)) {
              val = `${this.createLeadSpaces(currentIndent + 2, pp)}"${k}"`;
            }
            const isLast1 = index1 + 1 === Object.entries(json[j]).length;
            value = `${value}${val}`;
            value = `${value}${this.addCommaUnlessLast(isLast1)}${pp.lineBreak}`;
          });

          const isLast0 = index0 + 1 === Object.entries(json).length;
          value = `${value}${this.createLeadSpaces(currentIndent + 1, pp)}${this.addCharCommaBreak(']', pp, isLast0)}`;
          display = `${display}${key}${value}`;
        }


      } else if (json[j] !== null && this.isObject(json[j])) {
        console.log('OBJECT', j, json[j], insideArray);
        if(!insideArray) {
          key = `${this.createLeadSpaces(currentIndent + 1, pp)}${this.createKey(j)}`;
        }
        display = `${display}${key}${this.createJsonString(json[j], currentIndent + 1, pp)}`;
        const isLast0 = index0 + 1 === Object.entries(json).length;
        display = `${display}${this.createLeadSpaces(currentIndent + 1, pp)}}${value}${this.addCommaUnlessLast(isLast0)}${pp.lineBreak}`;


      } else if(json[j] === null || this.isNumber(json[j]) || this.isBoolean(json[j]) || this.isString(json[j])) {
        console.log('BASIC VALUE', j, json[j], insideArray, 'IS THIS TRUE:', index0 === 0);
        // TODO: Move this line to somewhere else. It is causing later objects to have extra spaces between key and {
        key = index0 === 0 ? `${this.createLeadSpaces(currentIndent, pp)}${this.addCharBreak('{', pp)}` : '';
        key = `${key}${this.createLeadSpaces(currentIndent + 1, pp)}${this.createKey(j)}`;
        const isLast0 = index0 + 1 === Object.entries(json).length;
        value = `${this.createBasicValue(json[j])}${this.addCommaUnlessLast(isLast0)}${pp.lineBreak}`;
        display = `${display}${key}${value}`;


      } else {
        console.log('--- ERROR: Unable to determine what this is ---', j, json[j])
      }
    });
    return display;
  }

  public static isValidJson(json: string) {
    try {
      JSON.parse(json);
    } catch (e) {
      return false;
    }
    return true;
  }

  public static parseAndPrettifyJson(json: JSON, pp: PrettifiedJsonParams): string {
    
    let display = '';
    const j = json as any;
    if(!this.isValidJson(JSON.stringify(json))) {
      return `{ "error": true, "message": "The JSON you submitted is invalid" }`;
    }
    let jsonType = '';
    if(JSON.stringify(json).trim().startsWith('[')) {
      jsonType = 'ARRAY';
    } else if(JSON.stringify(json).trim().startsWith('{')) {
      jsonType = 'OBJECT';
    } else {
      return `{ "error": true, "message": "The JSON you submitted is invalid" }`;
    }
    console.log('JSON TYPE: ', jsonType)
    if(pp.lineBreak === null || pp.lineBreak === undefined) {
      pp.lineBreak = `\n`;
    }
    if(pp.forHtml) {
      pp.lineBreak = `<br />\n`;
    }
    const endChar = jsonType === 'OBJECT' ? '}' : ']';
    const beginChar = jsonType === 'ARRAY' ? `${this.addCharBreak('[', pp)}` : `${this.addCharBreak('{', pp)}`;
    display = `${beginChar}${this.parseAndPrettify(j, 1, pp, false, jsonType === 'ARRAY')}${endChar}`;
    return display;
  }



  protected static parseAndPrettify(json: any, currentIndent: number,  pp: PrettifiedJsonParams, isLast: boolean, insideArray: boolean): string {
    let display = '';

    console.log('JSON: ', json, Object.keys(json), insideArray)
    Object.keys(json).forEach((j: any, index0: number) => {
      const isLast0 = index0 + 1 === Object.entries(json).length;
      // ARRAY
      if(json[j] !== null && this.isObject(json[j]) && this.isArray(json[j])) {
        console.log('ARRAY', json[j], insideArray);
        display = `${display}${this.createArray(json[j], j, currentIndent, pp, isLast0, insideArray)}`;

      // OBJECT
      } else if(json[j] !== null && this.isObject(json[j])) {
        console.log('OBJECT', json[j], insideArray);
        display = `${display}${this.createObject(json[j], j, currentIndent, pp, isLast0, insideArray)}`;
  
      // BASIC VALUE
      } else if(json[j] === null || this.isNumber(json[j]) || this.isBoolean(json[j]) || this.isString(json[j])) {
        console.log('BASIC VALUE', json[j], insideArray);
        const key = insideArray ? '' : `${this.createKey(j)}`;
        const value = `${this.createBasicValue(json[j])}${this.addCommaUnlessLast(isLast0)}${pp.lineBreak}`;
        display = `${display}${this.createLeadSpaces(currentIndent, pp)}${key}${value}`;
  
      } else {
        console.log('--- ERROR: Unable to determine what this is ---', j)
      }
      // console.log('DISPLAY: ', display);
    });

    
    return display;
  }

  protected static createArray(json: any, jKey: string, currentIndent: number, pp: PrettifiedJsonParams, isLast: boolean, insideArray: boolean): string {
    console.log('ARRAY TIME: ', json, jKey);
    // Var Setup
    let key = '';
    let value = '';
    let close = `${this.createLeadSpaces(currentIndent, pp)}]${this.addCommaUnlessLast(isLast)}${pp.lineBreak}`;

    // If this is inside an array, a key will not be created
    if(insideArray) {
      key = `${this.createLeadSpaces(currentIndent, pp)}${this.addCharBreak('[', pp)}`
    } else {
      key = `${this.createLeadSpaces(currentIndent, pp)}${this.createKey(jKey)}${this.addCharBreak('[', pp)}`;
    }
    value = this.parseAndPrettify(json, currentIndent + 1, pp, isLast, true);
    
    return `${key}${value}${close}`;
  }

  protected static createObject(json: any, jKey: string, currentIndent: number, pp: PrettifiedJsonParams, isLast: boolean, insideArray: boolean): string {
    console.log('OBJECT TIME: ', json, jKey);
    // Var Setup
    let key = '';
    let value = '';
    let close = `${this.createLeadSpaces(currentIndent, pp)}}${this.addCommaUnlessLast(isLast)}${pp.lineBreak}`;

    // May (normal object) or may not (directly in array) have a key 
    if(insideArray) {
      key = `${this.createLeadSpaces(currentIndent, pp)}${this.addCharBreak('{', pp)}`
    } else {
      key = `${this.createLeadSpaces(currentIndent, pp)}${this.createKey(jKey)}${this.addCharBreak('{', pp)}`;
    }
    value = this.parseAndPrettify(json, currentIndent + 1, pp, isLast, false);
    
    return `${key}${value}${close}`;
  }

  protected static createKey(keyName: string): string {
    return `"${keyName}": `;
  }

  protected static createBasicValue(value: any): string {
    let val = '';
    if(value === null) {
      val = 'null';
    } else if(this.isNumber(value) || this.isBoolean(value) || this.isBoolean(value)) {
      val = value;
    } else if(this.isString(value)) {
      val = `"${value}"`;
    } else {
      console.log('--- ERROR: Unable to determine type of value ---', value);
    }
    return val;
  }

  protected static addCharBreak(char: string, pp: PrettifiedJsonParams): string {
    return `${char}${pp.lineBreak}`;
  }

  protected static addCharCommaBreak(char: string, pp: PrettifiedJsonParams, isLast: boolean): string {
    return isLast ? `${char}${pp.lineBreak}` : `${char},${pp.lineBreak}`;
  }

  protected static createLeadSpaces(spacesToAdd: number, pp: PrettifiedJsonParams): string {
    let spaceChar = pp.forHtml ? '\u00A0' : ' ';
    let spaces = '';
    if(spacesToAdd <= 0) {
      return spaces;
    }
    let multiplier = 1;
    if(pp.spacesMultiplier && pp.spacesMultiplier > 0) {
      multiplier = pp.spacesMultiplier;
    }
    for(let i = 0; i < spacesToAdd * multiplier; i++) {
      spaces = `${spaces}${spaceChar}`;
    }
    return spaces;
  }

  protected static addCommaUnlessLast(isLast: boolean): string {
    return isLast? '' : `,`;
  }



  protected static typeOfArray(arr: any[]): string {
    for(const a of arr) {
      if(this.isArray(a)) {
        return 'ARRAY';
      } else if(this.isObject(a)) {
        return 'OBJECT';
      } else if(this.isNumber(a) || this.isBoolean(a) || this.isString(a)) {
        return 'BASIC';
      } else {
        console.log('--- ERROR: Unable to determine array ---', arr);
      }
    }
    return '';
  }

  protected static isObject(obj: any): boolean {
    return typeof obj === 'object';
  }

  protected static isArray(arr: any): boolean {
    return Array.isArray(arr);
  }

  /**
   * Returns if an object is a boolean.
   * DOES NOT return the bool itself
   * @param bool 
   * @returns 
   */
  protected static isBoolean(bool: any): boolean {
    return typeof bool === 'boolean';
  }

  protected static isNumber(num: any): boolean {
    return typeof num === 'number';
    // if type of number: return true
    // if not type of string: return false
    // return !isNaN(Number(num)) && !isNaN(parseFloat(num));
  }

  protected static isString(str: any): boolean {
    return typeof str === 'string';
  }

}
