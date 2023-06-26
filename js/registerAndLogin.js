var emailArray = ["jose_joaquin_arevalo@dlsu.edu.ph", "john_joseph_giron@dlsu.edu.ph", "rey_obejero@dlsu.edu.ph", "dylan_uy@dlsu.edu.ph", "arren.antioquia@dlsu.edu.ph"];
var passwordArray = ["123", "123", "123", "123", "123"];
var acc_typeArray = ["Student", "Student", "Student", "Student", "Lab Technician"];
var acc_descArray = ["ComSci Student", "ComSci Student", "ComSci Student", "ComSci Student", "DLSU Technician"];
var acc_profpicArray = ["https://images.freeimages.com/images/large-previews/b5e/laughing-otters-1408610.jpg", "", "https://myfox8.com/wp-content/uploads/sites/17/2022/08/All-Three-Best.jpg", 
                        "https://upload.wikimedia.org/wikipedia/en/thumb/1/19/Bruce_Wayne_%28The_Dark_Knight_Trilogy%29.jpg/220px-Bruce_Wayne_%28The_Dark_Knight_Trilogy%29.jpg", "https://m.media-amazon.com/images/M/MV5BNGJmMWEzOGQtMWZkNS00MGNiLTk5NGEtYzg1YzAyZTgzZTZmXkEyXkFqcGdeQXVyMTE1MTYxNDAw._V1_FMjpg_UX1000_.jpg"];
var currUser;
var currUserAccType;
var currUserAccDesc;
var currUserAccProfPic;
var defAccProfPic = "https://i.imgflip.com/6yvpkj.jpg";

/*
    Notes/Question:
    1. Delete the console logs?
    2. In profile add the profile view of other accounts (almost done)
    3. In profile add the accounts(student) current reservations
    4. Improve css for the modals?
*/

