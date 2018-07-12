import TimeZone from './lib/resolve.mjs';

// test
(async () => {
    let zone_id = new TimeZone('Магадан');
    console.log( await zone_id.resolveTimeZone() );
})();


