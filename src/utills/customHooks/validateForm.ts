
export const ValidateInput = (name: string, value: string, rules: any) => {
    let errorMessage: string = '';
    if(rules[name]?.file && value){
        const file: any = value
        if(!rules[name]?.types.includes(file.type)) {
            errorMessage += rules[name].label + " only supports type of " + rules[name]?.types.join(", ")
        } else if(parseInt(file['size']) > parseInt(rules[name]?.maxSize)) {
            errorMessage += rules[name].label + " cannot exceed " + parseInt(rules[name]?.maxSize)/1024 + "KB";
        }
    } else {
        if(rules[name]?.required && (value === '' || (value && value.toString().toLowerCase().includes('select'))) )
            errorMessage += rules[name].label + " cannot be empty.";

        if(rules[name]?.isEmail){
            const regexp = new RegExp(/^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/);
            if(!regexp.test(value)){
                errorMessage += ' Invalid '+rules[name].label + ".";
            }
        }

        if (rules[name]?.minValue && value?.length < rules[name].minValue) {
            errorMessage += rules[name].label + " should be more than " + rules[name].minValue + " characters.";
        }
    }
    return errorMessage;
};

export const ValidateForm = (obj: any, rules: any) => {
    let errors = {};
    Object.keys(obj).forEach((v, key) => {
        errors = {
            ...errors,
            [v]: ValidateInput(v, obj[v], rules)
        };
    });
    return errors;
}
