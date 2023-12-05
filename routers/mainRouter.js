const express = require("express");
const multer = require("multer");
const router = new express.Router();
const {
  College,
  Stream,
  Amenity,
  Location,
  CollegeDescription,
  CollegeAmenities,
  CollegeLogo,
  CollegeCoverImage,
  CollegeYouTubeURL,
  CollegeGalleryImage,
  CollegeSEO,
  CollegeContact,
  CollegeCourse,
  CollegePlacement,
  CollegeRecruiters,
  User,
  Blog,
  Leads,
} = require("../models/model");
const nodemailer = require("nodemailer");
const OtpGenerator = require("../middlewares/OtpGenerator");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const auth = require("../middlewares/auth");
const { default: axios } = require("axios");
const countries = require("../middlewares/allCountries");

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "./mediaFiles");
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + "_" + file.originalname);
  },
});
const upload = multer({ storage: storage });

//Create New College
router.post("/api/college", upload.single("myFile"), async (req, res) => {
  try {
    // console.log('inside try')
    // console.log(req.body);
    const image = req.file ? "/mediaFiles/" + req.file.filename : null;
    // console.log(req.file);
    // console.log(req.body);
    const { stream, awards, ...other } = await req.body;
    const conStream = await JSON.parse(stream);
    const conAwards = await JSON.parse(awards);
    const finalObj = await { ...other, awards: conAwards, stream: conStream };
    console.log({ ...other, conAwards, conStream });
    const toSave = await College({ ...finalObj, image });
    console.log("TO SAVE" + toSave);
    console.log("before save");
    const results = await toSave.save();
    console.log("data registered");
    if (results) {
      res
        .status(200)
        .send({ message: "College Created", response: results._id });
    } else {
      res.status(200).send({ message: "Failed to Create College" });
    }
  } catch (error) {
    console.log("this is in Catch : ", error);
    res.status(500).send({ message: "Internal Server Error" });
  }
});

//Get All Colleges
router.get("/api/college", async (req, res) => {
  try {
    const allCollege = await College.find();
    res.status(200).send({
      message: "All Colleges fetched Successfully",
      responses: allCollege,
    });
  } catch (error) {
    console.log(error);
    res.status(200).send({ message: "Internal Server Error" });
  }
});

//Test Default Api
router.get("/api/status", async (req, res) => {
  try {
    res.status(200).send({ message: "Server is working......." });
  } catch (error) {
    console.log(error);
    res.status(500).send({ message: "Internal Server Error" });
  }
});

//Parent Stream
router.get("/api/parentstream", async (req, res) => {
  try {
    const data = [
      "Management",
      "Engineering",
      "Pharmacy",
      "Dental",
      "Education",
      "Journalism",
      "Law",
      "Medical",
      "Architecture",
      "Arts and Humanities",
      "Information Technology",
      "Commerce and Banking",
      "Hotel Management",
      "Design Colleges",
    ];
    res
      .status(200)
      .send({ message: "All Parent Stream Fetched", responses: data });
  } catch (error) {
    console.log(error);
    res.status(200).send({ message: "Internal Server Error" });
  }
});

//Add New Stream
router.post("/api/stream", upload.single("myFile"), async (req, res) => {
  try {
    console.log("inside try");
    console.log(req.body);
    const image = req.file ? "/mediaFiles/" + req.file.filename : null;
    const toSave = Stream({ ...req.body, image });
    console.log("before save");
    const results = await toSave.save();
    console.log("data registered");
    if (results) {
      res.status(200).send({ message: "Stream Created" });
    } else {
      res.status(200).send({ message: "Failed to Create Stream" });
    }
  } catch (error) {
    console.log("this is in Catch : ", error);
    res.status(500).send({ message: "Internal Server Error" });
  }
});

//Get All Stream
router.get("/api/stream", async (req, res) => {
  try {
    const allStream = await Stream.find();
    res
      .status(200)
      .send({ message: "All Stream Fetched", response: allStream });
  } catch (error) {
    res.status(500).send({ message: "Internal Server Error" });
  }
});

