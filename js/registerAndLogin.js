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