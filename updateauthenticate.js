var email = localStorage.getItem("ValidateEmail");
var baseUrl = "https://swaroop-url-shortner.herokuapp.com";

async function authenticatePasswordUpdate() {
    var req = await fetch(
        `${baseUrl}/user/changepassword/${email}`,
        {
            headers: {
                "Content-Type": "application/json",
            },
        }
    );
    var data = await req.json();

    if (data.message == "Authenticated") {
        location.href = "updatepassword.html";
    } else {
        alert(data.message);
    }
}
authenticatePasswordUpdate();