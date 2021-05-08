const express = require('express');
const puppeteer = require('puppeteer');

const app = express()
const port = 3000

const loginUrl = 'http://bms.latest/login'

const report_url = 'http://bms.latest/Reports'

let browser;
let page;

//step-1 initiate pupeeteer function

async function initiatePupeeteer() {
    browser = await puppeteer.launch({
        headless: true,
        useChrome: true,
        stealth: true,
    });
    console.log("browser initiated")
    page = await browser.newPage();
    await page.setViewport({ width: 1366, height: 768 });
    console.log("page initiated")
}

async function login(url) {
    await page.goto(url);
    await page.pdf({ path: "./loginbms.pdf", format: 'A4' });
    // Fill out login information in the login form
    await page.type('#bms_email', `newronsolutions@gmail.com`);
    await page.type('#bms_password', `Newronreports@2020`);

    // Logging into the site
    await page.click('#bms_login', { waitUntil: 'networkidle2', timeout: 0 });

    console.log('Logged In');
    await page.waitForTimeout(4000)
    await page.goto(report_url, { waitUntil: 'networkidle2', timeout: 0 });
    // await page.select('select#floor', '5TH_FLOOR')
    // console.log(await page.select('select#floor', '5TH_FLOOR'))
    // await page.evaluate(() => {
    //     document.getElementById('floor').selectedIndex = 0;
    // });
    await page.click('#generate', { waitUntil: 'networkidle2', timeout: 0 });
    await page.waitForTimeout(5000)
    await page.pdf({ path: "./reportsbms.pdf", format: 'A4' });

}

async function redirectReports(report_url) {

    // const browser = await puppeteer.launch({ headless: true });


}
async function printPDF(report_url) {
    // const browser = await puppeteer.launch({ headless: true });
    // const page = await browser.newPage();
    // await page.goto(report_url, { waitUntil: 'networkidle2', timeout: 0 });
    // const pdf = await page.pdf({ path: "./bms.pdf", format: 'A4' });

    // await browser.close();
    return pdf
}
// async function pdfGenerator() {
//     webbrowser = await puppeteer.launch({
//         headless: true,
//         useChrome: true,
//         stealth: true,
//     });
//     const page2 = await webbrowser.newPage();
//     await page2.goto("http://bms.latest/Reports");
//     await page2.pdf({ path: "./bms.pdf", format: "Letter" });
//     await webbrowser.close();
// }
async function getReady() {
    await initiatePupeeteer();
    await login(loginUrl);
    // await page.waitForTimeout(4000)
    // await redirectReports(report_url);
    // await page.waitForTimeout(4000)
    // await printPDF(report_url)
    // await pdfGenerator();
}
getReady();
app.get('/', (req, res) => res.send('Hello World!'));
// app.get("/pdf", async(req, res) => {
//     console.log("req", req)
//     const url = report_url
//     console.log("url", report_url)
//     const browser = await puppeteer.launch({
//         headless: true
//     });

//     const webPage = await browser.newPage();

//     await webPage.goto(url);

//     const pdf = await webPage.pdf({
//         printBackground: true,
//         format: "Letter",
//         margin: {
//             top: "20px",
//             bottom: "40px",
//             left: "20px",
//             right: "20px"
//         }
//     });

//     await browser.close();

//     res.contentType("application/pdf");
//     res.send(pdf);
// })


async function reset() {
    await browser.close();
    await getReady();
}





app.get('/reset', (req, res) => {
    reset();
})

app.listen(port, () => console.log(`listening on port ${port}!`));