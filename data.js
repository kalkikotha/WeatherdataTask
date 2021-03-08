var container = document.createElement('div');
container.setAttribute('class', 'container');
document.body.append(container);

var row = document.createElement('div');
row.setAttribute('class', 'row mt-2 bg-dark');
container.append(row);

var hcol = document.createElement("div");
hcol.setAttribute("class", "col-12 text-center");
row.append(hcol);

var head = document.createElement("h1");
head.setAttribute("class", "text-warning");
head.innerHTML = "Country Details";
hcol.append(head);

var data = fetch("https://restcountries.eu/rest/v2/all");

data
    .then(function(res) {
        return res.json();
    })
    .then(function(res) {
        for (let i = 0; i < 250; i++) {
            var col = document.createElement("div");
            col.setAttribute("class", "col-lg-4 col-md-6 col-sm-12");
            row.append(col);

            var card = document.createElement("div");
            card.setAttribute("class", "card text-white mt-2");
            card.setAttribute("style", "background-image: linear-gradient(to right, lightgrey, grey);");
            col.append(card);

            var countryname = document.createElement("div");
            countryname.setAttribute("class", "card-header text-center");
            countryname.innerHTML = res[i].name;
            card.append(countryname);

            var countryFlag = document.createElement("img");
            countryFlag.setAttribute("class", "card-img-top");
            countryFlag.setAttribute("src", "" + res[i].flag + "");
            countryFlag.style.height = "200px";
            card.append(countryFlag);

            var cardBody = document.createElement("div");
            cardBody.setAttribute("class", "card-body");
            card.append(cardBody);

            var capital = document.createElement("p");
            capital.setAttribute("class", "card-text");
            capital.innerHTML = "Capital: " + res[i].capital;


            var region = document.createElement("p");
            region.setAttribute("class", "card-text");
            region.innerHTML = "Region: " + res[i].region;


            var countryCode = document.createElement("p");
            countryCode.setAttribute("class", "card-text");
            countryCode.innerHTML = "Country Code: " + res[i].alpha3Code;


            var countryCoord = document.createElement("p");
            countryCoord.setAttribute("class", "card-text");
            countryCoord.innerHTML = "Country Coord: " + res[i].latlng;


            var weatherDetails = document.createElement("button");
            weatherDetails.setAttribute("class", "btn btn-warning");
            weatherDetails.innerHTML = "Get Weather";


            weatherDetails.addEventListener('click', function() {

                var response = fetch('https://api.openweathermap.org/data/2.5/weather?lat=' + res[i].latlng[0] + '&lon=' + res[i].latlng[1] + '&appid=1cae74d1875caff6d168aacd647412ee')
                response.then(function(resp) {
                        return resp.json()
                    })
                    .then(weather => {
                        alert("current Temperature in " + res[i].name + " is " + parseInt(weather.main.temp - 273.15) + '\xB0C');

                    })

                .catch(err => {
                    console.log(err);
                })

            })

            cardBody.append(capital, region, countryCode, countryCoord, weatherDetails);
            col.append(card);
            row.append(col);
            container.append(row);
            document.body.append(container);

        }

    })
    .catch(function(err) {
        console.log(err);
    });