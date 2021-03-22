export default {
    homeName:{
        required: true,
        label: 'Host Name'
    },
    email:{
        required: true,
        isEmail: true,
        label: 'Email',
    },
    userName:{
        required: false,
        label: 'Username'
    },
    password: {
        required:true,
        label: 'Password'
    },
    originalPassword: {
        required:true,
        label: 'original Password'
    }
}