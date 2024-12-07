/*
    Name: Nefeli Koumpouli  
    File: assignment4.js
    Date Created: 2024-10-17
    Date Updated: 2024-12-07
    Purpose: MIS 7375 Extra credit...  Learning JavaScript.
    Version: 2.0
    */

// Check if "Remember Me" was checked and pre-fill the fname if stored in localStorage or cookies
window.onload = function () {
  const savedfname = localStorage.getItem("fname") || getCookie("fname");
  const rememberMe = localStorage.getItem("rememberMe") === 'true';  // Retrieve and check "Remember Me"
  
  if (savedfname) {
    document.getElementById("fname").value = savedfname;
  }
  document.getElementById("rememberMe").checked = rememberMe;  // Set the checkbox state based on localStorage
};


// Validate form ///
document.getElementById("form").onsubmit = function (event) {
  if (!validateAll()) {
    event.preventDefault();
    showAlert();
  } else {
    const rememberMe = document.getElementById("rememberMe").checked;
    localStorage.setItem("rememberMe", rememberMe);  // Save "Remember Me" state

    if (rememberMe) {
      // Save form data to localStorage
      const formFields = ["fname", "lname", "email", "phone", ];
      formFields.forEach(saveToLocalStorage);
    } else {
      // Clear saved form data if "Remember Me" is unchecked
      clearLocalStorage();
    }
    return true;
  }
};



/// Validate Birth Day ///
function validateBirthdate() {
  const dob = document.getElementById('dob');
  const birthdateMessage = document.getElementById('dob-error');
  const dobInput = new Date(dob.value);

  // Define the maximum age (120 years ago)
  const currentDate = new Date();
  const maxDate = new Date();
  maxDate.setFullYear(currentDate.getFullYear() - 120);

  console.log("DOB Input:", dobInput);
  console.log("Max Date (120 years ago):", maxDate);

  // Check if the date is in the future
  if (dobInput > currentDate) {
    birthdateMessage.innerHTML = "Date cannot be in the future.";
    dob.value = "";  
    return false;
  }
  // Check if the date is more than 120 years ago
  else if (dobInput < maxDate) {
    birthdateMessage.innerHTML = "Date cannot be more than 120 years ago.";
    dob.value = "";  
    return false;
  }
  // Clear the error message if valid
  else {
    birthdateMessage.innerHTML = "";
    return true;
  }
}

// slider///
function updateValue(value) {
  document.getElementById('demo').innerText = value;
}

// Validate username
function validateUsername() {
  let username = document.getElementById("username").value.trim();
  const usernameMessage = document.getElementById("usernameMessage");

  // Check if the username is empty
  if (username.length === 0) {
      usernameMessage.innerHTML = "Username cannot be empty.";
      return false;
  }

  // Check if the username starts with a number
  if (!isNaN(username.charAt(0))) {
      usernameMessage.innerHTML = "Username cannot start with a number.";
      return false;    
  }

  // Check if the username only contains letters, numbers, or underscores
  const regex = /^[a-zA-Z0-9_]+$/;

  if (!regex.test(username)) {
      usernameMessage.innerHTML = "Username can only contain letters, numbers, or underscores.";
      return false;
  }

  // Check if the username is at least 5 characters long
  if (username.length < 5) {
      usernameMessage.innerHTML = "Username must be at least 5 characters long.";
      return false;
  }

  // Clear error message if the username is valid
  usernameMessage.innerHTML = "";
  return true;
}

//today's date
const errorElement = document.getElementById('error');
document.getElementById("today").innerHTML = new Date().toLocaleDateString();

//Password 

function validatePasswords() {
  const passwordInput = document.getElementById('password');
  const repasswordInput = document.getElementById('repassword');
  const messageElement = document.getElementById('passwordMessage');

}
 
// Check if passwords match
function submitPasswords() {
  const passwordInput = document.getElementById('password');
  const repasswordInput = document.getElementById('repassword');
  const messageElement = document.getElementById('passwordMessage');

  const passwordRegex = /^(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,30}$/;

  messageElement.textContent = '';

  if (passwordInput.value !== repasswordInput.value) {
    messageElement.textContent = 'Passwords do not match. Please try again.';
} else if (!passwordRegex.test(passwordInput.value)) {
    messageElement.textContent = 'Passwords must be at least 8 characters and no more than 30 characters long and contain at least 1 upper case letter, 1 number, and 1 special character.';
}  else {
  alert('Password successfully submitted!');
  
  passwordInput.value = '';
  repasswordInput.value = '';
  messageElement.textContent = '';
}
}

