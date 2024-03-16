"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const dogListingController_1 = require("../controllers/dogListingController");
const router = (0, express_1.Router)();
router.get('/', dogListingController_1.getAllDogs);
exports.default = router;
