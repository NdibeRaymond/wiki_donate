
import { Selector } from 'testcafe';
const database = require("./databaseAPI");

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

    const contactBySelect = Selector("#preferred_form_of_contact")
    const contactByOption = contactBySelect.find("option");

    const currencySelect = Selector("#preferred_form_of_payment");
    const currencyOption = currencySelect.find("option");

    const frequencySelect = Selector("#frequency_of_donation");
    const frequencyOption = frequencySelect.find("option");

    await t
        .typeText('input[name="first_name"]', 'Test Firstname')
        .typeText('input[name="last_name"]', 'Test Lastname')
        .typeText('input[name="street_address"]', 'Test Street Address')
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
        .click(currencyOption.withText("Euro"))
        .click(frequencySelect)
        .click(frequencyOption.withText("Monthly"))
        .typeText('input[name="amount_of_donation"]', '1000')
        .typeText('textarea[name="comments"]', 'Test d sdks ldks ldks ldks ldksl dksl dklsdks')
        .click(Selector('button[id="submit"]'))
        .expect(Selector("#confirmation.hidden").exists).eql(false)
        .expect(Selector("#form.hidden").exists).eql(true)
        .expect(Selector("#sorry.hidden").exists).eql(true)
        .expect(Selector("#thanks.hidden").exists).eql(true);

});




test('On fill , Submit and Edit', async (t) => {
    const countrySelect = Selector('#country');
    const countryOption = countrySelect.find('option');

    const contactBySelect = Selector("#preferred_form_of_contact")
    const contactByOption = contactBySelect.find("option");

    const currencySelect = Selector("#preferred_form_of_payment");
    const currencyOption = currencySelect.find("option");

    const frequencySelect = Selector("#frequency_of_donation");
    const frequencyOption = frequencySelect.find("option");

    await t
        .typeText('input[name="first_name"]', 'Test Firstname')
        .typeText('input[name="last_name"]', 'Test Lastname')
        .typeText('input[name="street_address"]', 'Test Street Address')
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
        .click(currencyOption.withText("Euro"))
        .click(frequencySelect)
        .click(frequencyOption.withText("Monthly"))
        .typeText('input[name="amount_of_donation"]', '1000')
        .typeText('textarea[name="comments"]', 'Test d sdks ldks ldks ldks ldksl dksl dklsdks')
        .click(Selector('button[id="submit"]'))
        .expect(Selector("#confirmation.hidden").exists).eql(false)
        .expect(Selector("#form.hidden").exists).eql(true)
        .expect(Selector("#sorry.hidden").exists).eql(true)
        .expect(Selector("#thanks.hidden").exists).eql(true);

    const confirmButton = Selector('.confirm');
    const editButton = Selector('.edit');
    const cancelButton = Selector('.cancel');

    await t.expect(confirmButton.exists).eql(true)
        .expect(editButton.exists).eql(true)
        .expect(cancelButton.exists).eql(true);

    await t.click(editButton)
        .expect(Selector('h1').innerText).eql('Donate To Our Mission!')
        .expect(Selector("#submit").innerText).eql('Submit')
        .expect(Selector('input[name="first_name"]').value).eql('Test Firstname')
        .expect(Selector('input[name="last_name"]').value).eql('Test Lastname')
        .expect(Selector('input[name="street_address"]').value).eql('Test Street Address')
        .expect(Selector("#confirmation.hidden").exists).eql(true)
        .expect(Selector("#form.hidden").exists).eql(false)
        .expect(Selector("#sorry.hidden").exists).eql(true)
        .expect(Selector("#thanks.hidden").exists).eql(true);


    database.getDonationsByFirstName('Test Firstname', async res => {
        await t.expect(res.length < 1).eql(false);
    })

});




