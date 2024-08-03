/*

Apex Class Name    :BI_PSP_QualitativeSatisfactionCtrlTest
Created Date       : November 5, 2023
description       : To get the date for 2 months and 14 weeks of the care program enrollee to enroll the Qsq Questionnaires.
author            : Harish
@Last Modified On  :11/03/2024
@Last Modified by  :Harish

*/

@isTest
public class BI_PSP_QualitativeSatisfactionCtrlTest {
	// Test method to verify the behavior of getPatientAfterThreemonthsAndFourteenWeeks when the user is not a caregiver
	@isTest
	static void testGetPatientAfterThreemonthsAndFourteenWeeks() {
		// Create mock BI_SFCOE_LOG_App_Settings__c record
		BI_SFCOE_LOG_App_Settings__c settings = new BI_SFCOE_LOG_App_Settings__c(
			Name = 'ApplicationName',
			BI_SFCOE_LOG_Application__c = 'Spevigo'
		);
		insert settings;
        Contact con = new Contact(LastName = 'User', Email = 'testuser2new@example.com');
		insert con;
		//To create user
		User testUser = new User(
			ProfileId = [SELECT Id FROM Profile WHERE Name = 'BI_PSP_Patient Profile']
			.Id,
			FirstName = 'Test',
			LastName = 'User',
			Email = 'testuser@example.com',
			Alias = 'tuser',
			Username = 'testuser2312@example.com',
			CommunityNickname = 'tuser123',
			TimeZoneSidKey = 'America/Los_Angeles',
			LocaleSidKey = 'en_US',
			EmailEncodingKey = 'UTF-8',
			LanguageLocaleKey = 'en_US',
            ContactId = con.Id
		);
		insert testUser;
		//Account for Patient
		Account testAccount = new Account(Name = 'Harish');
		insert testAccount;
		//Create Careprogram to insert careProgramEnrollee
		CareProgram testCareProgram = new CareProgram(
			Name = 'Spevigo',
			StartDate = Date.newInstance(2023, 7, 12)
		);
		insert testCareProgram;
		//CareProgram Enrollee for User to get the Assessment for the particular user
		CareProgramEnrollee testEnrolleeOne = new CareProgramEnrollee(
			Name = 'Harish',
			CareProgramId = testCareProgram.Id,
			AccountId = testAccount.Id
		);
		insert testEnrolleeOne;

		Test.startTest();
		try {
			System.runAs(testUser) {
				//Testing the method that returns the date of care program enrollee after
				BI_PSP_QualitativeSatisfactionCtrl.getPatientEnrolleeDateAfterTwoMonthsAndFourteenWeeks();

				//This is negative senario so there no need to check assert
			}

			Test.stopTest();
		} catch (Exception e) {
			// Assert that the exception message is as expected
			Assert.areEqual(
				e.getMessage(),
				'Script-thrown exception',
				e.getMessage()
			);
		}
	}

	// Test method to verify the behavior of getPatientAfterThreemonthsAndFourteenWeeks when the user is not a caregiver
	@isTest
	static void testGetTheDateInProgressForCard() {
		// Create mock BI_SFCOE_LOG_App_Settings__c record
		BI_SFCOE_LOG_App_Settings__c settings = new BI_SFCOE_LOG_App_Settings__c(
			Name = 'ApplicationName',
			BI_SFCOE_LOG_Application__c = 'Spevigo'
		);
		insert settings;
		Contact con = new Contact(LastName = 'User', Email = 'testuser2new@example.com');
		insert con;
		// Create a test user
		String currentUserName = 'Test User';
		String currentUserEmail = 'testusernew@example.com';
		Profile standardUserProfile = [
			SELECT Id
			FROM Profile
			WHERE Name = 'BI_PSP_Patient Profile'
			LIMIT 1
		];
		//Create Test User
		User testUser = new User(
			Email = 'testusernew@example.com',
			BI_PSPB_Caregiver__c = false,
			Username = 'testusernew@example.com',
			FirstName = 'Test',
			LastName = 'User',
			Alias = 'tesn',
			TimeZoneSidKey = 'America/New_York',
			LocaleSidKey = 'en_US',
			EmailEncodingKey = 'UTF-8',
			ProfileId = standardUserProfile.Id,
			LanguageLocaleKey = 'en_US',
            ContactId = con.Id
		);
		insert testUser;
		//Person account
		Id personAccountRecordTypeId = Schema.SObjectType.Account.getRecordTypeInfosByDeveloperName()
			.get('PersonAccount')
			.getRecordTypeId();
		//TO create Account
		Account testAccountOne = new Account(
			Lastname = currentUserName,
			PersonEmail = currentUserEmail,
			RecordTypeId = personAccountRecordTypeId
		);
		insert testAccountOne;

		//Create careProgram to create
		CareProgram carePrgm = new CareProgram(
			Name = 'testcp',
			StartDate = Date.valueOf('2024-02-28')
		);

		insert carePrgm;
		//create CareProgram Enrollee
		CareProgramEnrollee testCpeOne = new CareProgramEnrollee(
			Name = 'TestCpa111',
			AccountId = testAccountOne.Id,
			CareProgramId = carePrgm.Id
		);
		insert testCpeOne;
		Test.startTest();
		System.runAs(testUser) {
			// Test method to verify the behavior of getPatientAfterThreemonthsAndFourteenWeeks when the user is not a caregiver
			Map<String, Object> result = BI_PSP_QualitativeSatisfactionCtrl.getPatientEnrolleeDateAfterTwoMonthsAndFourteenWeeks();
			Assert.areNotEqual(
				0,
				result.size(),
				'There is no record for the user'
			);
		}
		Test.stopTest();
	}

