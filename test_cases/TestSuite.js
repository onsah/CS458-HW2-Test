const expect = require('chai').expect;

function testSuite({
    NAME_EDIT,
    SURNAME_EDIT,
    GENDER_PICKER,
    GENDER_MALE,
    CALENDAR_BUTTON,
    CALENDAR_3_MARCH,
    CALENDAR_27_MARCH,
    CALENDAR_OK,
    CALENDAR_CANCEL,
    CALENDAR_TEXT,
    CITY_PICKER,
    CITY_ANKARA,
    VACCINE_PICKER,
    VACCINE_ASTRA,
    VACCINE_OTHER,
    VACCINE_OTHER_EDIT,
    SIDE_EFFECT,
    SEND_SURVEY,
    SEND_SURVEY_WHEN_OTHER_IS_OPEN,
}) {
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
            await vaccineOtherEdit.setValue("Chinese vaccine");

            const result = await didSubmit(true);

            expect(result).to.be.true;
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

    async function didSubmit(isOtherOpen = false) {
        const sendSurvey = await $(isOtherOpen ? SEND_SURVEY_WHEN_OTHER_IS_OPEN : SEND_SURVEY);
        await sendSurvey.click();

        const name = await $(NAME_EDIT);

        const text = await name.getText(); 
        return text === "Name";
    }

    function sleep(ms) {
        return new Promise(resolve => setTimeout(resolve, ms));
    }
}

module.exports = { testSuite };