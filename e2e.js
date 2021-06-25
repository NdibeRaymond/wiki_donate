
import { Selector } from 'testcafe';

fixture('On Page Load')
  .page('http://localhost:3000');

test('On Page Load', async (t) => {
  const title = await Selector('h1');
  const submitButton = await Selector('#submit');
  await t.expect(title.innerText).eql('Donate To Our Mission!');
  await t.expect(submitButton.innerText).eql('Submit');
});



test('On fill and submit form', async (t) => {
    const countrySelect = Selector('#country');
    const countryOption = countrySelect.find('option');

    const contactBySelect = Selector("preferred_form_of_contact")
    const contactByOption = contactBySelect.find("option");

    const currencySelect = Selector("preferred_form_of_payment");
    const currencyOption = currencySelect.find("option");

    const frequencySelect = Selector("frequency_of_donation");
    const frequencyOption = frequencySelect.find("option");

    await t
    .typeText('input[name="first_name"]', 'Test Firstname')
    .typeText('input[name="last_name"]', 'Test Lastname')
    .typeText('input[name="stree_address"]', 'Test Street Address')
    .typeText('input[name="city"]', 'Test City')
    .typeText('input[name="state"]', 'Test State')
    .click(countrySelect)
    .click(countryOption.withText("Nigeria"))
    .typeText('input[name="postal_code"]', '111 111')
    .typeText('input[name="phone_number"]', '+2345667784333')
    .typeText('input[name="email"]', 'test@gmail.com')
    .click(contactBySelect)
    .click(contactByOption.withText("Email"))
    .click(currencySelect)
    .click(currencyOption.withText("EUR"))
    .click(frequencySelect)
    .click(frequencyOption.withText("Monthly"))
    .typeText('input[name="amount_of_donation"]', '1000')
    .typeText('input[name="comments"]', 'Test d sdks ldks ldks ldks ldksl dksl dklsdks')
    .click(Selector('button[id="submit"]'))
    .expect(Selector("#confirmation.hidden")).eql(null);
});


// var obj = { first_name:"jklklk klkl", last_name: "hkhjkjkjkgkjgkj", stree_address: "jk jh kjk hjgkuk jhkjkhjk",
//           city: "jlkjl ljkhkjhjkhk", state: "jlkjlkjl klk", country:"jlklkjlk lkhgukj", 
//           postal_code: "767 797", phone_number: "+2349035234033", email: "jkjh jkjlkjh kjkhj", 
//           preferred_form_of_contact: "phone", preferred_form_of_payment: "jlkl kljk lkjlk",
//           frequency_of_donation: "lkjlk lkjk lk", amount_of_donation: 5, comments: "lliuuio uiututuytu yuytuyturu"}


// test('New_Todo_Second_Method', async (t) => {
//     await t
//     .click(Selector('body > div > div.row.area > div.col-md-8 > div > a'))
//     // test that new route is /new
//     .expect(getLocation()).match(/.*\/new*/)
//     // fill form on the new page
//     await t
//     .typeText(Selector('body > div > div > div.col-md-8 > div > form > div:nth-child(1) > input'), 
//     'Eat Food', { replace: true })
//     .typeText(Selector('body > div > div > div.col-md-8 > div > form > div:nth-child(2) > input'), 
//     '3pm', { replace: true })
//     .click(Selector('body > div > div > div.col-md-8 > div > form > button'))
//     // expect the action to direct back to the home route
//     .expect(getLocation()).match(/.*\/*/)
// });