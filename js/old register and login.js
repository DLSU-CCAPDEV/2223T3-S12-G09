var emailArray = ["jj@dlsu.edu.ph", "jojo@dlsu.edu.ph", "jose@dlsu.edu.ph"];
var passwordArray = ["123", "123", "123"];
var acc_typeArray = ["Student", "Student", "Lab Technician"];
var acc_descArray = ["ComSci Student", "ComSci Student", "DLSU Technician"];
var acc_profpicArray = ["https://images.freeimages.com/images/large-previews/b5e/laughing-otters-1408610.jpg", "https://m.media-amazon.com/images/M/MV5BNGJmMWEzOGQtMWZkNS00MGNiLTk5NGEtYzg1YzAyZTgzZTZmXkEyXkFqcGdeQXVyMTE1MTYxNDAw._V1_FMjpg_UX1000_.jpg", "https://images.freeimages.com/images/large-previews/f41/sea-otters-2-1507561.jpg"];
var currUser;
var currUserAccType;
var currUserAccDesc; 
var currUserAccProfPic;

document.addEventListener("DOMContentLoaded", function() {
    //register
    var modal_register = document.getElementById("register-modal");
    var btn_register = document.getElementById("register-button");
    var span_register = document.getElementsByClassName("close")[0];
    //var form_btn_register = document.getElementById("register_ID");
    
    btn_register.onclick = function() {
        modal_register.style.display = "block";
    }

    span_register.onclick = function(event) {
       modal_register.style.display = "none";
       document.getElementById("register_acc").reset();
    }

    window.onclick = function(event) {
        if(event.target == modal_register){
            modal_register.style.display = "none";
        }
    }

    //form_btn_register.onclick = function(event) {
        //document.getElementById("register_acc").reset();
    //}

    //login
    var modal_login = document.getElementById("login-modal");
    var btn_login = document.getElementById("login-button");
    var span_login = document.getElementsByClassName("close")[1];
    //var form_btn_login = document.getElementById("login_ID");
    
    btn_login.onclick = function() {
        modal_login.style.display = "block";
    }

    span_login.onclick = function(event) {
        modal_login.style.display = "none";
        document.getElementById("login_acc").reset();
    }

    window.onclick = function(event) {
        if(event.target == modal_login){
            modal_login.style.display = "none";
        }
    }

    //form_btn_login.onclick = function(event) {
        //document.getElementById("login_acc").reset();
    //}

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

    window.onclick = function(event) {
        if(event.target == modal_logout){
            modal_logout.style.display = "none";
        }
    }

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

    window.onclick = function(event) {
        if(event.target == modal_delete){
            modal_delete.style.display = "none";
        }
    }

    //profile
    var modal_profile = document.getElementById("profile-modal");
    var btn_profile = document.getElementById("profile-button");
    var span_profile = document.getElementsByClassName("close")[4];

    btn_profile.onclick = function() {
        modal_profile.style.display = "block";
    }

    span_profile.onclick = function(event) {
       modal_profile.style.display = "none";
    }

    window.onclick = function(event) {
        if(event.target == modal_profile){
            modal_profile.style.display = "none";
        }
    }

    //edit profile
    var edit_modal_profile = document.getElementById("edit-profile-modal");
    var btn_editProfile = document.getElementById("edit-profile-button");
    var span_editProfile = document.getElementsByClassName("close")[5];
    
    btn_editProfile.onclick = function() {
        edit_modal_profile.style.display = "block";
    }

    span_editProfile.onclick = function(event) {
        edit_modal_profile.style.display = "none";
    }

    window.onclick = function(event) {
        if(event.target == edit_modal_profile){
            edit_modal_profile.style.display = "none";
        }
    }

    btn_editProfile.style.display = "none";

    //function closeEditProf(){
        //edit_modal_profile.style.display = "none";
    //}

    

    logoutButton();
    deleteButton();
    profileButton();
});

function loginButton(){
    var btn_login = document.getElementById("login-button");

    if(currUser){
        btn_login.style.display = "none";
    }else{
        btn_login.style.display = "block";
    }
}

