const express = require("express");
const newReg = require("../models/newReg");
const mongoose = require("mongoose");
const events = require("../models/events");
const routeruser = express.Router();

routeruser.post("/api/regforevent", async (req, res) => {
  try {
    const {
      userId,
      gname,
      name,
      tnartist,
      eventId,
      TOP,
      FOICD,
      DOA,
      gphoto,
      img,
      adhar,
      sign,
      govpho,
      link,
    } = req.body;

    console.log(govpho);

    const event = await events.findById(eventId);
    const eventName = event.name;
    const dt = new Date();
    const applyDay = dt.getDate().toString();
    const applyMonth = (dt.getMonth() + 1).toString();
    const applyYear = dt.getUTCFullYear().toString();
    const fulltime = Date.now().toString();
    const regform = await newReg.create({
      userId,
      gname,
      name,
      tnartist,
      eventId,
      eventName,
      TOP,
      FOICD,
      DOA,
      applyDay,
      applyMonth,
      applyYear,
      fulltime,
      gphoto,
      img,
      adhar,
      smcl: false,
      smcom: false,
      sign,
      govpho,
      vlink: link,
      PEON: "Pending",
      officer: "Pending",
      commisioner: "Pending",
      isCardAlloted: false,
    });
    if (regform) {
      res.json({ status: "ok" });
    } else {
      res.json({ status: "server error..." });
    }
  } catch (error) {
    res.json({ status: "error" });
  }
});

routeruser.get("/api/clerklevel/:id", async (req, res) => {
  const { id } = req.params;

  const data = await newReg.find({ _id: id });

  if (!data) {
    res.status(201).json("id is not exist");
  }

  try {
    const update = await newReg.findByIdAndUpdate(
      { _id: id },
      { smcl: "true" }
    );

    res.json(update);
  } catch (error) {
    res.status(404).json({ error: error.message });
  }
});
routeruser.get("/api/comlevel/:id", async (req, res) => {
  const { id } = req.params;

  const data = await newReg.find({ _id: id });

  if (!data) {
    res.status(201).json("id is not exist");
  }

  try {
    const update = await newReg.findByIdAndUpdate(
      { _id: id },
      { smcom: "true" }
    );

    res.json(update);
  } catch (error) {
    res.status(404).json({ error: error.message });
  }
});

routeruser.get("/api/level/:rid", async (req, res) => {
  try {
    const { level } = await newReg
      .findById(req.params.rid)
      .select("level -_id");
    res.json({ status: "ok", level });
  } catch (er) {
    res.json({ status: "error" });
  }
});

routeruser.get("/api/updatelevel/:rid/:level", async (req, res) => {
  try {
    const { rid, level } = req.params;
    const dt = await newReg.findById(rid);
    const lev = dt.level;
    if (lev == level - 1) {
      const dt = await newReg.findByIdAndUpdate(rid, { level: level });
      res.json({ status: "ok" });
    } else {
      res.json({ status: "Invalid data" });
    }
  } catch (error) {
    res.json({ status: "ok" });
  }
});

routeruser.get("/api/getuser", async (req, res) => {
  try {
    const getuser = await newReg.find();
    res.status(200).json({ status: "ok", getuser });
  } catch (error) {
    res.status(401).json({ status: 401, error });
  }
});

routeruser.get("/count/all/clerk", async (req, res) => {
  try {
    const count = await newReg.countDocuments();
    res.json({ count });
  } catch (error) {
    res.json({ count: 0 });
  }
});
routeruser.get("/count/approved/clerk", async (req, res) => {
  try {
    const count = await newReg.countDocuments({ PEON: "Approved" });
    res.json({ count });
  } catch (error) {
    res.json({ count: 0 });
  }
});
routeruser.get("/count/pending/clerk", async (req, res) => {
  try {
    const count = await newReg.countDocuments({ PEON: "Pending" });
    res.json({ count });
  } catch (error) {
    res.json({ count: 0 });
  }
});

routeruser.get("/count/all/dydo", async (req, res) => {
  try {
    const count = await newReg.find({ PEON: "Approved" }).count();
    res.json({ count });
  } catch (error) {
    res.json({ count: 0 });
  }
});
routeruser.get("/count/approved/dydo", async (req, res) => {
  try {
    const count = await newReg.countDocuments({
      PEON: "Approved",
      officer: "Approved",
    });
    res.json({ count });
  } catch (error) {
    res.json({ count: 0 });
  }
});
routeruser.get("/count/pending/dydo", async (req, res) => {
  try {
    const count = await newReg.countDocuments({
      PEON: "Approved",
      officer: "Pending",
    });
    res.json({ count });
  } catch (error) {
    res.json({ count: 0 });
  }
});

