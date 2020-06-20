import { IMap } from "./types"
import {
    isObjectEmpty,
    isArray,
    isObject
} from "./utils"
export class Revert {
    private oldJSON: object
    private map: IMap
    constructor(oldJSON: object, maps:Array<IMap>) {
        this.oldJSON = oldJSON
        this.map = this.GroupMaps(maps)
    }

    public Build() {
        return this.restoreJSON(this.oldJSON, this.map)
    }

    public GroupMaps(maps: Array<IMap>): IMap {
        let map = {} as IMap
        if (maps && maps.length) {
            for (let i = 0; i < maps.length; i++) {
                const itemMap = maps[i];
                map = Object.assign(map, itemMap)
            }
        }
        return map;
    }

    private restoreJSON(oldJSON: object, map:IMap): object {
        let newJSON = JSON.parse(JSON.stringify(oldJSON))

        // Run remove attr
        if (map.removed && !isObjectEmpty(map.removed)) {
            let remove = (newJSON: object, removed: object) => {
                for (let key in removed) {
                    if (removed.hasOwnProperty(key) && newJSON.hasOwnProperty(key)) {
                        let val1 = Object(newJSON)[key]
                        let val2 = Object(removed)[key]
                        if (isArray(val1) || isArray(val2)) {
                            if (isArray(val1) && isArray(val2)) {
                                let arr = [] as Array<any>
                                for (let i = 0; i < val2.length; i++) {
                                    const item1 = val1[i];
                                    const item2 = val2[i];
                                    let arrChild = remove(item1 as object, item2 as object)
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
                        // Object(newJSON)[key] = undefined
                    }
                }
            }
            remove(newJSON, map.removed)
        }

        // // Run add attr
        // if (map.added && !isObjectEmpty(map.added)) {
        //     newJSON = Object.assign(newJSON, map.added)
        // }

        return newJSON
    }
}