function registerButton(){
    var btn_register = document.getElementById("register-button");

    if(currUser){
        btn_register.style.display = "none";
    }else{
        btn_register.style.display = "block";
    }
}

function logoutButton(){
    var btn_logout = document.getElementById("logout-button");

    if(currUser){
        btn_logout.style.display = "block";
    }else{
        btn_logout.style.display = "none";
    }
}

function deleteButton(){
    var btn_delete = document.getElementById("delete-button");

    if(currUser){
        btn_delete.style.display = "block";
    }else{
        btn_delete.style.display = "none";
    }
}

function profileButton(){
    var btn_profile = document.getElementById("profile-button");

    if(currUser){
        btn_profile.style.display = "block";
    }else{
        btn_profile.style.display = "none";
    }
}

/*function profileEditButton(){
    var btn_editProfile = document.getElementById("edit-profile-button");

    if(currUser){
        btn_editProfile.style.display = "none";
    }else{
        btn_editProfile.style.display = "block";
    }
}*/


function emailExist(email){
    return emailArray.includes(email);
}

function handleRegister(event) {
    event.preventDefault();

    var emailInput = document.getElementById("reg_email_ID");
    var passwordInput = document.getElementById("reg_password_ID");
    var acc_TypeInput = document.querySelector("input[name='reg_acc_type']:checked");
    var modal_register = document.getElementById("register-modal");
    var form_btn_register = document.getElementById("register_ID");

    if (!emailInput.value || !passwordInput.value || !acc_TypeInput) {
        //alert("Unable to register account. One or more details are missing!");
        document.getElementById("register_acc").reset();
        return;
    } else {
        var email = emailInput.value;
        var password = passwordInput.value;
        var acc_Type = acc_TypeInput.value;
    }

    if(emailExist(email)){
        //alert("Email already exist. Please use a different email.");
        return;
    }

    emailArray.push(email);
    emailInput.value = "";
    passwordArray.push(password);
    passwordInput.value = "";
    acc_typeArray.push(acc_Type);

    modal_register.style.display = "none";
    //document.getElementById("register_acc").reset();

    //delete afterwards?
    console.log("Email registered: " + email);
    console.log("Password registered: " + password);
    console.log("Account type registered: " + acc_Type);
}

function handleLogin(event){
    event.preventDefault();

    var emailInput = document.getElementById("log_email_ID");
    var passwordInput = document.getElementById("log_password_ID");
    var form_btn_login = document.getElementById("login_ID");    

    if (!emailInput.value || !passwordInput.value) {
        //alert("Unable to login account. One or more details are missing!");
        document.getElementById("login_acc").reset();
        return;
    } else {
        var email = emailInput.value;
        var password = passwordInput.value;
    }

    if(!emailExist(email)){//problems may occur here
        //alert("Invalid email. Please use an existing email or register email before you login.");
        return;
    }

    var emailIndex = emailArray.indexOf(email);
    var desPassword = passwordArray[emailIndex];
    var desAccType = acc_typeArray[emailIndex];
    var desAccDesc = acc_descArray[emailIndex];
    var desAccPic = acc_profpicArray[emailIndex];

    if(password == desPassword){
        currUser = email;
        currUserAccType = desAccType;
        currUserAccDesc = desAccDesc;
        currUserAccProfPic = desAccPic;
        //alert("User successfully logged in.")
    }else{
        //alert("Incorrect password. Please enter the correct password.");
        return;
    }

    //prof
    var acc_desc = document.getElementById("acc-desc");
    var acc_pic = document.getElementById("acc-pic");
    var edit_modal_profile = document.getElementById("edit-profile-modal");
    var modal_login = document.getElementById("login-modal");

    if(acc_desc){
        acc_desc.innerText = currUserAccDesc;
    }
    if(acc_pic){
        acc_pic.src = currUserAccProfPic;
    }
    
    edit_modal_profile.style.display = "none";
    modal_login.style.display = "none";
    
    emailInput.value = "";
    passwordInput.value = "";
    //document.getElementById("login_acc").reset();

    //delete afterwards>
    console.log("User successfully logged in.");
    console.log("Email registered: " + email);
    console.log("Password registered: " + password);

    loginButton();
    registerButton();
    logoutButton();
    deleteButton();
    profileButton();
}