routeruser.get("/count/all/commisioner", async (req, res) => {
  try {
    const count = await newReg.find({ officer: "Approved" }).count();
    res.json({ count });
  } catch (error) {
    res.json({ count: 0 });
  }
});
routeruser.get("/count/approved/commisioner", async (req, res) => {
  try {
    const count = await newReg.countDocuments({
      officer: "Approved",
      commisioner: "Approved",
    });
    res.json({ count });
  } catch (error) {
    res.json({ count: 0 });
  }
});
routeruser.get("/count/pending/commisioner", async (req, res) => {
  try {
    const count = await newReg.countDocuments({
      officer: "Approved",
      commisioner: "Pending",
    });
    res.json({ count });
  } catch (error) {
    res.json({ count: 0 });
  }
});

// FOR CLERK/PEON
routeruser.get("/get/clerk/:start/:ps", async (req, res) => {
  try {
    const { start, ps } = req.params;
    const admindata = await newReg.find().skip(start).limit(ps);
    // const admindata =await newReg.find();
    res.status(200).json({ admindata });
  } catch (error) {
    res.status(500).json({ status: 500, error: error.message });
  }
});
routeruser.get("/get/approved/clerk/:start/:ps", async (req, res) => {
  try {
    const { start, ps } = req.params;
    const admindata = await newReg
      .find({ PEON: "Approved" })
      .skip(start)
      .limit(ps);
    // const admindata =await newReg.find();
    res.status(200).json({ admindata });
  } catch (error) {
    res.status(500).json({ status: 500, error: error.message });
  }
});
routeruser.get("/get/pending/clerk/:start/:ps", async (req, res) => {
  try {
    const { start, ps } = req.params;
    const admindata = await newReg
      .find({ PEON: "Pending" })
      .skip(start)
      .limit(ps);
    // const admindata =await newReg.find();
    res.status(200).json({ admindata });
  } catch (error) {
    res.status(500).json({ status: 500, error: error.message });
  }
});
routeruser.get("/get/clerk/:keyword", async (req, res) => {
  try {
    const { keyword } = req.params;
    const admindata = await newReg.find({
      $or: [{ eventName: new RegExp(keyword) }, { gname: new RegExp(keyword) }],
    });
    res.status(200).json({ admindata });
  } catch (error) {
    res.status(500).json({ status: 500, error: error.message });
  }
});
routeruser.post("/date/clerk", async (req, res) => {
  try {
    const { dt } = req.body;
    // 2023-01-17
    const date = dt.split("-");
    const admindata = await newReg.find({
      applyDay: parseInt(date[2]).toString(),
      applyMonth: parseInt(date[1]).toString(),
      applyYear: parseInt(date[0]).toString(),
    });

    res.status(200).json({ admindata });
  } catch (error) {
    res.status(500).json({ status: 500, error: error.message });
  }
});
routeruser.get("/name/clerk/:start/:ps/", async (req, res) => {
  try {
    const { start, ps } = req.params;
    const admindata = await newReg
      .find()
      .sort({ gname: 1 })
      .skip(start)
      .limit(ps);
    res.status(200).json({ admindata });
  } catch (error) {
    res.status(500).json({ status: 500, error: error.message });
  }
});
routeruser.get("/time/clerk/:start/:ps", async (req, res) => {
  try {
    const { start, ps } = req.params;
    const admindata = await newReg
      .find()
      .sort({ fulltime: 1 })
      .skip(start)
      .limit(ps);
    res.status(200).json({ admindata });
  } catch (error) {
    res.status(500).json({ status: 500, error: error.message });
  }
});
routeruser.get("/timed/clerk/:start/:ps", async (req, res) => {
  try {
    const { start, ps } = req.params;
    const admindata = await newReg
      .find()
      .sort({ fulltime: -1 })
      .skip(start)
      .limit(ps);
    res.status(200).json({ admindata });
  } catch (error) {
    res.status(500).json({ status: 500, error: error.message });
  }
});