test('On fill , Submit and Cancel', async (t) => {
    const countrySelect = Selector('#country');
    const countryOption = countrySelect.find('option');

    const contactBySelect = Selector("#preferred_form_of_contact")
    const contactByOption = contactBySelect.find("option");

    const currencySelect = Selector("#preferred_form_of_payment");
    const currencyOption = currencySelect.find("option");

    const frequencySelect = Selector("#frequency_of_donation");
    const frequencyOption = frequencySelect.find("option");

    await t
        .typeText('input[name="first_name"]', 'Test Firstname')
        .typeText('input[name="last_name"]', 'Test Lastname')
        .typeText('input[name="street_address"]', 'Test Street Address')
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
        .click(currencyOption.withText("Euro"))
        .click(frequencySelect)
        .click(frequencyOption.withText("Monthly"))
        .typeText('input[name="amount_of_donation"]', '1000')
        .typeText('textarea[name="comments"]', 'Test d sdks ldks ldks ldks ldksl dksl dklsdks')
        .click(Selector('button[id="submit"]'))
        .expect(Selector("#confirmation.hidden").exists).eql(false)
        .expect(Selector("#form.hidden").exists).eql(true)
        .expect(Selector("#sorry.hidden").exists).eql(true)
        .expect(Selector("#thanks.hidden").exists).eql(true)

    const confirmButton = Selector('.confirm');
    const editButton = Selector('.edit');
    const cancelButton = Selector('.cancel');

    await t.expect(confirmButton.exists).eql(true)
        .expect(editButton.exists).eql(true)
        .expect(cancelButton.exists).eql(true);

    await t.click(cancelButton)
        .expect(Selector("#sorry").exists).eql(true)
        .expect(Selector("#confirmation.hidden").exists).eql(true)
        .expect(Selector("#form.hidden").exists).eql(true)
        .expect(Selector("#sorry.hidden").exists).eql(false)
        .expect(Selector("#thanks.hidden").exists).eql(true)

    await t.click(Selector('a[href="/"]'))
        .expect(Selector('h1').innerText).eql('Donate To Our Mission!')
        .expect(Selector("#submit").innerText).eql('Submit')
        .expect(Selector('input[name="first_name"]').value).eql('')
        .expect(Selector('input[name="last_name"]').value).eql('')
        .expect(Selector('input[name="street_address"]').value).eql('')
        .expect(Selector("#confirmation.hidden").exists).eql(true)
        .expect(Selector("#form.hidden").exists).eql(false)
        .expect(Selector("#sorry.hidden").exists).eql(true)
        .expect(Selector("#thanks.hidden").exists).eql(true)


    database.getDonationsByFirstName('Test Firstname', async res => {
        await t.expect(res.length < 1).eql(true);
    })

});




test('On fill , Submit and Confirm', async (t) => {
    const countrySelect = Selector('#country');
    const countryOption = countrySelect.find('option');

    const contactBySelect = Selector("#preferred_form_of_contact")
    const contactByOption = contactBySelect.find("option");

    const currencySelect = Selector("#preferred_form_of_payment");
    const currencyOption = currencySelect.find("option");

    const frequencySelect = Selector("#frequency_of_donation");
    const frequencyOption = frequencySelect.find("option");

    await t
        .typeText('input[name="first_name"]', 'Test Firstname')
        .typeText('input[name="last_name"]', 'Test Lastname')
        .typeText('input[name="street_address"]', 'Test Street Address')
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
        .click(currencyOption.withText("Euro"))
        .click(frequencySelect)
        .click(frequencyOption.withText("Monthly"))
        .typeText('input[name="amount_of_donation"]', '1000')
        .typeText('textarea[name="comments"]', 'Test d sdks ldks ldks ldks ldksl dksl dklsdks')
        .click(Selector('button[id="submit"]'))
        .expect(Selector("#confirmation.hidden").exists).eql(false)
        .expect(Selector("#form.hidden").exists).eql(true)
        .expect(Selector("#sorry.hidden").exists).eql(true)
        .expect(Selector("#thanks.hidden").exists).eql(true)

    const confirmButton = Selector('.confirm');
    const editButton = Selector('.edit');
    const cancelButton = Selector('.cancel');

    await t.expect(confirmButton.exists).eql(true)
        .expect(editButton.exists).eql(true)
        .expect(cancelButton.exists).eql(true);

    await t.click(confirmButton)
        .expect(Selector("#thanks").exists).eql(true)
        .expect(Selector("#confirmation.hidden").exists).eql(true)
        .expect(Selector("#form.hidden").exists).eql(true)
        .expect(Selector("#sorry.hidden").exists).eql(true)
        .expect(Selector("#thanks.hidden").exists).eql(false)


    database.getDonationsByFirstName('Test Firstname', async res => {
        await t.expect(res.length < 1).eql(false);
    })

}).after(async t => {
    await database.deleteDonationsByFirstName('Test Firstname', res => {
    })
})