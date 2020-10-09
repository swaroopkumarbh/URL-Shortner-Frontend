var baseUrl = "https://swaroop-url-shortner.herokuapp.com";
var password = document.getElementById("password");
var confirmPassword = document.getElementById("confirm-password");
var updateButton = document.getElementById("update-button");
var updatedToken = localStorage.getItem("PasswordToken");
var email = localStorage.getItem("ValidateEmail");
var alert1 = document.querySelector(".alert1");
var alert2 = document.querySelector(".alert2");
var alert3 = document.querySelector(".alert3");

updateButton.addEventListener("click", () => {
    if (password.value !== confirmPassword.value) {
        alert1.classList.remove("displaynone");
        alert2.classList.add("displaynone");
    } else {
        if (password.value == "" && confirmPassword.value == "") {
            alert2.classList.remove("displaynone");
            alert1.classList.add("displaynone");
        } else {
            updatePassword();
            alert1.classList.add("displaynone");
        }
    }
});

async function updatePassword() {
    var payLoad = {
        password: password.value,
        email,
    };
    var req = await fetch(
        `${baseUrl}/user/changepassword`,
        {
            method: "PUT",
            body: JSON.stringify(payLoad),
            headers: {
                "Content-Type": "application/json",
                Authorization: updatedToken,
            },
        }
    );
    var data = await req.json();
    if (data.message == "Password updated") {
        alert3.classList.remove("displaynone");
        location.href = "login.html";
    } else {
        alert(data.message);
    }
}