// FOR DYDO/OFFICER
routeruser.get("/get/dydo/:start/:ps", async (req, res) => {
  try {
    const { start, ps } = req.params;
    const admindata = await newReg
      .find({ PEON: "Approved" })
      .skip(start)
      .limit(ps);
    res.status(200).json({ admindata });
  } catch (error) {
    res.status(500).json({ status: 500, error: error.message });
  }
});
routeruser.get("/get/approved/dydo/:start/:ps", async (req, res) => {
  try {
    const { start, ps } = req.params;
    const admindata = await newReg
      .find({ PEON: "Approved", officer: "Approved" })
      .skip(start)
      .limit(ps);
    res.status(200).json({ admindata });
  } catch (error) {
    res.status(500).json({ status: 500, error: error.message });
  }
});
routeruser.get("/get/pending/dydo/:start/:ps", async (req, res) => {
  try {
    const { start, ps } = req.params;
    const admindata = await newReg
      .find({ PEON: "Approved", officer: "Pending" })
      .skip(start)
      .limit(ps);
    res.status(200).json({ admindata });
  } catch (error) {
    res.status(500).json({ status: 500, error: error.message });
  }
});
routeruser.get("/get/dydo/:keyword", async (req, res) => {
  try {
    const { keyword } = req.params;
    const admindata = await newReg.find({
      $and: [
        { PEON: "Approved" },
        {
          $or: [
            { eventName: new RegExp(keyword) },
            { gname: new RegExp(keyword) },
          ],
        },
      ],
    });
    res.status(200).json({ admindata });
  } catch (error) {
    res.status(500).json({ status: 500, error: error.message });
  }
});
routeruser.post("/date/dydo", async (req, res) => {
  try {
    const { dt } = req.body;
    const admindata = await newReg.find({
      $and: [
        { PEON: "Approved" },
        {
          applyDay: parseInt(date[2]).toString(),
          applyMonth: parseInt(date[1]).toString(),
          applyYear: parseInt(date[0]).toString(),
        },
      ],
    });
    res.status(200).json({ admindata });
  } catch (error) {
    res.status(500).json({ status: 500, error: error.message });
  }
});
routeruser.get("/name/dydo/:start/:ps", async (req, res) => {
  try {
    const { start, ps } = req.params;
    const admindata = await newReg
      .find({ PEON: "Approved" })
      .sort({ gname: 1 })
      .skip(start)
      .limit(ps);
    res.status(200).json({ admindata });
  } catch (error) {
    res.status(500).json({ status: 500, error: error.message });
  }
});
routeruser.get("/time/dydo/:start/:ps", async (req, res) => {
  try {
    const { start, ps } = req.params;
    const admindata = await newReg
      .find({ PEON: "Approved" })
      .sort({ fulltime: 1 })
      .skip(start)
      .limit(ps);
    res.status(200).json({ admindata });
  } catch (error) {
    res.status(500).json({ status: 500, error: error.message });
  }
});
routeruser.get("/timed/dydo/:start/:ps", async (req, res) => {
  try {
    const { start, ps } = req.params;
    const admindata = await newReg
      .find({ PEON: "Approved" })
      .sort({ fulltime: -1 })
      .skip(start)
      .limit(ps);
    res.status(200).json({ admindata });
  } catch (error) {
    res.status(500).json({ status: 500, error: error.message });
  }
});

