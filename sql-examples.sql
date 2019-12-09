-- READ data
-- list of all our customers
-- select columns from table
select * from customer;

select FirstName, LastName from customer;

-- list of all the artists
select * from artist;

-- list of artists names organized alphabetically
select Name from artist order by Name; -- or order by Name desc;

-- list the first 10 artists organized ascending by name; -- research the limit keyword
select * from artist order by Name limit 10;

-- FILTERING ROWS
-- list all customer that live in Oslo
select * from customer 
where city = 'Prague'; -- always use sigle quotes for strings and dates

-- list invoices produced on or after March 1 2009
select * from invoice where InvoiceDate >= '2009-03-01' order by invoiceDate;

-- list of invoices without billing state
select * from invoice where billingState is null; -- is not null;

-- CREATE Data
-- add a new Genre fro Merengue
select * from genre order by name;

insert into Genre (Name) values ('Bachata');

-- add yourself as an Artist to the Database
select * from artist order by name;
insert into Artist (Name) values ('Luiz');

-- wildcard search
select * from Artist where Name like 'Lui%' order by Name;

-- UPDATE Data
select * from Artist
-- update Artist set Name = 'Luis Hernandez'
where ArtistId = 276;

-- DELETE data
select * from Artist
-- delete from Artist
where ArtistId = 276;