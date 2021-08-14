// ~Psuedo Code~
// After clicking the generate button we are then presented with
// A series of prompts for password critera
// Enter a length for the password at least 8 chars- no more than 128 chars
// Select which to include: lowercase, uppercase, numeric, and/or special chars
// When user answers each prompt input should be validated, with atleast one char type selected
// When user answers all prompts a password will be generated using that input
// Password will then be displayed in an alert or written to page

// Assignment Code
var generateBtn = document.querySelector("#generate");

// Write password to the #password input
function writePassword() {
  var password = generatePass();
  var passwordText = document.querySelector("#password");

  passwordText.value = password;
  
}

// Add event listener to generate button
generateBtn.addEventListener("click", writePassword);

// Create an array for number characters
var numericChars = ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9'];
// Array of lowercase characters to be included in password
var lowerCaseChars = ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j', 'k', 'l', 'm', 'n', 'o', 'p', 'q', 'r', 's', 't', 'u', 'v', 'w', 'x', 'y', 'z',];
// Array of uppercase characters to be included simply by applying toUpperCase, this is nice becuase I can avoid typing out the whole array again
var upperCaseChars = lowerCaseChars.map(lowerCaseChars => lowerCaseChars.toUpperCase());
// Create an array for special characters
var specialChars = ['@', '%', '+', '\\', '/', "'", '!', '#', '$', '^', '?', ':', ',', ')', '(', '}', '{', ']', '[', '~', '-', '_', '.',];

// Function to prompt user for password criteria
function getPasswordCritera(){
    // Variable for length of password
    var length = parseInt(prompt("Enter number of password characters, between 8-128."), 10);
    // Validate that the user entered a number of appropiate length
    if(Number.isNaN(length)) {
        alert("Must enter a number for password length");
        return null;
    }
    
    if(length < 8 || length > 128){
        alert("Password length must be at least 8 and less than 129 characters");
        return null;
    }

    // Variable to store if the user wants special characters
    var hasSpecialChars = confirm(
        'Click Yes to include special characters.'
    );

    // Variable to store if the user wants numeric characters
    var hasNumericChars = confirm(
        'Click Yes to include numeric characters.'
    );

    // Variable to store if the user wants uppercase characters
    var hasUpperChars = confirm(
        'Click Yes to include uppercase characters.'
    );

    // Variable to store if the user wants lowercase characters
    var hasLowerChars = confirm(
        'Click Yes to include lowercase characters.'
    );
    
    // Validate that the user selected to include atleast one character type
    if(
        hasLowerChars === false &&
        hasUpperChars === false &&
        hasSpecialChars === false &&
        hasNumericChars === false
    ) {
        alert("Must select atleast one character type");
        return null;
    }

    // Create an object to store the users input
    var passCritera = {
        length: length,
        hasNumericChars: hasNumericChars,
        hasUpperChars: hasUpperChars,
        hasLowerChars: hasLowerChars,
        hasSpecialChars: hasSpecialChars,
    };

    return passCritera;
}

// Function to get random element from one of our arrays
function getRandom(arr) {
    var randIndex = Math.floor(Math.random() * arr.length);
    var randElement = arr[randIndex];

    return randElement;
}

// Function to generate the password using the user criteria
function generatePass() {
    var criteria = getPasswordCritera();
    // array to store the password 
    var result = [];
    var possibleChars = [];
    var resultChars = [];

    // Verify if critera exists
    if (!criteria) return null;

    // Verify which critera to push onto the array
    if (criteria.hasSpecialChars) {
        possibleChars = possibleChars.concat(specialChars);
        resultChars.push(getRandom(specialChars));
      }

    if (criteria.hasNumericChars) {
        possibleChars = possibleChars.concat(numericChars);
        resultChars.push(getRandom(numericChars));
     }
     
    if (criteria.hasUpperChars) {
        possibleChars = possibleChars.concat(upperCaseChars);
        resultChars.push(getRandom(upperCaseChars));
    }

    if (criteria.hasLowerChars) {
        possibleChars = possibleChars.concat(lowerCaseChars);
        resultChars.push(getRandom(lowerCaseChars));
    }
    // Iterate over the length from our criteria selecting a random index and push them into our result password
    for(var i = 0; i < criteria.length; i++) {
        var possibleChar = getRandom(possibleChars);

        result.push(possibleChar);
        
    }

    for (var i = 0; i < resultChars.length; i++) {
        result[i] = resultChars[i];
    }

    // We have to transform result into a string to pass it into writePassword
    return result.join('');
}