//Add New Amenity
router.post("/api/amenity", async (req, res) => {
  try {
    console.log(req.body);
    const toSave = Amenity(req.body);
    console.log("before save");
    const results = await toSave.save();
    console.log("data registered");
    if (results) {
      res.status(200).send({ message: "Amenity Created" });
    } else {
      res.status(200).send({ message: "Failed to Create Amenity" });
    }
  } catch (error) {
    console.log("this is in Catch : ", error);
    res.status(500).send({ message: "Internal Server Error" });
  }
});

//Get All Amenity
router.get("/api/amenity", async (req, res) => {
  try {
    const allAmenities = await Amenity.find();
    res
      .status(200)
      .send({ message: "All Amenity Fetched", response: allAmenities });
  } catch (error) {
    res.status(500).send({ message: "Internal Server Error" });
  }
});

//Get All Countries
router.get("/api/country", async (req, res) => {
  res
    .status(200)
    .send({ message: "Fetched All Countries", response: countries });
});

//Add New Location
router.post("/api/location", upload.single("myFile"), async (req, res) => {
  try {
    console.log("inside try");
    console.log(req.body);
    const image = req.file ? "/mediaFiles/" + req.file.filename : null;
    const toSave = Location({ ...req.body, image });
    console.log("before save");
    const results = await toSave.save();
    console.log("data registered");
    if (results) {
      res.status(200).send({ message: "Location Created" });
    } else {
      res.status(200).send({ message: "Failed to Create Location" });
    }
  } catch (error) {
    console.log("this is in Catch : ", error);
    res.status(500).send({ message: "Internal Server Error" });
  }
});

//Get All Location
router.get("/api/location", async (req, res) => {
  try {
    const allLocation = await Location.find();
    res
      .status(200)
      .send({ message: "All Location Fetched", response: allLocation });
  } catch (error) {
    res.status(500).send({ message: "Internal Server Error" });
  }
});

//Add College Description
router.post("/api/collegedescription", async (req, res) => {
  try {
    console.log("186", req.body);
    const toSave = await CollegeDescription.insertMany(req.body);
    console.log("188", toSave);
    res
      .status(200)
      .send({ message: "All College Description Fetched", response: toSave });
  } catch (error) {
    console.log("this is in Catch : ", error);
    res.status(500).send({ message: "Internal Server Error" });
  }
});

//Get All College Description
router.get("/api/collegedescription", async (req, res) => {
  try {
    const allDesc = await CollegeDescription.find();
    res
      .status(200)
      .send({ message: "All College Description Fetched", response: allDesc });
  } catch (error) {
    res.status(500).send({ message: "Internal Server Error" });
  }
});

//Add Colleges Amenities
router.post("/api/collegeamenities", async (req, res) => {
  try {
    const { cid, amenities } = await req.body;
    const conAmenities = await JSON.parse(amenities);
    const finalObj = await { cid: cid, amenities: conAmenities };
    const toSave = await CollegeAmenities({ ...finalObj });
    console.log("TO SAVE" + toSave);
    console.log("before save");
    const results = await toSave.save();
    console.log("data registered");
    if (results) {
      res
        .status(200)
        .send({ message: "College Amenities Created", response: results });
    } else {
      res.status(200).send({ message: "Failed to Create College Amenities" });
    }
  } catch (error) {
    console.log("this is in Catch : ", error);
    res.status(500).send({ message: "Internal Server Error" });
  }
});

//Get All Colleges Amenities
router.get("/api/collegeamenities", async (req, res) => {
  try {
    const allAme = await CollegeAmenities.find().populate("amenities");
    console.log(allAme);
    res
      .status(200)
      .send({ message: "All College Amenities Fetched", response: allAme });
  } catch (error) {
    res.status(500).send({ message: "Internal Server Error" });
  }
});

//College Logo Uploader
router.post("/api/collegelogo", upload.single("myFile"), async (req, res) => {
  try {
    console.log("inside try");
    console.log(req.body);
    const image = req.file ? "/mediaFiles/" + req.file.filename : null;
    const toSave = CollegeLogo({ ...req.body, image });
    console.log("before save");
    const results = await toSave.save();
    console.log("data registered");
    if (results) {
      res.status(200).send({ message: "Logo Saved" });
    } else {
      res.status(200).send({ message: "Failed to Save Logo" });
    }
  } catch (error) {
    console.log("this is in Catch : ", error);
    res.status(500).send({ message: "Internal Server Error" });
  }
});

