const express = require('express')
const cors = require('cors')
const app = express()
const server = app.listen(process.env.PORT || 3000, function () {
const host = server.address().address
const port = server.address().port
console.log("App listening at http://%s:%s", host, port)
})


app.use(cors({
    origin: "http://localhost:3000",
    credentials: true
})
)
app.use(express.json())

// let server = app.listen(process.env.PORT || 3001, function () {
//     let host = server.address().address
//     let port = server.address().port
//     console.log('App listening at http://%s:%s', host, port)
// })

let mysql = require('mysql')
let connection = mysql.createConnection({
    host: '696e56a5-2e65-4d25-b8a1-0525bef9b4a4.audio-playe-343.mysql.dbs.scalingo.com',
    user: 'audio_playe_343',
    password: 'NYm35JoW7tKuBangOPxh',
    database: 'audio_player_343'
})

app.post("/create", (req, res) => {
    
        const artist = req.body.artist
        const title = req.body.title
        const audio = req.body.audio
    
    connection.query("INSERT INTO tracks (auth, title, src) VALUES (?, ?, ?)", [artist, title ,audio ], (err, result) => {
        if (err) {
            console.log(err)
        }
        console.log(result)
        console.log(artist, title, audio)
    })
})

app.get('/', (req, res) => {
    res.send('Hello')
    console.log(connection)
    connection.query("SELECT * FROM tracks", (err, res) => {
        if (err) {
            console.log(err)
        }
        console.log(result)
    })
})



// connection.connect(function(err) {
//     if (err) throw err
//     console.log('Connected')
//     let sql = "SELECT * FROM tracks"
//     connection.query(sql, function (err, result) {
//         if (err) throw err
//         app.get('/', (req, res) => {
//             res.send(result)
//           })
//         console.log(result)
//     })
//     connection.end()
//     console.log("Disconnected")
// })