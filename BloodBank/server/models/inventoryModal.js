const mongoose = require('mongoose')

const inventorySchema = new mongoose.Schema({
    inventoryType: {
        type : String,
        required : true,
        enum : ['in' ,'out'],
    },
    bloodGroup :{
        type: String,
        required:true,
        //enum:['A+','A-','B+','B-','AB+','AB-',"O+",'O+'],

    },
    quantity :{
        type: Number,
        required:true,
    },
    email :{
        type: String,
        required:true,
    },

    organization :{
        type:mongoose.Schema.Types.ObjectId,
        ref : 'organizations',
        required:true,
    },

    hospital:{
        type:mongoose.Schema.Types.ObjectId,
        ref : 'users',
        required:true,
        required: function(){
            return this.inventoryType ==='out';
        },
    },

    donor:{
        type:mongoose.Schema.Types.ObjectId,
          ref: 'users',
          required: function () {
            return this.inventoryType === 'in';
          },
    },



},
{
    timestamps: true,
}
);

const Inventory = mongoose.model('inventories',inventorySchema);

module.exports = Inventory;