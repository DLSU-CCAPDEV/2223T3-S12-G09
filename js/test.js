class User{
    constructor(email, password, acc_type){
        this.email = email;
        this.password = password;
        this.acc_type = acc_type;
    }
}

var user_array = [];

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

    var new_user = new User(email, password, acc_Type);
    user_array.push(new_user);

    console.log("Email registered: " + new_user.email);
    console.log("Password registered: " + new_user.password);
    console.log("Account type registered: " + new_user.acc_type);
    console.log("User list:");
    console.log(user_array);
}

var register_acc = document.getElementById("register_acc");
register_acc.addEventListener("submit", handleRegister);

