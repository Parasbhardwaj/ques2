var cafes;
var places;
var joinArray;

function joinCafeWithPlaces(arr, brr) {
  return arr.map((element) => {
    var name = element.name;
    var id = element.location_id;

    let place = brr.filter((ele) => {
      return ele.id == id;
    });
    var res = {
      ...place[0],
      name,
    };
    delete res.id;
    return res;
  });
}

function displayTable(arr) {
  document.querySelector("#table-wrapper table tbody").innerHTML = "";
  arr.forEach((ele, idx) => {
    document.querySelector("#table-wrapper table tbody").innerHTML += `<tr>
        <td class="column1">${idx + 1}</td>
        <td class="column2">${ele.name}</td>
        <td class="column3">${ele.street_no} ${ele.locality}</td>
        <td class="column4">${ele.postal_code}</td>
        <td class="column5">${ele.lat}</td>
        <td class="column6">${ele.long}</td>
      </tr>`;
  });
}

window.onload = function () {
  let cafeXhr = new XMLHttpRequest();
  cafeXhr.open(
    "GET",
    "https://raw.githubusercontent.com/debojyoti/places-fake-rest-api/master/cafes.json"
  );
  cafeXhr.send();

  cafeXhr.onload = function () {
    if (cafeXhr.status != 200) {
      console.log(`error ${cafeXhr.status} ${cafeXhr.statusText}`);
    } else {
      cafes = JSON.parse(cafeXhr.response).cafes;
      let placesXhr = new XMLHttpRequest();
      placesXhr.open(
        "GET",
        "https://raw.githubusercontent.com/debojyoti/places-fake-rest-api/master/places.json"
      );
      placesXhr.send();

      placesXhr.onload = function () {
        if (placesXhr.status != 200) {
          console.log(`error ${placesXhr.status} ${placesXhr.statusText}`);
        } else {
          places = JSON.parse(placesXhr.response).places;
          joinArray = joinCafeWithPlaces(cafes, places);
          displayTable(joinArray);
          document
            .getElementById("query")
            .addEventListener("keyup", function () {
              var query = document.getElementById("query").value;
              displayTable(
                joinArray.filter((ele) => {
                  return ele.name.toLowerCase().includes(query.toLowerCase());
                })
              );
            });
        }
      };

      placesXhr.onerror = function () {
        alert("error");
      };
    }
  };
};
