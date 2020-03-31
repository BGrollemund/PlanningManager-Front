/**
 * Interface for object with index (see utils/SortManager.js)
 */
export default class IIndexedObject {

    constructor( index = 0, object = {} ) {
        this.index = index;
        this.object = object;
    }
}
