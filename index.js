const express = require('express')
const cors = require('cors')
const app = express()
const port = process.env.PORT || 3001


app.listen(port, () => console.log(`Listening on port ${port}`))

app.use(cors({
    origin: "http://localhost:3000",
    credentials: true
})
)
app.use(express.json())



let mysql = require('mysql')
let connection = mysql.createConnection({
    host: 'localhost',
    user: 'audio-player-db',
    password: 'Sl5aPP_NaKobGxh0',
    database: 'audio-player-db'
})

app.post("/create", (req, res) => {

    const artist = req.body.artist
    const title = req.body.title
    const audio = req.body.audio
    
    connection.query("INSERT INTO tracks (auth, title, src) VALUES (?, ?, ?)", [artist,title,audio], (err, result) => {
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
  