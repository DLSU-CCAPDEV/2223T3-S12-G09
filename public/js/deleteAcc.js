$(document).ready(function(){
    $('#deleteButton').on('click', function(event){
        event.preventDefault();

        if(confirm('Are you sure you want to delete your account? Once deleted it cannot be recovered.')){
            var username = $('#username').val();4
            console.log("deleteAcc.js: ", username)
            
            $.ajax({
                url: '/delete',
                type: 'DELETE',
                data: {username: username}
            });  
        }
    });
});