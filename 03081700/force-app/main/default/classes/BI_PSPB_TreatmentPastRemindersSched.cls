/**
* @description  Used to
	create task when a video is uploaded and calling the method to
	send sms and email.
* History
* Version	Author			Date		Detail		Description
* 1.0		Niyas		24-07-2024		Created		Refactored Version
*/
public with sharing class BI_PSPB_TreatmentPastRemindersSched implements Schedulable {
	/**
	 * @description Used to scehdule a job when a post is created in community.
	 * @param sc The context in which the job is executed.
	 */
    public void execute(SchedulableContext sc) {
        try {
            BI_PSPB_TreatmentPastDueService.processPastDueReminders();
        } catch (System.DmlException ex) {
            BI_PSPB_LogUtilities.catchSystemException(
				BI_PSPB_NotificatinRmdConstantsCtrl.errorTreatmentReminderSched,
				BI_PSPB_TreatmentPastRemindersSched.class.toString(),
				ex
			);
        }
    }
}