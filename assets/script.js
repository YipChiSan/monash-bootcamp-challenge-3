// Assignment code here
function generatePassword() {
  let errorMessage = "";
  let conditions;
  let randomIndex;
  let randomChar;
  let randomCondition;
  let charBase = [["a", "b", "c", "d", "e", "f", "g", "h", "i", "j", "k", "l", "m", "n", "o", "p", "q", "r", "s", "t", "u", "v", "w", "x", "y", "z"],
                  ["A", "B", "C", "D", "E", "F", "G", "H", "I", "J", "K", "L", "M", "N", "O", "P", "Q", "R", "S", "T", "U", "V", "W", "X", "Y", "Z"],
                  ["0", "1", "2", "3", "4", "5", "6", "7", "8", "9"],
                  [" ", "!", "\"", "#", "$", "%", "&", "\'", "(", ")", "*", "+", "\,", "-", "\.", "\/", "\:", "\;", "<", "\=", ">", "?", "@", "[", "\\", "]", "^", "_", "\`", "{", "\|", "\}", "~"]
                  ];
  let hasPasswordLengthTypeError = false;
  let hasPasswordLengthError = false;
  let hasNoConditionError = false;

  let passwordLengthTypeError = "Please choose a valid positive integer.";
  let passwordLengthError = "Please choose a length of at least 8 characters and no more than 128 characters.";
  let noConditionError = "Please select at least one condition.";

  do {
    errorMessage = "";
    if (hasPasswordLengthTypeError) {
      errorMessage = passwordLengthTypeError;
    }

    if (hasPasswordLengthError) {
      errorMessage = passwordLengthError;
    }

    if(hasNoConditionError) {
      errorMessage = noConditionError;
    }
    
    hasPasswordLengthTypeError = false;
    hasPasswordLengthError = false;
    hasNoConditionError = false;

    passwordLength = (errorMessage === "") ? prompt("Please enter a valid length of your password: ") : prompt(errorMessage + "\n" + "Please enter a valid length of your password: ");
    passwordLength = Number(passwordLength);
    hasPasswordLengthTypeError = !isValidLength(passwordLength);

    if (!hasPasswordLengthTypeError) {
      hasPasswordLengthError = passwordLength < 8 || passwordLength > 128;
    }

    if (!hasPasswordLengthTypeError && !hasPasswordLengthError) {
      conditions = getPasswordConditions();
      hasNoConditionError = conditions[0] === 0;
    }

  } while (hasPasswordLengthError || hasPasswordLengthTypeError || hasNoConditionError);

  let res = [];
  let validCon = [];
  if(conditions[1]) {
    validCon.push(1);
    do {
      randomIndex = getRandomInt(passwordLength);
    } while (res[randomIndex] !== undefined);
    randomChar = charBase[0][Math.floor(Math.random()*26)];
    res[randomIndex] = randomChar;
  }

  if(conditions[2]) {
    validCon.push(2);
    do {
      randomIndex = getRandomInt(passwordLength);
    } while (res[randomIndex] !== undefined);
    randomChar = charBase[1][Math.floor(Math.random()*26)];
    res[randomIndex] = randomChar;
  }

  if(conditions[3]) {
    validCon.push(3);
    do {
      randomIndex = getRandomInt(passwordLength);
    } while (res[randomIndex] !== undefined);
    randomChar = charBase[2][Math.floor(Math.random()*10)];
    res[randomIndex] = randomChar;
  }

  if(conditions[4]) {
    validCon.push(4);
    do {
      randomIndex = getRandomInt(passwordLength);
    } while (res[randomIndex] !== undefined);
    randomChar = charBase[3][Math.floor(Math.random()*charBase[3].length)];
    res[randomIndex] = randomChar;
  }

  for (let i = 0; i < passwordLength; i++) {
    if(res[i] === undefined) {
      randomCondition = validCon[Math.floor(Math.random() * validCon.length)];
      res[i] = charBase[randomCondition - 1][Math.floor(Math.random()*charBase[randomCondition - 1].length)];
    }
  }

  return res.join("");
}

function isValidLength(num) {
  return num !== NaN && Number.isInteger(num) && num > 0;
}

function getRandomInt(max) {
  return Math.floor(Math.random() * max);
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
