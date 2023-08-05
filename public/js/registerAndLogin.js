$(document).ready(function(){
    function isFilled(){
        var fname = validator.trim($('#fname').val());
        var lname = validator.trim($('#lname').val());
        var username = validator.trim($('#username').val());
        var email = validator.trim($('#email').val());
        var pw = validator.trim($('#password').val());
        var fname_empty = validator.isEmpty(fname);
        var lname_empty = validator.isEmpty(lname);
        var username_empty = validator.isEmpty(username);
        var email_empty = validator.isEmpty(email);
        var pw_empty = validator.isEmpty(pw);

        return !fname_empty && !lname_empty && !username_empty && !email_empty && !pw_empty;
    }

    function isValidUsername(field, callback){
        var username = validator.trim($('#username').val());

        $.get('/checkUsername', {username: username}, function(result){
            if(result.username !== username){
                if(field.is($('#username')))
                    $('#username').text('');

                return callback(true);
            } else {
                if (field.is($('#username')))
                    $('#usernameError').text('Username already exists.');

                return callback(false);
            }
        });
    }

    function isValidEmail(field, callback){
        var email = validator.trim($('#email').val());

        $.get('/checkEmail', {email: email}, function(result){
            if(result.email !== email){
                if(field.is($('#email')))
                    $('#email').text('');

                return callback(true);
            } else{
                if(field.is($('#email')))
                    $('#emailError').text('Email already registered.');

                return callback(false);
            }
        });
    }

    function isValidPassword(field){
        var validPassword = false;
        var password = validator.trim($('#password').val());
        var isValidLength = validator.isLength(password, {min: 8});

        if(isValidLength){
            if(field.is($('#password')))
                $('#passwordError').text('');

            validPassword = true;
        } else{
            if(field.is($('#password')))
                $('#passwordError').text('Password should contain at least 8 characters.');
        }

        return validPassword;
    }

    function validateField(field, fieldName, error){
        var value = validator.trim(field.val());
        var empty = validator.isEmpty(value);

        if(empty){
            field.prop('value', '');
            error.text(fieldName + ' should not be empty.');
        } else
            error.text('');

        var filled = isFilled();
        var validPassword = isValidPassword(field);

        isValidUsername(field, function(validUsername){
            isValidEmail(field, function(validEmail){
                if(filled && validUsername && validEmail && validPassword)
                    $("#signup").prop('disabled', false);
                else
                    $('#signup').prop('disabled', true);
            });
        });
    }

    $('#fname').keyup(function(){
        validateField($('#fname'), 'First Name', $('#fnameError'));
    });

    $('#lname').keyup(function(){
        validateField($('#lname'), 'Last Name', $('#lnameError'));
    });

    $('#username').keyup(function(){
        validateField($('#username'), 'Username', $('#usernameError'));
    });

    $('#email').keyup(function(){
        validateField($('#email'), 'Email', $('#emailError'));
    });

    $('#password').keyup(function () {
        validateField($('#password'), 'Password', $('#passwordError'));
    });
});