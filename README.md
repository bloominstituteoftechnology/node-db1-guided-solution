# DB I Guided Project Solution

Guided project solution for **DB I** Module.

Starter code is here: [DB I Guided Project](https://github.com/LambdaSchool/webdb-i-guided).

## Prerequisites

- [SQLite Studio](https://sqlitestudio.pl/index.rvt?act=download) installed.
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

## Introduce Relational Databases

Quickly use the content on TK to introduce `Relational Databases and SQL`.

## Use SELECT to Query Data

- [Load this in the browser](https://www.w3schools.com/Sql/tryit.asp?filename=trysql_select_top).
- show how to restore the database by clicking the button on the page.
- open the `Application` tab on chrome dev tools and show the `Web SQL` node. Every browser gets it's own copy of the data.
- introduce the `SELECT` statement.

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

## Use LIKE Operator

Load the example of LIKE on TK and introduce the `%` and `_` wildcards.

```sql
select distinct City from Customers
where City like '%ar%'
order by City

select * from Customers where City like 'A_c%' -- returns Aachen and Anchorage
```

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

Walk through the syntax of the insert command.

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
-- demonstate what happens when the where clause is missing
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

## Introduce Knex.js
- Introduce the concept of a Query Builder
- [Load docs in the browser](https://knexjs.org).
- Browse Query Builder sections the docs, showing we can build SQL statements with JS

1. Open `posts/post-model.js`. Explain that we will use knex to build database helper methods. Also explain that `model` often refers to such a file that interfaces with the db for a single resource. 

2. Require `db-config` at the top of the file. Thiss will give us access to the query builder. Mention that some setup is necessary for `knex`, but that will be covered in the next lesson. 

```js
const db = require('../data/db-setup.js');
```

3. Write out the shells for all five helper methods and export them for use in the `post-router`. 

```js
const db = require('../data/db-setup.js');

module.exports = {
  find,
  findById,
  add,
  update,
  remove
};

function find() {

}

function findById(id) {

}

function add(post) {

}

function update(id, changes) {

}

function remove(id) {

}
```

**wait for students to catch up, use a `yes/no` poll to let students tell you when they are done**

## Use Knex to Select

1. Write a select all statment for the `find()` method

```js
function find() {
  // this will resolve to an array of posts
  return db('posts');
}
```

Mention that knex often has multiple ways to do the same thing. For example, they should also use `db.select('*').from('posts')`. This syntax looks more like the original SQL statements.

2. Use `find()` to write the `GET /api/posts/` endpoint in `posts/post-router`.

```js
// Import the post model near the top of the file
const Post = require('./post-model.js');
```

```js
router.get('/', async (req, res) => {
  try {
    const posts = await Posts.find();
    res.json(posts);
  } catch (err) {
    res.status(500).json({ message: 'Failed to get posts' });
  }
});
```

3. Test out this endpoint using `Postman` or the browser

### You Do (estimated 8m to complete)

Write the `findById()` model method and the `GET api/posts/:id` endpoint. Mention to look at the where clause in the `knex` docs.

One possible solution:

```js
function findById(id) {
  // we are passing an id object into the where method
  // this will resolve to an array containing a single post
  return db('posts').where({ id });
}
```

```js
router.get('/:id', async (req, res) => {
  const { id } = req.params;

  try {
    const posts = await Post.findById(id);
  
    // findById resolves to an array, so we must check the length
    if (posts.length) {
      res.json(posts);
    } else {
      res.status(404).json({ message: 'Could not find post with given id.' })
    }
  } catch (err) {
    res.status(500).json({ message: 'Failed to get post' });
  }
```

### Introduce first() 

If we prefer our findById method to return a single post instead of an array, we can use a method called `first()`. Refactor the code as follows:

```js
function findById(id) {
  // this will now resolve to a single post
  return db('posts').where({ id }).first();
}
```

```js
router.get('/:id', async (req, res) => {
  const { id } = req.params;

  try {
    // change from posts to post
    const post = await Post.findById(id);
  
    // we now check if our post is defined
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

1. Write an Insert statement for our `add()` method.

```js
function add(post) {
  // this knex statement will throw an error if the post object's keys do not match the columns in the database table
  return db('posts').insert(post);
}
```

2. Use `add()` to write the `POST /api/posts/` endpoint in `posts/post-router`.

```js
router.post('/', async (req, res) => {
  // We would want to validate the body here but are skipping this step to focus on db logic
  const postData = req.body;

  try {
    const post = await Post.add(postData);
    res.status(201).json(post);
  } catch (err) {
    console.log('POST err', err);
    res.status(500).json({ message: 'Failed to create new post' });
  }
});
```

3. Posts should have both `title` and `contents`. Test using `Postman` with an invalid body. Note the error in the console.

4. Test using `Postman` with a valid body. Note that the response is an array containg the id, rather than the full post. This is an easy fix in our `add()` method

```js
async function add(post) {
  // insert resolves to an array of ids
  // we can use our findById helper to return the full post instead
  const [ id ] = await db('posts').insert(post);
  return findById(id);
}
```

**wait for students to catch up, use a `yes/no` poll to let students tell you when they are done**

## Use Knex to Update and Delete

Show them the syntax for updating in `knex`, emphasing the importance of the where clause. Note that where comes before update, unlike in SQL.

```js
function update(id, changes) {
  // update resolves to a count of rows updated
  // additional code would be needed to send back the updated post
  return db('posts').where({ id }).update(changes);
}
```

### You Do (estimated 3m to complete)

Write the `remove()` model method. Mention to look for the `del()/delete()` method in the `knex` docs.

One possible solution:

```js
function remove(id) {
  // del/delete resolves to a count of rows removed
  // additional code would be needed to send back the removed post
  return db('posts').where({ id }).del();
}
```

**wait for students to catch up, use a `yes/no` poll to let students tell you when they are done**

## Finish Endpoints, show if time permits (10 minutes)

If there is extra time, review writing the `PUT` and `DELETE` endpoints, using our model methods.

1. Write `PUT /api/posts/:id`

```js
router.put('/:id', async (req, res) => {
  const { id } = req.params;
  // Once again we would want to validate the body here
  const changes = req.body;

  try {
    // update resolves to a count of records updated
    const count = await Post.update(id, changes);

    if (count) {
      res.json({ updated: count });
    } else {
      res.status(404).json({ message: 'Could not find post with given id'});
    }
  } catch (err) {
    console.log('PUT error', err);
    res.status(500).json({ message: 'Failed to update post' });
  }
});
```
2. Write `DELETE /api/posts/:id`

```js
router.delete('/:id', async (req, res) => {
  const { id } = req.params;

  try {
    // remove resolves to a count of records removed
    const count = await Post.remove(id);

    if (count) {
      res.json({ deleted: count });
    } else {
      res.status(404).json({ message: 'Could not find post with given id'});
    }
  } catch (err) {
    res.status(500).json({ message: 'Failed to delete post' });
  }
});
```

3. Test both endpoints with `Postman`.
