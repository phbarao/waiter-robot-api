"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const OrderSchema = new mongoose_1.Schema({
    name: {
        type: String,
        required: true,
    },
    amount: {
        type: Number,
        required: true,
    },
    item: {
        type: String,
        required: true,
    },
    observation: {
        type: String,
        required: false,
    },
}, {
    timestamps: true,
});
exports.default = (0, mongoose_1.model)('Order', OrderSchema);
//# sourceMappingURL=Order.js.map