document.addEventListener("DOMContentLoaded", function() {
    //register
    var modal_register = document.getElementById("register-modal");
    var btn_register = document.getElementById("register-button");
    var span_register = document.getElementsByClassName("close")[0];
    var form_btn_register = document.getElementById("register_ID");

    btn_register.onclick = function() {
        modal_register.style.display = "block";
    }

    span_register.onclick = function(event) {
        modal_register.style.display = "none";
        document.getElementById("register_acc").reset();
    }

    // window.onclick = function(event) {
    window.addEventListener("click", function(event) {
        if (event.target == modal_register) {
            modal_register.style.display = "none";
        }
    });

    form_btn_register.onclick = function(event) {
        event.preventDefault();

        var emailInput = document.getElementById("reg_email_ID");
        var passwordInput = document.getElementById("reg_password_ID");
        var passwordConfirmInput = document.getElementById("reg_password_confirm_ID");
        var acc_TypeInput = document.querySelector("input[name='reg_acc_type']:checked");
        var modal_register = document.getElementById("register-modal");
        var form_btn_register = document.getElementById("register_ID");

        if (!emailInput.value || !passwordInput.value || !acc_TypeInput || !passwordConfirmInput.value) {
            alert("Unable to register account. One or more details are missing!");
            console.log("Unable to register account. One or more details are missing!");
            document.getElementById("register_acc").reset();
            return;
        } else if(passwordInput.value !== passwordConfirmInput.value){
            alert("Unable to register account. Password confirmation is not the same!");
            console.log("Unable to register account. Password confirmation is not the same!");
            document.getElementById("register_acc").reset();
            return;
        } else {
            var email = emailInput.value;
            var password = passwordInput.value;
            var acc_Type = acc_TypeInput.value;
        }

        if (emailExist(email)) {
            alert("Email already exist. Please use a different email.");
            console.log("Email already exist. Please use a different email.");
            document.getElementById("register_acc").reset();
            return;
        }

        emailArray.push(email);
        emailInput.value = "";
        passwordArray.push(password);
        passwordInput.value = "";
        acc_typeArray.push(acc_Type);
        acc_descArray.push("No bio.");
        acc_profpicArray.push("");

        modal_register.style.display = "none";

        console.log("Email registered: " + email);
        console.log("Password registered: " + password);
        console.log("Account type registered: " + acc_Type);
    }

    //login
    var modal_login = document.getElementById("login-modal");
    var btn_login = document.getElementById("login-button");
    var span_login = document.getElementsByClassName("close")[1];
    var form_btn_login = document.getElementById("login_ID");

    btn_login.onclick = function() {
        modal_login.style.display = "block";
    }

    span_login.onclick = function(event) {
        modal_login.style.display = "none";
        document.getElementById("login_acc").reset();
    }

    // window.onclick = function(event) {
    window.addEventListener("click", function(event) {
        if (event.target == modal_login) {
            modal_login.style.display = "none";
        }
    });

    form_btn_login.onclick = function(event) {
        event.preventDefault();

        var emailInput = document.getElementById("log_email_ID");
        var passwordInput = document.getElementById("log_password_ID");
        var form_btn_login = document.getElementById("login_ID");

        if (!emailInput.value || !passwordInput.value) {
            alert("Unable to login account. One or more details are missing!");
            console.log("Unable to login account. One or more details are missing!");
            document.getElementById("login_acc").reset();
            return;
        } else {
            var email = emailInput.value;
            var password = passwordInput.value;
            isLoggedIn = 1;
        }

        if (!emailExist(email)) {//problems may occur here
            alert("Invalid email. Please use an existing email or register the email before logging in.");
            console.log("Invalid email. Please use an existing email or register the email before logging in.");
            document.getElementById("login_acc").reset();
            return;
        }

        var emailIndex = emailArray.indexOf(email);
        var desPassword = passwordArray[emailIndex];
        var desAccType = acc_typeArray[emailIndex];
        var desAccDesc = acc_descArray[emailIndex];
        var desAccPic = acc_profpicArray[emailIndex];

        if (password == desPassword) {
            currUser = email;
            currUserAccType = desAccType;
            currUserAccDesc = desAccDesc;
            currUserAccProfPic = desAccPic;
            alert("Account successfully logged in.")
        } else {
            alert("Incorrect password. Please enter the correct password.");
            console.log("Incorrect password. Please enter the correct password.");
            document.getElementById("login_acc").reset();
            return;
        }

        //prof
        var acc_email = document.getElementById("acc-email");
        var acc_desc = document.getElementById("acc-desc");
        var acc_pic = document.getElementById("acc-pic");
        var acc_type = document.getElementById("acc-type");
        var edit_modal_profile = document.getElementById("edit-profile-modal");
        var modal_login = document.getElementById("login-modal");

        if (acc_email) {
            acc_email.innerText = currUser;
        }
        if (acc_desc) {
            acc_desc.innerText = currUserAccDesc;
        }
        if (acc_pic) {
            if (currUserAccProfPic == ""){
                acc_pic.src = defAccProfPic;
            } else {
                acc_pic.src = currUserAccProfPic;
            }
        }
        if (acc_type) {
            acc_type.innerText = currUserAccType;
        }

        edit_modal_profile.style.display = "none";
        modal_login.style.display = "none";

        emailInput.value = "";
        passwordInput.value = "";

        console.log("Account successfully logged in.");
        console.log("Email registered: " + email);
        console.log("Password registered: " + password);

        loginButton();
        registerButton();
        logoutButton();
        deleteButton();
        profileButton();
    }

    //logout 
    var modal_logout = document.getElementById("logout-modal");
    var btn_logout = document.getElementById("logout-button");
    var span_logout = document.getElementsByClassName("close")[2];
    var form_btn_logout = document.getElementById("logout_ID");

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

    form_btn_logout.onclick = function(event) {
        event.preventDefault();

        var logout = document.getElementById("logout_ID");
        var modal_logout = document.getElementById("logout-modal");

        if (logout) {
            alert("Account successfully logged out.");
            currUser = "";
            currUserAccType = "";
            currUserAccDesc = "";
            currUserAccProfPic = "";
            isLoggedIn = 0;
        }

        modal_logout.style.display = "none";

        console.log("Account successfully logged out.");

        loginButton();
        registerButton();
        logoutButton();
        deleteButton();
        profileButton();
    }

    //delete
    var modal_delete = document.getElementById("delete-modal");
    var btn_delete = document.getElementById("delete-button");
    var span_delete = document.getElementsByClassName("close")[3];
    var form_btn_delete = document.getElementById("delete_ID");

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

    form_btn_delete.onclick = function(event) {
        event.preventDefault();

        var delete_Acc = document.getElementById("delete_ID");
        var modal_delete = document.getElementById("delete-modal");
        var emailIndex = emailArray.indexOf(currUser);
        var desAccType = acc_typeArray[emailIndex];

        if (desAccType == "Lab Technician") {
            alert("Account cannot be deleted.");
            return;
        } else {
            alert("Account successfully deleted."); //problems might be here
            currUser = "";
            currUserAccType = "";
            currUserAccDesc = "";
            currUserAccProfPic = "";
            isLoggedIn = 0;

            emailArray.splice(emailIndex, 1);
            passwordArray.splice(emailIndex, 1);
            acc_typeArray.splice(emailIndex, 1);
            acc_descArray.splice(emailIndex, 1);
            acc_profpicArray.splice(emailIndex, 1);
        }

        modal_delete.style.display = "none";

        console.log("Account successfully deleted.");

        loginButton();
        registerButton();
        logoutButton();
        deleteButton();
        profileButton();
    }

    //profile
    var modal_profile = document.getElementById("profile-modal");
    var btn_profile = document.getElementById("profile-button");
    var span_profile = document.getElementsByClassName("close")[4];
    var form_btn_profile = document.getElementById("profile_ID");
    var form_btn_other_profile = document.getElementById("other_profile_ID");

    btn_profile.onclick = function() {
        modal_profile.style.display = "block";
    }

    span_profile.onclick = function(event) {
        modal_profile.style.display = "none"; //changed from block to none
    }

    window.addEventListener("click", function(event) {
        if (event.target == modal_profile) {
            modal_profile.style.display = "none";
        }
    });

    form_btn_profile.onclick = function(event) {
        event.preventDefault();

        var edit_modal_profile = document.getElementById("edit-profile-modal");

        edit_modal_profile.style.display = "block";
    }

    //other profiles
    form_btn_other_profile.onclick = function(event) {
        event.preventDefault();

        var other_modal_profile = document.getElementById("other-profile-modal");

        other_modal_profile.style.display = "block";

        modal_profile.style.display = "none";

        // maybe add the other profiles view here?
        var other_profile_content = document.querySelector("#other-profile-modal .modal-other-content");

        other_profile_content.innerHTML = "";

        var count = 0;

        for (var i = 0; i < emailArray.length; i++) {
            if (emailArray[i] == currUser) {
                continue;
            } else {
                var prof_container = document.createElement("div");
                prof_container.style.overflow = "auto";
                prof_container.style.border = "1px solid black";
                prof_container.style.borderRadius = "10px";
                prof_container.style.padding = "5px";
                prof_container.style.margin = "5px 17px 5px 5px";
                prof_container.style.backgroundColor = "gray";
                prof_container.classList.add("profile-container");

                other_profile_content.style.backgroundColor = "lightgray";

                if (count === 0) {
                    var close_other_profile = document.createElement("span");
                    close_other_profile.innerText = "×";
                    close_other_profile.classList.add("close-other-profile")
                    close_other_profile.style.color = "#aaaaaa";
                    close_other_profile.style.position = "sticky";
                    close_other_profile.style.top = "0";
                    close_other_profile.style.left = "600px";
                    close_other_profile.style.fontSize = "28px";
                    close_other_profile.style.fontWeight = "bold";
                    other_profile_content.appendChild(close_other_profile);

                    close_other_profile.addEventListener("mouseover", function() {
                        this.style.color = "#000";
                        this.style.textDecoration = "none";
                        this.style.cursor = "pointer";
                    });

                    close_other_profile.addEventListener("mouseout", function() {
                        this.style.color = "#aaaaaa";
                    });

                    close_other_profile.addEventListener("focus", function() {
                        this.style.color = "black";
                        this.style.textDecoration = "none";
                        this.style.cursor = "pointer";
                    });

                    close_other_profile.addEventListener("blur", function() {
                        this.style.color = "#aaaaaa";
                    });

                    close_other_profile.onclick = function(event) { //problem here
                        other_modal_profile.style.display = "none";
                    }

                    count++;
                }

                //close_other_profile.onclick = function(event) { //problem here
                    //other_modal_profile.style.display = "none";
                //}

                var prof_pic = document.createElement("img");
                if(acc_profpicArray[i] == ""){
                    prof_pic.src = defAccProfPic;
                }else{
                    prof_pic.src = acc_profpicArray[i];
                }
                prof_pic.alt = "Profile Picture";
                prof_pic.width = 250;
                prof_pic.height = 250;
                prof_pic.style.border = "2px solid gray";
                prof_pic.style.backgroundAttachment = "fixed";
                prof_pic.style.borderRadius = "200px";

                var prof_email = document.createElement("p");
                prof_email.innerText = emailArray[i];
                prof_email.style.fontWeight = "bold";

                var prof_type = document.createElement("p");
                prof_type.innerText = acc_typeArray[i];
                prof_type.style.fontSize = "small";

                var prof_desc = document.createElement("p");
                prof_desc.innerText = acc_descArray[i];
                prof_desc.style.fontSize = "smaller";

                prof_container.appendChild(prof_pic);
                prof_container.appendChild(prof_email);
                prof_container.appendChild(prof_type);
                prof_container.appendChild(prof_desc);

                other_profile_content.appendChild(prof_container);
            }
        }

        other_modal_profile.style.display = "block";
    }

    //edit profile
    var edit_modal_profile = document.getElementById("edit-profile-modal");
    var btn_editProfile = document.getElementById("edit-profile-button");
    var span_editProfile = document.getElementsByClassName("close")[5];
    var form_btn_edit_profile = document.getElementById("edit_profile_ID");

    btn_editProfile.onclick = function() {
        edit_modal_profile.style.display = "block";
    }

    span_editProfile.onclick = function(event) {
        edit_modal_profile.style.display = "none";
        document.getElementById("new_profile_acc").reset();
    }

    window.addEventListener("click", function(event) {
        if (event.target == edit_modal_profile) {
            edit_modal_profile.style.display = "none";
        }
    });

    form_btn_edit_profile.onclick = function(event) {
        event.preventDefault();

        var new_acc_desc = document.getElementById("edit_prof_desc_ID");
        var new_acc_pic = document.getElementById("edit_prof_pic_ID");
        var acc_desc = document.getElementById("acc-desc");
        var acc_pic = document.getElementById("acc-pic");
        var edit_modal_profile = document.getElementById("edit-profile-modal");
        var emailIndex = emailArray.indexOf(currUser);
        var modal_profile = document.getElementById("profile-modal");

        if (new_acc_desc.value != "") {
            currUserAccDesc = new_acc_desc.value;
            acc_desc.innerText = currUserAccDesc;
            acc_descArray[emailIndex] = new_acc_desc.value;
        }

        if (new_acc_pic.value != "") {
            currUserAccProfPic = new_acc_pic.value;
            acc_pic.src = currUserAccProfPic;
            acc_profpicArray[emailIndex] = new_acc_pic.value;
        }

        if (new_acc_desc.value != "" || new_acc_pic.value != "") {
            alert("Account successfully edited.");
            console.log("User successfully edited.");
        } else {
            alert("Account changes unsuccessful.");
            console.log("Account changes unsuccessful.");
        }

        edit_modal_profile.style.display = "none";
        modal_profile.style.display = "none";
        document.getElementById("new_profile_acc").reset();
    }

    btn_editProfile.style.display = "none";

    //other profile
    var other_modal_profile = document.getElementById("other-profile-modal");
    var btn_otherProfile = document.getElementById("other-profile-button");
    //var span_otherProfile = document.getElementsByClassName("close-other-profile")[0];
    //var span_otherProfile = document.getElementsByClassName("close")[6];
    //var span_otherProfile = document.getElementsByClassName("close-other-profile")[0];
    //var form_btn_other_profile = document.getElementById("other_profile_ID");
    //jose_joaquin_arevalo@dlsu.edu.ph

    btn_otherProfile.onclick = function() {
        other_modal_profile.style.display = "block";
    }

    //span_otherProfile.onclick = function(event) {
    //other_modal_profile.style.display = "none";
    //}

    window.addEventListener("click", function(event) {
        if (event.target == other_modal_profile) {
            other_modal_profile.style.display = "none";
        }
    });

    //form_btn_other_profile.onclick = function(event) {
    //event.preventDefault();


    //}

    btn_otherProfile.style.display = "none";


    logoutButton();
    deleteButton();
    profileButton();
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

function profileButton() {
    var btn_profile = document.getElementById("profile-button");

    if (currUser) {
        btn_profile.style.display = "block";
    } else {
        btn_profile.style.display = "none";
    }
}

function emailExist(email) {
    return emailArray.includes(email);
}