/// Password///

function validatePassword() {
  const password = document.getElementById("password").value;
  const user = document.getElementById("username").value;

  let errorFlag = 0;

  // Check for lowercase letters
  if (!password.match(/[a-z]/)) {
      document.getElementById("ms1").innerHTML = "Enter at least 1 lowercase letter.";
      errorFlag = 1;
  } else {
      document.getElementById("ms1").innerHTML = "";
  }

  // Check for capital letters
  if (!password.match(/[A-Z]/)) {
      document.getElementById("ms2").innerHTML = "Enter at least 1 capital letter.";
      errorFlag = 1;
  } else {
      document.getElementById("ms2").innerHTML = "";
  }

  // Check for numbers
  if (!password.match(/[0-9]/)) {
      document.getElementById("ms3").innerHTML = "Enter at least one number.";
      errorFlag = 1;
  } else {
      document.getElementById("ms3").innerHTML = "";
  }

  // Check for special characters
  if (!password.match(/[!@#%&*\-_\\.+()]/)) {
      document.getElementById("ms4").innerHTML = "Enter at least 1 special character.";
      errorFlag = 1;
  } else {
      document.getElementById("ms4").innerHTML = "";
  }

  // Check for length
  if (password.length < 8) {
      document.getElementById("ms5").innerHTML = "Enter a minimum of 8 characters.";
      errorFlag = 1;
  } else {
      document.getElementById("ms5").innerHTML = "";
  }

  // Check if password equals the user ID
  if (password === user || password.includes(user)) {
      document.getElementById("ms6").innerHTML = "Password cannot be equal to or contain the username.";
      errorFlag = 1;
  } else {
      document.getElementById("ms6").innerHTML = "";
  }

  // Display a valid message if there are no errors
  if (errorFlag === 0) {
      document.getElementById("ms3").innerHTML = "Valid Password.";
  }
}


// Confrim passwords

function confirmPassword() {
  const password = document.getElementById("password").value;
  const repassword = document.getElementById("repassword").value;

  if (repassword !== password) {
      document.getElementById("repasswordMessage").innerHTML = "Passwords do not match.";
      return false;
  } else {
      document.getElementById("repasswordMessage").innerHTML = "";
      return true;
  }
}

function reviewFunction() {
  const username = document.getElementById('username').value;
  const dob = document.getElementById('dob').value;
  

  const reviewMessage = `
                Username: ${username}
                Date of Birth: ${dob}`;

  alert('Review your information: If no information on these then it needs to be filled.\n' + reviewMessage);
}

// Remove User Input

function removeReview(){
  document.getElementById("showinput").innerHTML = "";
}

//First Name Validation ////

function validateFirstName() {
  let fname = document.getElementById('fname');
  let regex = /^[A-Za-z'-]+$/;

  // Check if name is empty
  if (fname.value === "") {
    document.getElementById("firstNameMessage").innerHTML = "First name must not be empty.";
    return false;
  }
  // Check if name is less than 2 characters
  else if (fname.value.length < 2) {
    document.getElementById("firstNameMessage").innerHTML = "First name must be at least 2 characters.";
    return false;
  }
  // Check if name matches the pattern
  else if (!regex.test(fname.value)) {
    document.getElementById("firstNameMessage").innerHTML = "First name can contain only letters, apostrophes, and dashes.";
    return false;
  }
  // Check if name does not exceed 30 characters
  else if (fname.value.length > 30) {
    document.getElementById("firstNameMessage").innerHTML = "First name must not exceed 30 characters.";
    return false;
  }
  // If all checks pass, clear error messages
  else {
    document.getElementById("firstNameMessage").innerHTML = "";
    return true;
  }
}

//lastname validation //////

function validateLastName() {
  let lname = document.getElementById('lname');
  let regex = /^[A-Za-z'-]+$/;

  // Check if lname is empty
  if (lname.value === "") {
    document.getElementById("lastNameMessage").innerHTML = "Last name must not be empty.";
    return false;
  }
  // Check if lname is less than 2 characters
  else if (lname.value.length < 2) {
    document.getElementById("lastNameMessage").innerHTML = "Last name must be at least 2 characters.";
    return false;
  }
  // Check if lname matches the pattern
  else if (!regex.test(lname.value)) {
    document.getElementById("lastNameMessage").innerHTML = "Last name can contain only letters, apostrophes, and dashes.";
    return false;
  }
  // Check if lname does not exceed 30 characters
  else if (lname.value.length > 30) {
    document.getElementById("lastNameMessage").innerHTML = "Last name must not exceed 30 characters.";
    return false;
  }
  // If all checks pass, clear error messages
  else {
    document.getElementById("lastNameMessage").innerHTML = "";
    return true;
  }
}

///email validation\\\

function validateEmail() {
  let email = document.getElementById('email');
  const regexemail = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;

  // Check if the email field is empty
  if (email.value === "") {
    document.getElementById("emailMessage").innerHTML = 
      "Email Address must not be empty.";
    return false;
  }
  // Check if the email matches the regex pattern
  else if (!regexemail.test(email.value)) {
    document.getElementById("emailMessage").innerHTML = 
      "Please enter a valid email address.";
    return false;
  }
  // Clear error message if validation passes
  else {
    document.getElementById("emailMessage").innerHTML = "";
    return true;
  }
}

// Validate phone ///

function validatePhone() {
  const phoneInput = document.getElementById('phone');
 
  // only digits
  const phone = phoneInput.value.replace(/\D/g, "");

   // if phone number has exactly 10 digits
  if (phone.length !== 10) {
      document.getElementById("phoneMessage").innerHTML = "Invalid Phone Number";
      return false;
  }

  // Format phone number as XXX-XXX-XXXX
  const formatPhone = phone.slice(0, 3) + "-" + phone.slice(3, 6) + "-" + phone.slice(6);
  phoneInput.value = formatPhone;
  document.getElementById("phoneMessage").innerHTML = "";
  return true;
}

// Validate SSN //
function validateSSN() {
  const SSN = document.getElementById("SSN").value.trim();

  // Format SSN as XXX-XX-XXXX
  const SSNregex = /^[0-9]{3}-[0-9]{2}-[0-9]{4}$/;

  // Check if SSN matches the pattern
  if (!SSNregex.test(SSN)) {
      document.getElementById("ssn-error").innerHTML = "Please enter a valid Social Security Number (XXX-XX-XXXX)";
      return false;
  } else {
      document.getElementById("ssn-error").innerHTML = "";
      return true;
  }
}

// validate Add1 ///
function validateAdd1() {
  const add1 = document.getElementById("Add1").value;
  const add1Error = document.getElementById("add1-error");

  if (add1.length < 2 || add1.length > 30) {
    add1Error.textContent = "Address must be between 2 and 30 characters.";
      return false;
  } else {
    add1Error.textContent = ""; 
      return true;
  }
} 




// Validate city ///
function validateCity() {
  const city = document.getElementById("city").value;
  const cityError = document.getElementById("city-error");

  if (city.length < 2 || city.length > 30) {
      cityError.textContent = "City must be at least 2 and less than 30 characters.";
      return false;
  } else {
      cityError.textContent = ""; 
      return true;
  }
}


// Validate zip code //
function validatezip() {
  const zip = document.getElementById("zip").value;
  const zipError = document.getElementById("zip-error");
  const zipPattern = /^\d{5}(-\d{4})?$/; 

  if (!zipPattern.test(zip)) {
      zipError.textContent = "Invalid Zip Code. Enter a 5-digit code or use this format (12345-12345).";
      return false;
  } else {
      zipError.textContent = ""; 
      return true;
  }
}


function validateAddress() {
  const isAddressLine1Valid = validateAddressLine1();
  const isCityValid = validateCity();
  const isZipValid = validatezip();

  return isAddressLine1Valid && isCityValid && isZipValid;
}

// submit if all validations pass
document.getElementById("form").onsubmit = function() {
  return validateAddress(); 
};

// JavaScript alerts 

function showAlert() {
  var alertBox = document.getElementById("alert-box");
  var closeBt = document.getElementById("close-alert");
  alertBox.style.display = "block";
  closeBt.onclick = function () {
      alertBox.style.display = "none";
  }
}

function validateAll() {
  let valid = true;
  
  if(!validateBirthdate()) {
      valid = false;        
  }

  if(!validateUsername()) {
      valid = false;        
  }

  if(!validatePassword()) {
      valid = false;        
  }

  if(!confirmPassword()) {
      valid = false;        
  }

  if(!validateFirstName()) {
      valid = false;        
  }

  if(!validateLastName()) {
      valid = false;        
  }
  
  if(!validateEmail()) {
      valid = false;        
  }

  if(!validatePhone()) {
      valid = false;        
  }

  if(!validateSSN()) {
      valid = false;        
  }

  if(!validateAdd1()) {
      valid = false;        
  }

  if(!validateCity()) {
      valid = false;        
  }

  if(!validatezip()) {
      valid = false;        
  }

  if (valid) {
     document.getElementById("submit").disabled = false;
  } else {      
      showAlert();
  }      
}



// Function to set a cookie
function setCookie(name, value, days) {
  const date = new Date();
  date.setTime(date.getTime() + days * 24 * 60 * 60 * 1000);
  const expires = "expires=" + date.toUTCString();
  document.cookie = `${name}=${value}; ${expires}; path=/`;
}

// Function to get a cookie
function getCookie(name) {
  const cookieName = name + "=";
  const cookies = document.cookie.split(';');
  for (let i = 0; i < cookies.length; i++) {
    const cookie = cookies[i].trim();
    if (cookie.indexOf(cookieName) === 0) {
      return cookie.substring(cookieName.length, cookie.length);
    }
  }
  return "";
}

// Function to clear cookies
function clearCookies() {
  const cookies = document.cookie.split("; ");
  for (const cookie of cookies) {
    const eqPos = cookie.indexOf("=");
    const name = eqPos > -1 ? cookie.substring(0, eqPos) : cookie;
    document.cookie = name + "=;expires=Thu, 01 Jan 1970 00:00:00 UTC;path=/;";
  }
}

// Function to save data to localStorage
function saveToLocalStorage(fieldId) {
  const field = document.getElementById(fieldId);
  if (field) {
    localStorage.setItem(fieldId, field.value);
  }
}

// Function to load data from localStorage
function loadFromLocalStorage(fieldId) {
  const field = document.getElementById(fieldId);
  if (field) {
    const value = localStorage.getItem(fieldId);
    if (value) field.value = value;
  }
}

// Function to clear localStorage
function clearLocalStorage() {
  localStorage.clear();
}

// Add event listeners and modal logic on page load
document.addEventListener("DOMContentLoaded", () => {
  const formFields = ["fname", "lname", "email", "phone", "dob"];

  // Load form data from localStorage if it exists
  const firstName = getCookie("firstName");
  if (firstName) {
    // If cookie exists, show the welcome message and modal
    const welcomeMessage = document.getElementById("Welcome1");
    const newUserLink = document.getElementById("new-user");
    if (welcomeMessage && newUserLink) {
      welcomeMessage.innerHTML = `Welcome Back, ${firstName}!`;
      newUserLink.addEventListener("click", () => {
        clearCookies();
        clearLocalStorage();
        location.reload();
      });
    }

    // Show the localStorage modal
    const localStorageModal = document.getElementById("localStorageModal");
    if (localStorageModal) {
      localStorageModal.style.display = "block";

      // Add event listener for "Continue" button
       const continueBtn = document.getElementById("continueBtn");
  if (continueBtn) {
    continueBtn.addEventListener("click", () => {
      formFields.forEach(loadFromLocalStorage); // Load form data from localStorage
      localStorageModal.style.display = "none"; // Hide modal
      console.log("Form data loaded from localStorage.");
    });
  }

      // Add event listener for "Start Fresh" button
      const newUserBtn = document.getElementById("newUserBtn");
      if (newUserBtn) {
        newUserBtn.addEventListener("click", () => {
          clearLocalStorage(); // Clear localStorage
          localStorageModal.style.display = "none"; // Hide modal
          console.log("LocalStorage cleared, starting fresh.");
        });
      }
    }
  } else {
    console.log("No cookie found. Showing default form.");
  }

  // Add event listeners for input fields to save data to localStorage
  formFields.forEach((fieldId) => {
    const field = document.getElementById(fieldId);
    if (field) {
      field.addEventListener("input", () => {
        saveToLocalStorage(fieldId); // Save changes to localStorage
      });
    }
  });
});

// Get the modal and handle outside clicks
window.onclick = function (event) {
  const localStorageModal = document.getElementById("localStorageModal");
  if (event.target == localStorageModal) {
    localStorageModal.style.display = "none";
  }
};



//Captcha 
function checkRecaptcha() {
  var response = grecaptcha.getResponse();
  if(response.length == 0) { 
    //reCaptcha not verified
    alert("no pass"); 
  }
  else { 
    //reCaptch verified
    alert("pass"); 
  }
}

// implement on the backend
function backend_API_challenge() {
    var response = grecaptcha.getResponse();
    $.ajax({
        type: "POST",
        url: 'https://www.google.com/recaptcha/api/siteverify',
        data: {"secret" : "6LdsZpQqAAAAAPyFyMALHgeBhdQr1hKHLqaVjDYJ", "response" : response, "remoteip":"localhost"},
        contentType: 'application/x-www-form-urlencoded',
        success: function(data) { console.log(data); }
    });
}

// Get the progress bar element
const progressBar = document.getElementById("progressBar");

// Form fields you want to track
const formFields = [
  "fname",
  "mname",
  "lname",
  "email",
  "phone",
  "dob",
  "SSN",
  "Add1",
  "Add2",
  "city",
  "state",
  "symptoms",
  "gender",
  "vac",
  "ins",
  "pswrd",
  "repassword",
  
  // Add other field IDs as needed
];

// Function to update the progress bar and display percentage
function updateProgressBar() {
  let completedFields = 0;

  // Loop through all the form fields
  formFields.forEach((fieldId) => {
    const field = document.getElementById(fieldId);
    if (field && field.value) {
      completedFields++; // Count fields that are filled out
    }
  });

  // Calculate the percentage of completed fields
  const percentage = (completedFields / formFields.length) * 100;

  // Update the progress bar value
  progressBar.value = percentage;

  // Display the percentage text next to the progress bar
  progressPercentage.textContent = `${Math.round(percentage)}%`; // Round to nearest whole number
}

// Add event listeners to form fields to track changes
formFields.forEach((fieldId) => {
  const field = document.getElementById(fieldId);
  if (field) {
    field.addEventListener("input", updateProgressBar); // Update progress bar on input change
  }
});

// Call the update function initially to set the progress bar and percentage if there is already some pre-filled data
document.addEventListener("DOMContentLoaded", updateProgressBar);



let slideIndex = 1;
showSlides(slideIndex);

function plusSlides(n) {
  showSlides(slideIndex += n);
}

function currentSlide(n) {
  showSlides(slideIndex = n);
}

function showSlides(n) {
  let i;
  let slides = document.getElementsByClassName("mySlides");
  let dots = document.getElementsByClassName("dot");
  if (n > slides.length) {slideIndex = 1}    
  if (n < 1) {slideIndex = slides.length}
  for (i = 0; i < slides.length; i++) {
    slides[i].style.display = "none";  
  }
  for (i = 0; i < dots.length; i++) {
    dots[i].className = dots[i].className.replace(" active", "");
  }
  slides[slideIndex-1].style.display = "block";  
  dots[slideIndex-1].className += " active";
}

// Set the date we're counting down to
var countDownDate = new Date("Dec 10, 2024 15:37:25").getTime();

// Update the count down every 1 second
var x = setInterval(function() {

  // Get today's date and time
  var now = new Date().getTime();
    
  // Find the distance between now and the count down date
  var distance = countDownDate - now;
    
  // Time calculations for days, hours, minutes and seconds
  var days = Math.floor(distance / (1000 * 60 * 60 * 24));
  var hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
  var minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
  var seconds = Math.floor((distance % (1000 * 60)) / 1000);
    
  // Output the result in an element with id="demo"
  document.getElementById("demo1").innerHTML = days + "d " + hours + "h "
  + minutes + "m " + seconds + "s ";
    
  // If the count down is over, write some text 
  if (distance < 0) {
    clearInterval(x);
    document.getElementById("demo1").innerHTML = "EXPIRED";
  }
}, 1000);