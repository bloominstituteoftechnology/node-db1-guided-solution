# Introduction to Relational Databases, SQL and Knex Solution

Starter code is here: [DB I Guided Project](https://github.com/LambdaSchool/webdb-i-guided).

## Prerequisites

- [This Query Tool Loaded in the browser](https://www.w3schools.com/Sql/tryit.asp?filename=trysql_select_top).

## Project Setup

The [starter code](https://github.com/LambdaSchool/webdb-i-guided) for this project is configured to run the server by typing `yarn server` or `npm run server`. The server will restart automatically on changes.

## How to Contribute

- clone the [starter code](https://github.com/LambdaSchool/webdb-i-guided).
- create a solution branch: `git checkout -b solution`.
- add this repository as a remote: `git remote add solution https://github.com/LambdaSchool/webdb-i-guided-solution`
- pull from this repository's `master` branch into the `solution` branch in your local folder `git pull solution master:solution --force`.

A this point you should have a `master` branch pointing to the student's repository and a `solution` branch with the latest changes added to the solution repository.

When making changes to the `solution` branch, commit the changes and type `git push solution solution:master` to push them to this repository.

When making changes to the `master` branch, commit the changes and use `git push origin master` to push them to the student's repository.

## Introduce Module Challenge

Introduce the project for the afternoon. If they are done early, encourage them to study tomorrow's content and follow the tutorials on TK.

## Introduce Relational Databases and SQL

Do a brief review of `Relational Databases` and `SQL` using TK. The students should be familiar with the ideas from the pre-class video.

## Use SELECT to Query Data

- [Load this in the browser](https://www.w3schools.com/Sql/tryit.asp?filename=trysql_select_top).
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

3. Open `posts/post-router.js`. Note that `db-config` has been imported, which will give us access to the query builder. 

## Use Knex to Select

1. When writing `GET /api/accounts`, instead of using prewritten database models, we can access the database directly using a knex select statement like so: 

```js
router.get('/', async (req, res) => {
  const posts = await db('posts');
}
```

Mention that knex often has multiple ways to do the same thing. For example, they could also use `db.select('*').from('posts')`. This syntax looks more like the original SQL statements.

2. Finish the endpoint as per usual. Note that because all knex queries are promises we have to use try/catch. 

```js
router.get('/', async (req, res) => {
  try {
    const posts = await db('posts');
    res.json(posts);
  } catch (err) {
    res.status(500).json({ message: 'Failed to get posts' });
  }
});
```

3. Test out this endpoint using `Postman` or the browser

### You Do (estimated 5m to complete)

Write the `GET api/posts/:id` endpoint. Mention to look at the where clause in the `knex` docs.

One possible solution:

```js
router.get('/:id', async (req, res) => {
  const { id } = req.params;

  try {
    const [ post ] = await db('posts').where({ id });

    if (post) {
      res.json(post);
    } else {
      res.status(404).json({ message: 'Could not find post with given id.' })
    }
  } catch (err) {
    res.status(500).json({ message: 'Failed to get post' });
  }
```

**wait for students to catch up, use a `yes/no` poll to let students tell you when they are done**

## Use Knex to Insert

1. Write an Insert statement using knex.

```js
router.post('/', async (req, res) => {
  const postData = req.body;

  try {
    const post = await db('posts').insert(postData);
  } catch (err) {

  }
});
```

2. Finish writing the `POST /api/posts/` endpoint as expected.

```js
router.post('/', async (req, res) => {
  const postData = req.body;

  try {
    const post = await db('posts').insert(postData);
    res.status(201).json(post);
  } catch (err) {
    console.log('POST err', err);
    res.status(500).json({ message: 'Failed to create new post' });
  }
});
```

3. Posts should have both `title` and `contents`. Test using `Postman` with an invalid body. Note the error in the console.

4. Test using `Postman` with a valid body. Note that the response is an array containing the id, rather than the full post. We can update our endpoint.

```js
router.post('/', async (req, res) => {
  const postData = req.body;

  try {
    // insert returns an array containing an id
    const [ id ] = await db('posts').insert(postData);
    res.status(201).json({ id });
  } catch (err) {
    console.log('POST err', err);
    res.status(500).json({ message: 'Failed to create new post' });
  }
});
```

**wait for students to catch up, use a `yes/no` poll to let students tell you when they are done**

## Use Knex to Update and Delete

1. Show them the syntax for updating in `knex`, emphasis on the importance of the where clause. Note that where comes before update, unlike in SQL.

```js
router.put('/:id', async (req, res) => {
  const { id } = req.params;
  const changes = req.body;

  try {
    // update resolves to a count of records updated
    const count = await db('accounts')
      .where({ id })
      .update(changes);

  } catch (err) {

  }
});
```

2. Finish the endpoint. 

```js
router.put('/:id', async (req, res) => {
  const { id } = req.params;
  const changes = req.body;

  try {
    // update resolves to a count of records updated
    const count = await db('accounts')
      .where({ id })
      .update(changes);

    if (count) {
      res.json({ updated: count });
    } else {
      res.status(404).json({ message: 'Could not find post with given id' });
    }
  } catch (err) {
    console.log('PUT error', err);
    res.status(500).json({ message: 'Failed to update post' });
  }
});
```

### You Do (estimated 5m to complete)

Write `DELETE /api/accounts`. Mention to look for the `del()/delete()` method in the `knex` docs.

One possible solution:

```js
router.delete('/:id', async (req, res) => {
  const { id } = req.params;

  try {
    // del() resolves to a count of records removed
    const count = await db('accounts')
      .where({ id })
      .del();

    if (count) {
      res.json({ deleted: count });
    } else {
      res.status(404).json({ message: 'Could not find post with given id' });
    }
  } catch (err) {
    res.status(500).json({ message: 'Failed to delete post' });
  }
});
```

Time permitting, test both endpoints with `Postman`.
