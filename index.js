var county;
var state;
var found;
var location;
var outsideUS;

if (navigator.geolocation) {
  navigator.geolocation.getCurrentPosition(showPosition);
} else {
  console.log("Geolocation is not supported by this browser.");
}

function showPosition(position, county, state, found) {
  // location = position;
  console.log(position)
  const Http = new XMLHttpRequest();
  // const url = `https://geo.fcc.gov/api/census/area?lat=${position.coords.latitude}&lon=${position.coords.longitude}&format=json`;
  const url = `https://geo.fcc.gov/api/census/area?lat=29.774884&lon=-82.424085&format=json`;
  Http.open("GET", url);
  Http.send();

  Http.onreadystatechange = (e) => {
    county = String(JSON.parse(Http.response).results[0].county_name).toUpperCase();
    state = String(JSON.parse(Http.response).results[0].state_code).toUpperCase();
    console.log(county)
    console.log(state)
    console.log(Http.response)
    console.log("JSDFLKFJLK" + JSON.parse(Http.response))

    // debugger
    // if (String(JSON.parse(Http.response).results === "")) {
    //   outsideUS = true;
    //   // document.getElementById("pubHealthDept").src = "https://www.who.int/emergencies/diseases/novel-coronavirus-2019"
    // } else {

    // $.getJSON("https://raw.githubusercontent.com/AirFusion45/SARS-CoV-2-Dashboard/master/publicHealth.json", function (data) {
    //   for (var i = 0; i < data.length; i++) {
    //     if ((data[i].COUNTY === county) && (data[i].STATE === state) && (data[i].NAME.indexOf("PUBLIC HEALTH") != -1)) {
    //       console.log(data[i])
    //       // document.getElementById("pubHealthDept").src = `https://www.google.com/search?q=%${data[i].WEBSITE}/&btnI=Im+Feeling+Lucky`;
    //       // document.getElementById("pubHealthDept").src = `https://www.cracking.com.ar/redir/redir.php?URL=${data[i].WEBSITE}`;
    //       document.getElementById("pubHealthDept").src = data[i].WEBSITE;
    //       break;
    //     }
    //   }
    // });

    $.getJSON("https://raw.githubusercontent.com/AirFusion45/SARS-CoV-2-Dashboard/master/stateHealth.json", function (data) {
      if (data[state].HTTPS === false) {
        // notification

        $('#ex1').modal();
        document.getElementById("pubHealthDept").src = "https://www.cdc.gov/coronavirus/"
      } else if (data[state].HTTPS === true) {
        $("#pubHealthDept").remove();
        $(".column-right").append(`<iframe id="pubHealthDeptCustom" is="x-frame-bypass" src="${data[state].WEBSITE}"></iframe>`)
      }
    })
  }
}
