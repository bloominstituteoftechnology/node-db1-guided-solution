# DB Introduction Notes

## Expectations

- this week is about **using a database**, it's not about managing database servers.
- self study of Training Kit content is necessary.
- we use SQLite to introduce Relational Databases and Structured Query Language.
- using SQLite removes the complexity of installing and managing a database server.

## What we cover

- an introduction to what Relational Databases and Relational Database Management Systems are.
- an introduction to Structured Query Language (SQL, pronounced SEQUEL).
- managing data using the Structured Query Language.
- managing data using a Query Builder called Knex.
- working with multiple tables.
- designing the structure (called Schema) for a relational database.
- using SQLite Studio (a Graphical Tool) to interact with a SQLite database.

## What we don't cover

- installing a database server.
- database servers administration (totally different career).

a Relation is a Table.

Relational Databases store data in Tables.

A table has a collection of rows (record).

A row has many columns (fields).

A table (or a group of tables) is where resources are stored.

SQL = Structured Query Language

- manage (CRUD) data. << we'll do this >>
- manage the Database structure (schema).
- manage objects inside the database.
- manage the database server (security, monitoring, performance, analysis).

Relational DB Management System (RDBMS)

- server software to manage relational databases.
- some examples:

  - SQLite
  - PostgreSQL
  - MySQL
  - MS SQL Server
  - Oracle
  - MariaDB

## SQL Examples

The examples are in `./sql-examples.sql`

## Using a RDB from a Node.js API

[client] http(= JSON =) [API] proprietary protocol(= SQL =) [DBMS Server]

A **Query Builder (we'll use Knex)** translates between the API language (JS for Node.js) and SQL.

[API] == Knex == Database Driver (sqlite3, pg) == [RDBMS]

An Object Relational Mapper (ORM, ex. Sequelize and Bookshelf) is another way to connect an API to a RDBMS.

ORMs are more complex because they do more than a simple Query Builder.

```

```
