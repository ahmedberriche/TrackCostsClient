const mongoose = require("mongoose");
const Cost = require("../models/cost");

exports.costs_get_all = (req, res, next) => {
  Cost.find()
    .select("CAC40 NASDAQ _id dateTime")
    .sort({ _id: -1 })
    .limit(20)
    .exec()
    .then((docs) => {
      const response = {
        count: docs.length,
        costs: docs.map((doc) => {
          return {
            CAC40: doc.CAC40,
            NASDAQ: doc.NASDAQ,
            dateTime: doc.dateTime,
            _id: doc._id,
          };
        }),
      };
      res.status(200).json(response);
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json({
        error: err,
      });
    });
};

exports.costs_create_cost = (req, res, next) => {
  const cost = new Cost({
    _id: new mongoose.Types.ObjectId(),
    CAC40: req.body.CAC40,
    NASDAQ: req.body.NASDAQ,
    dateTime: req.body.dateTime,
  });
  cost
    .save()
    .then((result) => {
      console.log(result);
      res.status(201).json({
        message: "Created cost successfully",
      });
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json({
        error: err,
      });
    });
};

exports.costs_get_cost = (req, res, next) => {
  const id = req.params.costId;
  Cost.findById(id)
    .select("_id dateTime NASDAQ CAC40")
    .exec()
    .then((doc) => {
      console.log("From database", doc);
      if (doc) {
        res.status(200).json({
          cost: doc,
        });
      } else {
        res
          .status(404)
          .json({ message: "No valid entry found for provided ID" });
      }
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json({ error: err });
    });
};

exports.costs_update_cost = (req, res, next) => {
  const id = req.params.costId;

  Cost.update(
    { _id: id },
    {
      $set: {
        ...req.body,
      },
    }
  )
    .exec()
    .then((result) => {
      res.status(200).json({
        message: "Cost updated",
      });
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json({
        error: err,
      });
    });
};
