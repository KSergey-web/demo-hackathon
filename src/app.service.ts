import { HttpService } from '@nestjs/axios';
import { Injectable } from '@nestjs/common';
import { AxiosResponse } from 'axios';
import { lastValueFrom, map, Observable, take } from 'rxjs';
import {AES} from 'crypto-js'



function decrypt(message = '', key = ''){
  var bytes  = CryptoJS.AES.decrypt(message, 'secret key 123');
  return bytes.toString(CryptoJS.enc.Utf8);
}

@Injectable()
export class AppService {
  constructor(private httpService: HttpService) {}

  getHello(): string {
    return 'hello';
  }

  getXML(){
    let xmlData = `<?xml version="1.0"?>
    <note xmlns="http://msiter.ru"
    xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"
    xsi:schemaLocation="http://msiter.ru note.xsd">
       <to>Tove</to>
       <from>Jani</from>
       <heading>Напоминание</heading>
       <body>Не забудь обо мне в эти выходные!</body>
    </note>`
    
    var parser = require('fast-xml-parser');
    var he = require('he');
    
    var options = {
        attributeNamePrefix : "@_",
        attrNodeName: "attr", //default is 'false'
        textNodeName : "#text",
        ignoreAttributes : true,
        ignoreNameSpace : false,
        allowBooleanAttributes : false,
        parseNodeValue : true,
        parseAttributeValue : false,
        trimValues: true,
        cdataTagName: "__cdata", //default is 'false'
        cdataPositionChar: "\\c",
        parseTrueNumberOnly: false,
        numParseOptions:{
          hex: true,
          leadingZeros: true,
          //skipLike: /\+[0-9]{10}/
        },
        arrayMode: false, //"strict"
        attrValueProcessor: (val, attrName) => he.decode(val, {isAttributeValue: true}),//default is a=>a
        tagValueProcessor : (val, tagName) => he.decode(val), //default is a=>a
        stopNodes: ["parse-me-as-string"]
    };
    
    if( parser.validate(xmlData) === true) { //optional (it'll return an object in case it's not valid)
        var jsonObj = parser.parse(xmlData,options);
    }
    
    // Intermediate obj
    var tObj = parser.getTraversalObj(xmlData,options);
    var jsonObj = parser.convertToJson(tObj,options);
    
  var jsonObj = parser.parse(xmlData ,options );
  console.log(jsonObj)
  return;
  }

  token =
    'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJsb2dpbiI6Imt1bGFldiIsImlhdCI6MTYzMTM4MTk1MywiZXhwIjoxNjMxNDY4MzUzfQ.1xhvvEuRHDzh4i15ECxYPOt1dj2qTekXRsRaCZ6O-LI';

  async findAll(): Promise<any> {
    return await lastValueFrom(
      this.httpService
        .get<AxiosResponse<any>>('http://localhost:4000/v1/api/user', {
          headers: {
            Authorization: 'Bearer ' + this.token,
          },
        })
        .pipe(
          take(1),
          map((res) => res.data),
        ),
    );
  }
}
