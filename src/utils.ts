export const isObjectEmpty = (myVar: object): boolean => {
    for(var key in myVar) {
        if(myVar.hasOwnProperty(key))
            return false;
    }
    return true;
}

export const isArray = (myVar: any): boolean => {
    return Array.isArray(myVar)
}

export const isObject = (myVar: any): boolean => {
    if ((typeof myVar === "object" || typeof myVar === 'function') && (myVar !== null)) {
        return true
    }
    return false
}