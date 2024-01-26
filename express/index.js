const express = require(`express`);
const fs = require(`fs`);

const app = express();
const port = 3000;
const countersPath = "counters.json";

app.use((req, res, next) => {
    const countersObj = JSON.parse(fs.readFileSync(countersPath, 'utf8'))
    switch (req.url) {
        case "/":
            countersObj.mainPageCounter += 1;
            break;
        case "/about":
            countersObj.aboutPageCounter += 1;
            break;
    }
    fs.writeFileSync(countersPath, JSON.stringify(countersObj));
    next();
})

app.get('/', (req, res) => {
    const countersObj = JSON.parse(fs.readFileSync(countersPath, 'utf8'))
    res.send(`<h1>Welcome to my Express HTTP Server!</h1>` +
                   `<p>Main page visits counter: ${countersObj.mainPageCounter}</p>` +
                   `<a href="/about">About page</a>`)
});

app.get('/about', (req, res) => {
    const countersObj = JSON.parse(fs.readFileSync(countersPath, 'utf8'))
    res.send(`<h1>About page!</h1>` +
                   `<p>About page visits counter: ${countersObj.aboutPageCounter}</p>`+
                   `<a href="/">Main page</a>`)
})
app.listen(port, () => {
    if(!fs.existsSync(countersPath)) {
        try {
            fs.writeFileSync(countersPath, `{\n"mainPageCounter": 0,\n"aboutPageCounter": 0\n}`)
            console.log("Counters log file created successfully")
        } catch (err) {
            console.log("Cannot create log file!");
            console.log(err);
        }
    }
    console.log(`Sever successfully started on port ${port}`)
})
