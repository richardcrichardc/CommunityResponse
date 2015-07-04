

/* Takes lat, long in WGS84 and gives us a distance in Kilometres */
/* Latitidue is north/south, longitude is east/west */
function geoDistance(point0, point1) {
  /* function double:rad = dms2rads(deg:double, min:double, sec:double)
   *    return (deg + min / 60 + sec / 60^2) * PI / 180
   */
  var deg2rad = Math.PI / 180.0;

  /* rad1S = dms2rads(deg1S, min1S, sec1S)
   * rad2S = dms2rads(deg2S, min2S, sec2S)
   * rad1E = dms2rads(deg1E, min1E, sec1E)
   * rad2E = dms2rads(deg2E, min2E, sec2E)
   */
  var rad1S = deg2rad * point0.lat;
  var rad2S = deg2rad * point1.lat;
  var rad1E = deg2rad * point0.lon;
  var rad2E = deg2rad * point1.lon;

  // d1_2 = acos(cos(rad1S) * cos(rad2S) * (cos(rad1E) * cos(rad2E) + sin(rad1E) * sin(rad2E)) + sin(rad1S) * sin(rad2S)) * 2e4 / pi

  var distance = Math.acos(
    Math.cos(rad1S) *
    Math.cos(rad2S) *
    (Math.cos(rad1E) * Math.cos(rad2E) + Math.sin(rad1E) * Math.sin(rad2E)) +
    Math.sin(rad1S) * Math.sin(rad2S)
  ) * 20000 / Math.PI;

  return distance;
}