//College Cover Uploader
router.post("/api/collegecover", upload.single("myFile"), async (req, res) => {
  try {
    console.log("inside try");
    console.log(req.body);
    const image = req.file ? "/mediaFiles/" + req.file.filename : null;
    const toSave = CollegeCoverImage({ ...req.body, image });
    console.log("before save");
    const results = await toSave.save();
    console.log("data registered");
    if (results) {
      res.status(200).send({ message: "Cover Image Saved" });
    } else {
      res.status(200).send({ message: "Failed to Save Cover Image" });
    }
  } catch (error) {
    console.log("this is in Catch : ", error);
    res.status(500).send({ message: "Internal Server Error" });
  }
});

//College Gallery Image Uploader
router.post(
  "/api/collegegallery",
  upload.single("myFile"),
  async (req, res) => {
    try {
      console.log("inside try");
      console.log(req.body);
      const image = req.file ? "/mediaFiles/" + req.file.filename : null;
      const toSave = CollegeGalleryImage({ ...req.body, image });
      console.log("before save");
      const results = await toSave.save();
      console.log("data registered");
      if (results) {
        res.status(200).send({ message: "Gallery Image Saved" });
      } else {
        res.status(200).send({ message: "Failed to Save Gallery Image" });
      }
    } catch (error) {
      console.log("this is in Catch : ", error);
      res.status(500).send({ message: "Internal Server Error" });
    }
  }
);

//Add Colleges Youtube Video URL
router.post("/api/collegevurl", async (req, res) => {
  try {
    const toSave = await CollegeYouTubeURL(req.body);
    const results = await toSave.save();
    console.log("data registered", results);
    if (results) {
      res
        .status(200)
        .send({ message: "College YouTube URL Saved", response: results });
    } else {
      res.status(200).send({ message: "Failed to Save College YouTube URL" });
    }
  } catch (error) {
    console.log("this is in Catch : ", error);
    res.status(500).send({ message: "Internal Server Error" });
  }
});

//Add New SEO
router.post("/api/seo", async (req, res) => {
  try {
    console.log(req.body);
    const toSave = CollegeSEO(req.body);
    console.log("before save");
    const results = await toSave.save();
    console.log("data registered");
    if (results) {
      res.status(200).send({ message: "SEO Created" });
    } else {
      res.status(200).send({ message: "Failed to Create SEO" });
    }
  } catch (error) {
    console.log("this is in Catch : ", error);
    res.status(500).send({ message: "Internal Server Error" });
  }
});

//Add New College Contact
router.post("/api/collegecontact", async (req, res) => {
  try {
    console.log(req.body);
    const toSave = CollegeContact(req.body);
    console.log("before save");
    const results = await toSave.save();
    console.log("data registered");
    if (results) {
      res.status(200).send({ message: "Contact Created" });
    } else {
      res.status(200).send({ message: "Failed to Create Contact" });
    }
  } catch (error) {
    console.log("this is in Catch : ", error);
    res.status(500).send({ message: "Internal Server Error" });
  }
});

//Add College Course
router.post("/api/course", upload.single("myFile"), async (req, res) => {
  try {
    console.log("inside try");
    console.log(req.body);
    const image = req.file ? "/mediaFiles/" + req.file.filename : null;
    const toSave = CollegeCourse({ ...req.body, image });
    console.log("before save");
    const results = await toSave.save();
    console.log("data registered");
    if (results) {
      res.status(200).send({ message: "Course Created" });
    } else {
      res.status(200).send({ message: "Failed to Create Course" });
    }
  } catch (error) {
    console.log("this is in Catch : ", error);
    res.status(500).send({ message: "Internal Server Error" });
  }
});

//Get All Colleges Course
router.get("/api/course", async (req, res) => {
  try {
    const allCourse = await CollegeCourse.find();
    console.log(allCourse);
    res
      .status(200)
      .send({ message: "All College Courses Fetched", response: allCourse });
  } catch (error) {
    res.status(500).send({ message: "Internal Server Error" });
  }
});

