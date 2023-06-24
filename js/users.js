function User(email, password, acc_type){
    this.email = email;
    this.password = password;
    this.acc_type = acc_type;
}

var user_array = [];

function retrieve_users(){
    user_array = JSON.parse(localStorage.getItem("user_array"));

    if(user_array==null)
        user_array = [];
}

function store_user(user){
    retrieve_users();
    localStorage.setItem("user", JSON.stringify(user));
    user_array.push(user);
    localStorage.setItem("user_array", JSON.stringify(user_array));
}