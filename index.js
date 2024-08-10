var express = require("express"); 
var bodyParser = require("body-parser");//Body-Parser module to handle form data
var mongoose = require("mongoose");  //Mongoose to interact with MongoDB
const app = express();
app.use(bodyParser.json());
app.use(express.static('frontend'));  // Serve files from the 'frontend' directory
app.use(bodyParser.urlencoded({  //to parse URL-encoded data
    extended: true
}));
// Connect to the MongoDB database
mongoose.connect('mongodb://localhost:27017/MoneyList');  // Connect to MongoDB at the specified URL
var db = mongoose.connection; 
db.on('error', () => console.log("Error in connecting to the Database"));  
db.once('open', () => console.log("Connected to Database"));

app.post("/add", (req, res) => {   // Extract data from the request body
    var category_select = req.body.category_select;  
    var amount_input = req.body.amount_input; 
    var info = req.body.info;  
    var date_input = req.body.date_input; 
    var data = {  // Create an object with the extracted data
        "Category": category_select,
        "Amount": amount_input,
        "Info": info,
        "Date": date_input
    };
// Insert the data into the 'users' collection in MongoDB
    db.collection('users').insertOne(data, (err, collection) => {
        if (err) {
            throw err;  // Throw an error if the insertion fails
        }
        console.log("Record Ins___erted Successfully");  // Log success if the record is inserted
    });
});

// Define a route for serving the index page
app.get("/", (req, res) => {
    res.set({  // Set headers for the response
        "Allow-access-Allow-Origin": '*'
    });
    return res.redirect('index.html');  // Redirect to 'index.html'
}).listen(5000);  // Start the server on port 5000

console.log("Listening on port 5000");
