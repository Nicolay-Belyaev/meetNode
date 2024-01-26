const express = require(`express`);
const fs = require(`fs`);
const path = require(`path`);

const app = express();
const port = 3000;
const countersPath = "counters.json";

app.get('/', (req, res) => {
    res.send("Welcome to my Express HTTP Server!")
});

app.get('/about', (req, res) => {

})
app.listen(port, () => {
    if(!fs.existsSync(countersPath)) {
        try {
            fs.writeFileSync(countersPath, `{\n"mainPageCounter": 0,\n "aboutPageCounter": 0\n}`)
            console.log("Counters log file created successfully")
        } catch (err) {
            console.log("Cannot create log file!");
            console.log(err);
        }
    }

    console.log(`Sever successfully started on port ${port}`)
})