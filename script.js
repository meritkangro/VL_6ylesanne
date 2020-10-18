(function() {
    "use strict";
    
    //clock

    document.addEventListener("DOMContentLoaded", function() {
        
        var c = document.getElementById("clock");
       
        //setTimeout(updateClock, 2000);
        setInterval(updateClock, 1);
        
        function updateClock() {
            
            var date = new Date();
            var h = date.getHours();
            var m = date.getMinutes();
            var s = date.getSeconds();
            var ampm;

            if (h<12){
                ampm = "AM";
            } else {
                ampm = "PM";
            }

            if (h > 12) {
                h = h - 12;
            }
            if(h==0) {
                h = 12;
            }
            if (h < 10) {
                h = "0" + h;
            }

            if (m < 10) {
                m = "0" + m;
            }

            if (s < 10) {
                s = "0" + s;
            }

            c.innerHTML = h + ":" + m + ":" + s + " " + ampm;
            
        };
        
    });
    
    // forms
    
    document.getElementById("form").addEventListener("submit", estimateDelivery);
    
    var e = document.getElementById("delivery");
    e.innerHTML = "0,00 &euro;";
    
    function estimateDelivery(event) {
        event.preventDefault();
        
        var linn = document.getElementById("linn");
        
        if (linn.value === "") {
            
            alert("Palun valige linn nimekirjast");
            
            linn.focus();
            
            return;
            
            
        } else {
            var valitud = document.getElementById("linn").options.selectedIndex;
            var kink = document.getElementById("v1").checked;
            var kvaba = document.getElementById("v2").checked;

            var hind = 0;
            if (kink==true){
                hind += 5;
            }
            if (kvaba==true){
                hind +=1;
            }

            if (valitud==1){
                 hind += 0;
             } else if (valitud==2 || valitud==3){
                 hind += 2.50;
             } else if (valitud==4){
                 hind +=3;
             }
            e.innerHTML = hind +" &euro;";


            
        }        
        
        console.log("Tarne hind on arvutatud");
    }
    
})();

document.getElementById("form2").addEventListener("submit", validateRadio);

function validateRadio(event){
    event.preventDefault();
    var eesnimi = document.getElementById("fname").value;
    var perenimi = document.getElementById("lname").value;

    if (eesnimi==="" || perenimi===""){
        alert("Palun kontrollige, et olete sisestanud nii oma ees kui ka perekonna nime!")
    }
    var inclNum=/\d/;
    if (eesnimi.match(inclNum)|| perenimi.match(inclNum)) {
        alert("Nimi ei või sisaldada numbreid!")
    }

    var ja = document.getElementById("ja").checked;
    var pigemsoov = document.getElementById("pigemsoov").checked;
    var pigemei = document.getElementById("pigemei").checked;
    var ei = document.getElementById("ei").checked;

    if (ja == false && pigemsoov==false && pigemei==false && ei==false){
        alert("Palun hinnake, kas soovitaksite meie tooteid ka oma sõbrale!")
    }

}

// map

var mapAPIKey = "AqLLRE37SJGqIxXEYxezPUa6fF2oCzl3cvG4n05FtFIVBrotBYxchpMYYpwuxBak";

var map;

function GetMap() {
    
    "use strict";

    var centerPoint = new Microsoft.Maps.Location(
            58.38104, 
            26.71992
        );

    var centercenter = new Microsoft.Maps.Location(
        58.887645,
            25.540796
    )

    map = new Microsoft.Maps.Map("#map", {
        credentials: mapAPIKey,
        center: centercenter,
        zoom: 7,
        mapTypeId: Microsoft.Maps.MapTypeId.road,
        disablePanning: true
    });
    
    var pushpin = new Microsoft.Maps.Pushpin(centerPoint, {
            title: 'Tartu Ülikool',
            //subTitle: 'Hea koht',
            //text: 'UT'
        });

    map.entities.push(pushpin);

    var centerPoint2 = new Microsoft.Maps.Location(
        59.438852,
        24.771705
    );

    var pushpin2 = new Microsoft.Maps.Pushpin(centerPoint2, {
        title: 'Tallinna Ülikool',
        //subTitle: 'Hea koht 2',
        //text: 'TLÜ'
    });

    map.entities.push(pushpin2);

    var infobox = new Microsoft.Maps.Infobox(centerPoint, {
        visible: false
    });

    var infobox2 = new Microsoft.Maps.Infobox(centerPoint2, {
        visible: false
    });

    infobox.setMap(map);
    infobox2.setMap(map);

    pushpin.metadata = {
        title: 'Tartu Ülikool',
        description: 'Tule külla!'
    };

    pushpin2.metadata = {
        title: 'Tallinna Ülikool',
        description: 'Tule külla!'
    };

    Microsoft.Maps.Events.addHandler(pushpin, 'click', pushpinClicked);
    Microsoft.Maps.Events.addHandler(pushpin2, 'click', pushpinClicked);

    function pushpinClicked(e) {
        //Make sure the infobox has metadata to display.
        if (e.target.metadata) {
            //Set the infobox options with the metadata of the pushpin.
            infobox.setOptions({
                location: e.target.getLocation(),
                title: e.target.metadata.title,
                description: e.target.metadata.description,
                visible: true
            });
        }}




}

// https://dev.virtualearth.net/REST/v1/Locations?q=1000 Vin Scully Ave, Los Angeles,CA&key=YOUR_KEY_HERE

