const mongoose = require("mongoose");
const userSchema = new mongoose.Schema({
  userType: {
    type: String,
    required: true,
    enum: ["donor", "organization", "hospital", "admin"],
  },
  //if usertype is donor ||admin
  name: {
    type: String,
    required: function () {
      if (this.userType == "admin" || this.userType == "donor") {
        return true;
      }
      return false;
    },
  },
  //is required if userType is hospitalName
  hospitalName: {
    type: String,
    required: function () {
      if (this.userType == "hospital") {
        return true;
      }
      return false;
    },
  },
  //is required if usertype is organization
  organizationName: {
    type: String,
    required: function () {
      if (this.userType == "organization") {
        return true;
      }
      return false;
    },
  },

  // for hosptal and organization
  website: {
    type: String,
    required: function () {
      if (this.userType == "organization" || this.userType == "hospital") {
        return true;
      }
      return false;
    },
  },

  // for hosptal and organization
  address: {
    type: String,
    required: function () {
      if (this.userType == "organization" || this.userType == "hospital") {
        return true;
      }
      return false;
    },
  },

  //common for all
  email: {
    type: String,
    required: true,
    unique: true,
  },
  //common for all
  password: {
    type: String,
    required: true,
  },
  //common for all
  phone: {
    type: String,
    requires: true,
  },
});

module.exports = mongoose.model('users',userSchema)
