/*Validate方法*/
function Validate(value, rule, callback) {
    var result = strategies[rule.strategy](value, rule.option);
    if (callback) {
        callback(result, rule, value);
    }
    return result;
}  