// let userName = prompt("Enter your Name:");
// let userPassword = prompt("Enter Your Password:");
// console.log(userName == "Faseeh" && user;Password == "123");
// let num1 = Number(prompt("Enter first value"));
// let num2 = Number(prompt("Enter second value"));
// let operator = prompt(
//     `
//     +
//     -
//     /
//     %
//     *
//     `
// )
// switch(operator){
//     case "+":
//         console.log(num1 + num2);
//         break;
//     case "-":
//         console.log(num1 - num2);
//         break;
//     case "/":
//         console.log(num1 / num2);
//         break;
//     case "%":
//         console.log(num1 % num2);
//         break;
//     default:
//         console.log("Invalid operator");
// }

// let weather = Number(prompt("Enter the weather :-"));
// if(weather > 35){
//     console.log("Very Hot!");
// }
// else if(weather > 25 && weather <= 35){
//     console.log("Hot!");

// }
// else if(weather > 15 && weather <= 25){
//     console.log("pleasent");

// }
// else if(weather > 5 && weather <= 15){
//     console.log("very cold");

// }
// for (r = 1; r <= 5; r++) {
//     for (let i = 1; i <= 5; i++) {
//         document.write("*");
//     }
//     document.write("<br>")
// }
let l = [1, 2, 2, 4, 3, 3]
let Arrey = [1]

for (let v of l) {
    if (!Arrey.includes(v)) {
        Arrey.push(v)
    }
}
console.log(Arrey);
