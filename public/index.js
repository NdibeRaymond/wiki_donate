(function () {

  const constructConfirmationSection = async (data) => {
    const confirmation = document.querySelector("#confirmation");
    confirmation.innerHTML = "";

    const h1 = document.createElement("h1");
    h1.classList.add("confirmation-title");
    h1.innerText = "Donation Confirmation"

    const confirmationSummary = document.createElement("div");
    confirmationSummary.classList.add("confirmation-summary");
    confirmationSummary.appendChild(h1);

    const totalYearlyDonation = document.createElement("h2");
    totalYearlyDonation.classList.add("total-yearly-donation");

    const confirmButton = document.createElement("button");
    confirmButton.classList.add("confirm");

    const cancelButton = document.createElement("button");
    cancelButton.classList.add("cancel");

    const editButton = document.createElement("button");
    editButton.classList.add("edit");

    const buttonContainer = document.createElement("div");
    buttonContainer.classList.add("button-container")
    buttonContainer.appendChild(confirmButton);
    buttonContainer.appendChild(cancelButton);
    buttonContainer.appendChild(editButton);

    const container = document.createElement("div");
    container.classList.add("container");
    container.appendChild(totalYearlyDonation);
    container.appendChild(buttonContainer);

    confirmButton.innerText = "Confirm";
    cancelButton.innerText = "Cancel";
    editButton.innerText = "Edit Form"

    Object.keys(data).map(key => {
      const h3 = document.createElement("h3");
      h3.innerText = `${key}: ${data[key]}`;
      confirmationSummary.appendChild(h3);
    });

    const donation_value = data["amount_of_donation"];
    let frequency = data["frequency_of_donation"];
    let currency = data["preferred_form_of_payment"];

    frequency = frequency === "Monthly" ? 12 * Number(donation_value) : Number(donation_value);

    if (currency === "USD") {
      totalYearlyDonation.innerText = `Your total projected donation for 1 year is ${currency} ${frequency}`;
    } else {
      currency = currency === "Euro" ? "EUR" : "BTC";
      const dksldk = "78fdc809f39e46db85a9b905e5957a56";
      const url = `https://api.currencyfreaks.com/latest?apikey=${dksldk}&symbols=${currency}`;
      const { rates } = await fetch(url).then(res => res.json());

      totalYearlyDonation.innerText = `Your total projected donation for 1 year is ${currency} ${frequency} ($ ${frequency / Number(rates[currency])})`;
    }

    confirmButton.addEventListener("click", async function confirm(e) {
      const res = await fetch(`${window.location.origin}/create_donation`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
      }).then(res => res.json());

      if (res.insertId) {
        confirmation.classList.add("hidden");
        document.querySelector("#thanks").classList.remove("hidden");
        confirmButton.removeEventListener("click", confirm);
      }
    });

    cancelButton.addEventListener("click", function cancel(e) {
      confirmation.classList.add("hidden");
      document.querySelector("#sorry").classList.remove("hidden");
      cancelButton.removeEventListener("click", cancel);
    });

    editButton.addEventListener("click", function edit(e) {
      confirmation.classList.add("hidden");
      document.querySelector("#form").classList.remove("hidden");
      editButton.removeEventListener("click", edit);
      initForm();
    });

    confirmation.appendChild(confirmationSummary);
    confirmation.appendChild(container);
  }



  function initForm() {
    const countries = ["", "Afghanistan", "Albania", "Algeria", "Andorra", "Angola", "Antigua & Deps", "Argentina",
      "Armenia", "Australia", "Austria", "Azerbaijan", "Bahamas", "Bahrain", "Bangladesh",
      "Barbados", "Belarus", "Belgium", "Belize", "Benin", "Bhutan", "Bolivia",
      "Bosnia Herzegovina", "Botswana", "Brazil", "Brunei", "Bulgaria", "Burkina", "Burundi",
      "Cambodia", "Cameroon", "Canada", "Cape Verde", "Central African Rep", "Chad", "Chile",
      "China", "Colombia", "Comoros", "Congo", "Congo {Democratic Rep}", "Costa Rica", "Croatia",
      "Cuba", "Cyprus", "Czech Republic", "Denmark", "Djibouti", "Dominica", "Dominican Republic",
      "East Timor", "Ecuador", "Egypt", "El Salvador", "Equatorial Guinea", "Eritrea", "Estonia",
      "Ethiopia", "Fiji", "Finland", "France", "Gabon", "Gambia", "Georgia", "Germany", "Ghana",
      "Greece", "Grenada", "Guatemala", "Guinea", "Guinea-Bissau", "Guyana", "Haiti", "Honduras",
      "Hungary", "Iceland", "India", "Indonesia", "Iran", "Iraq", "Ireland {Republic}", "Israel",
      "Italy", "Ivory Coast", "Jamaica", "Japan", "Jordan", "Kazakhstan", "Kenya", "Kiribati",
      "Korea North", "Korea South", "Kosovo", "Kuwait", "Kyrgyzstan", "Laos", "Latvia",
      "Lebanon", "Lesotho", "Liberia", "Libya", "Liechtenstein", "Lithuania", "Luxembourg",
      "Macedonia", "Madagascar", "Malawi", "Malaysia", "Maldives", "Mali", "Malta", "Marshall Islands",
      "Mauritania", "Mauritius", "Mexico", "Micronesia", "Moldova", "Monaco", "Mongolia",
      "Montenegro", "Morocco", "Mozambique", "Myanmar, {Burma}", "Namibia", "Nauru", "Nepal",
      "Netherlands", "New Zealand", "Nicaragua", "Niger", "Nigeria", "Norway", "Oman", "Pakistan",
      "Palau", "Panama", "Papua New Guinea", "Paraguay", "Peru", "Philippines", "Poland", "Portugal",
      "Qatar", "Romania", "Russian Federation", "Rwanda", "St Kitts & Nevis", "St Lucia",
      "Saint Vincent & the Grenadines", "Samoa", "San Marino", "Sao Tome & Principe",
      "Saudi Arabia", "Senegal", "Serbia", "Seychelles", "Sierra Leone", "Singapore", "Slovakia",
      "Slovenia", "Solomon Islands", "Somalia", "South Africa", "South Sudan", "Spain", "Sri Lanka",
      "Sudan", "Suriname", "Swaziland", "Sweden", "Switzerland", "Syria", "Taiwan", "Tajikistan",
      "Tanzania", "Thailand", "Togo", "Tonga", "Trinidad & Tobago", "Tunisia", "Turkey",
      "Turkmenistan", "Tuvalu", "Uganda", "Ukraine", "United Arab Emirates", "United Kingdom",
      "United States", "Uruguay", "Uzbekistan", "Vanuatu", "Vatican City", "Venezuela", "Vietnam",
      "Yemen", "Zambia", "Zimbabwe"];

    const country_selector = document.querySelector("#country");

    countries.forEach(country => {
      const option = document.createElement("option");
      option.innerText = country ? country : "----";
      option.value = country;
      country_selector.appendChild(option);
    })

    document.querySelector("#submit").addEventListener("click", function submit(e) {
      e.preventDefault();
      const form = document.querySelector("#form");
      const form_data = {};

      if (form.reportValidity() && country_selector.value) {
        form_data["first_name"] = form.querySelector("#first_name").value;
        form_data["last_name"] = form.querySelector("#last_name").value;
        form_data["street_address"] = form.querySelector("#street_address").value;
        form_data["city"] = form.querySelector("#city").value;
        form_data["state"] = form.querySelector("#state").value;
        form_data["country"] = form.querySelector("#country").value;
        form_data["postal_code"] = form.querySelector("#postal_code").value;
        form_data["phone_number"] = form.querySelector("#phone_number").value;
        form_data["email"] = form.querySelector("#email").value;
        form_data["preferred_form_of_contact"] = form.querySelector("#preferred_form_of_contact").value;
        form_data["preferred_form_of_payment"] = form.querySelector("#preferred_form_of_payment").value;
        form_data["frequency_of_donation"] = form.querySelector("#frequency_of_donation").value;
        form_data["amount_of_donation"] = form.querySelector("#amount_of_donation").value;
        form_data["comments"] = form.querySelector("#comments").value;

        constructConfirmationSection(form_data);
        form.classList.add("hidden");
        document.querySelector("#confirmation").classList.remove("hidden");
        document.querySelector("#submit").removeEventListener("click", submit);
      }
    })
  }

  window.addEventListener('DOMContentLoaded', (event) => {
    initForm();
  });

}())