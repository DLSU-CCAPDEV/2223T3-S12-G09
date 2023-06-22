var emailArray = ["jj@dlsu.edu.ph", "jojo@dlsu.edu.ph", "jose@dlsu.edu.ph"];
var passwordArray = ["123", "123", "123"];
var acc_typeArray = ["Student", "Student", "Lab Technician"];
var currUser; // when logout do currUser = "";
var currUserAccType; // when logout do currUserAccType = "";

document.addEventListener("DOMContentLoaded", function() {

    var modal_register = document.getElementById("register-modal");

    var btn_register = document.getElementById("register-button");

    var span_register = document.getElementsByClassName("close")[0];

    btn_register.onclick = function() {
        modal_register.style.display = "block";
    }

    span_register.onclick = function(event) {
        modal_register.style.display = "none";
    }

    window.onclick = function(event) {
        if(event.target == modal_register){
            modal_register.style.display = "none";
        }
    }

    var modal_login = document.getElementById("login-modal");

    var btn_login = document.getElementById("login-button");

    var span_login = document.getElementsByClassName("close")[1];

    btn_login.onclick = function() {
        modal_login.style.display = "block";
    }

    span_login.onclick = function(event) {
        modal_login.style.display = "none";
    }

    window.onclick = function(event) {
        if(event.target == modal_login){
            modal_login.style.display = "none";
        }
    }

});

function emailExist(email){
    return emailArray.includes(email);
}

function handleRegister(event) {
    event.preventDefault();

    var emailInput = document.getElementById("reg_email_ID");
    var passwordInput = document.getElementById("reg_password_ID");
    var acc_TypeInput = document.querySelector("input[name='reg_acc_type']:checked");
    if (!emailInput.value || !passwordInput.value || !acc_TypeInput) {
        alert("Unable to register account. One or more details are missing!");
        return;
    } else {
        var email = emailInput.value;
        var password = passwordInput.value;
        var acc_Type = acc_TypeInput.value;
    }

    if(emailExist(email)){
        alert("Email already exist. Please use a different email.");
        return;
    }

    emailArray.push(email);
    emailInput.value = "";
    passwordArray.push(password);
    passwordInput.value = "";
    acc_typeArray.push(acc_Type);

    //delete afterwards?
    console.log("Email registered: " + email);
    console.log("Password registered: " + password);
    console.log("Account type registered: " + acc_Type);
}

//login acc
function handleLogin(event){
    event.preventDefault();

    var emailInput = document.getElementById("log_email_ID");
    var passwordInput = document.getElementById("log_password_ID");

    if (!emailInput.value || !passwordInput.value) {
        alert("Unable to login account. One or more details are missing!");
        return;
    } else {
        var email = emailInput.value;
        var password = passwordInput.value;
    }

    if(!emailExist(email)){//problems may occur here
        alert("Invalid email. Please use an existing email or register email before you login.");
        return;
    }

    //what now how do i say it is logged in or how do i proceed with it
    //it will go to home page afterwards
    //input here
    var emailIndex = emailArray.indexOf(email);
    var desPassword = passwordArray[emailIndex];
    var desAccType = acc_typeArray[emailIndex];

    if(password == desPassword){
        currUser = email;
        currUserAccType = desAccType;
    }else{
        alert("Incorrect password. Please enter the correct password.");
        return;
    }

    //currUser = email;
    emailInput.value = "";
    passwordInput.value = "";

    //delete afterwards>
    console.log("User successfully logged in.");
    console.log("Email registered: " + email);
    console.log("Password registered: " + password);
}

var register_acc = document.getElementById("register_acc");
register_acc.addEventListener("submit", handleRegister);

var login_acc = document.getElementById("login_acc");
login_acc.addEventListener("submit", handleLogin);