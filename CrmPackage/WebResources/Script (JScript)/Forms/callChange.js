
/**
 * onLoad - Pass Xrm and FormContext To Iframe (WebResource)
 * @param {any} executionContext
 */

function onChange(executionContext) {
    var formContext = executionContext.getFormContext();
    var primarycontactid = formContext.getAttribute("primarycontactid").getValue();

    formContext.getAttribute("fax").setValue("01011111111"); 
    formContext.getAttribute("websiteurl").setValue("https://mary2.crm5.dynamics.com/"); 
    formContext.getAttribute("new_p_level").setValue("A"); 

    console.log("기본 연락처:" + primarycontactid);

}