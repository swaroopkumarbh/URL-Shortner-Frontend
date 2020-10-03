var baseUrl = "https://swaroop-url-shortner.herokuapp.com";
var alert1 = document.querySelector(".alert1");
var alert2 = document.querySelector(".alert2");
var alert3 = document.querySelector(".alert3");
var register = document.getElementById("register-button");
var password = document.getElementById("password");
var email = document.getElementById("email");
var name = document.getElementById("name");
var confirmPassword = document.getElementById("confirm");

register.addEventListener("click", () => {
    if (password.value !== confirmPassword.value) {
        alert1.classList.remove("displaynone");
        alert2.classList.add("displaynone");
    } else {
        if (password.value == "" && confirmPassword.value == "") {
            alert2.classList.remove("displaynone");
            alert1.classList.add("displaynone");
        } else {
            registerUser();
            alert2.classList.add("displaynone")
            alert1.classList.add("displaynone");
            //location.href = "login.html";
        }
    }
});

async function registerUser() {
    var payLoad = {
        name: name.value,
        email: email.value,
        password: password.value,
    };
    var req = await fetch(
        baseUrl + "/users/register",
        {
            method: "POST",
            body: JSON.stringify(payLoad),
            headers: {
                "Content-Type": "application/json",
            },
        }
    );
    var data = await req.json();
    var token = data.token;

    if (data.message != "Email id exists") {
        alert3.classList.remove("displaynone");
        localStorage.setItem("JWToken", `${token}Email${email.value}`);
        //location.href = "auth.html";
    }
}
