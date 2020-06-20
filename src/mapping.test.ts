import { expect } from 'chai';

import { Mapping } from "./mapping"

describe('Mapping', () => {
    it('Tạo ra bản map cơ bản đầy đủ xóa và thêm', () => {
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
        let mapping = new Mapping(oldJSON, newJSON)
        const map = mapping.Get();
        // console.log("map: ", JSON.stringify(map))
        expect(JSON.stringify(map)).to.equal(JSON.stringify(result));
    });

    it('Chỉ xóa dữ liệu', () => {
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
            a: "A",
            c: "C",
            menu: {
                level: 1,
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
        let result = {
            "removed": {
              "menu": {
                "attr": "link"
              }
            }
          }

        let mapping = new Mapping(oldJSON, newJSON)
        const map = mapping.Get();
        // console.log("map: ", JSON.stringify(map))
        expect(JSON.stringify(map)).to.equal(JSON.stringify(result));
    });

    it('Chỉ thêm dữ liệu dữ liệu', () => {
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
                                hi: "Hello",
                                attr: "new",
                            }
                        ]
                    }
                ]
            }
        }
        let result = {
            "added": {
              "menu": {
                "settings": [
                  {
                    "settings": [
                      {
                        "attr": "new"
                      }
                    ]
                  }
                ]
              }
            }
          }

        let mapping = new Mapping(oldJSON, newJSON)
        const map = mapping.Get();
        // console.log("map: ", JSON.stringify(map))
        expect(JSON.stringify(map)).to.equal(JSON.stringify(result));
    });

    it('Không thêm không xóa', () => {
        let oldJSON = {
            a: "A",
            c: "C"
        }
        let newJSON = {
            a: "A",
            c: "C",
        }
        let result = {}

        let mapping = new Mapping(oldJSON, newJSON)
        const map = mapping.Get();
        // console.log("map: ", JSON.stringify(map))
        expect(JSON.stringify(map)).to.equal(JSON.stringify(result));
    });

    it('Đổi chỗ dữ liệu và không thêm không xóa', () => {
        let oldJSON = {
            c: "C",
            a: 12,
        }
        let newJSON = {
            a: 12,
            c: "C",
        }
        let result = {}

        let mapping = new Mapping(oldJSON, newJSON)
        const map = mapping.Get();
        // console.log("map: ", JSON.stringify(map))
        expect(JSON.stringify(map)).to.equal(JSON.stringify(result));
    });
    
    it('Test mảng chứa mảng chứa mảng lồng nhau và có thay đổi giá trị', () => {
        let oldJSON = {
            a: [
                [
                   [
                        [
                            "B"
                        ]
                    ]
                ]
            ],
        }
        let newJSON = {
            a: [
                [
                   [
                        [
                            "B",
                            "C"
                        ]
                    ]
                ]
            ],
        }
        let result = {
            "added": {
                "a": [
                    [
                        [
                            [
                                null,
                                "C"
                            ]
                        ]
                    ]
                ]
            }
        }

        let mapping = new Mapping(oldJSON, newJSON)
        const map = mapping.Get();
        // console.log("map: ", JSON.stringify(map))
        expect(JSON.stringify(map)).to.equal(JSON.stringify(result));
    });
});