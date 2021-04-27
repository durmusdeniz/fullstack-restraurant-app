const express = require('express')
const app = express()
var cors = require('cors')
const port = process.env.PORT || 3000;
const mysqlPool = require("./database.js")
app.use(cors())


app.get('/', (req, res) => {
  res.send('Hello World')
})

app.get('/list', (req,res) =>{
  mysqlPool.query('SELECT * from store limit 4', function (error, results, fields) {
    if (error) throw error;
    console.log('The res is: ',JSON.stringify(results));
    res.json(JSON.stringify(results));

  });
})


app.get('/restaurants', (req,res) =>{

    if(req.query.day === undefined || req.query.open === undefined){
        console.log("There are missing params, simply returning and empty list");
        res.json([]);
        return;
    }

    let dayOfWeek = req.query.day;
    let openTime = req.query.open;

    console.log(`Day is ${dayOfWeek} and open time is ${openTime}`)


    let queryString = `select distinct name from store inner join openings on store.id = openings.store_id where openings.day_of_week = ${dayOfWeek}  and (openings.open <= openings.close AND
    openings.open <= '${openTime}' AND
    openings.close >= '${openTime}')
    OR
    (openings.open >= openings.close AND
    ('${openTime}' <= openings.close OR
    '${openTime}' >= openings.open))`;

    mysqlPool.query(queryString, function (error, results, fields) {
        if (error) throw error;
        // console.log('The res is: ',JSON.stringify(results));
        res.json(results);

    });
})

app.get('/addtolist', (req,res) =>{

    let restaurant = req.query.restaurant;
    let list = req.query.list;
    let id = "'" + req.query.id + "'";

    let queryString = `select content from userlists where userid = ${id} and listname='${list}'`

    mysqlPool.query(queryString, function (error, results, fields) {
        if (error) throw error;
         console.log(queryString + '  >>> The res is: ' + JSON.stringify(results) + " " + results.length);
        if(results.length == 0){
            let insertQuery = `insert into userlists values (null,${id}, '${list}', "${restaurant}")`
            mysqlPool.query(insertQuery, function (error, rs, fields) {
                if (error) throw error;
                console.log(`Insertion ${JSON.stringify(rs)}`)
            });
        }else{
            if(results[0].content.split(",").find(resto => resto === restaurant) === undefined){
                let content = results[0].content + "," + restaurant;
                let updateQuery = `update userlists set content="${content}" where userid = ${id} and listname='${list}'`;
                mysqlPool.query(updateQuery, function (error, rs, fields) {
                    if (error) throw error;
                    console.log(`Update ${JSON.stringify(rs)}`)
                });
            }
         }
    });

    res.send("OK");
})



app.get('/getlists', (req,res) =>{

    let id = req.query.id;
    console.log("Incoming id - " + JSON.stringify(req.query.id));
    let queryString = `select listname,content from userlists where userid = '${id}'`
    mysqlPool.query(queryString, function (error, results, fields) {
        if (error) {
         console.log("Error occured " + error);
         res.json([]);
        }else{
            console.log(`For ${JSON.stringify(queryString)} result is ${JSON.stringify(results)}`)
            res.json(results);
        }

    });

})


app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`)
})
