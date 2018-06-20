$(document).ready(function () {/*תופס דף כניסה שהוא מוכן*/
    $('#login').submit(login);//ברגע שאתה לוחץ על כתור האישור כניסה לדף פונה לפונקציה
});

/*נכנס לפונקציה זאת ברגע לחיצת כפתור כניסה בדף הכניסה*/
function login(event) {
    event.preventDefault(); // למנוע רענון של הטופס
    var userList = JSON.parse(localStorage.getItem('users'));/*ממיר טקסט לאובייקט מהלוקל סטורז לתוך המשתנה*/
    isValid = false; /*משתנה אם פרטים נכונים*/
    for (var item in userList) {/*לולאה רצה על מערך שהתקבל מהלוקל סטורז*/
        if (userList[item].userName == $('#userNameLog').val() && userList[item].password == $('#passwordLog').val()) {/*אם שם המשתמש והסיסא שבלוקל סטורז שווים למה שהוכנס בקלט*/
            /*אם כן*/
            sessionStorage.setItem('userName', userList[item].userName);/*שם שם יוזר בססיון סטורז*/
            sessionStorage.setItem('password', userList[item].password);/*שם סיסמא בססיון סטורז*/
            sessionStorage.setItem('firstName', userList[item].firstName);/*שם שם פרטי בססיון סטורז*/
            sessionStorage.setItem('lastName', userList[item].lastName);/*שם שם משפחה בססיון סטורז*/
            sessionStorage.setItem('email', userList[item].email);/*שם מייל בססיון סטורז*/
            sessionStorage.setItem('dateOfBirth', userList[item].dateOfBirth);/*שפ תאריך לידה בססיון סטורז*/
            sessionStorage.setItem('city', userList[item].city);/*שם עיר בססיון סטורז*/
            sessionStorage.setItem('street', userList[item].street);/*שם רחוב בססיון סטורז*/
            sessionStorage.setItem('streetNumber', userList[item].streetNumber);/*שם מספר רחוב בססיון סטורז*/
            isValid = true;/*פרטים נכונים*/
            break;//יוצא מהלולאה
        }
    }
    if (isValid) {/*אם פרטים נכונים אמת*/
        document.location.href = 'profilePage.html';/*מעביר לדף פרופיל*/
    }
    else {/*אם פרטים לא נכונים*/
        alert("You are not welcome!");/*כותב הודעה*/
        $('#userNameLog').val("");/*מוחק תיבת שם משתמש*/
        $('#passwordLog').val("");/*מוחק תיבת סיסמא*/
    }
}