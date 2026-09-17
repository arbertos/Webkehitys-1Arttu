// Exercise 1 - Console basics
console.log("Hello, World!");


// Exercise 2 - Variables
const name = "Arttu";
let age = 25;
const favouriteAnimal = "Irlannin setteri";

console.log(name);
console.log(age);
console.log(favouriteAnimal);

console.log("Terve! Minä olen " + name + " ja mun lempieläin on " + favouriteAnimal + ".");


// Exercise 3 - User Input
const userName = prompt("What is your name?");
console.log("Hello " + userName + "! Welcome to JavaScript.");


// Exercise 4 - Conditionals
const userAge = prompt("How old are you?");

if (userAge >= 18) {
    console.log("You are an adult.");
} else {
    console.log("You are under 18.");
}


// Exercise 5 - Functions
function greetUser(name) {
    console.log("Hello " + name + "!");
}

greetUser("Joni");
greetUser("Arttu");
greetUser("Verneri");


// Exercise 6 - Nappi
const myButton = document.getElementById("myButton");

myButton.addEventListener("click", function() {
    alert("Taitaa toimia");
});


// BONUS - Lempi eläin tsekki
const visitorFavoriteAnimal = prompt("Mikä on sinun lempieläimesi?");
if (visitorFavoriteAnimal === favouriteAnimal) {
    console.log("Aika hyvä valinta!");
} else {
    console.log("Kiva! " + visitorFavoriteAnimal + ".");
}