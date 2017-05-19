/*客户端调用代码*/
let registerForm = document.querySelector('#registerForm')

registerForm.addEventListener('submit', function(ev) {
    ev.preventDefault(); // to stop the form from submitting
    // 用户名认证
    var userNameIsNonEmpty = Validate(registerForm.userName.value, {
        strategy: 'isNonEmpty',
        option: {}
    }, function(result) {
        console.log(result);
    });
    //  不为空
    if (!userNameIsNonEmpty) {
        return;
    }
    Validate(registerForm.userName.value, {
        strategy: 'isLength',
        option: { min: 1, max: 2 }
    }, function(result) {
        console.log(result);
    });
    Validate(registerForm.passWord.value, {
        strategy: 'isLength',
        option: { min: 1, max: 2 }
    }, function(result) {
        console.log(result);
    });
}, false);