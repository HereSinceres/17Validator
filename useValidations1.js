/*客户端调用代码*/
let registerForm = document.querySelector('#registerForm')
const validatorFunc = () => {
    let validator = new Validator()

    validator.add(registerForm.userName, [{
        strategy: 'isNonEmpty',
        errorMsg: '用户名不能为空！'
    }, {
        strategy: 'minLength:6',
        errorMsg: '用户名长度不能小于6位！'
    }])

    validator.add(registerForm.passWord, [{
        strategy: 'isNonEmpty',
        errorMsg: '密码不能为空！'
    }, {
        strategy: 'minLength:',
        errorMsg: '密码长度不能小于6位！'
    }])

    validator.add(registerForm.phoneNumber, [{
        strategy: 'isNonEmpty',
        errorMsg: '手机号码不能为空！'
    }, {
        strategy: 'isMoblie',
        errorMsg: '手机号码格式不正确！'
    }])

    validator.add(registerForm.emailAddress, [{
        strategy: 'isNonEmpty',
        errorMsg: '邮箱地址不能为空！'
    }, {
        strategy: 'isEmail',
        errorMsg: '邮箱地址格式不正确！'
    }])
    let errorMsg = validator.start()
    return errorMsg
}

registerForm.addEventListener('submit', function(ev) {
    ev.preventDefault(); // to stop the form from submitting
    let errorMsg = validatorFunc()
    if (errorMsg) {
        alert(errorMsg)
        return false
    }
}, false)