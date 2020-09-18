// const https = require("https");
// const express = require("express");
// const bodyParser = require("body-parser");
// const app = express();

// const axios = require("axios");

// const low = require("lowdb");
// const url = require("url");
// const FileSync = require("lowdb/adapters/FileSync");
// const adapter = new FileSync("db.json");
// const db = low(adapter);

// const Datastore = require("nedb");
// const logs = Datastore({ filename: "/.data/logs", autoload: "true" });
// const items = Datastore({ filename: "/.data/items", autoload: "true" });
// const bugs = Datastore({ filename: "/.data/bugs", autoload: "true" });

// const month = {
//   0: "January",
//   1: "February",
//   2: "March",
//   3: "April",
//   4: "May",
//   5: "June",
//   6: "July",
//   7: "August",
//   8: "September",
//   9: "October",
//   10: "November",
//   11: "December"
// };

// app.use(express.static("public"));
// app.use(bodyParser.urlencoded({ extended: false }));
// app.use(bodyParser.json());

// const compression = require("compression");
// app.use(
//   compression({
//     level: 9
//   })
// );

// app.put("/add", (req, res) => {
//   logs.insert({ page: "add", date: new Date() });
//   // var body = "";
//   // req.on("data", chunk => {
//   // body += chunk;
//   // });
//   req.on("end", body => {
//     var q = url.parse(req.url, true).query;
//     var user = String(q.user);
//     var stage = String(q.stage);
//     var items = String(q.items);
//     user = user.replace("undefined", "");
//     stage = stage.replace("undefined", "");
//     items = items.replace("undefined", "");
//     var arrItems = items.replace("[", "");
//     arrItems = arrItems.replace("]", "");
//     arrItems = arrItems.split(",");
//     items.push({
//       user: user,
//       stage: stage,
//       items: arrItems
//     });
//   });
//   res.redirect("/game");
// });

// app.get("/remove", (req, res) => {
//   logs.insert({ page: "remove", date: new Date() });
//   var q = url.parse(req.url, true).query;
//   var user = q.user;
//   items.remove({ user: user });
//   res.redirect("/game");
// });

// app.get("/clear", (req, res) => {
//   logs.insert({ page: "GET /clear", date: new Date() });
//   res.status(403);
//   res.end();
// });

// app.post("/clear", (req, res) => {
//   logs.insert({ page: "POST /clear", date: new Date() });
//   var body = "";
//   req.on("data", chunk => {
//     body += chunk;
//   });
//   req.on("end", () => {
//     body = url.parse("?" + body, true).query;
//     var username = body.username;
//     var password = body.password;
//     if (
//       username == process.env.USERNAME_SHA &&
//       password == process.env.PASSWORD_SHA
//     ) {
//       var length = items.value().length;
//       items.remove();
//       res.send("Cleared " + length + ' items from database "items"');
//       res.end();
//     } else {
//       res.status(401).send("Access Denied");
//       res.end();
//     }
//   });
// });

// app.get("/logs", (req, res) => {
//   logs.insert({ page: "GET /logs", date: new Date() });
//   res.status(403);
//   res.end();
// });

