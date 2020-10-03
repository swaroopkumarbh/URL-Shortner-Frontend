var baseUrl = "http://localhost:3000";
var tbody = document.getElementById("tbody");
var h3 = document.querySelector(".displaynone");
var email = localStorage.getItem("Email");
var token = localStorage.getItem("Token");
var p = document.getElementById("p");
p.innerHTML = `Current User: ${email}`;
document.getElementById("btn-shrink").addEventListener("click", () => {
    var originalUrl = document.getElementById("original-url");
    if (originalUrl.value == "") {
        alert("Please Enter a URL to shrink");
    } else {
        populate();
        originalUrl.value = "";
    }
});
window.addEventListener("load", () => {
    fetchUrls();
});

async function fetchUrls() {
    var payLoad = { email: email };
    var data = await fetch(
        baseUrl + "/get-original-url",
        {
            method: "POST",
            body: JSON.stringify(payLoad),
            headers: {
                "Content-Type": "application/json",
                "Authorization": token
            },
        }
    );

    var result = await data.json();
    let resultLength = result.length;
    for (let i = 0; i < resultLength; i++) {
        var tr = document.createElement("tr");
        var td1 = document.createElement("td");
        td1.setAttribute("id", `${result[i].originalUrl}`);
        var originalUrl = document.createElement("a");
        originalUrl.href = `${result[i].originalUrl}`;
        originalUrl.innerHTML = result[i].originalUrl;
        td1.appendChild(originalUrl);
        tr.appendChild(td1);
        var td2 = document.createElement("td");
        td2.setAttribute("id", `tinyUrl-${result[i].tinyUrl}`);
        var tinyUrl = document.createElement("a");
        tinyUrl.addEventListener("click", () => {
            updateClickCount(result[i].originalUrl);
            location.href = result[i].originalUrl;
        });
        tinyUrl.innerHTML = result[i].tinyUrl;
        td2.appendChild(tinyUrl);
        tr.appendChild(td2);
        var td3 = document.createElement("td");
        td3.setAttribute("id", `count-${result[i].tinyUrl}`);
        td3.innerHTML = result[i].clicked;
        tr.appendChild(td3);
        tbody.appendChild(tr);
    }
}

async function populate() {
    try {
        var data1 = {
            originalUrl: `${document.getElementById("original-url").value}`,
            email: email,
        };
        var req = await fetch(
            baseUrl + "/shrink-url",
            {
                method: "POST",
                body: JSON.stringify(data1),
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": token
                },
            }
        );
        console.log('populate')
        var data = await req.json();
        if (data.message == "Data Inserted") {
            fetchOriginalUrls();
        }
        else {
            h3.innerHTML = data.message;
        }
    } catch (error) {
        console.log(error);
    }
}

async function fetchOriginalUrls() {
    h3.innerHTML = '';
    var payLoad = { email: email };
    var data = await fetch(
        baseUrl + "/get-original-url",
        {
            method: "POST",
            body: JSON.stringify(payLoad),
            headers: {
                "Content-Type": "application/json",
                "Authorization": token
            },
        }
    );
    var result = await data.json();
    let resultLength = result.length;
    var tr = document.createElement("tr");
    var td1 = document.createElement("td");
    td1.setAttribute("id", `${result[resultLength - 1].originalUrl}`);
    var originalUrl = document.createElement("a");
    originalUrl.href = `${result[resultLength - 1].originalUrl}`;
    originalUrl.innerHTML = result[resultLength - 1].originalUrl;
    td1.appendChild(originalUrl);
    tr.appendChild(td1);
    var td2 = document.createElement("td");
    td2.setAttribute("id", `tinyUrl-${result[resultLength - 1].tinyUrl}`);
    var tinyUrl = document.createElement("a");
    tinyUrl.href = `${result[resultLength - 1].originalUrl}`;
    tinyUrl.innerHTML = result[resultLength - 1].tinyUrl;
    td2.appendChild(tinyUrl);
    tr.appendChild(td2);

    tinyUrl.addEventListener("click", () => {
        updateClickCount(result[resultLength - 1].originalUrl);
    });
    var td3 = document.createElement("td");
    var p = document.createElement("p");
    p.setAttribute("id", `count-${result[resultLength - 1].clicked}`);
    p.innerHTML = result[resultLength - 1].clicked;
    td3.appendChild(p);
    tr.appendChild(td3);
    tbody.appendChild(tr);
}

async function updateClickCount(originalUrl) {
    try {
        var payLoad = { originalUrl: originalUrl, email: email };

        var res = await fetch(
            baseUrl + "/shrink-url",
            {
                method: "PUT",
                body: JSON.stringify(payLoad),
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": token
                },
            }
        );
        var data = await res.json();

        if (data.message == "Data Updated") {
            tbody.innerHTML = ``;
            fetchUrls();
        } else {
            console.log("error");
        }
    } catch (error) {
        console.log(error);
    }
}
