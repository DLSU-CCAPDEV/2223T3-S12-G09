var emailArray = ["jj@dlsu.edu.ph", "jojo@dlsu.edu.ph", "jose@dlsu.edu.ph"];
var passwordArray = ["123", "123", "123"];
var acc_typeArray = ["Student", "Student", "Lab Technician"];
var currUser; // when logout do currUser = "";
var currUserAccType; // when logout do currUserAccType = "";

// window.addEventListener("click", function(event) {
//     // console.log(event.target);
// });

document.addEventListener("DOMContentLoaded", function() {

    //register
    var modal_register = document.getElementById("register-modal");

    var btn_register = document.getElementById("register-button");

    var span_register = document.getElementsByClassName("close")[0];

    btn_register.onclick = function() {
        modal_register.style.display = "block";
    }

    span_register.onclick = function(event) {
        modal_register.style.display = "none";
    }

    // modal_register.onclick = function(event) {
    //     modal_register.style.display = "none";
    // }
    window.addEventListener("click", function(event) {
        if (event.target == modal_register) {
            modal_register.style.display = "none";
        }
    });

    // modal_register.childNodes[1].onclick = closeRegisterModal;

    //login
    var modal_login = document.getElementById("login-modal");

    var btn_login = document.getElementById("login-button");

    var span_login = document.getElementsByClassName("close")[1];

    btn_login.onclick = function() {
        modal_login.style.display = "block";
    }

    span_login.onclick = function(event) {
        modal_login.style.display = "none";
    }

    window.addEventListener("click", function(event) {
        if (event.target == modal_login) {
            modal_login.style.display = "none";
        }
    });


    //logout 
    var modal_logout = document.getElementById("logout-modal");

    var btn_logout = document.getElementById("logout-button");

    var span_logout = document.getElementsByClassName("close")[2];

    btn_logout.onclick = function() {
        modal_logout.style.display = "block";
    }

    span_logout.onclick = function(event) {
        modal_logout.style.display = "none";
    }

    window.addEventListener("click", function(event) {
        if (event.target == modal_logout) {
            modal_logout.style.display = "none";
        }
    });

    //delete
    var modal_delete = document.getElementById("delete-modal");

    var btn_delete = document.getElementById("delete-button");

    var span_delete = document.getElementsByClassName("close")[3];

    btn_delete.onclick = function() {
        modal_delete.style.display = "block";
    }

    span_delete.onclick = function(event) {
        modal_delete.style.display = "none";
    }

    window.addEventListener("click", function(event) {
        if (event.target == modal_delete) {
            modal_delete.style.display = "none";
        }
    });

    logoutButton();
    deleteButton();
});

function loginButton() {
    var btn_login = document.getElementById("login-button");

    if (currUser) {
        btn_login.style.display = "none";
    } else {
        btn_login.style.display = "block";
    }
}

function registerButton() {
    var btn_register = document.getElementById("register-button");

    if (currUser) {
        btn_register.style.display = "none";
    } else {
        btn_register.style.display = "block";
    }
}
//check
function logoutButton() {
    var btn_logout = document.getElementById("logout-button");

    if (currUser) {
        btn_logout.style.display = "block";
    } else {
        btn_logout.style.display = "none";
    }
}

function deleteButton() {
    var btn_delete = document.getElementById("delete-button");

    if (currUser) {
        btn_delete.style.display = "block";
    } else {
        btn_delete.style.display = "none";
    }
}

function emailExist(email) {
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

    if (emailExist(email)) {
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
function handleLogin(event) {
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

    if (!emailExist(email)) {//problems may occur here
        alert("Invalid email. Please use an existing email or register email before you login.");
        return;
    }

    //what now how do i say it is logged in or how do i proceed with it
    //it will go to home page afterwards
    //input here
    var emailIndex = emailArray.indexOf(email);
    var desPassword = passwordArray[emailIndex];
    var desAccType = acc_typeArray[emailIndex];

    if (password == desPassword) {
        currUser = email;
        currUserAccType = desAccType;
        alert("User successfully logged in.")
    } else {
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

    loginButton();
    registerButton();
    logoutButton();
    deleteButton();
}

function handleLogout(event) {
    event.preventDefault();

    var logout = document.getElementById("logout_ID");
    if (logout) {
        currUser = "";
        currUserAccType = "";
    }

    //delete afterwards>
    console.log("User successfully logged out.");

    loginButton();
    registerButton();
    logoutButton();
    deleteButton();
}

function handleDelete(event) {
    event.preventDefault();

    var delete_Acc = document.getElementById("delete_ID");

    var emailIndex = emailArray.indexOf(currUser);
    var desAccType = acc_typeArray[emailIndex];

    if (desAccType == "Lab Technician") {
        alert("User account cannot be deleted.")
        return;
    } else {
        currUser = "";
        currUserAccType = "";

        emailArray.splice(emailIndex, 1);
        passwordArray.splice(emailIndex, 1);
        acc_typeArray.splice(emailIndex, 1);
    }

    //delete afterwards?
    console.log("User successfully deleted out.");

    loginButton();
    registerButton();
    logoutButton();
    deleteButton();
}

var register_acc = document.getElementById("register_acc");
register_acc.addEventListener("submit", handleRegister);

var login_acc = document.getElementById("login_acc");
login_acc.addEventListener("submit", handleLogin);

var logout_acc = document.getElementById("logout_acc");
logout_acc.addEventListener("submit", handleLogout);

var delete_acc = document.getElementById("delete_acc");
delete_acc.addEventListener("submit", handleDelete);
