import { IMap } from "./types"
import {
    isObjectEmpty,
    isArray,
    isObject
} from "./utils"
export class Mapping {
    private oldJSON: object
    private newJSON: object
    constructor(oldJSON: object, newJSON: object) {
        this.oldJSON = oldJSON
        this.newJSON = newJSON
    }

    public Get() {
        // return this.compareJSON(this.oldJSON, this.newJSON)
        return {
            removed: this.compareJSON(this.newJSON, this.oldJSON),
            added: this.compareJSON(this.oldJSON, this.newJSON)
        } as IMap
    }

    private compareJSON(obj1: object, obj2: object): object | undefined {
        let ret = {} as object;
        for (let key in obj2) {
            let diff = false;
            if (!obj1.hasOwnProperty(key)) {
                diff = true
            } else {
                let compareValue = (val1: any, val2: any) => {
                    if (val1 !== val2) {
                        if (isArray(val1) || isArray(val2)) {
                            if (isArray(val1) && isArray(val2)) {
                                let arr = [] as Array<any>
                                for (let i = 0; i < val2.length; i++) {
                                    const item1 = val1[i];
                                    const item2 = val2[i];
                                    let arrChild = compareValue(item1 as any, item2 as any)
                                    if (arrChild) {
                                        arr[i] = arrChild
                                    }
                                }
                                if (arr && arr.length) {
                                    return arr
                                }
                            } else {
                                return val2
                            }
                        } else if (isObject(val1) || isObject(val2)) {
                            if (isObject(val1) && isObject(val2)) {
                                let retChilds = this.compareJSON(val1 as object, val2 as object)
                                return retChilds
                            } else {
                                return val2
                            }
                        } else { // string or number or null or undefine
                            return val2
                        }
                    }
                }
                let val1 = Object(obj1)[key]
                let val2 = Object(obj2)[key]
                let retVal = compareValue(val1, val2)
                if (retVal) {
                    Object(ret)[key] = retVal
                }
            }
            if (diff) {
                Object(ret)[key] = Object(obj2)[key];
            }
        }
        if (isObjectEmpty(ret)) {
            return undefined
        } else {
            return ret;
        }
    }
}