//Add College Placement Record
router.post("/api/placementinfo", upload.single("myFile"), async (req, res) => {
  try {
    console.log(req.body);
    // const image = req.file ? '/mediaFiles/' + req.file.filename : null;
    const toSave = CollegePlacement(req.body);
    console.log("before save");
    const results = await toSave.save();
    console.log("data registered");
    if (results) {
      res.status(200).send({ message: "Placement Created" });
    } else {
      res.status(200).send({ message: "Failed to Create Placement" });
    }
  } catch (error) {
    console.log("this is in Catch : ", error);
    res.status(500).send({ message: "Internal Server Error" });
  }
});

//Add Recruiters Image
router.post("/api/recruiters", upload.single("myFile"), async (req, res) => {
  try {
    console.log("inside try");
    console.log(req.body);
    const image = req.file ? "/mediaFiles/" + req.file.filename : null;
    const toSave = CollegeRecruiters({ ...req.body, image });
    console.log("before save");
    const results = await toSave.save();
    console.log("data registered");
    if (results) {
      res.status(200).send({ message: "Recruiter Image Saved" });
    } else {
      res.status(200).send({ message: "Failed to Save Recruiter Image" });
    }
  } catch (error) {
    console.log("this is in Catch : ", error);
    res.status(500).send({ message: "Internal Server Error" });
  }
});

//Register New User
router.post("/api/registeruser", async (req, res) => {
  try {
    const toSave = await User(req.body);
    console.log("TO SAVE" + toSave);
    console.log("before save");
    const results = await toSave.save();
    console.log("data registered");
    if (results) {
      res.status(200).send({ message: "User Created Successfully" });
    } else {
      res.status(400).send({ message: "Failed to Register User" });
    }
  } catch (error) {
    console.log("this is in Catch : ", error);
    res.status(500).send({ message: "Internal Server Error" });
  }
});

//Verify User / Log In
router.post("/api/verifyuser", async (req, res) => {
  try {
    const { email, password } = await User(req.body);
    const isUserExist = await User.findOne({ email: email });
    if (isUserExist) {
      if (isUserExist.password == password) {
        res
          .status(200)
          .cookie(
            "authToken",
            "df98klj5kljkl234lk3nelj32v4hj44h6hv8jcghxhg85v7kj5n45;l23klj46hjg57j45k6jjl",
            {
              httpOnly: true,
              expires: new Date(Date.now() + 60000000),
            }
          )
          .send({
            message: "User Verified Successfully",
            token:
              "df98klj5kljkl234lk3nelj32v4hj44h6hv8jcghxhg85v7kj5n45;l23klj46hjg57j45k6jjl",
          });
      } else {
        res.status(200).send({ message: "Invalid Password" });
      }
    } else {
      res.status(200).send({ message: "Invalid Email ID" });
    }
  } catch (error) {
    console.log("this is in Catch : ", error);
    res.status(500).send({ message: "Internal Server Error" });
  }
});

//Get All Colleges Amenities
router.get("/api/validate", auth, async (req, res) => {
  try {
    res.status(200).send({ message: "Authenticated" });
  } catch (error) {
    res.status(500).send({ message: "Internal Server Error" });
  }
});

//Get College Info by Id
//Get College Info by Id
router.get("/api/collegeinfo/:id", async (req, res) => {
  try {
    const cidParam = req.params;
    const cid = cidParam.id;
    console.log(cid);
    const college = await College.findOne({ _id: cid });
    const collegeDescription = await CollegeDescription.find({ cid });
    const collegeAmenities = await CollegeAmenities.find({ cid }).populate(
      "amenities"
    );
    const collegeLogo = await CollegeLogo.findOne({ cid });
    const collegeCover = await CollegeCoverImage.findOne({ cid });

    const collegeVideoURL = await CollegeYouTubeURL.findOne({ cid });
    const collegeGallery = await CollegeGalleryImage.find({ cid });
    const collegeSEO = await CollegeSEO.findOne({ cid });
    const collegeContact = await CollegeContact.findOne({ cid });
    const collegeCourse = await CollegeCourse.find({ cid });
    const collegePlacement = await CollegePlacement.find({ cid });
    const collegeRecruitersImage = await CollegeRecruiters.find({ cid });

    res.status(200).send({
      message: "Data Received",
      response: {
        college,
        collegeDescription,
        collegeAmenities,
        collegeLogo,
        collegeCover,
        collegeVideoURL,
        collegeGallery,
        collegeSEO,
        collegeContact,
        collegeCourse,
        collegePlacement,
        collegeRecruitersImage,
      },
    });
  } catch (error) {
    res.status(500).send({ message: "Internal Server Error" });
  }
});

