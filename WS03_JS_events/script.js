// Harjoitus 1

function showTable() {
    let html = "<table class='display'>";
    html += "<tr><th>Eläin</th><th>Elinympäristö</th><th>Ruokavalio</th></tr>";

    const animal1 = "Leijona";
    const habitat1 = "Savanni";
    const diet1 = "Liha";

    const animal2 = "Panda";
    const habitat2 = "Metsä";
    const diet2 = "Kasvit";

    const animal3 = "Kettu";
    const habitat3 = "Metsä";
    const diet3 = "Sekaravinto";

    html += `<tr><td>${animal1}</td><td>${habitat1}</td><td>${diet1}</td></tr>`;
    html += `<tr><td>${animal2}</td><td>${habitat2}</td><td>${diet2}</td></tr>`;
    html += `<tr><td>${animal3}</td><td>${habitat3}</td><td>${diet3}</td></tr>`;

    html += "</table>";

    const tableContainer = document.querySelector("#tableContainer");
    tableContainer.innerHTML = html;
}

// Harjoitus 2

const harjoitus2 = document.querySelector("#harjoitus2");

harjoitus2.addEventListener("mouseover", function () {
    console.log("Stepped over me with a mouse!");
});

const harjoitus1 = document.querySelector("#harjoitus1");

harjoitus1.addEventListener("click", function () {
    harjoitus1.style.color = "red";
    harjoitus1.innerHTML = "Bye bye mouse!";
});

// Harjoitus 3

const feedback = document.querySelector("#feedback");
const status = document.querySelector("#status");
const charcount = document.querySelector("#charcount");
const preview = document.querySelector("#preview");

feedback.addEventListener("focus", function () {
    status.innerHTML = "Kirjoitat palautetta...";
    feedback.style.backgroundColor = "yellow";
});

feedback.addEventListener("blur", function () {
    status.innerHTML = "";
    feedback.style.backgroundColor = "white";
});

feedback.addEventListener("input", function () {
    charcount.innerHTML = feedback.value.length + "/200";
    preview.innerHTML = feedback.value;
});

// Harjoitus 4

const feedbackForm = document.querySelector("#feedbackForm");

feedbackForm.addEventListener("submit", function (event) {
    event.preventDefault();

    if (feedback.value.length < 10 || feedback.value.length > 200) {
        status.innerHTML = "Palautteen pitää olla 10-200 merkkiä!";
    } else {
        status.innerHTML = "Thank you for your feedback!";
        feedback.value = "";
        charcount.innerHTML = "0/200";
    }
});

// Harjoitus 5

const keybox = document.querySelector("#keybox");
const keyinfo = document.querySelector("#keyinfo");

document.addEventListener("keydown", function (event) {
    console.log(event);

    keyinfo.innerHTML = "Näppäin: " + event.key + " Koodi: " + event.code;

    keybox.innerHTML = event.key;
    keybox.style.fontSize = "40px";
});