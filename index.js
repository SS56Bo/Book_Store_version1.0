const fs = require("fs");
const http = require("http");
const url = require("url");
const replTemp = require("./replTemp");
const slug = require("slugify");

// const read = fs.readFileSync("bookDetails.txt", "utf-8");
// // console.log(read);

// const putIn = `This is by Leo Tolstoy: ${read}. Text created on: ${Date.now()}`;
// fs.writeFileSync("output.txt", putIn);
// console.log("File Wriiten!");

////////////////////////////////////////////////////////////////////////////////

////////////// FUNCTION SPACE ////////////

//////////// SERVER /////////////////////
const tempOverview = fs.readFileSync("template-overview.html", "utf-8");
const tempProduct = fs.readFileSync("template-product.html", "utf-8");
const tempPage = fs.readFileSync("template-page.html", "utf-8");
const data = fs.readFileSync("bookDetails.json", "utf-8");
const dataObj = JSON.parse(data);
const slugs = dataObj.map((el) => slug(el.title, { lower: true }));
console.log(slugs);
const server = http.createServer((req, res) => {
  const { query, pathname } = url.parse(req.url, true);
  ////////////////// OVERVIEW PAGE //////////////////////////
  if (pathname === "/Overview" || pathname === "/") {
    res.writeHead(200, { "Content-type": "text/html" });

    const dataCard = dataObj.map((el) => replTemp(tempPage, el)).join("");
    const output = tempOverview.replace("{%PRODUCT_CARDS%}", dataCard);
    return res.end(output);
  }
  ////////////////// PRODUCT PAGE //////////////////////////
  else if (pathname === "/product") {
    res.writeHead(200, { "Content-type": "text/html" });
    const prod = dataObj[query.id];
    const outer = replTemp(tempProduct, prod);
    // console.log(query);
    return res.end(outer);
  }
  ////////////////// API PAGE //////////////////////////
  else if (pathname === "/api") {
    res.writeHead(200, { "Content-type": "application/json" });
    return res.end(data);
  }
  ////////////////// OVERVIEW PAGE //////////////////////////
  else {
    res.writeHead(404, {
      "Content-type": "text/html",
      "my-own-header": "Hello World",
    });
    return res.end("<h1>Page Not Found!</h1>");
  }
});

server.listen(8001, "127.0.0.1");
console.log("Server started!");
console.log("Server listening.................");
