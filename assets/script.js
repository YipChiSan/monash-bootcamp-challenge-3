// Assignment code here
function generatePassword() {
  let countRequiredConditions;
  let errorMessage;
  let haveLowerCase, haveUpperCase, haveNumbers, haveSpecial;
  let charBase = [["a", "b", "c", "d", "e", "f", "g", "h", "i", "j", "k", "l", "m", "n", "o", "p", "q", "r", "s", "t", "u", "v", "w", "x", "y", "z"],
                  ["A", "B", "C", "D", "E", "F", "G", "H", "I", "J", "K", "L", "M", "N", "O", "P", "Q", "R", "S", "T", "U", "V", "W", "X", "Y", "Z"],
                  ["0", "1", "2", "3", "4", "5", "6", "7", "8", "9"],
                  [" ", "!", "\"", "#", "$", "%", "&", "\'", "(", ")", "*", "+", "\,", "-", "\.", "\/", "\:", "\;", "<", "\=", ">", "?", "@", "[", "\\", "]", "^", "_", "\`", "{", "\|", "\}", "~"]
                  ];
  let hasPasswordLengthError = false;
  let hasConditionsError = false;
  let passwordLengthError = "Please include a positive integer in your input.";
  let conditionsError = "Password Length is too short to generate a password which can satisfy all your requirements";

  do {
    errorMessage = "";
    if (hasPasswordLengthError) {
      errorMessage = passwordLengthError;
    }

    if (hasConditionsError) {
      errorMessage = conditionsError;
    }

    passwordLength = (errorMessage === "") ? prompt("Please enter a valid length of your password: ") : prompt(errorMessage + "\n" + "Please enter a valid length of your password: ");
    passwordLength = Number(passwordLength);
    hasPasswordLengthError = !isValidLength(passwordLength);
    if (hasPasswordLengthError) {
      continue;
    }

    [countRequiredConditions, haveLowerCase, haveUpperCase, haveNumbers, haveSpecial] = getPasswordConditions();
    hasConditionsError = countRequiredConditions < passwordLength;

  } while (hasPasswordLengthError || hasConditionsError);

}

function isValidLength(num) {
  return num != NaN || Number.isInteger(num) || num > 0;
}

function getPasswordConditions() {
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

    return [countRequiredConditions, haveLowerCase, haveUpperCase, haveNumbers, haveSpecial];
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
