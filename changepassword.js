var btn = document.getElementById("change-button");
btn.addEventListener("click", () => {
    validateUser();
});
var baseUrl = "https://swaroop-url-shortner.herokuapp.com";
async function validateUser() {
    var email = document.getElementById("email");
    var payLoad = { email: email.value };

    var req = await fetch(
        `${baseUrl}/user/forgotpassword`,
        {
            method: "POST",
            body: JSON.stringify(payLoad),
            headers: {
                "Content-Type": "application/json",
            },
        }
    );
    var response = await req.json();
    if (response.message == "User Present") {
        localStorage.setItem("ValidateEmail", email.value);
        alert("Reset link sent to registered email");
        localStorage.getItem("PasswordToken", response.token);
    } else {
        alert(response.message);
    }
}