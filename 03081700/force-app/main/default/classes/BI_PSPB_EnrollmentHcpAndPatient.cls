/**
 * @description    This class is used to create a Lead with its child record.
 *                 Lead is being created by a guest user, so this class is enabled without sharing mode.
 * 
 * History:
 * Version    Author        Date         Detail              Description
 * 1.0        Ashif         05-01-2024   Created             Initial development
 * 1.1        Ashif         20-07-2024   Refactor
 */

 public without sharing class BI_PSPB_EnrollmentHcpAndPatient {


    /**
     * @description   Creates a Lead record in the LWC biPspbHcpEnrollment, with null checks for all the wrapper class parameters in LWC.
     * @param         data - The wrapper class containing the lead data for HCP enrollment.
     * @param         hcpId - The created physician record ID.
     * @return        Id - The ID of the created Lead.
     */ 
    @AuraEnabled
    public static Id createLead(BI_PSPB_EnrollmentWrapper.DataWrapper data, Id hcpId) {
        List<Id> leadList = new List<Id>();
        try {
            Lead newLead = new Lead();
            newLead.FirstName = data.firstName;
            newLead.LastName = data.lastName;
            newLead.HealthCloudGA__BirthDate__c = Date.valueOf(data.dob);
            newLead.Email = data.email;
            newLead.HealthCloudGA__Gender__c = data.sex;
            newLead.Phone = data.phone;
            newLead.BI_PSPB_Physician_Name__c = hcpId;
            if (!String.isBlank(data.country)) {
                newLead.CountryCode = data.country;
                newLead.StateCode = data.state;
                newLead.City = data.city;
                newLead.PostalCode = data.code;
                newLead.Street = data.street;
                newLead.BI_PSPB_Preferred_Communication_Method__c = data.prefferedMethodOfCom;
                newLead.BI_PSPB_Enrolled_By__c = BI_PSPB_EnrollmentConstantCtrl.getLabel('PATIENT_CAREGIVER');
            } else {
                newLead.BI_PSPB_Enrolled_By__c = BI_PSPB_EnrollmentConstantCtrl.getLabel('HEALTHCARE_PROVIDER');
            }

            leadList = BI_PSP_DatabaseOperationsUtility.insertAndHandleErrors(new List<Lead>{ newLead }, BI_PSPB_EnrollmentHcpAndPatient.class.toString(), false);

            if (leadList.isEmpty()) {
                BI_PSP_LogMessagesUtility.logError(BI_PSPB_EnrollmentConstantCtrl.getLabel('RECORD_CANNOT_FOUND'), BI_PSPB_EnrollmentHcpAndPatient.class.getName(), true, BI_PSPB_EnrollmentConstantCtrl.getLabel('LOG_SEVERITY_ERROR'));
            }
        } catch (Exception ex) {
            BI_PSP_LogMessagesUtility.exceptionLogMessage(BI_PSPB_EnrollmentConstantCtrl.getLabel('INSERTION_FAILED'), BI_PSPB_EnrollmentHcpAndPatient.class.getName(), ex);
            throw new DMLException('Unable to Perform the DML Operation on Account : ' +ex.getMessage());
            
        }
        return leadList[0];
    }
}