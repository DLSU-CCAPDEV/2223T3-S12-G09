var emailArray = [];
var passwordArray = [];
var acc_typeArray = [];

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


    emailArray.push(email);
    emailInput.value = "";
    passwordArray.push(password);
    passwordInput.value = "";
    acc_typeArray.push(acc_Type);


    console.log("Email registered: " + email);
    console.log("Password registered: " + password);
    console.log("Account type registered: " + acc_Type);
}

var register_acc = document.getElementById("register_acc");
register_acc.addEventListener("submit", handleRegister);

