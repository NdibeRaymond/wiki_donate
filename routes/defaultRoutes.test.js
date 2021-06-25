const app = require("../server");
const supertest = require("supertest");
const database = require("../databaseAPI");


describe('on page load', ()=>{
    test("GET /", async () => {

        await supertest(app).get("/")
          .expect(200)
          .then(res=>{
              return res.text;
            })
          .then(text => {
           res_text = text;
           expect(text.includes('id="form"')).toBeTruthy();
          });
      });
})


describe('creating new donations', () => {

    let new_donation;

    test("GET /create_donation", async () => {

        const donation = { first_name:"jklklk klkl", last_name: "hkhjkjkjkgkjgkj", stree_address: "jk jh kjk hjgkuk jhkjkhjk",
                city: "jlkjl ljkhkjhjkhk", state: "jlkjlkjl klk", country:"jlklkjlk lkhgukj", 
                postal_code: "343 433", phone_number: "+2349035234033", email: "test1@gmail.com", 
                preferred_form_of_contact: "phone", preferred_form_of_payment: "jlkl kljk lkjlk",
                frequency_of_donation: "lkjlk lkjk lk", amount_of_donation: 1000, comments: "lliuuio uiututuytu yuytuyturu"}

        const json = await supertest(app).post("/create_donation")
                        .set('Content-type', 'application/json')
                        .send(donation)
                        .expect(201)
                        .then(res=> res.body);
        
        new_donation = json;

        expect(json.insertId).toBeTruthy();

        });


    afterEach(() => {
        database.deleteDonation(new_donation.insertId, (value)=>{
        })
    });

});