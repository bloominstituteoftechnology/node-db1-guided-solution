# Introduction to Relational Databases, SQL and Knex Solution

Starter code is here: [DB I Guided Project](https://github.com/LambdaSchool/webdb-i-guided).

## Prerequisites

- [SQLite Studio Installed](https://sqlitestudio.pl/index.rvt?act=download).
- [This Web SQL Tool Loaded in a chrome or chromium browser tab](https://www.w3schools.com/Sql/trysql.asp?filename=trysql_select_all). It does not work well on Firefox.

## Project Setup

The [starter code](https://github.com/LambdaSchool/node-db1-guided) for this project is configured to run the server by typing `npm run server`. The server will restart automatically on changes.

## Introduce Module Challenge

Introduce the project for the afternoon. If they are done early, encourage them to study tomorrow's content and follow the tutorials in Canvas.

## Introduce Relational Databases and SQL

Do a brief review of `Relational Databases` and `SQL` using Canvas. The students should be familiar with the ideas from the pre-class video.

## Use A Playground to Query Data

- [Load this in the browser](https://www.w3schools.com/Sql/trysql.asp?filename=trysql_select_all).
- show how to restore the database by clicking the button on the page.
- open the `Application` tab on chrome dev tools and show the `Web SQL` node. Every browser gets it's own copy of the data.

```sql
-- SELECT ----------------------------------------------------------------------------

-- 1- discuss SELECT, capitalization of keywords, of table names, semicolon, star
SELECT * FROM customers;
-- LEARNER: get all the records from the employees table
SELECT * FROM employees;

-- 2- discuss order of columns, dot notation
SELECT contactname, customername, city, country FROM customers;
SELECT customers.city, customers.* FROM customers;

-- LEARNER: select the id, first name and last name columns from the employees table
SELECT employeeid, firstname, lastname FROM employees;

-- 3- discuss combining columns to create new ones
SELECT (firstname || ' ' || lastname) as fullname FROM employees;

-- LEARNER: select a full address column concatenating other columns
SELECT (postalcode || ' ' || country) as theaddress FROM customers;

-- 4- dicuss WHERE, AND, OR, LIKE, strings, comparison operators, wildcards in strings
SELECT * FROM customers WHERE country = 'Spain' AND postalcode > 20000;
SELECT * FROM customers WHERE country LIKE '%land' AND postalcode > 20000;

-- LEARNER: find employees whose records do not mention university
SELECT * FROM employees WHERE notes NOT LIKE '%university%';
-- LEARNER: find all the products that are beverages
SELECT * FROM products WHERE categoryid = 1;
-- LEARNER: find all the orders made after Jan 1st 1997
SELECT * FROM orders WHERE orderdate > '1997-01-01';

-- 5- discuss ORDER BY, ASC, DESC, LIMIT, note that WHERE must come before ORDER BY
SELECT * FROM customers ORDER BY country DESC, city ASC LIMIT 4;

-- LEARNER: get all products sorting them by category ascending and then by price descending
SELECT * FROM products ORDER BY categoryid ASC, price DESC;

-- INSERT ----------------------------------------------------------------------------

-- 6- discuss INSERT
INSERT INTO shippers (shippername, phone) VALUES ('Ac', '123456');

-- LEARNER: insert another shipper, missing the phone
INSERT INTO shippers (shippername) VALUES ('Ac 2');
-- LEARNER: find all the shippers whose phone IS null
SELECT * FROM shippers WHERE phone IS null;

-- UPDATE ----------------------------------------------------------------------------

-- 7- discuss UPDATE and the importance of the WHERE clause
UPDATE shippers SET shippername = 'Acme', phone = '1234' WHERE shipperid = 4;
-- LEARNER: add the missing phone to the second shipper we added
UPDATE shippers SET shippername = 'Acme 2', phone = '1234' WHERE shipperid = 5;

-- DELETE ----------------------------------------------------------------------------

-- 7- discuss DELETE and the importance of the WHERE clause
DELETE FROM shippers WHERE shipperid = 4;
-- LEARNER: delete the second shipper we added
DELETE FROM shippers WHERE shipperid = 4;
```

## Introduce Query Builders

Go through a brief explanation of what a `Query Builder` is and how it is simpler than a full fledge ORM like [Sequelize](http://docs.sequelizejs.com/), while providing a nice API we can use from JS.

Explain that the query builder will translate from JavaScript code to the valid SQL

Explain that the library also provides a way to use raw SQL for things that are not supported through the JS API.

## Introduce Knex

[Load docs in the browser](https://knexjs.org). Browse Query Builder sections the docs, showing we can build SQL statements with JS

1. Show that the `knex` and `sqlite3` libraries are already added.
2. Open `data/db-config.js` file. Mention this is where `knex` is configured, and we'll be learning more about it in the next lesson.
3. Open `knexfile.js` file. Mention this is where we define different sets of db configurations for different environments.

## Use Knex

1. Smoke-test with Postman or Insomnia that all CRUD endpoints are wired and ready to go
2. Flesh out the `post-model.js` comparing out the Knex syntax with the SQL underneath. (See comments inside `post-model.js`.)

- `db('foo-table')` returns a promise that resolves to an **array** with all records in the table
- `db('foo-table').where({ role: 'Student', active: true })` resolves to an **array** of all records that satisfy the where
- `db('foo-table').where('name', 'Mary')` is an alternative for when there is just one where condition
- `db('foo-table').where('id', 7).first()` will resolve to the **record** we want (if the id is unique for a table) or **undefined**
- `db('foo-table').insert({ bar: 'baz' })` resolves to an **array** containing the **ids of the records** inserted into the table
- `db('foo-table').where('id', id).update({ bar: 'new bar' })` resolves to the **number of records** affected by the update
- `db('foo-table').where('id', id).delete()` resolves to the **number of records** affected by the delete

3. Flesh out the middleware functions inside `post-router.js` so we keep the code as DRY as possible (See code inside `post-router.js`.)
4. Fix the endpoints inside `post-router.js` noting how clean they are since the model functions and middlewares do all the heavy lifting
