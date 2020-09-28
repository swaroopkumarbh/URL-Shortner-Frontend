
var baseUrl = "https://swaroop-url-shortner.herokuapp.com/";
var sessiondata = localStorage.getItem("JWToken");
var token = sessiondata.split("Email")[0];
var email = sessiondata.split("Email")[1];


async function authenticateUser() {
    var payLoad = { email: email };
    var p = document.getElementById("p");
    var req = await fetch(
        `${baseUrl}/users/auth/${email}`,
        {
            method: "PUT",
            body: JSON.stringify(payLoad),
            headers: {
                "Content-Type": "application/json",
                Authorization: token,
            },
        }
    );
    console.log('auth.js')
    var data = await req.json();

    if (data.message == "User Activated") {
        p.innerHTML = "User Activated";
        location.href = "login.html";
    } else {
        p.innerHTML = "User already activated";
        location.href = "login.html";
    }
}

authenticateUser();
