//This components using  Main component connect all child components user date and recntactivty gpp symptoms
// To import Libraries
import {LightningElement,track,api, wire} from "lwc";
import {loadStyle} from "lightning/platformResourceLoader";
import {ShowToastEvent} from "lightning/platformShowToastEvent";
import {NavigationMixin} from "lightning/navigation";
// To import Apex Classes
import GET_ALLERGYINTOLERANCE_DATA from "@salesforce/apex/BI_PSPB_SymptomPrimaryPageCtrl.getAllergyIntoleranceData";
import RECORD_INSERT_STS from "@salesforce/apex/BI_PSP_SymptomTrackerCtrl.insertSymptomTracker";
import RECORD_INSERTST_UPDATE from "@salesforce/apex/BI_PSP_SymptomTrackerCtrl.updateSymptomTracker";
import CHECK_UNIQUE_DATE from "@salesforce/apex/BI_PSP_SymptomTrackerCtrl.checkUniqueDate";
import UPDATE_GPP_VALUE from "@salesforce/apex/BI_PSP_SymptomTrackerCtrl.updateGppValue";
import UPDATE_RECENT_VALUE from "@salesforce/apex/BI_PSP_SymptomTrackerCtrl.updateRecentSymptomActivity";
import CREATE_CONTENT_DOCUMENT_LINKS from "@salesforce/apex/BI_PSP_SymptomTrackerOperationsCtrl.createContentDocumentLinks";
import GET_LAST from "@salesforce/apex/BI_PSP_SymptomTrackerOperationsCtrl.getLastCareTemplate";
import GET_SYMPTOM_RECORD_DATA from "@salesforce/apex/BI_PSPB_SymptomPrimaryPageCtrl.getSymptomRecordData";
import GET_CASE_IMAGE_URL from "@salesforce/apex/BI_PSPB_SymptomPrimaryPageCtrl.getBase64Image";
import DELETE_CONTENT_DOCUMENT_LINKS from "@salesforce/apex/BI_PSP_SymptomTrackerOperationsCtrl.deleteContentDocumentLinks";
import FETCH_ACCOUNT_DETAILS from "@salesforce/apex/BI_PSP_SymptomTrackerOperationsCtrl.fetchAccountDetails";
import SAVE_FILES from "@salesforce/apex/BI_PSP_SymptomTrackerOperationsCtrl.saveFiles";
import GET_ENROLLE from "@salesforce/apex/BI_PSP_ChallengeEnrolleCtrl.getEnrolle";
// To import Custom labels and static resources
import * as label from 'c/biPspbLabelAndResourceSymptom';
import GET_SYMPTOM_TRACKER_DETAILS from "@salesforce/apex/BI_PSP_SymptomTrackerOperationsCtrl.getSymptomTrackerDetails";
export default class biPspbSymptomTracker extends NavigationMixin(
	LightningElement
) {
	//Proper naming conventions with camel case for all the variable will be followed in the future releases
	//@api variable declaration
	@api symptomrecord1;
	@api symptomTrackerId;
	@track imageUrls = [];
	@api recordId;
	//@track variable declaration
	symptomCompleteTick = label.SYMPTOM_TICK_IMG;
	symptomrecordValuesbtn;
	itchinessColorVarient = label.ITCHINESS_COLOR_VARIENT;
	rednessColorVarient = label.REDNESS_COLOR_VARIENT;
	painColorVarient = label.PAIN_COLOR_VARIENT;
	pustulesColorVarient = label.PUSTULES_COLOR_VARIENT;
	fatigueColorVarient = label.FATIGUE_COLOR_VARIENT;
	moodColorVarient = label.MOOD_COLOR_VARIENT;
	temperatureColorVarient = label.TEMPERATURE_COLOR_VARIENT;
	symptomTickIcon = label.SYMPTOM_TICK_ICON;
	lasteDatedIsPlay = false;
	isDeskTop = false;
	rednessChange = false;
	painChange = false;
	pustlesChange = false;
	fatiquesChange = false;
	moodChange = false;
	temperatureChange = false;
	sliderValue = 8;
	whichValuesOne = "Which of the below apply to your recent";
	boxedIcon = label.BOXED_ICON;
	limtUpLoad = label.UPLOAD_IMG;
	accName;
	isPopupOpenUndersatand = false;
	// @track understand = false;
	isPopupOpenDisable = true;
	lastModifi = false;
	entryDate;
	chsngedVal;
	isDateUnique = false;
	isGppExperiencing;
	lastEntryDate;
	accDate;
	gpp;
	editEntryDate = [];
	accGender = false;
	accGenderCheck;
	isDropDownVisible = false;
	isDropDownSymptom = false;
	isDropDownRecent = false;
	bodyParts = [];
	inputFieldValue = "";
	inputFieldColor = "";
	showFirstSVG = true;
	showFirstSVG1 = true;
	showFirstSVG2 = true;
	showFirstSVG3 = true;
	showFirstSVG4 = true;
	showFirstSVG5 = true;
	showFirstSVG6 = true;
	showFirstSVG7 = true;
	changeValue = "";
	storedData = "";
	isDropDownOpen = false;
	isPopUpOpen = false;
	isDropDownOpen1 = false;
	isPopUpOpen1 = false;
	isDropDownOpen2 = false;
	isPopUpOpen2 = false;
	isDropDownOpen3 = false;
	isPopUpOpen3 = false;
	isDropDownOpen4 = false;
	isPopUpOpen4 = false;
	isDrop = false;
	result = "";
	currentDate;
	currentDate2;
	isFutureDateError = false;
	selectedValue;
	isDrop2 = false;
	colorChange = "";
	colorChange1 = "";
	colorChange2 = "";
	colorChange3 = "";
	colorChange4 = "";
	colorChange5 = "";
	colorChange6 = "";
	itchinessChange1 = false;
	formattedLastModifiedDate;
	lastModifiedTime;
	accordColor;
	accordColorSymptom;
	itchinessChange = false;
	primaryPage;
	extraImg;
	submitModal = false;
	undersatand = false;
	showFiles = false;
	selectedLabels = [];
	dataLabel;
	recntBtn = []; // Initialize recntBtn as an empty array
	btnColorChange = "dropdown3-activity-btn";
	isButtonDisabled = true;
	accordColorBtn;
	files = [];
	fileIds = [];
	latestImageBase64;
	upLoadedFiles = [];
	isLimitReached = false;
	isLimitReachedUpLoad = true;
	upLoadedLarge = false;
	attachmentIdsValues;
	fileChangeColour;
	fileWork = false;
	fileMessage = false;
	isEditMode = false;
	resultId;
	dataMandatory = false;
	dataMantroyDispable = true;
	currentlyGpp = false;
	changerAdioBtn;
	changerAdioBtn1;
	formattedSymptomData;
	symptomData;
	symptomGpp;
	showMessage = false;
	options1 = [];
	recentActivity = false;
	dateDisable = false;
	firstTime = false;
	recentImages = false;
	allergyIntoleranceData;
	itchBody;
	intensity;
	carePlanTemplateNam;
	whichSymptom;
	fileTitle = label.UPLOADED_FILE;
	filePath = label.UPLOADED_FILE_PNG;
	Editdatedisable = false;
	oldimageurl = [];
	totalSize = [];
	vari;
	dynamicValue = label.DYNAMIC_VALUE;
	// Variable declaration
	userId = label.ID;
	selectedOption = [];
	accountId;
	personGendercheck;
	fileData;
	lastsymptomid;
	receivedValue;
	gppvaluesradio;
	image;
	image1;
	image2;
	image3;
	image4;
	image5;
	image6;
	userIddata;
	MAX_FILE_COUNT = 5;
	imageUrl;
	acceptedFormats = ".png, .jpg";
	showItchinessModal = false;
	showPainModal = false;
	showMoodModal = false;
	showFatigueModal = false;
	showTemperatureModal = false;
	showrednessModal = false;
	showPustulesModal = false;
	// popup end
	openrpopup() {
		this.ispoup = true;
	}
	closrpopup() {
		this.ispoup = false;
	}
	openPopup1() {
		this.isPopUpOpen1 = true;
		// this.understand = true;
	}
	closePopup1() {
		this.isPopUpOpen1 = false;
	}
	openPopup() {
		this.isPopUpOpen = true;
	}
	closePopup() {
		this.isPopUpOpen = false;
	}
	// lAST MODFIED START
	//Wire method to call the fetchAccountDetails Apex method
	@wire(FETCH_ACCOUNT_DETAILS, {
		careProgramEnrolleeId: "$accountId"
	})
	wiredAccountDetails({
		error,
		data
	}) {
		if (data && data.length > 0) {
			try {
				const enrollee = data[0];
				const personGenderIdentity = enrollee.Account.HealthCloudGA__Gender__pc;
				// Assign values to component properties if needed
				this.accGenderCheck = personGenderIdentity;
				if (this.accGenderCheck === label.FEMALE) {
					this.accGender = true;
				}
			}
			catch (err) {
				this.showToast(label.ERROR_MESSAGE, err.message, label.ERROR_VARIANT);
			}
		}
		else if (error) {
			// Handle any errors
			this.showToast(label.ERROR_MESSAGE, error.body.message, label.ERROR_VARIANT);

		}
	}
	options = [{
			label: label.YES,
			value: label.YES
		},
		{
			label: label.NO,
			value: label.NO
		}
		// Add more options as needed
	];
	toggleDropdown() {
		this.isDropDownVisible = !this.isDropDownVisible;
	}
	// end modified
	// Dropdown 2 state
	// addEvents() {
	// 	window.addEventListener('beforeunload', () => {
	// 		sessionStorage.clear();
	// 	});
	// }
	handleChange(event) {
		this.selectedOption = event.target.value;
	}
	formatDate(date) {
		const options = {
			month: "numeric",
			day: "numeric",
			hour: "numeric",
			minute: "numeric",
			hour12: true
		};
		return date.toLocaleString(label.LABEL_US, options);
	}
	changerecord(event) {
		this.vari = event.detail;
		if (this.vari === label.ITCHINESS_VALUES) {
			this.isPopupOpenDisable = false;
			this.colorChange = "colorChange";
			this.accordColorSymptom = "card-header-accord";
			this.itchinessChange = true;
			this.itchinessChange1 = true;
		}
		else {
			this.colorChange = "symptoms";
		}
		if (this.vari === label.REDNESS_VALUE) {
			this.isPopupOpenDisable = false;
			this.colorChange1 = "colorChange1";
			this.rednessChange = true;
			this.itchinessChange1 = true;
			this.accordColorSymptom = "card-header-accord";
		}
		else {
			this.colorChange1 = "symptoms";
		}
		if (this.vari === label.PAIN_VALUES) {
			this.isPopupOpenDisable = false;
			this.colorChange2 = "colorChange2";
			this.accordColorSymptom = "card-header-accord";
			this.painChange = true;
			this.itchinessChange1 = true;
		}
		else {
			this.colorChange3 = "symptoms";
		}
		if (this.vari === label.PUSTULES_VALUE) {
			this.isPopupOpenDisable = false;
			this.colorChange3 = "colorChange3";
			this.pustlesChange = true;
			this.itchinessChange1 = true;
			this.accordColorSymptom = "card-header-accord";
		}
		else {
			this.colorChange3 = "symptoms";
		}
		if (this.vari === label.FATIGUE_VALUES) {
			this.isPopupOpenDisable = false;
			this.colorChange4 = "colorChange4";
			this.fatiquesChange = true;
			this.itchinessChange1 = true;
			this.accordColorSymptom = "card-header-accord";
		}
		else {
			this.colorChange4 = "";
		}
		if (this.vari === label.TEMPERATURE_VALUES) {
			this.isPopupOpenDisable = false;
			this.colorChange5 = "colorChange5";
			this.accordColorSymptom = "card-header-accord";
			this.itchinessChange1 = true;
			this.temperatureChange = true;
		}
		else {
			this.colorChange4 = "";
		}
		if (this.vari === label.MOOD_IMG) {

			this.isPopupOpenDisable = false;
			this.moodChange = true;
			this.itchinessChange1 = true;
			this.colorChange6 = "colorChange6";
			this.accordColorSymptom = "card-header-accord";
		}
		else {
			this.colorChange6 = "";
		}
	}
	renderedCallback() {
		if (this.recntBtn && this.recntBtn.length > 0) {
			this.recntBtn?.forEach((item) => {
				let clickedElement = this.template.querySelector(
					`[data-name='${item}']`
				);
				if (
					clickedElement &&
					(clickedElement.style.backgroundColor === "" ||
						clickedElement.style.backgroundColor === "white")
				) {
					// If the background color is white, it means it's not selected
					clickedElement.style.backgroundColor = "#C6AA76"; // Set to selected color
					clickedElement.style.fontFamily = "Eina-Semibold";
				}
				else {
					// If the background color is not white, it means it's selected
					if (clickedElement) {
						clickedElement.style.backgroundColor = "white"; // Reset to original color
					}
					// this.recntBtn = this.recntBtn.filter(option => option !== selectedOption);
				}
			});
		}
		let globalThis = window;
		globalThis.addEventListener("beforeunload", this.handlePageRefresh);
	}
	connectedCallback() {
		let globalThis = window;
		loadStyle(this, label.FILE_UPLOADER_CSS);
		loadStyle(this, label.SYMPTOMS_IMG);
		const queryParams = new URLSearchParams(globalThis.location?.search);
		// Get the value of the 'value' parameter
		this.receivedValue = queryParams.get("value");
		globalThis.history.replaceState({},
			globalThis.document?.title,
			globalThis.location?.pathname
		);
		// Check if the value is received
		if (this.receivedValue) {
			try {
				this.lastModifi = false;
			}
			catch (error) {
				this.showToast(label.ERROR_MESSAGE, error.message, label.ERROR_VARIANT);

			}
			// You can use the value here as needed
		}
		//This code retrieves data labeled as 'recentactivity' from the session storage without altering custom labels.
		let recntBtn = globalThis?.sessionStorage.getItem("recentActivity");
		//The use of setInterval ensures optimal timing for thumb label position updates, enhancing animation smoothness and performance
		Promise.resolve()
			.then(() => {
				recntBtn?.forEach((item) => {
					let element = this.template.querySelector(`[data-name='${item}']`);
					if (element) {
						element.style.backgroundColor = "#C6AA76";
						element.style.fontFamily = "Eina-Semibold";
					}
					this.accordColor = "card-header-accord";
					this.accordColorBtn = "card-header-accord";
					this.recentactivity = true;
				});
			});
		const currentURL = globalThis.location?.href;
		// Create a URL object
		const urlObject = new URL(currentURL);
		// Get the path
		const path = urlObject.pathname;
		// Split the path using '/' as a separator
		const pathComponents = path.split("/");
		// Find the component you need (in this case, 'Branded')
		const desiredComponent = pathComponents.find((component) => [label.BRANDED_URL.toLowerCase(), label.UNASSIGNED_URL.toLowerCase()].includes(
			component.toLowerCase()
		));
		if (desiredComponent.toLowerCase() === label.BRANDED_URL.toLowerCase()) {
			this.urlq = label.BRANDED_URL_NAVIGATION;
		}
		else {
			this.urlq = label.UNASSIGNED_URL_NAVIGATION;
		}
		//This code retrieves data labeled as 'stopprcocess' from the session storage without altering custom labels.
		this.primaryPage = globalThis?.localStorage.getItem("stopprcocess");
		if (this.primaryPage === label.DATE_INPUT_PAGE) {
			this.dataMandatory = false;
		}
		//This code retrieves data labeled as 'symptomlastid' from the session storage without altering custom labels.
		this.lastsymptomid = globalThis?.localStorage.getItem("symptomlastid");
		try {
			GET_ENROLLE({
					userId: this.userId
				})
				// Null data is checked and AuraHandledException is thrown from the Apex
				.then((result) => {
					if (result !== null) {
						if (result[0].patientEnrolle !== null) {
							this.accountId = result[0].patientEnrolle.Id;
						}
						else if (result[0].error !== null) {
							this.showError = true;
							this.errorMessage = result[0].error;
						}
					}
				})
				.catch((error) => {
					// Handle any errors occurring during the promise chain
					this.showToast(label.ERROR_MESSAGE, error.message, label.ERROR_VARIANT);

				});
		}
		catch (error) {
			// Handle any synchronous errors outside the promise chain
			this.showToast(label.ERROR_MESSAGE, error.message, label.ERROR_VARIANT);

		}
		//This code retrieves data labeled as 'Time' from the session storage without altering custom labels.
		const localStorageValue = globalThis?.localStorage.getItem(
			"Time",
			this.resultId
		);
		//This code retrieves data labeled as 'gppvalues' from the session storage without altering custom labels.
		this.sessionstrogegpp = globalThis?.sessionStorage.getItem(
			"gppvalues",
			this.resultId
		);
		this.gppvaluesradio = this.sessionstrogegpp;
		this.time = localStorageValue;
		// this.handleSaveDate();
		this.currentDate = new Date()
			.toISOString()
			.slice(0, 10);
		const today = new Date();
		this.maxDate = today.toISOString()
			.slice(0, 10);
		// window.addEventListener('beforeunload', this.handlePageRefresh);
		//The use of setInterval ensures optimal timing for thumb label position updates, enhancing animation smoothness and performance
		this.currentDate = new Date()
			.toISOString()
			.slice(0, 10);
	}
	// disconnectedCallback() {
	// 	window.removeEventListener('beforeunload', this.handlePageRefresh);
	// }
	handlePageRefresh(event) {
		let globalThis = window;
		globalThis.sessionStorage?.clear();
		event.returnValue = "";
	}
	handleEditDate() {
		this.isEditMode = true;
	}
	get dropdownButtonClass() {
		return this.isDropDownOpen ?
			"dropdown-arrow-button dropdown-arrow-button-open" :
			"dropdown-arrow-button";
	}
	get dropdownButtonClass1() {
		return this.isDropDownOpen1 ?
			"dropdown-arrow-button dropdown-arrow-button-open" :
			"dropdown-arrow-button";
	}
	get dropdownButtonClass2() {
		return this.isDropDownOpen2 ?
			"dropdown-arrow-button dropdown-arrow-button-open" :
			"dropdown-arrow-button";
	}
	get dropdownButtonClass3() {
		return this.isDropDownOpen3 ?
			"dropdown-arrow-button dropdown-arrow-button-open" :
			"dropdown-arrow-button";
	}
	get dropdownButtonClass4() {
		return this.isDropDownOpen4 ?
			"dropdown-arrow-button dropdown-arrow-button-open" :
			"dropdown-arrow-button";
	}
	toggleDropdown1() {
		this.isDropDownOpen1 = !this.isDropDownOpen1;
		this.isDropDownOpen2 = false;
		this.isDropDownOpen4 = false;
		this.isDropDownOpen3 = false;
	}
	toggleDropdown2() {
		this.isDropDownOpen2 = !this.isDropDownOpen2;
		this.isDropDownOpen3 = false;
		this.isDropDownOpen1 = false;
		this.isDropDownOpen4 = false;
	}
	toggleDropdown3() {
		this.isDropDownOpen3 = !this.isDropDownOpen3;
		this.isDropDownOpen2 = false;
		this.isDropDownOpen1 = false;
		this.isDropDownOpen4 = false;
		//The setTimeout with a small delay ensures UI updates occur after the current rendering tasks, preventing glitches.
		if (this.recntBtn && this.recntBtn.length > 0) {
			this.recntBtn?.forEach((item) => {
				let clickedElement = this.template.querySelector(
					`[data-name='${item}']`
				);
				if (
					clickedElement &&
					(clickedElement.style.backgroundColor === "" ||
						clickedElement.style.backgroundColor === "white")
				) {
					// If the background color is white, it means it's not selected
					clickedElement.style.backgroundColor = "#C6AA76"; // Set to selected color
					clickedElement.style.fontFamily = "Eina-Semibold";
					// this.recntBtn.push(selectedOption);
				}
				else {
					// If the background color is not white, it means it's selected
					if (clickedElement) {
						clickedElement.style.backgroundColor = "white"; // Reset to original color
					}
					// this.recntBtn = this.recntBtn.filter(option => option !== selectedOption);
				}
			});
		}
	}
	toggleDropdown4() {
		this.isDropDownOpen4 = !this.isDropDownOpen4;
		this.isDropDownOpen3 = false;
		this.isDropDownOpen2 = false;
		this.isDropDownOpen1 = false;
	}

	// Labels
	label = {
		YES: 'Yes',
		NO: 'No',
		ERROR_MESSAGE: 'An error occurred',
		ERROR_VARIANT: 'error'
	};

	// Session storage keys
	keys = ["myData", "redness", "Paindata", "Pustule", "mood", "fatigue", "temperature", "gpp"];

	// Handles dropdown change
	handlechnagedropdown() {
		let globalThis = window;
		const values = this.getSessionStorageValues(this.keys.slice(0, 7));
		globalThis?.sessionStorage.setItem("syptombtn", true);

		if (this.areValuesEmpty(values) && this.chsngedVal === this.label.YES) {
			this.opensubmitModal();
		}
		else {
			this.handleDropdownState(this.chsngedVal);
		}
	}

	// Handles button click
	handleButtonClick() {
		let globalThis = window;
		const values = this.getSessionStorageValues(this.keys);
		const symptbtn = globalThis?.sessionStorage.getItem("syptombtn");

		if (this.shouldOpenSubmitModal(values, symptbtn)) {
			this.opensubmitModal();
			this.isPopupOpenDisable = false;
		}
		else {
			this.openundersatand();
			this.isPopupOpenDisable = false;
		}
	}

	// Handles saving GPP value
	handleSavegpp() {
		const values = this.getSessionStorageValues(this.keys.slice(0, 7));
		if (this.chsngedVal === 'Yes') {
			this.opensubmitModal();
		}

		if (this.areValuesEmpty(values) && this.chsngedVal === this.label.YES) {
			this.prepareGppUpdate(true);
		}
		else if (this.lastsymptomid || this.chsngedVal === this.label.NO) {
			this.prepareGppUpdate(false);
		}
	}

	// Prepares for updating GPP value
	prepareGppUpdate(gppValue) {
		let globalThis = window;
		this.currentlyGpp = true;
		this.accordColor = "card-header-gpp";
		this.changerAdioBtn = gppValue;
		this.isPopUpOpen = gppValue;
		this.isPopupOpenUndersatand = !gppValue;
		this.isDropDownOpen2 = !gppValue;
		this.isDropDownOpen1 = false;

		try {
			UPDATE_GPP_VALUE({
					symptomTrackerId: this.resultId || this.lastsymptomid,
					gpp: this.changerAdioBtn
				})
				.then(result => {
					if (result) {
						this.accordColor = "card-header-gpp";
					}
				})
				.catch(error => {
					this.showToast(this.label.ERROR_MESSAGE, error.message, this.label.ERROR_VARIANT);
				})
				.finally(() => {
					this.isEditMode = false;
					globalThis?.sessionStorage.setItem("gpp", this.chsngedVal);
				});
		}
		catch (err) {
			this.showToast(this.label.ERROR_MESSAGE, err.message, this.label.ERROR_VARIANT);
		}
	}

	// Utility function to get session storage values for given keys
	getSessionStorageValues(keys) {
		let globalThis = window;
		return keys.map(key => globalThis?.sessionStorage.getItem(key));
	}

	// Utility function to check if all values are empty
	areValuesEmpty(values) {
		return values.every(value => !value);
	}

	// Determines if the submit modal should open based on values and button state
	shouldOpenSubmitModal(values, symptbtn) {
		return this.areValuesEmpty(values.slice(0, 7)) && values[7]?.toLowerCase() === "yes" ||
			(!symptbtn || symptbtn === "false") && values[7]?.toLowerCase() === "yes";
	}

	// Handles dropdown state based on the changed value
	handleDropdownState(chsngedVal) {
		if (chsngedVal === this.label.NO) {
			this.accordColorSymptom = "card-header-accord";
			this.itchinessChange1 = true;
		}
		this.isDropDownOpen3 = !this.isDropDownOpen3;
		this.isDropDownOpen2 = false;
		this.isDropDownOpen1 = false;
		this.isDropDownOpen4 = false;
	}

	opensubmitModal() {
		this.submitModal = true;
		document.body.style.overflow = "hidden";
	}
	closesubmitModal() {
		this.submitModal = false;
		document.body.style.overflow = ""; // Reset to default
	}
	openundersatand() {
		let globalThis = window;
		this.undersatand = true;
		document.body.style.overflow = "hidden";
		this.submitModal = false;
		globalThis?.localStorage.clear();
	}
	closeundersatand() {
		this.undersatand = false;
		document.body.style.overflow = ""; // Reset to default
	}
	addsymtom() {
		if (!this.isDropDownOpen) {
			this.isDropDownOpen2 = true;
			this.isDropDownOpen1 = false;
			this.submitModal = false;
			document.body.style.overflow = ""; // Reset to default
		}
		else {
			this.isDropDownOpen2 = false;
			this.isPopUpOpen = false;
		}
	}
	understand() {
		let globalThis = window;
		globalThis.location.assign(this.urlq + label.SYMPTOM_GRAPH_PAGE);
		globalThis?.sessionStorage.setItem(label.DYNAMIC_VALUE, 'someDynamicValue')
	}
	openItchinessModal() {
		this.showItchinessModal = true;
		document.body.style.overflow = "hidden";
	}
	closeItchinessModal() {
		this.showItchinessModal = false;
		document.body.style.overflow = ""; // Reset to default
	}
	// PainModal
	openPainModal() {
		this.showPainModal = true;
		document.body.style.overflow = "hidden";
	}
	closePainModal() {
		let globalThis = window;
		this.showPainModal = false;
		document.body.style.overflow = ""; // Reset to default
		// Store data labeled as 'Paindatavalues' in the session storage without altering custom labels.
		globalThis?.sessionStorage.setItem("Paindatavalues", 0);
	}
	// RednessModal
	openRednessModal() {
		this.showrednessModal = true;
		document.body.style.overflow = "hidden";
	}
	closeRednessModal() {
		let globalThis = window;
		this.showrednessModal = false;
		document.body.style.overflow = ""; // Reset to default
		// Store data labeled as 'rednessvalues' in the session storage without altering custom labels.
		globalThis?.sessionStorage.setItem("rednessvalues", 0);
	}
	// pustel model
	openPustulesModal() {
		this.showPustulesModal = true;
		document.body.style.overflow = "hidden";
	}
	closePustulesModal() {
		let globalThis = window;
		this.showPustulesModal = false;
		document.body.style.overflow = ""; // Reset to default
		// Store data labeled as 'Pustulevalues' in the session storage without altering custom labels.
		globalThis?.sessionStorage.setItem("Pustulevalues", 0);
	}
	// Fatigue Modal
	openFatigueModal() {
		this.showFatigueModal = true;
		document.body.style.overflow = "hidden";
	}
	closeFatigueModal() {
		let globalThis = window;
		this.showFatigueModal = false;
		document.body.style.overflow = ""; // Reset to default
		// Store data labeled as 'fatiguevalues' in the session storage without altering custom labels.
		globalThis?.sessionStorage.setItem("fatiguevalues", 0);
	}
	// Temperature Modal
	openTemperatureModal() {
		this.showTemperatureModal = true;
		document.body.style.overflow = "hidden";
	}
	closeTemperatureModal() {
		this.showTemperatureModal = false;
		document.body.style.overflow = "";
	}
	// Mood Modal
	openMoodModal() {
		this.showMoodModal = true;
		document.body.style.overflow = "hidden";
	}
	closeMoodModal() {
		this.showMoodModal = false;
		document.body.style.overflow = ""; // Reset to default
	}
	// files upload
	openfiles() {
		this.showFiles = true;
		document.body.style.overflow = "hidden";
	}
	closefiles() {
		this.showFiles = false;
		document.body.style.overflow = ""; // Reset to default
	}
	handleClickactivites(event) {
		const clickedElement = event.target;
		const elementClass = clickedElement.classList.value;
		if (elementClass.includes(this.btnColorChange)) {
			const selectedOption = clickedElement.getAttribute("data-name");
			// Toggle the background color and update the selected values
			// Initialize this.recntBtn as an array if it's not already initialized
			if (!this.recntBtn) {
				this.recntBtn = [];
			}
			if (
				clickedElement.style.backgroundColor === "" ||
				clickedElement.style.backgroundColor === "white"
			) {
				// If the background color is white, it means it's not selected
				clickedElement.style.backgroundColor = "#C6AA76"; // Set to selected color
				clickedElement.style.fontFamily = "Eina-Semibold";
				this.recntBtn.push(selectedOption);
			}
			else {
				// If the background color is not white, it means it's selected
				clickedElement.style.backgroundColor = "white"; // Reset to original color
				this.recntBtn = this.recntBtn.filter(
					(option) => option !== selectedOption
				); // Remove the selected option from the array
			}
		}
	}
	updatedRecordId;
	handleClickForAccept() {

		let globalThis = window;
		// Close all dropdowns except the fourth one
		this.isDropDownOpen4 = true;
		this.isDropDownOpen3 = false;
		this.isDropDownOpen2 = false;
		this.isDropDownOpen1 = false;
		// Store data labeled as 'recentactivity' in the session storage without altering custom labels.
		globalThis?.sessionStorage.setItem("recentActivity", this.recntBtn);
		// Set the class based on the condition whether recntBtn has only one item or not
		this.accordColorBtn = this.recntBtn ?
			"card-header-accord" :
			"another-class";
		try {
			this.recentActivity = true;
			if (this.lastsymptomid) {
				this.updatedRecordId = UPDATE_RECENT_VALUE({
					symptomTrackerId: this.lastsymptomid,
					valuesToUpdate: this.recntBtn
				});
				this.recentActivity = true;
			}
			else {
				this.updatedRecordId = UPDATE_RECENT_VALUE({
					symptomTrackerId: this.resultId,
					valuesToUpdate: this.recntBtn
				});
				this.recentActivity = true;
			}
		}
		catch (error) {
			this.error("Error occurred:", error.message, "Variant 1");

		}
	}
	handleFileInputChange(event) {
		const files = event.target.files;
		if (files && files.length > 0) {
			const newImageUrls = [...this.imageUrls];
			const newtotalsizeimg = [...this.totalSize];
			const maxFileSize = 5 * 1024 * 1024; // 5MB in bytes
			const maxImagesAllowed = 4;
			if (newImageUrls.length + files.length > maxImagesAllowed) {
				// Trying to upload more than 5 images, show error message
				this.isLimitReached = true;
			}
			for (let i = 0; i < files.length; i++) {
				const file = files[i];
				if (file.type.includes("image")) {
					//   this.totalSize += file.size;
					if (file.size <= maxFileSize) {
						newtotalsizeimg.push(file.size);
						const reader = new FileReader();
						reader.onload = () => {
							newImageUrls.push(reader.result);
							this.imageUrls = [...newImageUrls];
						};
						reader.readAsDataURL(file);
						let sum = 0;
						for (let j = 0; j < this.totalSize.length; j++) {
							sum += this.totalSize[j];
							if (sum > maxFileSize) {
								this.upLoadedLarge = true;
								this.totalSize.splice(j, 1);
							}
						}
					}
					else {
						// Individual file size exceeds 5MB, show error message
						this.upLoadedLarge = false;
						this.totalSize.pop();
					}
				}
				else {
					// Not an image file, show error message
					this.upLoadedLarge = false;
				}
			}
		}
		else {
			// No files selected or none of them are images
			// this.imageUrls = [];
			this.upLoadedLarge = false;
			this.isLimitReached = false;
		}
	}
	handleClickpdf() {
		//  this.imageUrls = [];
		this.fileMessage = true;
		this.isDropDownOpen1 = false;
		this.isDropDownOpen2 = false;
		this.isDropDownOpen1 = false;
		this.isDropDownOpen4 = false;
		let newArray = [];
		// Get the file contents from imageUrls and save them
		for (let i = 0; i < this.imageUrls.length; i++) {
			if (!this.oldimageurl.includes(this.imageUrls[i])) {
				newArray.push(this.imageUrls[i]);
				this.oldimageurl = [...this.oldimageurl, this.imageUrls[i]];
			}
		}
		const fileContents = newArray.map((imageUrl) => imageUrl.split(",")[1]);
		this.recentImages = true;
		if (fileContents) {
			this.fileChangeColour = "card-header-accord";
			this.fileWork = true;
		}
		if (this.resultId) {
			try {
				SAVE_FILES({
						fileContents,
						parentId: this.resultId,
						fileTitle: this.fileTitle,
						filePath: this.filePath
					})
					// Null data is checked and AuraHandledException is thrown from the Apex
					.then((attachmentIds) => {
						this.attachmentIdsValues = attachmentIds;
						// Check the value of this.resultId
						try {
							CREATE_CONTENT_DOCUMENT_LINKS({
								fileIds: this.attachmentIdsValues,
								symptomTrackerId: this.resultId
							});
						}
						catch (error) {
							this.error("Error occurred:", error.message, "Variant 1");

						}
					})
					.catch((error) => {
						// Handle error if needed
						this.error("Error occurred:", error.message, "Variant 1");

					});
			}
			catch (error) {
				// Handle synchronous error if needed
				this.error("Error occurred:", error.message, "Variant 1");

			}
		}
		if (this.resultId !== "") {
			try {
				SAVE_FILES({
						fileContents,
						parentId: this.lastsymptomid,
						fileTitle: this.fileTitle,
						filePath: this.filePath
					})
					// Null data is checked and AuraHandledException is thrown from the Apex
					.then((attachmentIds) => {
						this.attachmentIdsValues = attachmentIds;
						// Check the value of this.resultId
						try {
							CREATE_CONTENT_DOCUMENT_LINKS({
								fileIds: this.attachmentIdsValues,
								symptomTrackerId: this.lastsymptomid
							});
						}
						catch (error) {
							this.error("Error occurred:", error.message, "Variant 1");

						}
					})
					.catch((error) => {
						// Handle error if needed
						this.error("Error occurred:", error.message, "Variant 1");

					});
			}
			catch (error) {
				// Handle synchronous error if needed
				this.error("Error occurred:", error.message, "Variant 1");

			}
		}
	}
	// Call this method to trigger the deletion
	async removeImage(event) {
		const index = event.target.dataset.index;
		this.imageUrls.splice(index, 1);
		if (this.imageUrls.length > 4) {
			this.isLimitReached = true;
		}
		else {
			this.isLimitReached = false;
		}
		try {
			await DELETE_CONTENT_DOCUMENT_LINKS({
				symptomTrackerId: this.lastsymptomid
			});
		}
		catch (error) {
			// Handle synchronous error if needed
			this.showToast(label.ERROR_MESSAGE, error.body.message, label.ERROR_VARIANT);
		}
	}
	async handleSaveDate() {
		let globalThis = window;
		let accForInsert = this.accountId;
		let myBoolean = false;
		// Ensure isDateUnique is resolved before proceeding
		this.checkDateUniqueness();
		if (this.isDateUnique === false) {
			if (!this.lastsymptomid) {
				this.resultId = await RECORD_INSERT_STS({
					accId: accForInsert,
					editEntryDate: this.currentDate2
				});
			}
			else {
				this.resultId = await RECORD_INSERTST_UPDATE({
					symptomTrackerId: this.lastsymptomid,
					gpp: myBoolean,
					editEntryDate: this.currentDate2
				});
			}
			if (this.resultId) {
				// Store data labeled as 'Time' in the session storage without altering custom labels.
				globalThis?.localStorage.setItem("Time", this.resultId);
				// Store data labeled as 'gppvalues' in the session storage without altering custom labels.
				globalThis?.sessionStorage.setItem("gppvalues", this.resultId);
				this.dataMandatory = true;
				this.dataMantroyDispable = true;
				this.Editdatedisable = true;
			}
		}
	}
	checkDateUniqueness() {
		if (this.currentDate) {
			CHECK_UNIQUE_DATE({
					editedDate: this.currentDate,
					accountId: this.accountId
				})
				.then(result => {
					this.result = result;
					if (this.result) {
						this.isDateUnique = false;
					}
					else {
						this.isDateUnique = true;
						this.dataMantroyDispable = true;
					}
				})
				.catch(error => {
					this.showToast(label.ERROR_MESSAGE, error.message, label.ERROR_VARIANT);
				});
		}
	}
	handleDateChange(event) {
		//localStorage.clear()
		this.currentDate = event.target.value;
		this.currentDate2 = event.target.value;
		this.dataMantroyDispable = false; // Enable the 'Submit' button
		const selectedDate = new Date(this.currentDate);
		const today = new Date();
		if (selectedDate > today) {
			this.showText = true; // Show the message
			this.futuredatedisable = true;
			this.dataMantroyDispable = true; // Show the future date error message
		}
		else {
			this.showText = false; // Hide the message
			this.futuredatedisable = false; // Hide the future date error message
		}
		// Call the checkDateUniqueness function
		this.checkDateUniqueness();
	}
	handleRadioChange(event) {
		this.chsngedVal = event.detail.value;
		this.gpp = this.chsngedVal;
		// Assuming that this.chsngedVal is a string, use 'true' (string) instead of true (boolean)
		this.showMessage = this.chsngedVal === label.YES;
	}

	@wire(GET_LAST)
	wiredLastEntryDate({
		error,
		data
	}) {
		// Null data is checked and AuraHandledException is thrown from the Apex
		if (data) {
				data.forEach(careplanimage => {
					if (careplanimage.Name === label.ITCHINESS_VALUES) {
						this.imageItchiness = careplanimage.BI_PSP_Symptom_image__c;
					}
					else if (careplanimage.Name === label.REDNESS_VALUE) {
						this.imageRedness = careplanimage.BI_PSP_Symptom_image__c;
					}
					else if (careplanimage.Name === label.PAIN_VALUES) {
						this.imagePain = careplanimage.BI_PSP_Symptom_image__c;
					}
					else if (careplanimage.Name === label.PUSTULES_VALUE) {
						this.imagePustules = careplanimage.BI_PSP_Symptom_image__c;
					}
					else if (careplanimage.Name === label.FATIGUE_VALUES) {
						this.imageFatigue = careplanimage.BI_PSP_Symptom_image__c;
					}
					else if (careplanimage.Name === label.TEMPERATURE_VALUES) {
						this.imageTemperature = careplanimage.BI_PSP_Symptom_image__c;
					}
					else if (careplanimage.Name === label.MOOD_IMG) {
						this.imageMood = careplanimage.BI_PSP_Symptom_image__c;
					}
				});

				// const desiredWidth = '100px';
				// const desiredHeight = '100px';
				const imgTagRegex = /<img\s+[^>]*src='([^']+)'[^>]*>/giu;
				const formatImageContent = (image) =>
					image.replace(imgTagRegex, (match, src) => `<img src='${src}'>`);
				// 			const formatImageContent = (image) =>
				// image.replace(imgTagRegex, (match, src) => <img src='${src}'>);
				this.image = formatImageContent(this.image);
				this.image1 = formatImageContent(this.image1);
				this.image2 = formatImageContent(this.image2);
				this.image3 = formatImageContent(this.image3);
				this.image4 = formatImageContent(this.image4);
				this.image5 = formatImageContent(this.image5);
				this.image6 = formatImageContent(this.image6);
		}
		else if (error) {
            this.showToast(label.ERROR_MESSAGE, error.body.message, label.ERROR_VARIANT);
			// Handle error
		}
	}
	@wire(GET_SYMPTOM_RECORD_DATA, {
		symptomTrackerId: "$lastsymptomid"
	})
	wiredGetsymptomrecorddata({
		error,
		data
	}) {
		if (data && data !== null) {
			try {
				this.Editdatedisable = true;
				this.satrdate = false;
				this.symptomData = data[0].BI_PSP_EditEntrydates__c;
				this.symptomGpp = data[0].BI_PSP_Are_you_currently_experiencing__c;
				this.chsngedVal = this.symptomGpp;
				let getsymptombtn = data[0].BI_PSP_Recent_Activities__c;
				if (this.chsngedVal === true) {
					this.chsngedVal = label.YES;
				}
				else {
					this.chsngedVal = label.NO;
				}
				this.currentlyGpp = true;
				this.dateDisable = true;
				if (this.symptomGpp === true) {
					this.showMessage = true;
				}
				if (this.symptomData) {
					this.dataMandatory = true;
				}
				this.symptomGpp = true;
				if (getsymptombtn) {
					this.recentActivity = true;
					this.accordColorBtn = "card-header-accord";
				}
				data.forEach(symptomrecord => {
					let getsymtomdate = symptomrecord.BI_PSP_EditEntrydates__c;
					let getsymptomrecentbtn = symptomrecord.BI_PSP_Recent_Activities__c;
					this.currentDate2 = new Date(getsymtomdate)
						.toISOString()
						.split("T")[0];
					this.recntBtn = getsymptomrecentbtn?.split(";");
					this.recentActivity = true;
					this.accordColor = "card-header-gpp";
					this.accordColorBtn = "card-header-accord";

					// The use of setInterval ensures optimal timing for thumb label position updates, enhancing animation smoothness and performance
					this.recntBtn?.forEach(item => {
						let element = this.template.querySelector(`[data-name='${item}']`);
						if (element) {
							element.style.backgroundColor = "#C6AA76";
							element.style.fontFamily = "Eina-Semibold";
						}
					});
				});

			}
			catch (err) {
				this.err(label.ERROR_MESSAGE, err.message, label.ERROR_VARIANT);
			}
		}
		else if (error) {
			this.err(label.ERROR_MESSAGE, error.body.message, label.ERROR_VARIANT);
		}
	}
	@wire(GET_CASE_IMAGE_URL, {
		symptomTrackerId: "$lastsymptomid"
	})
	wiredgetCaseImageURL({
		data,
		error
	}) {
		if (data && data !== null) {
			try {
				this.caseImageURL = data;
				this.fileMessage = true;
				this.fileChangeColour = "card-header-accord";
				if (this.firstTime === false) {
					let splitArray = data?.map((obj) => obj.split("data:")[1]);
					splitArray.forEach(record => {
						if (record !== "") {
							this.imageUrls = [...this.imageUrls, "data:" + record];
							this.oldimageurl = [...this.oldimageurl, "data:" + record];
						}
					});

					this.firstTime = true;
					this.recentImages = true;
				}
				else if (this.imageUrls.length > 0) {
					this.fileChangeColour = "card-header-accord";
				}
			}
			catch (err) {
				this.showToast(label.ERROR_MESSAGE, err.message, label.ERROR_VARIANT);
				// Handle the error as needed
			}
		}
		else if (error) {
			this.err(label.ERROR_MESSAGE, error.body.message, label.ERROR_VARIANT);
		}
	}
	readAsDataURL(blob) {
		return new Promise((resolve, reject) => {
			const reader = new FileReader();
			reader.onload = (event) => {
				const base64String = event.target.result;
				resolve(`data:image/${blob.type.split("/")[1]};base64,${base64String}`);
			};
			reader.onerror = (error) => {
				reject(error);
			};
			reader.readAsDataURL(blob);
		});
	}
	checksubmit() {
		if (this.carePlanTemplateName) {
			this.openundersatand();
		}
	}
	@wire(GET_ALLERGYINTOLERANCE_DATA, {
		symptomTrackerId: "$lastsymptomid"
	})
	wiredAllergyIntoleranceData({
		error,
		data
	}) {
		if (data && data !== null) {
			try {
				this.isPopupOpenDisable = false;
				this.whichSymptom = data;
				// ... (Previous code)
				data.forEach(record => {
					// Access values of each record
					this.intensity = record.BI_PSP_Intensity__c;
					this.carePlanTemplateName = record?.BI_PSP_Symptoms__r?.HealthCloudGA__CarePlanTemplate__r?.Name;

					// Compare with the string 'Itchiness'
					if (this.carePlanTemplateName === label.ITCHINESS_VALUES) {
						this.itchinessChange = true;
						this.itchinessChange1 = true;
						// As these are css class names, we haven't used custom label for this scenario
						this.accordColorSymptom = "card-header-accord";
					}
					if (this.carePlanTemplateName === label.REDNESS_VALUE) {
						this.rednessChange = true;
						// As these are css class names, we haven't used custom label for this scenario
						this.accordColorSymptom = "card-header-accord";
						this.itchinessChange1 = true;
					}
					if (this.carePlanTemplateName === label.PAIN_VALUES) {
						this.painChange = true;
						// As these are css class names, we haven't used custom label for this scenario
						this.accordColorSymptom = "card-header-accord";
						this.itchinessChange1 = true;
					}
					if (this.carePlanTemplateName === label.PUSTULES_VALUE) {
						this.pustlesChange = true;
						this.itchinessChange1 = true;
						// As these are css class names, we haven't used custom label for this scenario
						this.accordColorSymptom = "card-header-accord";
					}
					if (this.carePlanTemplateName === label.FATIGUE_VALUES) {
						this.fatiquesChange = true;
						this.itchinessChange1 = true;
						// As these are css class names, we haven't used custom label for this scenario
						this.accordColorSymptom = "card-header-accord";
					}
					if (this.carePlanTemplateName === label.TEMPERATURE_VALUES) {
						this.itchinessChange1 = true;
						this.temperatureChange = true;
						// As these are css class names, we haven't used custom label for this scenario
						this.accordColorSymptom = "card-header-accord";
					}
					if (this.carePlanTemplateName === label.MOOD_IMG) {

						this.itchinessChange1 = true;
						this.moodChange = true;
						// As these are css class names, we haven't used custom label for this scenario
						this.accordColorSymptom = "card-header-accord";
					}
				});

				// ... (Rest of the code)
			}
			catch (err) {

				this.showToast(label.ERROR_MESSAGE, err.message, label.ERROR_VARIANT);
			}
		}
		else if (error) {

			this.showToast(label.ERROR_MESSAGE, error.body.message, label.ERROR_VARIANT);
		}
	}
	// showToast used for all the error messages caught
	showToast(title, message, variant) {
		if (typeof window !== "undefined") {
			const event = new ShowToastEvent({
				title: title,
				message: message,
				variant: variant
			});
			this.dispatchEvent(event);
		}
	}
	lastModifiedDate;
	@wire(GET_SYMPTOM_TRACKER_DETAILS, {
		careProgramEnrolleeId: "$accountId"
	})
	wiredResult({
		data,
		error
	}) {
		try {
			if (data) {
				this.lastModifiedDate = data.lastModifiedDate;
				this.lastModifiedTime = data.lasttime;
				let newdate3 = this.lastModifiedTime.split(", ");
				const dateTime = new Date(newdate3);
				// Get the hours, minutes, and seconds from the Date object
				const hours = dateTime.getHours();
				const minutes = dateTime.getMinutes();
				const seconds = dateTime.getSeconds();
				// Format the time in HH:mm:ss format (24-hour format)
				const formattedTime = `${hours.toString().padStart(2, "0")}:${minutes.toString().padStart(2, "0")}:${seconds.toString().padStart(2, "0")}`;
				this.lastModifi = true;
				// Get the current date and time
				let date = new Date(this.lastModifiedDate);
				let options = {
					month: "2-digit",
					day: "2-digit",
					hour: "numeric",
					minute: "numeric",
					hour12: true
				};
				let formattedDate = date.toLocaleString(undefined, options);
				let newdate = formattedDate.split(", ");
				this.formattedLastModifiedDate = `${newdate[0]} at ${formattedTime}`;
				// Log the extracted time
			}
			else if (error) {
				this.err(label.ERROR_MESSAGE, error.body.message, label.ERROR_VARIANT);
			}
		}
		catch (err) {
			this.error("An error occurred:", err);
		}
	}
}