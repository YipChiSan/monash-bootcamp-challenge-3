// Assignment code here
function generatePassword() {
 
    let passwordLength = prompt("Please enter a valid length of your password: ");;
    passwordLength = Number(passwordLength);
    while(!isValidLength(passwordLength)) {
      passwordLength = prompt("Please don't include any non-numeric char in your input. \n Please enter a valid length of your password: ");
      passwordLength = Number(passwordLength);
    }; 

  let haveLowerCase = confirm("Should the generated password include lowercase characters?");
  let haveUpperCase = confirm("Should the generated password include uppercase characters?");
  let haveNumbers = confirm("Should the generated password include numbers?");
  let haveSpecial = confirm("Should the generated password include special characters?");

  let countRequiredConditions = 0;
  if(haveLowerCase) {
    countRequiredConditions++;
  }

  if(haveUpperCase) {
    countRequiredConditions++;
  }

  if(haveNumbers) {
    countRequiredConditions++;
  }

  if(haveSpecial) {
    countRequiredConditions++;
  }

  while(countRequiredConditions > passwordLength || !isValidLength(passwordLength)) {
    passwordLength = prompt("Password Length is too short to generate a password which can satisfy all your requirements OR the input length is not valid \n Please enter a valid length of your password: ");
    passwordLength = Number(passwordLength);
  }


}

function isValidLength(num) {
  return num != NaN || Number.isInteger(num) || num > 0;
}

// Get references to the #generate element
var generateBtn = document.querySelector("#generate");

// Write password to the #password input
function writePassword() {
  var password = generatePassword();
  var passwordText = document.querySelector("#password");

  passwordText.value = password;

}

// Add event listener to generate button
generateBtn.addEventListener("click", writePassword);
