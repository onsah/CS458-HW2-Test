var expect = require('chai').expect;

const NAME_EDIT = '//android.widget.EditText[@content-desc="name"]';
const SURNAME_EDIT = '//android.widget.EditText[@content-desc="surname"]';
const GENDER_PICKER = '//android.widget.Spinner[@content-desc="gender"]';
const GENDER_MALE = '/hierarchy/android.widget.FrameLayout/android.widget.FrameLayout/android.widget.ListView/android.widget.CheckedTextView[2]';
const CALENDAR_BUTTON = '//android.view.ViewGroup[@content-desc="birthday"]';
const CALENDAR_3_MARCH = '//android.view.View[@content-desc="03 March 2021"]';
const CALENDAR_27_MARCH = '//android.view.View[@content-desc="27 March 2021"]';
const CALENDAR_OK = '/hierarchy/android.widget.FrameLayout/android.widget.FrameLayout/android.widget.FrameLayout/android.widget.LinearLayout/android.widget.ScrollView/android.widget.LinearLayout/android.widget.Button[2]';
const CALENDAR_CANCEL = '/hierarchy/android.widget.FrameLayout/android.widget.FrameLayout/android.widget.FrameLayout/android.widget.LinearLayout/android.widget.ScrollView/android.widget.LinearLayout/android.widget.Button[1]';
const CALENDAR_TEXT = '//android.view.ViewGroup[@content-desc="birthday"]/android.widget.TextView';
const CITY_PICKER = '//android.widget.Spinner[@content-desc="city"]'; 
const CITY_ANKARA = '/hierarchy/android.widget.FrameLayout/android.widget.FrameLayout/android.widget.ListView/android.widget.CheckedTextView[7]';
const VACCINE_PICKER = '//android.widget.Spinner[@content-desc="vaccineType"]';
const VACCINE_ASTRA = '/hierarchy/android.widget.FrameLayout/android.widget.FrameLayout/android.widget.ListView/android.widget.CheckedTextView[5]';
const VACCINE_OTHER = '/hierarchy/android.widget.FrameLayout/android.widget.FrameLayout/android.widget.ListView/android.widget.CheckedTextView[10]';
const VACCINE_OTHER_EDIT = '//android.widget.EditText[@content-desc="otherVaccineType"]';
const SIDE_EFFECT = '//android.widget.EditText[@content-desc="sideEffect"]';
const SEND_SURVEY = '//android.view.ViewGroup[@content-desc="sendSurvey"]';

describe('Testing invalid input formats', () => {

  beforeEach(() => {
    $("/hierarchy/android.widget.FrameLayout/android.widget.LinearLayout").waitForDisplayed(11000, false)
  });

  it('should not submit when some fields are empty', async () => {
    const name = await $(NAME_EDIT);
    await name.setValue("Onur");
    
    const surname = await $(SURNAME_EDIT);
    await surname.setValue("");

    const sendSurvey = await $(SEND_SURVEY);
    await sendSurvey.click();
    
    expect(await didSubmit()).to.be.false;
    // expect(await name.getText()).to.equal("Onur");
  });

  it('should not submit when name contains only numbers', async () => {
    await fillAll();

    const name = await $(NAME_EDIT);
    await name.setValue("1234");

    const sendSurvey = await $(SEND_SURVEY);
    await sendSurvey.click();

    expect(await didSubmit()).to.be.false;
  });
});

describe("Form should submit when all fields are valid", () => {
  beforeEach(() => {
    $("/hierarchy/android.widget.FrameLayout/android.widget.LinearLayout").waitForDisplayed(11000, false)
  });

  it('should submit when all fields are filled', async () => {
    await fillAll();

    const sendSurvey = await $(SEND_SURVEY);
    await sendSurvey.click();

    expect(await didSubmit()).to.be.true;
    // expect(await name.getText()).to.equal("Name");
  });
});

describe("Datepicker must allow to pick valid dates", () => {

  async function matchesCalendarText(dateXPath, dateText) {
    await openCalendar();

    await (await $(dateXPath)).click();

    await closeCalendar();

    const calendarText = await $(CALENDAR_TEXT);
    
    return (await calendarText.getText()) === dateText;
  }

  it("should allow picking past dates", async () => {
    const matches = await matchesCalendarText(CALENDAR_3_MARCH, "03/03/21");

    expect(matches).to.be.true;
  });

  it("should not allow picking future dates", async () => {
    const matches = await matchesCalendarText(CALENDAR_27_MARCH, "03/27/21");

    expect(matches).to.be.false;
  });
})

describe("Users should be able to specify other vaccines", () => {

  it("should pass", async () => {
    await fillAll();

    const vaccinePicker = await $(VACCINE_PICKER);
    await vaccinePicker.click();

    const vaccineOther = await $(VACCINE_OTHER);
    await vaccineOther.click();

    const vaccineOtherEdit = await $(VACCINE_OTHER_EDIT);
    vaccineOtherEdit.setValue("Chinese vaccine");

    expect(await didSubmit()).to.be.true;
  });
});

async function openCalendar() {
  const calendar = await $(CALENDAR_BUTTON);
  await calendar.click();
}

async function closeCalendar() {
  const calendarOk = await $(CALENDAR_OK);
  await calendarOk.click();
}
 
async function fillAll() {
  const name = await $(NAME_EDIT);
  await name.setValue("Onur");

  const surname = await $(SURNAME_EDIT);
  await surname.setValue("Sahin");

  const genderPicker = await $(GENDER_PICKER);
  await genderPicker.click();

  const genderMale = await $(GENDER_MALE);
  await genderMale.click();

  await openCalendar();

  await (await $(CALENDAR_3_MARCH)).click();

  await closeCalendar();

  const cityPicker = await $(CITY_PICKER);
  await cityPicker.click();

  const ankara = await $(CITY_ANKARA);
  await ankara.click();

  const vaccinePicker = await $(VACCINE_PICKER);
  await vaccinePicker.click();
  
  const someVaccine = await $(VACCINE_ASTRA);
  await someVaccine.click();
}

async function didSubmit() {
  const name = await $(NAME_EDIT);

  const sendSurvey = await $(SEND_SURVEY);
  await sendSurvey.click();

  return (await name.getText()) === "Name";
}

function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}