// FOR COMMISIONER
routeruser.get("/get/commisioner/:start/:ps", async (req, res) => {
  try {
    const { start, ps } = req.params;
    const admindata = await newReg
      .find({ officer: "Approved" })
      .skip(start)
      .limit(ps);
    res.status(200).json({ admindata });
  } catch (error) {
    res.status(500).json({ status: 500, error: error.message });
  }
});
routeruser.get("/get/approved/commisioner/:start/:ps", async (req, res) => {
  try {
    const { start, ps } = req.params;
    const admindata = await newReg
      .find({ officer: "Approved", commisioner: "Approved" })
      .skip(start)
      .limit(ps);
    res.status(200).json({ admindata });
  } catch (error) {
    res.status(500).json({ status: 500, error: error.message });
  }
});
routeruser.get("/get/pending/commisioner/:start/:ps", async (req, res) => {
  try {
    const { start, ps } = req.params;
    const admindata = await newReg
      .find({ officer: "Approved", commisioner: "Pending" })
      .skip(start)
      .limit(ps);
    res.status(200).json({ admindata });
  } catch (error) {
    res.status(500).json({ status: 500, error: error.message });
  }
});
routeruser.get("/get/commisioner/:keyword", async (req, res) => {
  try {
    const { keyword } = req.params;
    const admindata = await newReg.find({
      $and: [
        { officer: "Approved" },
        {
          $or: [
            { eventName: new RegExp(keyword) },
            { gname: new RegExp(keyword) },
          ],
        },
      ],
    });
    res.status(200).json({ admindata });
  } catch (error) {
    res.status(500).json({ status: 500, error: error.message });
  }
});
routeruser.post("/date/commisioner", async (req, res) => {
  try {
    const { dt } = req.body;
    const admindata = await newReg.find({
      $and: [
        { officer: "Approved" },
        {
          applyDay: parseInt(date[2]).toString(),
          applyMonth: parseInt(date[1]).toString(),
          applyYear: parseInt(date[0]).toString(),
        },
      ],
    });
    res.status(200).json({ admindata });
  } catch (error) {
    res.status(500).json({ status: 500, error: error.message });
  }
});
routeruser.get("/name/commisioner/:start/:ps", async (req, res) => {
  try {
    const { start, ps } = req.params;
    const admindata = await newReg
      .find({ officer: "Approved" })
      .sort({ gname: 1 })
      .skip(start)
      .limit(ps);
    res.status(200).json({ admindata });
  } catch (error) {
    res.status(500).json({ status: 500, error: error.message });
  }
});
routeruser.get("/time/commisioner/:start/:ps", async (req, res) => {
  try {
    const { start, ps } = req.params;
    const admindata = await newReg
      .find({ officer: "Approved" })
      .sort({ fulltime: 1 })
      .skip(start)
      .limit(ps);
    res.status(200).json({ admindata });
  } catch (error) {
    res.status(500).json({ status: 500, error: error.message });
  }
});
routeruser.get("/timed/commisioner/:start/:ps", async (req, res) => {
  try {
    const { start, ps } = req.params;
    const admindata = await newReg
      .find({ officer: "Approved" })
      .sort({ fulltime: -1 })
      .skip(start)
      .limit(ps);
    res.status(200).json({ admindata });
  } catch (error) {
    res.status(500).json({ status: 500, error: error.message });
  }
});

routeruser.get("/api/getuser/:id", async (req, res) => {
  const { id } = req.params;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    res.status(404).json({ msg: "error id is not a valid" });
  }

  try {
    const getdec = await newReg.findById(id);
    res.status(200).json(getdec);
  } catch (error) {
    res.status(404).json({ msg: "error in that" });
  }
});

routeruser.get("/api/approve/clerk/:id", async (req, res) => {
  const { id } = req.params;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    res.status(404).json({ msg: "id is not valid" });
  }

  try {
    const updateworkout = await newReg.findByIdAndUpdate(id, {
      PEON: "Approved",
    });

    if (!updateworkout) {
      res.status(404).json({ msg: "not updated" });
    }

    res.status(200).json({ status: "ok" });
  } catch (error) {
    res.status(404).json({ msg: "error in documents" });
  }
});
routeruser.get("/api/approve/dydo/:id", async (req, res) => {
  const { id } = req.params;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    res.status(404).json({ msg: "id is not valid" });
  }

  try {
    const updateworkout = await newReg.findByIdAndUpdate(id, {
      officer: "Approved",
    });

    if (!updateworkout) {
      res.status(404).json({ msg: "not updated" });
    }

    res.status(200).json({ status: "ok" });
  } catch (error) {
    res.status(404).json({ msg: "error in documents" });
  }
});
routeruser.get("/api/approve/commisioner/:id", async (req, res) => {
  const { id } = req.params;
  if (!mongoose.Types.ObjectId.isValid(id)) {
    res.status(404).json({ msg: "id is not valid" });
  }
  try {
    const updateworkout = await newReg.findByIdAndUpdate(id, {
      commisioner: "Approved",
    });

    if (!updateworkout) {
      res.status(404).json({ msg: "not updated" });
    }

    res.status(200).json({ status: "ok" });
  } catch (error) {
    res.status(404).json({ msg: "error in documents" });
  }
});

routeruser.get("/checkstatus/:id", async (req, res) => {
  const { id } = req.params;

  try {
    if (!mongoose.Types.ObjectId.isValid(id)) {
      returnres.status(404).json({ status: "invalid", msg: "id is not valid" });
    }

    const updateworkout = await newReg.findOne({
      _id: id,
      PEON: "Approved",
      officer: "Approved",
      commisioner: "Approved",
    });

    if (!updateworkout) {
      return res
        .status(201)
        .json({ status: "nfound", msg: "document not approved yet" });
    }

    res
      .status(200)
      .json({ status: "found", msg: "document approved successfully" });
  } catch (error) {
    res.status(404).json({ msg: "error in documents", error: error.me });
  }
});

module.exports = routeruser;
