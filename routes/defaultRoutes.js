const { Router } = require("express");
const path = require("path");
const database = require("../databaseAPI");

const router = Router();


router.get("/donations/:id", (req, res)=>{
   database.getDonations(req.params.id, donations=>{
       res.status(200).send(donations);
   })
});

router.get("/donations", (req, res)=>{
   database.getDonations(null, donations=>{
        res.status(200).send(donations);
   });
});

router.get("/", (req, res)=>{
    res.status(200).sendFile(path.join(__dirname,'../public', '/index.html'));
});

router.get("/delete_donation/:id", (req, res)=>{
    database.deleteDonation(req.params.id, result=>{
        res.status(200).send(result);
    });
});

router.get("/delete_all_donations", (req, res)=>{
   database.deleteAllDonations(result=>{
       res.status(200).send(result);
   });
});

router.post("/create_donation", (req, res)=>{
  database.createDonation(req.body, (result)=>{
      res.status(201).send(result);
  })
});

module.exports = router;