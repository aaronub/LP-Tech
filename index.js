const mysql = require('mysql2')
const app = require('express')()
const cors = require('cors')


app.listen('3000', () => {
  console.log('Server started on port 3000')
})

app.use(cors());

console.log('test')

var db = mysql.createConnection({
    host     : 'localhost',
    user     : 'root',
    password : 'Mysql123!',
    database : 'test2'
  })

db.connect((err)=>{
    if(err) {
        console.log('err is: ', err)
        throw err
    }
    console.log('Mysql connected...')
})


//API to fetch data from Mysql
app.get('/getData', (req, res)=>{
  let sql = 'SELECT * FROM test';
  db.query(sql, (err, results)=>{
    if(err) throw err;
    // console.log('inside api results =', results[0]['trace_data'])
    // const result = results[0]['trace_data']
    // res.status(200).send({data:result})
    const traceData = results.map(elem => elem['trace_data'])

    res.status(200).send({data: traceData})
})

})