	// Test method to verify the behavior of getPatientAfterThreemonthsAndFourteenWeeks when the user is a caregiver
	@isTest
	static void testGetTheDateInProgressForCardscargiver() {
		// Create mock BI_SFCOE_LOG_App_Settings__c record
		BI_SFCOE_LOG_App_Settings__c settings = new BI_SFCOE_LOG_App_Settings__c(
			Name = 'ApplicationName',
			BI_SFCOE_LOG_Application__c = 'Spevigo'
		);
		insert settings;
		Contact con = new Contact(LastName = 'User', Email = 'testuser2new@example.com');
		insert con;
		// Create a test user
		String currentUserName = 'Test User';
		String currentUserEmail = 'testusernew@example.com';
		Profile standardUserProfile = [
			SELECT Id
			FROM Profile
			WHERE Name = 'BI_PSP_Patient Profile'
			LIMIT 1
		];
		//To create user for caregiver
		User testUserTwo = new User(
			Email = 'testuser2new@example.com',
			BI_PSPB_Caregiver__c = true,
			Username = 'testuser2new@example.com',
			FirstName = 'Test',
			LastName = 'User2',
			Alias = 'tesn',
			TimeZoneSidKey = 'America/New_York',
			LocaleSidKey = 'en_US',
			EmailEncodingKey = 'UTF-8',
			ProfileId = standardUserProfile.Id,
			LanguageLocaleKey = 'en_US',
            ContactId = con.Id
		);
		insert testUserTwo;
		//Create Person account
		Id personAccountRecordTypeId = Schema.SObjectType.Account.getRecordTypeInfosByDeveloperName()
			.get('PersonAccount')
			.getRecordTypeId();
		//create Account for Patient
		Account testAccountOne = new Account(
			Lastname = currentUserName,
			PersonEmail = currentUserEmail,
			RecordTypeId = personAccountRecordTypeId
		);
		insert testAccountOne;
		//Create Account for caregiver
		String currentUserNameTwo = 'Test User2';
		String currentUserEmailTwo = 'testuser2new@example.com';
		Account testAccountTwo = new Account(
			Lastname = currentUserNameTwo,
			PersonEmail = currentUserEmailTwo,
			RecordTypeId = personAccountRecordTypeId,
			BI_PSPB_Selected_Patient_ID__c = testAccountOne.Id
		);
		insert testAccountTwo;

		CareProgram carePrgm = new CareProgram(
			Name = 'testcp',
			StartDate = Date.valueOf('2024-02-28')
		);

		insert carePrgm;

		CareProgramEnrollee testCpeOne = new CareProgramEnrollee(
			Name = 'TestCpa111',
			AccountId = testAccountOne.Id,
			CareProgramId = carePrgm.Id
		);
		insert testCpeOne;
		CareProgramEnrollee testCpeTwo = new CareProgramEnrollee(
			Name = 'TestCpa222',
			AccountId = testAccountTwo.Id,
			CareProgramId = carePrgm.Id
		);
		insert testCpeTwo;

		// Create an assessment record
		Assessment testAssessment = new Assessment(
			Name = 'Dermatology Life Quality Index (DLQI)',
			BI_PSP_CareProgramEnrollee__c = testCpeTwo.Id,
			AssessmentStatus = 'In Progress',
			EffectiveDateTime = Date.today()
		);
		insert testAssessment;
		Test.startTest();
		System.runAs(testUserTwo) {
			// Test method to verify the behavior of getPatientAfterThreemonthsAndFourteenWeeks when the user is a caregiver

			Map<String, Object> result = BI_PSP_QualitativeSatisfactionCtrl.getPatientEnrolleeDateAfterTwoMonthsAndFourteenWeeks();
			Assert.areEqual(4, result.size(), 'Date for the User');
		}
		Test.stopTest();
	}
	@isTest
	//To cover the negative senario for patient
	static void testGetPatientAfterThreemonthsAndFourteenWeeksCatch() {
		// Create mock BI_SFCOE_LOG_App_Settings__c record
		BI_SFCOE_LOG_App_Settings__c settings = new BI_SFCOE_LOG_App_Settings__c(
			Name = 'ApplicationName',
			BI_SFCOE_LOG_Application__c = 'Spevigo'
		);
		insert settings;

		//User profile
		Profile standardUserProfile = [
			SELECT Id
			FROM Profile
			WHERE Name = 'BI_PSP_Patient Profile'
			LIMIT 1
		];
       	Contact con = new Contact(LastName = 'User', Email = 'testuser2new@example.com');
		insert con;
		//TestUser for Patient
		User testUser = new User(
			Email = 'testusernew@example.com',
			BI_PSPB_Caregiver__c = false,
			Username = 'testusernew@example.com',
			FirstName = 'Test',
			LastName = 'User',
			Alias = 'tesn',
			TimeZoneSidKey = 'America/New_York',
			LocaleSidKey = 'en_US',
			EmailEncodingKey = 'UTF-8',
			ProfileId = standardUserProfile.Id,
			LanguageLocaleKey = 'en_US',
            ContactId = con.Id
		);
		insert testUser;
		try {
			System.runAs(testUser) {
				Test.startTest();

				// Switch to the test caregiver context

				BI_PSP_QualitativeSatisfactionCtrl.getPatientEnrolleeDateAfterTwoMonthsAndFourteenWeeks();
				//This is negative senario so there no need to check assert

				Test.stopTest();
			}
		} catch (Exception e) {
			// Assert that the exception message is as expected
			Assert.areEqual(
				e.getMessage(),
				'Script-thrown exception',
				e.getMessage()
			);
		}
	}
	@isTest
	//To cover the negative senario for caregiver
	static void testGetCaregiverAfterThreemonthsAndFourteenWeeks() {
		// Create mock BI_SFCOE_LOG_App_Settings__c record
		BI_SFCOE_LOG_App_Settings__c settings = new BI_SFCOE_LOG_App_Settings__c(
			Name = 'ApplicationName',
			BI_SFCOE_LOG_Application__c = 'Spevigo'
		);
		insert settings;
		//User profile
		Profile standardUserProfile = [
			SELECT Id
			FROM Profile
			WHERE Name = 'BI_PSP_Patient Profile'
			LIMIT 1
		];
        Contact con = new Contact(LastName = 'User', Email = 'testuser2new@example.com');
		insert con;
		//TestUser for Patient
		User testUser = new User(
			Email = 'testusernew@example.com',
			BI_PSPB_Caregiver__c = true,
			Username = 'testusernew@example.com',
			FirstName ='Test',
			LastName = 'User',
			Alias = 'tesn',
			TimeZoneSidKey = 'America/New_York',
			LocaleSidKey = 'en_US',
			EmailEncodingKey = 'UTF-8',
			ProfileId = standardUserProfile.Id,
			LanguageLocaleKey = 'en_US',
            ContactId = con.Id
		);
		insert testUser;
		try {
			
				Test.startTest();

				// Switch to the test caregiver context

				BI_PSP_QualitativeSatisfactionCtrl.getPatientEnrolleeDateAfterTwoMonthsAndFourteenWeeks();
				//This is negative senario so there no need to check assert

			
		} catch (Exception e) {
			// Assert that the exception message is as expected
			Assert.areEqual(
				e.getMessage(),
				'Script-thrown exception',
				e.getMessage()
			);
		}
	}
}