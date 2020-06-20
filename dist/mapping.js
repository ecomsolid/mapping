"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Mapping = void 0;
var Mapping = /** @class */ (function () {
    function Mapping(oldJSON, newJSON) {
        this.oldJSON = oldJSON;
        this.newJSON = newJSON;
    }
    Mapping.prototype.Get = function () {
        console.log(this.oldJSON);
        console.log(this.newJSON);
    };
    return Mapping;
}());
exports.Mapping = Mapping;
