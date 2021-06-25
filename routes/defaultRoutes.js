const { Router } = require("express");
const path = require("path");
const database = require("../databaseAPI");

const router = Router();


router.get("/donations/:id", (req, res)=>{
   database.getDonations(req.params.id, donations=>{
       res.status(200).send(donations);
   })
});

router.get("/donations_by_firstname/:first_name", (req, res)=>{
    database.getDonationsByFirstName(req.params.first_name, donations=>{
        res.status(200).send(donations);
    });
 });

router.get("/donations", (_, res)=>{
   database.getDonations(null, donations=>{
        res.status(200).send(donations);
   });
});

router.get("/", (_, res)=>{
    res.status(200).sendFile(path.join(__dirname,'../public', '/index.html'));
});

router.get("/delete_donation/:id", (req, res)=>{
    database.deleteDonation(req.params.id, result=>{
        res.status(200).send(result);
    });
});

router.get("/delete_by_firstname/:first_name", (req, res)=>{
    database.deleteDonationsByFirstName(req.params.first_name, result=>{
        res.status(200).send(result);
    });
});

router.get("/delete_all_donations", (_, res)=>{
   database.deleteAllDonations(result=>{
       res.status(200).send(result);
   });
});

router.post("/create_donation", (req, res)=>{
  if(Object.keys(req.body).length < 1){
     req.status(400).send({"details": "request body is empty"});
  }else{
        database.createDonation(req.body, (result)=>{
            res.status(201).send(result);
        })
    }
});

module.exports = router;