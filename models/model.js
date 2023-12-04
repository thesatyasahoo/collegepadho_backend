require('../connections/connections');
const mongoose = require('mongoose');

const {collegeSchema,streamSchema,amenitySchema, locationSchema, collegeDescriptionSchema, collegeAmenitiesSchema, collegeLogoUploaderSchema,collegeCoverUploaderSchema,collegeVideoUrlProvider,collegeGalleryImage, collegeSEOSchema, collegeContactSchema,  collegeCourse, collegePlacement, recruitersImage, userSchema, blogSchema, leadsSchema} = require('../schemas/schemas');


const College = new mongoose.model('College',collegeSchema);
const Stream = new mongoose.model('Stream',streamSchema);
const Amenity = new mongoose.model('Amenity',amenitySchema);
const Location = new mongoose.model('Location',locationSchema);
const CollegeDescription = new mongoose.model('CollegeDescription',collegeDescriptionSchema);
const CollegeAmenities = new mongoose.model('CollegeAmenities',collegeAmenitiesSchema);
const CollegeLogo = new mongoose.model('CollegeLogo',collegeLogoUploaderSchema);
const CollegeCoverImage = new mongoose.model('CollegeCoverImage',collegeCoverUploaderSchema);
const CollegeYouTubeURL = new mongoose.model('CollegeYouTubeURL',collegeVideoUrlProvider);
const CollegeGalleryImage = new mongoose.model('CollegeGalleryImage',collegeGalleryImage);

const CollegeSEO = new mongoose.model('CollegeSEO',collegeSEOSchema);
const CollegeContact = new mongoose.model('CollegeContact',collegeContactSchema);

const CollegeCourse = new mongoose.model('CollegeCourse',collegeCourse);
const CollegePlacement = new mongoose.model('CollegePlacement',collegePlacement);
const CollegeRecruiters = new mongoose.model('CollegeRecruiters',recruitersImage);

const User = new mongoose.model('User',userSchema);
const Blog = new mongoose.model('Blog',blogSchema);
const Leads = new mongoose.model('Leads',leadsSchema);


module.exports = { College, Stream, Amenity, Location, CollegeDescription, CollegeAmenities, CollegeLogo,CollegeCoverImage, CollegeYouTubeURL, CollegeGalleryImage, CollegeSEO, CollegeContact, CollegeCourse, CollegePlacement, CollegeRecruiters, User, Blog, Leads};