//Add New Blog
router.post("/api/blog", upload.single("myFile"), async (req, res) => {
  try {
    console.log("inside try");
    console.log(req.body);
    const image = req.file ? "/mediaFiles/" + req.file.filename : null;
    const { title, stream, shortDescription, mainTitle, content } = req.body;
    const conContent = JSON.parse(content);
    const toSave = Blog({
      image: image,
      title: title,
      stream: stream,
      shortDescription: shortDescription,
      mainTitle: mainTitle,
      content: conContent,
    });
    console.log("before save");
    console.log(toSave);
    const results = await toSave.save();
    console.log("data registered");
    if (results) {
      res.status(200).send({ message: "Blog Created" });
    } else {
      res.status(200).send({ message: "Failed to Create Blog" });
    }
  } catch (error) {
    console.log("this is in Catch : ", error);
    res.status(500).send({ message: "Internal Server Error" });
  }
});

//Get All Blogs
router.get("/api/blog", async (req, res) => {
  try {
    const allBlog = await Blog.find();
    console.log(allBlog);
    res.status(200).send({ message: "All Blog Fetched", response: allBlog });
  } catch (error) {
    res.status(500).send({ message: "Internal Server Error" });
  }
});

//Get Graph Record
router.get("/api/graph", async (req, res) => {
  try {
    const NumberOfCollege = await College.find().count();
    const NumberOfUser = await User.find().count();
    const NumberOfCourse = 25;
    res.status(200).send({
      message: "Graph Data Fetched",
      totalCollege: NumberOfCollege,
      totalUser: NumberOfUser,
      totalCourse: 25,
    });
  } catch (error) {
    res.status(500).send({ message: "Internal Server Error" });
  }
});

//Create New Leads
router.post("/api/leads", async (req, res) => {
  try {
    console.log(req.body);
    const toSave = Leads(req.body);
    console.log("before save");
    const results = await toSave.save();
    console.log("data registered");
    if (results) {
      //SMTP Start
      var transporter = nodemailer.createTransport({
        service: "gmail",
        auth: {
          user: "ankur.srivastav@mangalmay.org",
          pass: "xyaxvblsxjmqofmo",
        },
      });
      var mailOptions = {
        from: "ankur.srivastav@mangalmay.org",
        to: "ankur.srivastav@mangalmay.org",
        subject: `Admission Query from ${results.name}`,
        text: `Hello Admin,\nFound New Leads Query,\nFind Details Below,\n\nLeads Generated From : ${results.source}\n\n\nUser Name : ${results.name},\n\nUser Email : ${results.email}\n\nUser Mobile : ${results.mobile}\n\nUser Course : ${results.course}\n\n\nAbove Details is Based on the User Query Form which User filled on Website, You can see this copy inside the admin panel of College Padho, user Leads Section.`,
      };
      transporter.sendMail(mailOptions, async function (error, info) {
        if (error) {
          console.log("Failed to perform SMTP");
          console.log(error);
        } else {
          console.log("Successfully SMTP Done.");
        }
      });
      //SMTP Ends
      res.status(200).send({ message: "Form Submitted" });
    } else {
      res.status(200).send({ message: "Failed to Save Leads" });
    }
  } catch (error) {
    console.log("this is in Catch : ", error);
    res.status(500).send({ message: "Internal Server Error" });
  }
});

//Get All Leads
router.get("/api/leads", async (req, res) => {
  try {
    const allLeads = await Leads.find();
    res.status(200).send({ message: "All Leads Fetched", response: allLeads });
  } catch (error) {
    res.status(500).send({ message: "Internal Server Error" });
  }
});

//Get All Users
router.get("/api/users", async (req, res) => {
  try {
    const allUsers = await User.find();
    res.status(200).send({ message: "All Users Fetched", response: allUsers });
  } catch (error) {
    console.log(error);
    res.status(500).send({ message: "Internal Server Error" });
  }
});

module.exports = router;
