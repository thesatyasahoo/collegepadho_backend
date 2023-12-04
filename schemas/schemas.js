const mongoose = require('mongoose');
const jwt = require('jsonwebtoken');
const bcryptjs = require('bcryptjs')



//Add New College
const collegeSchema = mongoose.Schema({
    collegeName:{
        type:String,
        required:true
    },
    approvedBy:{
        type:String,
        required:true
    },
    shortDescription:{
        type:String,
        required:true
    },
    established_in:{
        type:String,
        required:true
    },
    awards:[],
    college_type:{
        type:String,
        required:true
    },
    total_course_offered:{
        type:String,
        required:true
    },
    isPopular:{
        type:Boolean,
        required:false,
        default:false
    },
    stream:[],
    googleAnalyticsId:{
        type:String,
        required:false,
        default:''
    },
    image:{
        type:String,
        required:true
    },
    country:{
        type:String,
        required:true
    },
    state:{
        type:String,
        required:true
    },
    fullAddress:{
        type:String,
        required:true
    },
    location:{
        type:String,
        required:true
    },
    long:{
        type:String,
        required:false,
        default:''
    },
    lat:{
        type:String,
        required:false,
        default:''
    }

},{timestamps: true})

const streamSchema = mongoose.Schema({
    stream:{
        type:String,
        required:true
    },
    parentStream:{
        type:String,
        required:true
    },
    icon:{
        type:String,
        required:true
    },
    image:{
        type:String,
        required:true
    }
},{timestamps: true})

const amenitySchema = mongoose.Schema({
    amenity:{
        type:String,
        required:true
    },
    icon:{
        type:String,
        required:true
    },
},{timestamps: true});

const locationSchema = mongoose.Schema({
    locationName:{
        type:String,
        required:true
    },
    country:{
        type:String,
        required:true
    },
    image:{
        type:String,
        required:true
    }
},{timestamps:true});

const collegeDescriptionSchema = mongoose.Schema({
    title:{
        type:String,
        required:true
    },
    cid:{
        type: mongoose.Schema.Types.ObjectId, ref: 'College',
        required: true
    },
    description:{
        type:String,
        required:true
    },
},{timestamps: true});

const collegeAmenitiesSchema = mongoose.Schema({
    amenities:[{
        type: mongoose.Schema.Types.ObjectId, ref: 'Amenity',
        required: true
    }],
    cid:{
        type: mongoose.Schema.Types.ObjectId, ref: 'College',
        required: true
    }
},{timestamps: true});

const collegeLogoUploaderSchema = mongoose.Schema({
    image:{
        type:String,
        required:true
    },
    cid:{
        type: mongoose.Schema.Types.ObjectId, ref: 'College',
        required: true
    }
},{timestamps: true})

const collegeCoverUploaderSchema = mongoose.Schema({
    image:{
        type:String,
        required:true
    },
    cid:{
        type: mongoose.Schema.Types.ObjectId, ref: 'College',
        required: true
    }
},{timestamps: true})

const collegeVideoUrlProvider = mongoose.Schema({
    youTubeUrl:{
        type:String,
        required:true
    },
    cid:{
        type: mongoose.Schema.Types.ObjectId, ref: 'College',
        required: true
    }
},{timestamps: true})

const collegeGalleryImage = mongoose.Schema({
    image:{
        type:String,
        required:true
    },
    cid:{
        type: mongoose.Schema.Types.ObjectId, ref: 'College',
        required: true
    }
},{timestamps: true})

const collegeSEOSchema = mongoose.Schema({
    metaTitle:{
        type:String,
        required:true
    },
    metaKeywords:{
        type:String,
        required:true
    },
    metaDescription:{
        type:String,
        required:true
    },
    cid:{
        type: mongoose.Schema.Types.ObjectId, ref: 'College',
        required: true
    }
},{timestamps: true})

const collegeContactSchema = mongoose.Schema({
    website:{
        type:String,
        required:true
    },
    email:{
        type:String,
        required:true
    },
    phone:{
        type:String,
        required:true
    },
    facebook:{
        type:String,
        required:true
    },
    linkedin:{
        type:String,
        required:true
    },
    cid:{
        type: mongoose.Schema.Types.ObjectId, ref: 'College',
        required: true
    }
},{timestamps: true})


const collegeCourse = mongoose.Schema({
    stream:{
        type:String,
        required:true
    },
    courseLevel:{
        type:String,
        required:true
    },
    courseName:{
        type:String,
        required:true
    },
    courseDescription:{
        type:String,
        required:true
    },
    coursefee:{
        type:String,
        required:true
    },
    numberOfSeats:{
        type:String,
        required:true
    },
    duration:{
        type:String,
        required:true
    },
    courseMode:{
        type:String,
        required:true
    },
    entranceExamsAccepted:{
        type:String,
        required:true
    },
    totalTutionFee:{
        type:String,
        required:true
    },
    specialisation:{
        type:String,
        required:true
    },
    image:{
        type:String,
        required:true
    },
    cid:{
        type: mongoose.Schema.Types.ObjectId, ref: 'College',
        required: true
    }
},{timestamps: true})



const collegePlacement = mongoose.Schema({
    course:{
        type:String,
        required:true
    },
    batch:{
        type:String,
        required:true
    },
    numberOfCompaniesVisited:{
        type:String,
        required:true
    },
    numberOfStudentsPlaced:{
        type:String,
        required:true
    },
    minSalary:{
        type:String,
        required:true
    },
    maxSalary:{
        type:String,
        required:true
    },
    averageSalary:{
        type:String,
        required:true
    },
    cid:{
        type: mongoose.Schema.Types.ObjectId, ref: 'College',
        required: true
    }
},{timestamps: true})

const recruitersImage = mongoose.Schema({
    image:{
        type:String,
        required:true
    },
    cid:{
        type: mongoose.Schema.Types.ObjectId, ref: 'College',
        required: true
    }
},{timestamps: true})



const userSchema = mongoose.Schema({
    email:{
        type:String,
        required:true
    },
    password:{
        type:String,
        required:true
    },
    name:{
        type:String,
        required:true
    },
    address:{
        type:String,
        required:true
    },
    phone:{
        type:String,
        required:true
    },
    isAccountActive:{
        type:Boolean,
        required:false,
        default:false
    }
},{timestamps: true})

const blogSchema = mongoose.Schema({
    title:{
        type:String,
        required:true
    },
    stream:{
        type:String,
        required:true
    },
    shortDescription:{
        type:String,
        required:true
    },
    mainTitle:{
        type:String,
        required:true
    },
    content:[],
    image:{
        type:String,
        required:true
    }
    
},{timestamps:true});

const leadsSchema = mongoose.Schema({
    name:{
        type:String,
        required:true
    },
    email:{
        type:String,
        required:true
    },
    mobile:{
        type:String,
        required:true
    },
    city:{
        type:String,
        required:true
    },
    course:{
        type:String,
        required:true
    },
    source:{
        type:String,
        required:true
    }
},{timestamps: true})












module.exports = {collegeSchema,streamSchema,amenitySchema, locationSchema, collegeDescriptionSchema, collegeAmenitiesSchema, collegeLogoUploaderSchema,collegeCoverUploaderSchema,collegeVideoUrlProvider,collegeGalleryImage, collegeSEOSchema, collegeContactSchema, collegeCourse, collegePlacement, recruitersImage, userSchema, blogSchema, leadsSchema};