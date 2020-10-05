var btn = document.getElementById("login-button");
var baseUrl = "https://swaroop-url-shortner.herokuapp.com";

btn.addEventListener("click", () => login());

async function login() {
    var email = document.getElementById("login-email");
    var password = document.getElementById("login-password");
    var payLoad = {
        email: email.value,
        password: password.value,
    };
    var response = await fetch(baseUrl + "/login", {
        method: "POST",
        body: JSON.stringify(payLoad),
        headers: {
            "Content-Type": "application/json",
        },
    });
    var data = await response.json();
    if (data.message == "success") {
        localStorage.setItem("Email", data.email);
        localStorage.setItem("Token", data.token);
        location.href = "dashboard.html";
    } else {
        alert(data.message);
        location.href = "register.html";
    }
}
