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
sqlSelect = "SELECT * FROM `recettes`"
// INSERT
sqlInsert = "INSERT INTO `recettes` (`recette_id`, `recette_titre`, `recette_contenu`, `recette_datetime`) VALUES (NULL, 'tarte aux fraises', 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Provident, totam. Atque iure eaque illo distinctio repellat pariatur excepturi voluptas, consequatur sapiente vitae maiores possimus veritatis.', NOW())"

// UPDATE
sqlUpdate = "UPDATE `recettes` SET `recette_titre` = '😺 tarte aux fraises', `recette_contenu` = '->MODIFY<- Lorem ipsum dolor sit amet consectetur adipisicing elit. Provident, totam. Atque iure eaque illo distinctio repellat pariatur excepturi voluptas, consequatur sapiente vitae maiores possimus veritatis.', `recette_datetime` = '2021-01-11 11:04:49' WHERE `recettes`.`recette_id` = 3"

// DELETTE
sqlDelete = "DELETE FROM `recettes` WHERE `recettes`.`recette_id` = 3"

// INSERT 'levain'
sqlLevain = "INSERT INTO `hashtags` (`hashtag_id`, `hashtag_nom`) VALUES (NULL, 'levain')"

// ASSOC 'levain' as 'pain'
sqlAssocLevain = "INSERT INTO `assoc_hashtags_recettes` (`assoc_hr_id`, `assoc_hr_hashtag_id`, `assoc_hr_recette_id`) VALUES (NULL, '4', '1')"

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



