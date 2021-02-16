const express = require('express')
const app = express()
const mysql = require('mysql')
const config = require('./config')
const data = config.data
const tabs = data.tabs.forEach(item => console.log(item))

// server
app.listen( data.port, () => console.log(`started on port ${ data.port }`))
connexion = mysql.createConnection(data.config)
connexion.connect((err) => {
    if (err) throw err
    console.log(`==> Connected to : ${data.config.database}`)
})

//---> /
app.get('/', (req, res) => res.send(data.tabs))

//---> /tabs
data.tabs.forEach(item => {
    getTab(item)
    getItem(item)
})

// ---> initialise sql function
// requestSql( --InsertSql-- )

// SELECT

// INSERT

// UPDATE

// DELETTE

// INSERT 

// functions --->
function requestSql(sql) {
    try{
        connexion.query(sql, (err, result) => {
            if (err) throw err
            console.log('I request executed')
        })
    }
    catch (err) {
        console.log(err)
    }
}

function getTab(tab) {
    const sql = `SELECT * FROM ${ tab }`
    app.get(`/${ tab }`, (req, res) => {
        connexion.query(sql, (err, result) => {
            if (err) throw err
            res.json(result)
        })
    })
    console.log(`/ ${ tab }`)
}

function getItem(item) {
    app.get(`/${ item }/:id`, (req, res) => {
        id = req.params.id
        console.log(id)
        let sql = `SELECT * FROM ${ item } WHERE id_${ item } = ${ id }`
        try {
            connexion.query(sql, (err, result) => {
                if (err) throw err
                res.json(result)
            })
        }
        catch (err) {
            console.log(err)
        }
    })
}



