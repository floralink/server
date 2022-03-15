const startTime = Date.now();

import "dotenv/config";
import express from "express";
import cors from "cors";

// import Floralink and its plugins
// @ts-ignore
import * as floralink from "@floralink/core";
import {
  werbeo,
  germanslDB,
  ellenbergDB,
  rotelistemvDB,
  fukarekhenkerDB,
  // @ts-ignore
} from "@floralink/databases";

/**
 * INITIALIZATION
 */

function consoleLine() {
  console.log("------------------------------------------------------------");
}

consoleLine();
console.log("INFO: Server initializing...");
consoleLine();

// initialize taxon specific databases
floralink.initializeDatabase(germanslDB);
floralink.initializeDatabase(ellenbergDB);
floralink.initializeDatabase(rotelistemvDB);
floralink.initializeDatabase(fukarekhenkerDB);
floralink.initializeDatabase(werbeo);

// login deactivated (since superfluous)
// floralink.initializeDatabase(werbeo, {
//   email: process.env.WERBEO_EMAIL,
//   password: process.env.WERBEO_SECRET,
// });

// initalize Express.js and its middleware
var corsOptions = {
  origin: "*",
  methods: "GET,POST",
};

const app = express();
app.use(cors(corsOptions));
app.use(express.json());

// console logging middleware
app.use(function (req, res, next) {
  console.log(
    `CONNECTION: ${req.method} request at ${req.url} from ${req.get("origin")}`
  );
  next();
});

/**
 * ROUTES
 */

// server info (installed floralink plugins)
app.get("/info", (req, res) => {
  // todo: plugin info method on floralink core
  res.json({
    taxonReferencePlugins: [
      {
        id: "germansl",
        version: "1.5.1",
      },
    ],
    occurrenceDataPlugins: [
      {
        id: "werbeo",
        version: "",
      },
    ],
    taxonSpecificPlugins: [
      {
        id: "ellenberg",
        version: "1991-1",
      },
      {
        id: "fukarekhenker",
        version: "2006-1",
      },
      {
        id: "rotelistemv",
        version: "2005-1",
      },
    ],
  });
});

// get occurrence data by query from provider, minify to TaxonData
app.post("/occurrencedata", (req, res) => {
  (async () => {
    let query = req.body;
    let data = await floralink.getOccurrenceData(werbeo, query);
    res.json(data);
  })();
});

// get taxon reference data by taxonIdArray
app.post("/taxonreference", (req, res) => {
  (async () => {
    let { taxonIDs, taxonReferencePluginID } = req.body;
    let taxonReferenceData = floralink.getTaxonDataByIDs(
      taxonIDs,
      taxonReferencePluginID
    );
    res.json(taxonReferenceData);
  })();
});

// get taxon specific data by taxonIdArray
app.post("/taxonspecific", (req, res) => {
  (async () => {
    let { taxonIDs, taxonSpecificPluginID } = req.body;
    let taxonSpecificData = floralink.getTaxonDataByIDs(
      taxonIDs,
      taxonSpecificPluginID
    );
    res.json(taxonSpecificData);
  })();
});

/**
 * START
 */

// starting server
app.listen(process.env.PORT, () => {
  consoleLine();
  console.log(`Server ready in ${Date.now() - startTime} ms`);
  console.log(`Listening on port ${process.env.PORT}`);
  consoleLine();
});