// app.post("/logs", (req, res) => {
//   logs.insert({ page: "POST /logs", date: new Date() });
//   var body = "";
//   req.on("data", chunk => {
//     body += chunk;
//   });
//   req.on("end", () => {
//     body = url.parse("?" + body, true).query;
//     var username = body.username;
//     var password = body.password;
//     if (
//       username == process.env.USERNAME_SHA &&
//       password == process.env.PASSWORD_SHA
//     ) {
//       var dbLogs = logs.find();
//       res.write("<script defer>\n");
//       res.write("setTimeout(() => {\n");
//       res.write(
//         "  document.querySelector('button').addEventListener('click', clear);\n"
//       );
//       res.write("  function clear() {\n");
//       res.write("    document.querySelector('#clear').submit();\n");
//       res.write("  }\n");
//       res.write("}, 1);\n");
//       res.write("</script>");
//       res.write("<button>Clear Logs</button>");
//       res.write(
//         "<p style='word-wrap: break-word; white-space: pre-wrap; font-size: 12px; font-family: Mono'>" +
//           "Filters, leave ones that you don't need blank</p>"
//       );
//       res.write(
//         "<form method='post' id='clear' action='/logs/clear' style='display: none'><input name=username value='" +
//           process.env.USERNAME_SHA +
//           "' type='hidden' /><input name=password value='" +
//           process.env.PASSWORD_SHA +
//           "' type='hidden' /></form> \
//         <form id='filter' method='post'>Page: <input name='page' /> IP: <input name='ip' /> \
//           <input type='hidden' name='username' value=" +
//           process.env.USERNAME_SHA +
//           "readonly /> \
//           <input type='hidden' name='password' value" +
//           process.env.PASSWORD_SHA +
//           "readonly /> \
//           <input type='submit' value='Filter' /></form>"
//       );
//       res.write(
//         "<p style='word-wrap: break-word; white-space: pre-wrap; font-size: 18px; font-family: Mono'>"
//       );
//       res.write(
//         "--------------------------------------------------------------"
//       );
//       res.write("\n\n");
//       var bool = false;
//       for (let x of dbLogs) {
//         if (body.ip != undefined) {
//           bool = true;
//           if (body.ip.match(/!/) == []) {
//             if (x.ip == body.ip) {
//               res.write(x.page + "\n" + x.ip + "\n" + new Date(x.date));
//               res.write("\n\n");
//               res.write(
//                 "--------------------------------------------------------------"
//               );
//               res.write("\n\n");
//             }
//           } else {
//             if (x.ip != body.ip.slice(1)) {
//               res.write(x.page + "\n" + x.ip + "\n" + new Date(x.date));
//               res.write("\n\n");
//               res.write(
//                 "--------------------------------------------------------------"
//               );
//               res.write("\n\n");
//             }
//           }
//         }
//         if (body.page != undefined) {
//           bool = true;
//           if (body.page.match(/!/) == []) {
//             if (x.ip == body.page) {
//               res.write(x.page + "\n" + x.ip + "\n" + new Date(x.date));
//               res.write("\n\n");
//               res.write(
//                 "--------------------------------------------------------------"
//               );
//               res.write("\n\n");
//             }
//           } else {
//             if (x.ip != body.page.slice(1)) {
//               res.write(x.page + "\n" + x.ip + "\n" + new Date(x.date));
//               res.write("\n\n");
//               res.write(
//                 "--------------------------------------------------------------"
//               );
//               res.write("\n\n");
//             }
//           }
//         }
//       }
//       if (!bool) {
//         for (let x of dbLogs) {
//           res.write(x.page + "\n" + x.ip + "\n" + new Date(x.date));
//           res.write("\n\n");
//           res.write(
//             "--------------------------------------------------------------"
//           );
//           res.write("\n\n");
//         }
//       }
//       res.write("</p>");
//       res.end();
//     } else {
//       res.sendStatus(401);
//       res.end();
//     }
//   });
// });

// app.get("/logs/clear", (req, res) => {
//   logs.insert({ page: "GET logs/clear", date: new Date() });
//   res.status(403);
//   res.end();
// });

// app.post("/logs/clear", (req, res) => {
//   var body = "";
//   req.on("data", chunk => {
//     body += chunk;
//   });
//   req.on("end", () => {
//     body = url.parse("?" + body, true).query;
//     var username = body.username;
//     var password = body.password;
//     if (
//       username == process.env.USERNAME_SHA &&
//       password == process.env.PASSWORD_SHA
//     ) {
//       var length = logs.value().length;
//       logs.remove();
//       res.write(
//         "<head><script>setTimeout(()=>{document.querySelector('form').submit();},5000);</script></head>"
//       );
//       res.write("Cleared " + length + ' items from database "Logs"');
//       res.write(
//         "<body><form method='post' action='/login' style='display:none'><input name='username' value=" +
//           process.env.ADMIN_USERNAME +
//           " /><input name='password' value=" +
//           process.env.ADMIN_PASSWORD +
//           " /></form></body>"
//       );
//       res.end();
//     } else {
//       res.status(401).write("Access Denied");
//       res.end();
//     }
//   });
// });

