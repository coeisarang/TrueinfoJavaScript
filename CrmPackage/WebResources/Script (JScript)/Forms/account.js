/**
 * onLoad - Pass Xrm and FormContext To Iframe (WebResource)
 * @param {any} executionContext
 */
function onLoad(executionContext) {
    var formContext = executionContext.getFormContext();
    var name = formContext.getAttribute("name").getValue();

    console.log("이름:" + name);

}

//function onChange(executionContext) {
//    var formContext = executionContext.getFormContext();
//    var primarycontactid = formContext.getAttribute("primarycontactid").getValue();

//    if (primarycontactid != null) {
//        formContext.getAttribute("fax").setValue("01011111111");
//        formContext.getAttribute("websiteurl").setValue("https://mary2.crm5.dynamics.com/");
//        formContext.getAttribute("new_p_level").setValue(100000000); 
//    }


//}

function onChageHIdeAndImportant(executionContext) {
    var formContext = executionContext.getFormContext();
    debugger;
    var new_p_level = formContext.getAttribute("new_p_level")?.getValue();
    var primarycontactid = formContext.getAttribute("primarycontactid");
    if (primarycontactid.getValue() == null && new_p_level == 100000000) {
        Xrm.WebApi.retrieveMultipleRecords("contact", "?$select=contactid,emailaddress1,firstname,fullname,lastname&$filter=_accountid_value eq " + formContext.data.entity.getId() + "&$orderby=createdon desc").then(
            function success(results) {
                debugger;
                console.log(results);

             
                var result = results.entities[0];

                // Assign values to lookup (though not standard structure)
                var lookupValue = new Array();
                lookupValue[0] = new Object();
                lookupValue[0].id = result["contactid"];
                lookupValue[0].entityType = "contact";
                lookupValue[0].name = result["name"];


                formContext.getAttribute("primarycontactid").setValue(lookupValue);

                //formContext.getAttribute("new_txt_primary_contact").fireOnChange();
            },
            
            function (error) {
                console.log(error.message);
            }
        );

        formContext.getAttribute("primarycontactid").setRequiredLevel("required");
        formContext.ui.tabs.get("DETAILS_TAB").setVisible(false);
        formContext.ui.tabs.get("SUMMARY_TAB").sections.get("Summary_section_6").setVisible(false);
    } else {
        formContext.getAttribute("primarycontactid").setRequiredLevel("none");
        formContext.ui.tabs.get("DETAILS_TAB").setVisible(true);
        formContext.ui.tabs.get("SUMMARY_TAB").sections.get("Summary_section_6").setVisible(true);
    }
}



function onChange(executionContext) {
    var formContext = executionContext.getFormContext();
    debugger;
    var primarycontactid = formContext.getAttribute("primarycontactid");
    if (primarycontactid != null && primarycontactid.getValue() != null) {

        Xrm.WebApi.retrieveRecord("contact", primarycontactid.getValue()[0].id, "?$select=contactid,emailaddress1,firstname,fullname,lastname").then(
            function success(result) {
                debugger;
                console.log(result);
                // Columns

                var contactid = result["contactid"]; // Guid
                var emailaddress1 = result["emailaddress1"]; // Text
                var firstname = result["firstname"]; // Text
                var fullname = result["fullname"]; // Text
                var lastname = result["lastname"]; // Text

                //Email Address 바인딩

                if (result.emailaddress1 != null) {

                    formContext.getAttribute("emailaddress3").setValue(emailaddress1); 
                }


                //var a_id = formContext.getAttribute("emailaddress3").getValue()[0].id;
                //var a_name = formContext.getAttribute("emailaddress3").getValue()[0].name;
                //var a_entitiyType = formContext.getAttribute("emailaddress3").getValue()[0].entitiyType;

                //SetLookupValue("emailaddress3", a_id, a_name, a_entitiyType)
                

            },
            function (error) {
                console.log(error.message);
            }
        );       
    }
}
