function validate_login(event){
    event.preventDefault();

    var emailInput = document.getElementById("reg_email_ID");
    var passwordInput = document.getElementById("reg_password_ID");
    if (!emailInput.value || !passwordInput.value) {
        alert("Unable to login. One or more details are missing!");
        return;
    } else {
        var email = emailInput.value;
        var password = passwordInput.value;
    }

    retrieve_users();
    var user = user_array.find(user => user.email === email);

    if(user && user.password === password)
        console.log("Login successful");
    else
        console.log("Invalid login. Please try again.");
}

var login = document.getElementById("login");
login.addEventListener("submit", validate_login);