// app.get("/logs/raw", (req, res) => {
//   logs.insert({ page: "GET logs/raw", date: new Date() });
//   res.status(403);
//   res.end();
// });

// app.post("/logs/raw", (req, res) => {
//   logs.insert({ page: "POST logs/raw", date: new Date() });
//   var body = "";
//   req.on("data", chunk => {
//     body += chunk;
//   });
//   req.on("end", () => {
//     body = url.parse("?" + body, true).query;
//     if (
//       body.username == process.env.USERNAME_SHA &&
//       body.password == process.env.PASSWORD_SHA
//     ) {
//       logs.find().forEach(item => {
//         res.write(item + "\n");
//       });
//       res.end();
//     } else {
//       res.status(403);
//       res.end();
//     }
//   });
// });

// app.get("/database", (req, res) => {
//   logs.insert({ page: "database", date: new Date() });
//   var dbItems = [];
//   var items = items.value();
//   items.find().forEach(item => {
//     dbItems.push(
//       "User: " +
//         item.user +
//         "\n" +
//         "Stage: " +
//         item.stage +
//         "\n" +
//         "Items: [" +
//         item.items +
//         "]"
//     );
//   });

//   res.write("--------------------------------------------------------------");
//   res.write("\n\n");
//   for (let x of dbItems) {
//     res.write(x);
//     res.write("\n\n");
//     res.write("--------------------------------------------------------------");
//     res.write("\n\n");
//   }
//   res.end();
// });

// app.get("/databaseRaw", (req, res) => {
//   logs.insert({ page: "databaseRaw", date: new Date() });
//   var dbItems = items.find();
//   var items = items.value();
//   res.send(dbItems);
// });

// app.get("/", (req, res) => {
//   logs.insert({ page: "/", date: new Date() });
//   res.writeHead(308, { location: "/en" });
//   res.end();
// });

// app.get("/en", (req, res) => {
//   logs.insert({ page: "en", date: new Date() });
//   res.sendFile("/app/index-en.html");
// });

// app.get("/fr", (req, res) => {
//   logs.insert({ page: "fr", date: new Date() });
//   res.sendFile("/app/index-fr.html");
// });

// app.get("/zh", (req, res) => {
//   logs.insert({ page: "zh", date: new Date() });
//   res.sendFile("/app/index-zh.html");
// });

// app.get("/zhCn", (req, res) => {
//   logs.insert({ page: "zhCn", date: new Date() });
//   res.sendFile("/app/index-zhCn.html");
// });

// app.get("/game", (req, res) => {
//   logs.insert({ page: "game", date: new Date() });
//   res.sendFile("/app/game.html");
// });

// app.get("/game.js", (req, res) => {
//   res.sendFile("/app/script.js");
// });

// app.get("/game.css", (req, res) => {
//   res.sendFile("/app/style.css");
// });

// app.get("/developer", (req, res) => {
//   logs.insert({ page: "developer", date: new Date() });
//   res.sendFile("/app/developer.html");
// });

// app.get("/secret/secret", (req, res) => {
//   logs.insert({ page: "secret", date: new Date() });
//   res.sendFile("/app/login.html");
// });

// app.get("/login/style", (req, res) => {
//   res.sendFile("/app/login.css");
// });

// app.get("/secret/script", (req, res) => {
//   res.sendFile("/app/secret.js");
// });

