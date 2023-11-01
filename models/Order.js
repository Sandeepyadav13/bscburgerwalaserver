import mongoose from "mongoose" 
 
const schema = new mongoose.Schema({

    shippingInfo:{
        hno:{
            type:String,
            required:true,
        },
        city:{
            type:String,
            required:true,
        },
        state:{
            type:String,
            required:true,
        },
        country:{
            type:String,
            required:true,
        },
        pinCode:{
            type:Number,
            required:true,
        },
        phoneNo:{
            type:Number,
            required:true
        },
    },

orderItem:{
    cheeseBurger:{
        price:{
            type:Number,
            required:true,
        },
        quantity:{
            type:Number,
            required:true,
        },
    },
    VegCheeseBurger:{
        price:{
            type:Number,
            required:true,
        },
        quantity:{
            type:Number,
            required:true,
        },
    },
     burgerWithFries:{
        price:{
            type:Number,
            required:true,
        },
        quantity:{
            type:Number,
            required:true,
        },
    },
},

user:{
    type:mongoose.Schema.ObjectId,
    ref:"User",
    required:true,
},

 paymentMethod:{
    type:String,
    enum:["COD","Online"],
    default:"COD"
 },

 paymentInfo:{
    type:mongoose.Schema.ObjectId,
    ref:"Payment"
 },

 paidAt:Date,

 itemPrice:{
    type:Number,
    default:0,
 },

 taxPrice:{
    type:Number,
    default:0,
 },

 shippingCharge:{
    type:Number,
    default:0,
 },

 totalAmount:{
    type:Number,
    default:0,
 },

orderStatus:{
        type:String,
        enum:["preparing","shippid","Delivered"],
        default:"preparing",
},

deliveredAt:Date,

createAt:{
    type:Date,
        default:Date.now,
},
});

export const Order = mongoose.model("Order",schema);