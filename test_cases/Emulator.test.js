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

testSuite({
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
});