// app.get("/secret/style", (req, res) => {
//   res.sendFile("/app/secret.css");
// });

// app.get("/normal", (req, res) => {
//   var address =
//     req.url.split("?")[1] === undefined || req.url.split("?")[1] === ""
//       ? "https://youtu.be/dQw4w9WgXcQ?t=43"
//       : req.url.split("?")[1].split("=")[1] === undefined ||
//         req.url.split("?")[1].split("=")[1] === ""
//       ? req.url.split("?")[1]
//       : req.url.split("?")[1].split("=")[1];
//   logs.insert({
//     page: "RICKR0LLED!!! " + address,

//     date: new Date()
//   });
//   if (
//     req.headers["x-forwarded-for"]
//       .split(",")[0]
//       .split(".")
//       .slice(0, 3)
//       .join(".") == "64.233.172"
//   ) {
//     res.status(401).write("Goodbye!");
//     res.end();
//   } else {
//     if (address != "none") {
//       res.redirect(address);
//     } else {
//       res.status(204);
//       res.end();
//     }
//   }
// });

// app.get("/normal2", (req, res) => {
//   logs.insert({ page: "NYAN CAT!!! ", date: new Date() });
//   if (
//     req.headers["x-forwarded-for"]
//       .split(",")[0]
//       .split(".")
//       .slice(0, 3)
//       .join(".") == "64.233.172"
//   ) {
//     res.status(401).write("Goodbye!");
//     res.end();
//   } else {
//     res.redirect("https://youtu.be/QH2-TGUlwu4");
//   }
// });

// app.get("/restart", (req, res) => {
//   logs.insert({ page: "login", date: new Date() });
//   reload(app).then(() => {
//     res.redirect("/login");
//     axios.post(
//       "https://mosquito-code.glitch.me/login",
//       "username=" +
//         process.env.ADMIN_USERNAME +
//         "&password=" +
//         process.env.ADMIN_PASSWORD
//     );
//   });
// });

// app.post("/login", (req, res) => {
//   logs.insert({ page: "login", date: new Date() });
//   var body = "";
//   req.on("data", chunk => {
//     body += chunk;
//   });
//   req.on("end", () => {
//     body = body.split("&");
//     var username = body[0].split("=")[1];
//     var password = body[1].split("=")[1];
//     if (
//       username === process.env.ADMIN_USERNAME &&
//       password === process.env.ADMIN_PASSWORD
//     ) {
//       res.sendFile("/app/secret.html");
//     } else {
//       res.sendFile("/app/incorrect.html");
//     }
//   });
// });

// app.get("/instructions", (req, res) => {
//   logs.insert({ page: "instructions", date: new Date() });
//   res.sendFile("/app/instructions.html");
// });

// app.get("/bug", (req, res) => {
//   logs.insert({ page: "bug" });
//   res.sendFile("/app/bug.html");
// });

// app.get("/bugsRaw", (req, res) => {
//   logs.insert({ page: "bugsRaw", date: new Date() });
//   var dbBugs = bugs.find();
//   res.send(dbBugs);
// });

// app.get("/bugReports", (req, res) => {
//   logs.insert({ page: "bugReports", date: new Date() });
//   var dbBugs = [];
//   var page = "";
//   var y = 0;
//   bugs.find().forEach(item => {
//     dbBugs.push('"' + item.bug + '" at "' + item.time + '"');
//   });

//   res.write("--------------------------------------------------------------");
//   res.write("\n\n");
//   for (let x of dbBugs) {
//     res.write(y + " " + x);
//     res.write("\n\n");
//     res.write("--------------------------------------------------------------");
//     res.write("\n\n");
//     y++;
//   }
//   res.end();
// });

// app.get("/bugReports/remove", (req, res) => {
//   logs.insert({ page: "bugReports/remove", date: new Date() });
//   var remove = url.parse(req.url, true).query.remove;
//   var array = [];
//   bugs.value().forEach(item => {});
//   res.redirect("/bugReports");
// });

