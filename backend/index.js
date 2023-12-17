const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");

const Bookmodel = require("./Model/Book.js");
const Requestmodel = require("./Model/Bookrequest.js");
const Reccomdmodel = require("./Model/Reccomdmodel.js");
const Usermodel = require("./Model/Usermodel.js");
const BookReqeustModel = require("./Model/Bookrequest.js");

const app = express();
app.use(express.json());
app.use(cors());
const PORT = process.env.PORT || 5000;

// Connect to MongoDB
mongoose
  .connect(
    "mongodb+srv://marjanporoli123:marjan@cluster0.ecnuwj1.mongodb.net/LMS_db?retryWrites=true&w=majority"
  )
  .then(() => {
    console.log("db connected");
  })
  .catch((err) => console.log(err));

//user Register
app.post("/signUp", async (req, res) => {
  try {
    console.log(req.body);
    const user = await Usermodel.create(req.body);
    res.status(201).json(user);
  } catch (error) {
    console.error("Error creating user:", error.message);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

//user allbook
app.get("/getallbooks", async (req, res) => {
  var data = await Bookmodel.find();
  res.send(data);
});

//admin profile
app.get("/getprofile/:userid", async (req, res) => {
  console.log(req.params.userid);
  try {
    const user = await Usermodel.findById(req.params.userid);
    if (user) {
      res.json(user);
    } else {
      res.status(404).json({ message: "User not found" });
    }
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
});

//admin register
// app.post("/Registeradmin", async (req, res) => {
//   const data = { ...req.body, role: "admin" };
//   console.log(req.body);
//   await Usermodel.create(data)
//     .then((user) => res.json(user))
//     .catch((err) => res.json(err));
//   res.status(200).send({ message: "request" });
// });
app.post("/Registeradmin", async (req, res) => {
  const data = { ...req.body, role: "admin" };

  try {
    const user = await Usermodel.create(data);
    res.status(201).json(user);
  } catch (error) {
    console.error("Error creating admin:", error.message);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

//user
app.post("/login", (req, res) => {
  const { username, password } = req.body;
  console.log(username, password);
  Usermodel.findOne({ name: username })
    // console.log(password)
    .then((user) => {
      if (user) {
        if (user.password === password) {
          res.json({ message: "Success", user });
        } else {
          res.json({ message: "The password is incorrect" });
        }
      } else {
        res.json({ message: "No record existed" });
      }
    })
    .catch((error) => {
      console.error(error);
      res.status(500).json({ message: "Internal Server Error" });
    });
});

app.delete("/deleteUser/:userId", async (req, res) => {
  const userId = req.params.userId;

  try {
    const deletedUser = await Usermodel.findByIdAndDelete(userId);

    if (!deletedUser) {
      return res.status(404).json({ error: "User not found" });
    }

    res.status(200).json({ message: "User deleted successfully", deletedUser });
  } catch (error) {
    console.error("Error deleting user:", error.message);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

app.post("/createbook", async (req, res) => {
  console.log(req.body);
  try {
    const user = await Bookmodel.create(req.body);
    res.json(user);
  } catch (err) {
    res.status(500).json(err);
  }
});

//bookrequest
app.post("/requestbook", async (req, res) => {
  console.log(req.body);
  try {
    const user = await Requestmodel.create(req.body);
    res.json(user);
  } catch (err) {
    res.status(500).json(err);
  }
});

//Reccomd by admin
app.get("/reccomdbyadmin", async (req, res) => {
  var data = await Reccomdmodel.find();
  res.send(data);
});

//All book
app.get("/getallbooks", async (req, res) => {
  var data = await Bookmodel.find();
  res.send(data);
});

//manageuser
app.get("/manageuser", async (req, res) => {
  try {
    // Use populate to fetch user data along with the details of the taken books
    const data = await Usermodel.find().populate("takenbook");
    res.send(data);
  } catch (error) {
    console.error("Error fetching user data:", error.message);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

//issued book
app.get("/issuedbook", async (req, res) => {
  var data = await Bookmodel.find({ isAvailable: false });
  res.send(data);
});




// app.get('/bookrequest', async (req, res) => {
//   try {
//     const data = await Usermodel.find().populate('userid').populate('bookid');
//     res.send(data);
//   } catch (err) {
//     res.status(500).json({ error: err.message });
//   }
// });

app.get("/bookrequests", async (req, res) => {
  try {
    const bookRequests = await Requestmodel.find()
      .populate("userid")
      .populate("bookid");

    const filteredBookRequests = bookRequests.filter(
      (request) => request.status === undefined
    );
    res.json(filteredBookRequests);
  } catch (error) {
    console.error("Error fetching book requests:", error.message);
    res.status(500).json({ error: "Internal Server Error" });
  }
});


//currentlyissued book(user)
app.get("/currentlyissuedbook/:userId", async (req, res) => {
  const userId = req.params.userId;
  console.log(userId)  
  try {
    const data = await Bookmodel.find({ isAvailable: false, issuedUser: userId });
    console.log(data)
    if (data.length > 0) {
      res.send(data);
    } else {
      res.send(data);
    }
  } catch (error) {
    console.error(error);
    res.status(500).send("Internal Server Error");
  }
});



app.patch("/manageBookRequest/:requestId", async (req, res) => {
  const requestId = req.params.requestId;
  const { newStatus, issuedDate, isAvailable } = req.body;

  try {
    // Find the request by ID and update the status
    const updatedRequest = await Requestmodel.findByIdAndUpdate(
      requestId,
      { status: newStatus },
      { new: true }
    );
    if (!updatedRequest) {
      return res.status(404).json({ error: "Request not found" });
    }

    if (updatedRequest.status === "accepted") {
      // Update the Book model with the corresponding bookid
      const updatedBook = await Bookmodel.findByIdAndUpdate(
        updatedRequest.bookid,
        { isAvailable: false, issuedDate: issuedDate, issuedUser:updatedRequest.userid },
        { new: true }
      );

      const addBookIdToUser = await Usermodel.findByIdAndUpdate(
        updatedRequest.userid,
        { takenbook: updatedRequest.bookid },
        { new: true }
      );

      return res.json({
        updatedRequest,
        updatedBook,
        addBookIdToUser,
      });
    }

    res.json(updatedRequest, addBookIdToUser);
  } catch (error) {
    console.error("Error managing book request:", error.message);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

app.patch("/retrunBook/:bookId", async (req, res) => {
  const bookId = req.params.bookId;
  try {
    // Find the request by ID and update the status
    const returnBook = await Bookmodel.findByIdAndUpdate(
      bookId,
      { issuedDate: null, issuedUser: null, isAvailable: true },
      { new: true }
    );
    if (!returnBook) {
      return res.status(404).json({ error: "Book not found" });
    }
    // issuedDate: Date,
    // issuedUser: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
    // image: String,
    // isAvailable: { type: Boolean, default: true },

    res.json(returnBook);
  } catch (error) {
    console.error("Error managing book request:", error.message);
    res.status(500).json({ error: "Internal Server Error" });
  }
});
//reccomendbyuser
app.get("/reccoemndbyuser", async (req, res) => {
  var data = await Reccomdmodel.find({ isAvailable: false });
  res.send(data);
});

app.post("/reccoemndbyuser", async (req, res) => {
  console.log(req.body);
  try {
    const user = await Reccomdmodel.create(req.body);
    res.json(user);
  } catch (err) {
    res.status(500).json(err);
  }
});

app.delete("/delet:id", async (req, res) => {
  console.log(req.params.id);
  let id = req.params.id;
  await findByIdAndDelete(id);
  res.send("data deleted");
});

app.listen(PORT, () => {
  console.log(`Server is running on port  ${PORT}`);
});
