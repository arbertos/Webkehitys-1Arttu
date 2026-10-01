// Header - näytä/piilota taulukko

const animalButton = document.querySelector("#animalButton");
const animalTable = document.querySelector("#animalTable");

animalButton.addEventListener("click", function () {
    animalTable.classList.toggle("hidden");
});

// Tehtävä 1

const taskOneHeading = document.querySelector("#taskOneHeading");
const animalText = document.querySelector("#animalText");

const changeHeadingButton = document.querySelector("#changeHeadingButton");
const changeStyleButton = document.querySelector("#changeStyleButton");
const changeTextButton = document.querySelector("#changeTextButton");

changeHeadingButton.addEventListener("click", function () {
    taskOneHeading.textContent = "No morjens!";
});

changeStyleButton.addEventListener("click", function () {
    taskOneHeading.classList.toggle("highlight");
});

changeTextButton.addEventListener("click", function () {
    animalText.textContent = "Elefantit elävät laumoissa ja ovat erittäin älykkäitä.";
});

// Tehtävä 2

const animalContent = document.querySelector("#animalContent");

const newHeading = document.createElement("h3");
newHeading.textContent = "Päivän eläin";
newHeading.classList.add("animal-heading");

const newParagraph = document.createElement("p");
newParagraph.textContent = "Tiikeri on maailman suurin kissaeläin ja erinomainen uija.";

const newImage = document.createElement("img");
newImage.src = "images/tikru.jpg";
newImage.alt = "Tiikeri";

animalContent.append(newHeading, newParagraph, newImage);

const hideAnimalButton = document.querySelector("#hideAnimalButton");
const showAnimalButton = document.querySelector("#showAnimalButton");

hideAnimalButton.addEventListener("click", function () {
    animalContent.classList.add("hidden");
});

showAnimalButton.addEventListener("click", function () {
    animalContent.classList.remove("hidden");
});

// Tehtävä 3

const animalSelect = document.querySelector("#animalSelect");
const animalName = document.querySelector("#animalName");
const animalImage = document.querySelector("#animalImage");
const animalDescription = document.querySelector("#animalDescription");

const animalData = {
    elephant: {
        name: "Elefantti",
        img: "images/norsu.jpg",
        desc: "Elefantit ovat maailman suurimpia maaeläimiä."
    },
    tiger: {
        name: "Tiikeri",
        img: "images/tikru.jpg",
        desc: "Tiikeri on maailman suurin kissaeläin."
    },
    penguin: {
        name: "Pingviini",
        img: "images/pingu.jpg",
        desc: "Pingviinit eivät osaa lentää, mutta ovat loistavia uimareita."
    },
    panda: {
        name: "Panda",
        img: "images/panda.jpg",
        desc: "Pandat syövät lähes pelkkää bambua."
    }
};

animalSelect.addEventListener("change", function () {
    const selected = animalSelect.value;
    const data = animalData[selected];

    animalName.textContent = data.name;
    animalImage.src = data.img;
    animalImage.alt = data.name;
    animalDescription.textContent = data.desc;
});

animalImage.addEventListener("mouseenter", function () {
    animalImage.classList.add("image-highlight");
});

animalImage.addEventListener("mouseleave", function () {
    animalImage.classList.remove("image-highlight");
});

// Tehtävä 4

const animalForm = document.querySelector("#animalForm");
const observationTableBody = document.querySelector("#observationTableBody");

animalForm.addEventListener("submit", function (event) {
    event.preventDefault();

    const animalValue = document.querySelector("#observationAnimal").value;
    const locationValue = document.querySelector("#observationLocation").value;
    const dateValue = document.querySelector("#observationDate").value;

    if (animalValue === "" || locationValue === "" || dateValue === "") {
        alert("Täytä kaikki kentät!");
        return;
    }

    const newRow = document.createElement("tr");

    const animalCell = document.createElement("td");
    animalCell.textContent = animalValue;

    const locationCell = document.createElement("td");
    locationCell.textContent = locationValue;

    const dateCell = document.createElement("td");
    dateCell.textContent = dateValue;

    newRow.append(animalCell, locationCell, dateCell);
    observationTableBody.append(newRow);

    animalForm.reset();
});