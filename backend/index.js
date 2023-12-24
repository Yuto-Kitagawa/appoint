// node index.jsでサーバを起動

//expressの読み込み
const express = require("express")

// expressの
const app = express();


const port = 3001;


const mysql = require('mysql');
const connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'appoint'
});



app.use(express.json());
app.use((req, res, next) => {
    res.setHeader("Access-Control-Allow-Origin", "http://localhost:3000");
    res.setHeader(
      "Access-Control-Allow-Methods",
      "GET, POST, PUT, PATCH, DELETE, OPTION"
    );
    res.setHeader("Access-Control-Allow-Headers", "Content-Type, Authorization");
    next();
});

connection.connect((err) => {
    if (err) throw err;
    console.log('success');
});


// localhost:3001/にアクセスしたときの処理
app.get("/", function (request, response) {
    // response.send("Hello World!");
    const query = "SELECT * FROM m_prefecturecd;";
    connection.query(query,(error, results) => {
        if(error){
            console.log(error);
            response.status(500).json(error);
        }else{
            console.log(results);
            response.status(200).json(results.rows);
        }
    });
});


// localhost:3001/にPOSTしたときの処理
app.post("/", function (request, response) {
    try {
        response.json(response.body);
    } catch (error) {
        console.error(error);
    }
});


app.listen(port, () => {
    console.log(`Example app listening on port ${port}`);
});
