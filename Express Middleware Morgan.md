# Express Middleware Concepts

## 1️⃣ Morgan

* **Morgan** is a **middleware** library for Express used to **log all HTTP requests** coming to the server.
* Every time someone visits a page or sends data, Morgan prints information like:

  * Request method (GET, POST, etc.)
  * URL
  * Response status code (200, 404, etc.)
  * Response time

**Example usage:**

```javascript
import morgan from "morgan";
app.use(morgan("dev")); // 'dev' gives colored, easy-to-read logs
```

> Every request will be automatically logged in the console.

---

## 2️⃣ next()

* `next()` is a **function in Express middleware**.
* Its purpose: tell Express **"ok, continue to the next middleware or route"**.
* If you don’t call `next()`, the request **stops** at this middleware and never reaches the route.

**Example:**

```javascript
function logger(req, res, next) {
  console.log(`Request URL: ${req.url}`);
  next(); // important! allows the request to reach the next route
}
app.use(logger);
```

> Without `next()`, any request will stop here and not reach other routes like `/`.

---

## 3️⃣ logger function

* This is a **custom middleware function** to log anything about the request.
* You can log anything you want: time, user, page URL…
* It’s a general way to write your **own middleware** instead of using Morgan.

**Example:**

```javascript
function logger(req, res, next) {
  console.log(`${req.method} request to ${req.url}`);
  next(); // now the request continues to the next route
}

app.use(logger);
```

> Every request will be logged as:
> `GET request to /`
> `POST request to /submit`

---

## 4️⃣ __dirname

* **`__dirname`** (or using `dirname(fileURLToPath(import.meta.url))` in ES modules) is a **Node.js variable**.
* Its purpose: gives the **full path of the current folder** where the file resides.
* Often used to send static files (HTML, CSS, JS) or resolve paths dynamically.

**Example:**

```javascript
import { dirname } from "path";
import { fileURLToPath } from "url";

const __dirname = dirname(fileURLToPath(import.meta.url));

app.get("/", (req, res) => {
  res.sendFile(__dirname + "/public/index.html");
});
```

---

## 5️⃣ Key Differences Between Morgan and __dirname

| Feature               | Morgan                          | __dirname                |
| --------------------- | ------------------------------- | ------------------------ |
| Type                  | Express middleware              | Node.js variable         |
| Purpose               | Log HTTP requests               | Path of current folder   |
| Use case              | Debugging, monitoring requests  | Send static files, paths |
| Executes per request? | Yes, for every incoming request | No, just a constant      |

> **Summary:**
>
> * **`__dirname` =** know where your files are on the server
> * **Morgan =** monitor who is visiting your server and what requests are made
