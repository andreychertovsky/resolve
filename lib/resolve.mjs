import axios from 'axios';

const API_KEY = 'AIzaSyDzYr2jCjvbXt0trZa-ZwiaNbPIvm_ukkA';

export default class TimeZone {

    constructor( city ) {
        this.city = encodeURIComponent(city);
    }

    async resolveTimeZone ( ) {
        try {
            const   pos   = await this._resolveCoordinates( );
            const   { latitude, longitude } = this._returnLongLat( pos );
            const   req   = await axios.get(`https://maps.googleapis.com/maps/api/timezone/json?location=${longitude},${latitude}&timestamp=${Math.round((new Date().getTime())/1000)}&key=${API_KEY}`);
            return  req.data.timeZoneId;         
        } catch ( err ) {
            console.log( err );
        }
    }
    
    async _resolveCoordinates ( ) {
        try {
            const   req   = await axios.get(`https://geocode-maps.yandex.ru/1.x/?geocode=${this.city}&format=json&results=1`);
            return  req.data.response.GeoObjectCollection.featureMember[0].GeoObject.Point.pos;
        } catch ( err ) {
            console.log( err );
        }
    }
    

    _returnLongLat ( pos ) {
        let rv = {};
        let splitted = pos.split(' ');
        return rv = { latitude:splitted[0], longitude:splitted[1] };
    }

}