const mongoose = require("mongoose"),
    Schema = mongoose.Schema;
const Users = new Schema(
    {
        id_number: Number,
        password: String,
        organization_id: mongoose.ObjectId,
        group_ids: Array,
        parent_id: mongoose.ObjectId,
        first_name: String,
        parent_name: String,
        email: String,
        rule_ids: Array,
        birth_day: Date,
        gender: Boolean,
        phone: String,
    },
    { timestamps: true, collection: "Users" }
);

module.exports = mongoose.model("Users", Users);
