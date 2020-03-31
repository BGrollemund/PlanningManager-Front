import IIndexedObject from "../interfaces/IIndexedObject";

class SortManager {

    sortBy = ( objectsArr, attr ) => {
        let result = Object.keys( objectsArr ).map( key => new IIndexedObject( key, objectsArr[key] ) );

        return result.sort( ( a, b ) =>
            ( a.object[attr] ?? '' ).localeCompare( b.object[attr] ?? '' ) );
    };
}

const sortManager = new SortManager();
export default sortManager;