function handleLogout(event){
    event.preventDefault();

    var logout = document.getElementById("logout_ID");
    var modal_logout = document.getElementById("logout-modal");

    if(logout){
        currUser = "";
        currUserAccType = "";
        currUserAccDesc = "";
        currUserAccProfPic = "";
    }

    modal_logout.style.display = "none";

    //delete afterwards>
    console.log("User successfully logged out.");

    loginButton();
    registerButton();
    logoutButton();
    deleteButton();
    profileButton();
}

function handleDelete(event){
    event.preventDefault();

    var delete_Acc = document.getElementById("delete_ID");
    var modal_delete = document.getElementById("delete-modal");
    var emailIndex = emailArray.indexOf(currUser);
    var desAccType = acc_typeArray[emailIndex];

    if(desAccType == "Lab Technician"){
        //alert("User account cannot be deleted.")
        return;
    }else{
        currUser = "";
        currUserAccType = "";
        currUserAccDesc = "";
        currUserAccProfPic = "";

        emailArray.splice(emailIndex, 1);
        passwordArray.splice(emailIndex, 1);
        acc_typeArray.splice(emailIndex, 1);
        acc_descArray.splice(emailIndex, 1);
        acc_profpicArray.splice(emailIndex, 1);
    }

    modal_delete.style.display = "none";

    //delete afterwards?
    console.log("User successfully deleted out."); 
    
    loginButton();
    registerButton();
    logoutButton();
    deleteButton();
    profileButton();
}

function handleProfile(event){
    event.preventDefault();

    var edit_modal_profile = document.getElementById("edit-profile-modal");

    edit_modal_profile.style.display = "block";
}

function handleProfileEdit(event){ //maybbe use onclick???
    event.preventDefault();

    var new_acc_desc = document.getElementById("edit_prof_desc_ID");
    var new_acc_pic = document.getElementById("edit_prof_pic_ID");
    var acc_desc = document.getElementById("acc-desc");
    var acc_pic = document.getElementById("acc-pic");
    var edit_modal_profile = document.getElementById("edit-profile-modal");
    var emailIndex = emailArray.indexOf(currUser);
    var modal_profile = document.getElementById("profile-modal");
    
    if(new_acc_desc.value != ""){
        currUserAccDesc = new_acc_desc.value;
        acc_desc.innerText = currUserAccDesc;
        acc_descArray[emailIndex] = new_acc_desc.value;
    }

    if(new_acc_pic.value != ""){
        currUserAccProfPic = new_acc_pic.value;
        acc_pic.src = currUserAccProfPic;
        acc_profpicArray[emailIndex] = new_acc_pic.value;
    }

    edit_modal_profile.style.display = "none";
    modal_profile.style.display = "none";
    document.getElementById("new_profile_acc").reset();  
}

var register_acc = document.getElementById("register_acc");
register_acc.addEventListener("submit", handleRegister);

var login_acc = document.getElementById("login_acc");
login_acc.addEventListener("submit", handleLogin);

var logout_acc = document.getElementById("logout_acc");
logout_acc.addEventListener("submit", handleLogout);

var delete_acc = document.getElementById("delete_acc");
delete_acc.addEventListener("submit", handleDelete);

var profile_acc = document.getElementById("profile_acc");
profile_acc.addEventListener("submit", handleProfile);

var new_profile_acc = document.getElementById("new_profile_acc");
new_profile_acc.addEventListener("submit", handleProfileEdit);

/*var edit_modal_profile = document.getElementById("edit-profile-modal");
var span_editProfile = edit_modal_profile.getElementsByClassName("close")[5];
function closeEditProf(){
    edit_modal_profile.style.display = "none";
}
span_editProfile.addEventListener("ckick", closeEditProf);*/