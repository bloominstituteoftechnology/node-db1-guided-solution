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

## Use SELECT to Query Data

- [Load this in the browser](https://www.w3schools.com/Sql/trysql.asp?filename=trysql_select_all).
- show how to restore the database by clicking the button on the page.
- open the `Application` tab on chrome dev tools and show the `Web SQL` node. Every browser gets it's own copy of the data.
- review the `SELECT` statement.

```sql
select * from customers -- explain the most basic syntax for a select and what the * means

-- next show how to cherry pick the columns we want on the results and that they can be on any order
select City, CustomerName, ContactName from Customers

-- next show how to filter using the where clause
select City, CustomerName, ContactName
from Customers
where City = 'Berlin' -- this online tool is case sensitive when comparing strings, that is normally not the case

-- introduce and and or operator
select City, CustomerName, ContactName
from Customers
where Country = 'France' and City = 'Paris'

-- change it to use or
where Country = 'France' or City = 'Paris'
```

**wait for students to catch up, use a `yes/no` poll to let students tell you when they are done**

### You Do (estimated 3m to complete)

Ask student to write a query to get the list of products with category id of 2: how many records they get?
Ask student to write a query to get the the name of category id of 2: what is the name?

A possible solution:

```sql
select * from products where CategoryId = 2

select name from Categories where CategoryId = 2
```

**wait for students to catch up, use a `yes/no` poll to let students tell you when they are done**

## Use ORDER BY clause

```sql
select * from products order by price -- can be desc or asc, it is asc by default

-- what if we want it descending
select * from products order by price desc
```

### You Do (estimated 3m to complete)

Ask student to write a query to get the list of products that cost more than 50 organized by price descending.

A possible solution:

```sql
select * from products
where price > 50        -- note that where must come before order by
order by price desc
```

**wait for students to catch up, use a `yes/no` poll to let students tell you when they are done**

## Use LIMIT Operator

Limit can be used to show a limited number of records.
We can use it with an order by statement to show to 5 most expensive products

```sql
select * from products
order by price desc
limit 5
```

**wait for students to catch up, use a `yes/no` poll to let students tell you when they are done**

## Use INSERT to Add Data to a Table

Review the syntax of the insert command.

```sql
-- show basic syntax
-- we can add fields in any order, the values just need to be in the same ordinal position
-- note the id will automatically be assigned
insert into Customers (Country, CustomerName, ContactName, Address, City, PostalCode)
values ('USA', 'Lambda School', 'Austen Allred', '1 Lambda Court', 'Provo', '84601');

-- get the inserted record
select * from customers order by id desc limit 3
```

### You Do (estimated 3m to complete)

Ask student to insert a new shipper into the Shippers table

A possible solution:

```sql
insert into Shippers ( ShipperName, Phone )
values ( 'Ship2U', '(555) 666-7777')
```

**wait for students to catch up, use a `yes/no` poll to let students tell you when they are done**

## Use UPDATE to Modify Data

```sql
update Customers set City = 'Silicon Valley'
where CustomerName = 'Lambda School'
```

```sql
-- demonstrate what happens when the where clause is missing
update Customers set City = 'Silicon Valley'
-- reset the database
```

**wait for students to catch up, use a `yes/no` poll to let students tell you when they are done**

## Use DELETE to Remove Data

```sql
delete from Customers
-- always remember to have a where clause or it will delete all records in the table
where CustomerName = 'Around the Horn'
```

### You Do (estimated 3m to complete)

Ask student to delete all customers from the UK

A possible solution:

```sql
delete from Customer
where Country = 'UK'
-- should delete 7 records
```

**wait for students to catch up, use a `yes/no` poll to let students tell you when they are done**

**Take a break if it's a good time**

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
