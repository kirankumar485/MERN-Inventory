const mongoose=require("mongoose");
const bcrypt=require("bcryptjs")

const userSchema=mongoose.Schema({
    name:{
        type: String,
        required:[true,"Please enter a name"],
        unique:true
    },
    email:{
        type:String,
        required:[true,"Please add a email"],
        unique:true,
        trim:true,
        match:[
            /^\s*[\w\-\+_]+(\.[\w\-\+_]+)*\@[\w\-\+_]+\.[\w\-\+_]+(\.[\w\-\+_]+)*\s*$/,
            "Please enter a valid email"
        ]
    },
    password:{
        type:String,
        required:[true,"Please add a password"],
        minLength:[6,"Password must be up to 6 characters"],
        // maxLength:[24,"Password must not be more than 24 characters"]
    },
    photo:{
        type:String,
        required:[true,"Please add a photo"],
        default:"https://i.ibb.co/4pDNDk1/avatar.png"
    },
    phone:{
        type:String,
        default:"+91"
    },
    bio:{
        type:String,
        default:"bio",
        maxLength:[250,"Bio must not be more than 250 character"]

    }
}, {timestamps: true});

//Encrypt password before saving to DB

userSchema.pre("save",async function(next){
    if(!this.isModified("password")){
            return next();
    }

    //Hash Password

    const salt=await bcrypt.genSalt(10)
    const hashedPassword = await bcrypt.hash(this.password,salt);
    this.password=hashedPassword;
    next();
})

const User= mongoose.model("User",userSchema);
module.exports=User;