// app.post("/addBugs", (req, res) => {
//   logs.insert({ page: "addBugs", date: new Date() });
//   var body = "";
//   var bool = false;
//   req.on("data", chunk => {
//     body += chunk;
//   });
//   req.on("end", () => {
//     body = url.parse("?" + body, true).query;
//     var timeOffset = body.localTime;
//     var bug = decodeURIComponent(decodeURIComponent(body.bug));
//     axios.get("https://mosquito-code.glitch.me/normal", "hello");
//     axios
//       .post(
//         "https://www.google.com/recaptcha/api.pageverify",
//         "secret=" +
//           process.env.GRECAPTCHASECRET +
//           "&response=" +
//           body["g-recaptcha-response"]
//       )
//       .then(res => {
//         var success = res.data.success;
//         var timestamp = res.data.challenge_ts;
//         var localTime = new Date(timestamp).getHours() - timeOffset;
//         var timeObj = new Date(timestamp);
//         var time = timeObj.getHours();
//         var offset = 0;
//         if (localTime < 0) {
//           localTime += 24;
//           offset = -1;
//         }
//         if (localTime > 23) {
//           localTime -= 24;
//           offset = 1;
//         }
//         time += "/";
//         time += localTime + ":";
//         time += timeObj.getMinutes() + ":";
//         time += timeObj.getSeconds() + " ";
//         time += month[timeObj.getMonth()] + " ";
//         time += timeObj.getDate() + offset + ", ";
//         time += timeObj.getFullYear();
//         var id = db.getState().bugs.length;
//         var bugs = bugs.find()
//         bugs.remove();
//         ``;
//         for (let x of bugs) {
//           x[3]++;
//         }
//         if (success) {
//           bugs.push({
//             bug: bug,
//             timestamp: timestamp,
//             time: time,
//             id: 0
//           });
//         }
//         for (let x of bugs) {
//           bugs.push({
//             bug: x[0],
//             timestamp: x[1],
//             time: x[2],
//             id: x[3]
//           });
//         }
//       });
//   });
//   res.redirect("/game");
// });

// app.get("/glitch", (req, res) => {
//   res.send(
//     "<head><script src='https://cdn.glitch.com/ea12a708-fe8c-4d9d-b63b-0601e81995c9%2Fjquery-3.5.1.slim.min.js?v=1592338064894'></script></head>"
//   );
// });

// app.get("/google", (req, res) => {
//   res.send(
//     "<head><script src='https://ajax.googleapis.com/ajax/libs/jquery/3.5.1/jquery.min.js'></script></head>"
//   );
// });

// app.get("/glitch.min", (req, res) => {
//   res.send(
//     "<head><script src='https://cdn.glitch.com/ea12a708-fe8c-4d9d-b63b-0601e81995c9%2Fjfeiowqjfioewjfoiwqejfioewqfio.js?v=1592338059649'></script></head>"
//   );
// });

// app.get("/uptimeRobot", (req, res) => {
//   res.status(204);
//   res.end();
// });

// app.get("/end", (req, res) => {
//   res.send(new Date());
//   res.end();
// });

// app.get("/wip", (req, res) => {
//   logs.insert({ page: "wip", date: new Date() });
//   res.sendFile("/app/WIP.html");
// });

// app.get("/input", (req, res) => {
//   res.sendFile("/app/test.html");
// });

// app.listen(process.env.PORT);
require("http").createServer((req, res) => {
  console.log("ehllo")
  if (req.url == "/image.png") {
    require("fs").readFile("favicon.ico", (err, data) => {
      res.end(data);
      require("fs").appendFile("thing", JSON.stringify(req.headers), () => {});
    });
  } else {
    res.writeHead(303, {"Location": "https://www.youtube.com/watch?v=dQw4w9WgXcQjIy8UyeT"});
    res.end()
  }
}).listen(3000);
