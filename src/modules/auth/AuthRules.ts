const authRules = {
    email: {
        required: true,
        isEmail: true,
        label: 'Email'
    },
    password: {
        required: true,
        minValue: 8,
        label: 'Password'
    },
    firstName: {
        required: true,
        minValue: 3,
        label: 'First Name'
    },
    lastName: {
        required: true,
        minValue: 3,
        label: 'Last Name'
    },
    dateOfBirth: {
        required: true,
        label: 'Date of Birth'
    }
}

export default authRules;

