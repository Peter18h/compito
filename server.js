const express = require('express');
const app = express();

const port = 3000;

const sqlite3 = require("sqlite3").verbose();
const db = new sqlite3.Database("compito.db");



app.get('/biglietti', (req, res) => {
    db.all(`SELECT * FROM biglietto`, (error, rows) => {
        if(error) {
            console.error(error.message);
            response = {
                "code": -1,
                "data": error.message
            }
            res.status(500).send(error.response);
        }
        response = {
            "code": 1,
            "data": rows
        }
        res.status(200).send(response);
    });
});

app.get('/biglietto/:id', (req, res) => {
    const id = req.params.id;
    db.all(`SELECT * FROM biglietto WHERE id=?`, id, (error, rows) => {
        if(error){
            console.log(error.message);
            response = {
                "code": -1,
                "data": error.message
            }
            res.status(500).send(response);
        }
        response = {
            "code": 1,
            "data": rows
        }
        res.status(200).send(response);
    });
});


app.put('/biglietto/:id', (req, res) => {
    const id = req.params.id;
    db.run(`UPDATE biglietto SET venduto = 1 WHERE id = ?`, id, (error, result) => {
        if(error){
            response = {
                "code": -1,
                "data": error.message
            }
            res.status(500).send(response);
        }
        response = {
            "code": 1,
            "data": result
        }
        res.status(201).send(response);
    });
});

app.get('/pagamento/:id', (req, res) => {
    const id = req.params.id;
    db.get("SELECT entrata, uscita FROM biglietto WHERE id = ?", [id], (error, row) => {
      if (err) return res.status(500).send( err.message );
      if (!row) return res.status(200).send( 'Biglietto non trovato' );
      if (rows.uscita === 0) return res.status(200).send( 'Uscita non ancora registrata' );
  
      const durata = row.uscita - row.entrata;
      const costo =(durata * 0.01); 
      res.status(response);
    });
  });

app.delete('/biglietto/:id', (req, res) => {
    const id = req.params.id;
    db.run(`DELETE FROM biglietto WHERE id = ?`, id, (error, result) => {
        if(error){
            response = {
                "code": -1,
                "data": error.message
            }
            res.status(500).send(response);
        }
        response = {
            "code": 1,
            "data": result
        }
        res.status(200).send(response);
    });
});

app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.post('/biglietto', (req, res) => {
    if (!req.body.id){
        const error = "No id specified";
        response = {
            "code": -1,
            "data": error
        }
        res.status(400).send(response);
    }
    const id = req.body.id;
    console.log(id);
    db.run(`INSERT INTO biglietto (id) VALUES (?)`, id, (error, result) => {
        if(error){
            response = {
                "code": -1,
                "data": error.message
            }
            res.status(500).send(response);
        }
        response = {
            "code": 1,
            "data": result
        }
        res.status(201).send(response);
    });
});
