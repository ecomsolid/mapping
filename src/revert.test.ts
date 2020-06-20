import { expect } from 'chai';

import { Revert } from "./revert"

describe('Revert', () => {
    it('Quay lại code cơ bản', () => {
        let oldJSON = {
            a: "A",
            c: "C",
            menu: {
                level: 1,
                attr: "link",
                settings: [
                    {
                        level: 2,
                        settings: [
                            {
                                hi: "Hello"
                            }
                        ]
                    }
                ]
            }
        }
        let newJSON = {
            b: "C",
            c: "CA",
            menu: {
                level: 1,
                settings: [
                    {
                        level: 2,
                        settings: {
                        }
                    }
                ]
            }
        }
        let result = {
            "removed": {
              "a": "A",
              "c": "C",
              "menu": {
                "attr": "link",
                "settings": [
                  {
                    "settings": [
                      {
                        "hi": "Hello"
                      }
                    ]
                  }
                ]
              }
            },
            "added": {
              "b": "C",
              "c": "CA",
              "menu": {
                "settings": [
                  {
                    "settings": {}
                  }
                ]
              }
            }
        }
        let revert = new Revert(oldJSON, [result])
        const newObj = revert.Build();
        console.log("newObj: ", JSON.stringify(newObj))
        expect(JSON.stringify(newObj)).to.equal(JSON.stringify(newJSON));
    });
});