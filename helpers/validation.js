const { check } = require('express-validator');

const validation = {
    signupValidation: function(){
        var validation = [
            check('fname','First name should not be empty.').notEmpty(),
            check('lname','Last name should not be empty.').notEmpty(),
            check('username','Username should not be empty.').notEmpty(),
            check('email','Email should not be empty.').notEmpty(),
            check('password', 'Password should contain at least 8 characters.').isLength({min: 8})
        ];

        return validation;
    }
}

module.exports = validation;