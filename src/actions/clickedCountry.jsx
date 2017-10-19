import axios from 'axios';
import bStates from '../data/brazilStates'
var iso3311a2 = require('iso-3166-1-alpha-2')


export function ClickedCountry(country, sliderVal, admin1) {
  console.log("YOU CLICKED ON COUNTRY: ", country);
  var extra = ""
  var stateName = ""
  if (admin1 !== null) {
    extra = '?id_1=' + admin1;
    stateName = bStates[admin1];
    console.log(stateName);
  }

  return function(dispatch) {
    console.log('About to fetch', country + extra);
    //console.log(api_url + '/schools/countries/' + country);
    axios.defaults.withCredentials = true;
    axios.get('/schools/countries/' + country + extra)
      .catch(err => {
        alert('There was an error trying to fetch', country)
      })
      .then(response => {
        //console.log(country, 'Fetched!');
        var countryname = iso3311a2.getCountry(country)
        var geojson = null;
        var geojsoncount = null;
        var schoolcount = null;

        if (response === null) {
          alert("Please reload page")
        } else {
          geojson = response.data.result;
          geojsoncount = response.data.count;
          schoolcount = geojson.features.length
        }
        var totalteachers = 0;
        var totalstudents = 0;
        var totalelec = 0;
        var totalspeed = 0;
        var totalconnectedschools = 0;
        var nconn = 0;
        var bconn = 0;
        var aconn = 0;
        var noData = 0;
        var showSpeed = false;
        var b_nconn = 0;
        var b_2gconn = 0;
        var b_3gconn = 0;
        var b_noData = 0;
        var avgspeed = 0;
        // console.log(geojson);
        // console.log(countryname);
        // console.log(countryname);
        // console.log(countryname);



        for (var i = 0; i < schoolcount; i++) {
          if (geojson.features[i].properties.speed_connectivity === null) {
            noData++;

          } else if (geojson.features[i].properties.speed_connectivity === 0) {
            nconn++;
            // totalconnectedschools++;

          } else if (geojson.features[i].properties.speed_connectivity < sliderVal) {
            bconn++;
            totalconnectedschools++;

          } else if (geojson.features[i].properties.speed_connectivity >= sliderVal) {
            aconn++;
            totalconnectedschools++;
          }
          ///GGGG Connectivity
          if (geojson.features[i].properties.type_connectivity === null) {
            b_noData++;

          } else if (geojson.features[i].properties.type_connectivity === "No Service") {
            b_nconn++;

          } else if (geojson.features[i].properties.type_connectivity === "2G") {
            b_2gconn++;

          } else if (geojson.features[i].properties.type_connectivity === "3G") {
            b_3gconn++;
          }

          // if (geojson.features[i].properties.type_connectivity >= 0) {
          //   totalconnectedschools++;
          // }

          if (geojson.features[i].properties.num_teachers !== null) {
            totalteachers += geojson.features[i].properties.num_teachers;
          }
          if (geojson.features[i].properties.num_students !== null) {
            totalstudents += geojson.features[i].properties.num_students;
          }
          if (geojson.features[i].properties.electricity !== null && geojson.features[i].properties.electricity === true) {
            totalelec++;
          }
          if (geojson.features[i].properties.speed_connectivity !== null) {
            totalspeed += geojson.features[i].properties.speed_connectivity;
          }
        }
        var avgspeed = Math.round(100 * (totalspeed / schoolcount)) / 100;

        if (totalteachers === 0) {
          totalteachers = "-";
        }
        if (avgspeed === 0) {
          avgspeed = "-";
        }
        if (schoolcount === 0) {
          schoolcount = "-";
        }
        if (totalstudents === 0) {
          totalstudents = "-";
        }
        if (totalconnectedschools === 0) {
          totalconnectedschools = "-";
        }
        if (totalteachers === 0) {
          totalteachers = "-";
        }
        if (totalelec === 0) {
          totalelec = "-";
        }
        if (totalconnectedschools / schoolcount > .3) {
          showSpeed = true;
        }
        //console.log("showSpeed");
        //console.log(showSpeed);
        //console.log(Object.getOwnPropertyNames(response));
        //console.log(geojson.features.length);
        dispatch({
          type: 'COUNTRY_FETCHED',
          payload: {
            country: country,
            geojson: geojson,
            geojsoncount: geojsoncount,
            admin1: admin1,
            adminName: stateName,
            countryname: countryname,
            schoolcount: schoolcount,
            totalconnectedschools: totalconnectedschools,
            totalstudents: totalstudents,
            totalteachers: totalteachers,
            totalelec: totalelec,
            avgspeed: avgspeed,
            showSpeed: showSpeed,
            b_nconn: b_nconn,
            b_2gconn: b_2gconn,
            b_3gconn: b_3gconn,
            b_noData: b_noData,

          }
        })
        dispatch({
          type: "SLIDER_CHANGED",
          payload: {
            value: sliderVal,
            noConn: nconn,
            belowConn: bconn,
            aboveConn: aconn,
            noData: noData,
          }
        })
      })
  }
}




//curl -i magicboxapi.azurewebsites.net/api/v1/schools/countries/RW/?country_code=RW -H "Token: Bearer R_PudvUD8xTb4N-m"
