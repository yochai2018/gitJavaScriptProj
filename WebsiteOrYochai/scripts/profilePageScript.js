$(document).ready(function () {/*ברגע שנפתח הדף*/
    
    getLocation();//הולך לפונקציה 

    $("#profileImage").click(function () {/*ברגע לחיצה  img  תופס תגית   */
        $("#imageUpload").click();//בוחר תמונה
    });

    function fasterPreview(uploader) {/*פונקציה מקבלת מאפייני תמונה*/
            $('#profileImage').attr('src',
               window.URL.createObjectURL(uploader.files[0]));/*כדי לקבל כתובת אתר של סוג הקובץ*/
        
    }

    $("#imageUpload").change(function () {/*תופס את התמונה שבחרתה*/
        fasterPreview(this);/*שולח לפונקציה את המאפיינים של התמונה*/
    });

 
    $('<p>', {/*יצירת פסקה*/
        html: "press to add profile image",//כותב בדף משפט זה
        css: { "margin-top":"-70px","padding-left": "40px", "font-size": "30px", "color": "blue" }//נותן לו מאפייני עיצוב
    }).appendTo('#profile-container');//וזה קורה בבלוק הזה

    /* ברגע לחיצה על כפתור עדכון עובר לדף עדכון פרטים */
    $('#updateD').click(function () {
        document.location.href = 'updateProfile.html';
    });/* ברגע לחיצה על כפתור משחק עובר לדף משחק */
    $('#gameB').click(function () {
        document.location.href = 'game.html';
    })

    userDatils();///פונקציה לכתיבת פרטים אישיים בפרופיל 

});


function userDatils() {/*פונקציה לכתיבת פרטים אישיים בפרופיל */

    var firstProName = sessionStorage.getItem('firstName')//משתנה מקבל את שם הפרטי המססיון סטרוז
    var lastProName = sessionStorage.getItem('lastName')///משתנה מקבל את השם משפחה מהססיון סטורז

    $('<h1/>', {///תופס תגית כותרת
        html: "******" + firstProName + ' ' + lastProName + "******"///שם בדף את שם הפרטי והמשפחה של המשתמש
    }).appendTo('#headProfilePage');///זה קורה בזיהוי זה

    var emailPro = sessionStorage.getItem('email')///משתנה מקבל איימיל מססיון סטורז
    var dob = sessionStorage.getItem('dateOfBirth')///משתנה מקבל תאריך לידה מססיון סטורז


    var city = sessionStorage.getItem('city')//משתנה מקבל עיר מססיון סטורז
    var street = sessionStorage.getItem('street')//משתנה מקבל רחוב מססיון סטורז
    var streetNumber = sessionStorage.getItem('streetNumber')//ורז/משתנה מקבל מספר רחוב מססיון סט

    $('<list>', {/*יוצר רשימה */

        html: '<ul>' + '<i class="material-icons">' + '&#xe554' + '</i> ' + emailPro + '</ul>' + '<ul>' + '<i style="font-size:24px" class="fa">' + '&#xf1fd' + '</i>' + ' ' + dob + '</ul>' + '<ul>' + '<i class="material-icons">' + '&#xe0c8' + '</i>' + city + '</ul>' + '<ul>' + '<i class="material-icons">' + '&#xe0c8' + '</i>' + street + ' ' + streetNumber + '</ul>',//כותב מייל , תאריך לידה, עיר ,רחוב ומספר רחוב כולל איקונים בדף פרופיל
        css:{"font-size":"25px"}//נותן לו עיצוב
    }).appendTo('#dUserDeta');//id נרשם בבלוק שקשורה ל 

     
}

/**
 פונקציה שבודקת אם יש תמיכה של ג'יפיאס בדפדפן'
 */
function getLocation() {
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(showPosition, showError); // אם יש בעיה אז קפוץ לפונקציה הימנית. אם הכל טוב אז לשמאלית
    }else {
        $('#map').html("Geolocation is not supported by this browser.");
    }
}

// אם הכל טוב בו לפונקציה הזאת
function showPosition(position) {
    latlon = position.coords.latitude + "," + position.coords.longitude; // latlon של המיקום
    latitude = parseFloat(position.coords.latitude); // latitude של המיקום
    longitude = parseFloat(position.coords.longitude); // longtitude של המיקום
    initMap();
}

function showError(error) { // קופץ לפונקציה זו אם יש בעיה כלשהי
    switch (error.code) {
        case error.PERMISSION_DENIED:
            $('#map').html("User denied the request for Geolocation."); // משתמש דחה
            break;
        case error.POSITION_UNAVAILABLE:
            $('#map').html("Location information is unavailable."); // לא זמין
            break;
        case error.TIMEOUT:
            $('#map').html("The request to get user location timed out."); // המשתמש נרדם
            break;
        case error.UNKNOWN_ERROR:
            $('#map').html("An unknown error occurred."); // לא מובן
            break;
    }
}

function initMap() {
    document.getElementById("latlng").value = latlon; // בתגית latlonשים את ה 
    var map = new google.maps.Map(document.getElementById('map'), {
        zoom: 8,
        center: { lat: latitude, lng: longitude } // משתמש במשתני המיקום של המשתמש
    });
    var geocoder = new google.maps.Geocoder; // יוצר קלאס מסוג גוגל מאפס
    var infowindow = new google.maps.InfoWindow;

    document.getElementById('submit').addEventListener('click', function () { // אם לוחץ על כפתור אישור
        geocodeLatLng(geocoder, map, infowindow);
    });
}

function geocodeLatLng(geocoder, map, infowindow) {
    var input = document.getElementById('latlng').value;
    var latlngStr = input.split(',', 2); // מוחק את הפסיק
    var latlng = { lat: parseFloat(latlngStr[0]), lng: parseFloat(latlngStr[1]) }; // יוצר מערך עם נקודות הציון
    geocoder.geocode({ 'location': latlng }, function (results, status) {
        if (status === 'OK') { // אם הכל בסדר
            if (results[0]) { // אם מצא את המיקום
                map.setZoom(11); // עושה זום מטורףףף
                var marker = new google.maps.Marker({ // קח טוש
                    position: latlng,
                    map: map
                });
                infowindow.setContent(results[0].formatted_address);
                infowindow.open(map, marker);
            } else { // אם לא מצא את המיקום
                window.alert('No results found');
            }
        } else { // אם לא בסדר
            window.alert('Geocoder failed due to: ' + status);
        }
    });
}