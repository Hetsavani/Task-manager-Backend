const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const work = require("./work.js");
const cors = require('cors');

mongoose
  .connect(
    "mongodb+srv://het07savani:het7102004@cluster0.qcip5sp.mongodb.net/",
    { useNewUrlParser: true }
  )
  .then(() => {
    const app = express();
    app.use(bodyParser.urlencoded({ extended: true }));
    app.use(bodyParser.json());
    app.use(cors());
    app.get("/pending", async (req, res) => {
      const Work = await work.find({isPending: true});
      console.log(Work);
      res.send(Work);
    })
    app.get("/completed", async (req, res) => {
      const Work = await work.find({isPending: false});
      // console.log(Work);
      res.send(Work);
    })
    app.get("/:id", async (req, res) => {
      console.log(req.params.id);
      const tempWork = await work.findById(req.params.id);
      console.log(tempWork);
      res.send(tempWork);
    });
    app.get("/", async (req, res) => {
      // console.log(req.params.id);
      const Work = await work.find();
      // console.log(Work);
      res.send(Work);
    });
    app.put("/:id", async (req, res) => {
      const tempWork = await work.findById(req.params.id);
      tempWork.workId = req.body.workId;
      tempWork.workName = req.body.workName;
      tempWork.details = req.body.details;
      tempWork.isPending = req.body.isPending;
      await tempWork.save();
      res.send(tempWork)
    })
    app.post("/", async (req, res) => {
      // console.log(req.body.workId);
      // console.log(req.body.workName);
      // console.log(req.details);

      const nwork = new work({
        workId: req.body.workId,
        workName: req.body.workName,
        details: req.body.details,
        isPending:true,
        AddingDate:Date(),
        CompletionDate:req.body.CompletionDate
      });
      // console.log(nwork);
      await nwork.save();
      res.send(nwork);
    });
    app.delete("/:id", async (req, res) => {
      try {
          // const deletedWork = await work.findOneAndDelete({ workId: req.params.id });
          const deletedWork = await work.findByIdAndDelete(req.params.id);
          if (!deletedWork) {
              console.log(`No document found with ID: ${req.params.id}`);
              return res.status(404).send("Not Found");
          }

          console.log(`Deleted document with ID: ${req.params.id}`);
          res.send(deletedWork);
      } catch (error) {
          console.error("Error deleting data:", error);
          res.status(500).send("Internal Server Error");
      }
  });

    app.listen(3000, () => {
      console.log("listening on");
    });
  });
