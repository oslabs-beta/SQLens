# SQLens

SQLens is a powerful SQL database visualizer designed to simplify the complexities of managing and understanding relational databases with extensive foreign key relationships. In the world of database administration and development, keeping track of intricate relationships and optimizing queries across large datasets can be daunting. SQLens addresses these challenges head-on by providing a dynamic, graphical representation of your database schema, making it easier and more enjoyable to visualize, analyze, and manage data relationships.

<SQLens-logo goes here>

<SQLens-dynamic move goes here>

## Getting Started

### Initial Setup
1. Fork and clone this repository.
2. Run npm install to install dependancies.
3. Run npm build to ensure any dependancy updates are reflected.
4. Run npm start to spin up a server locally, and view your data on localhost:3000

### Using the app
- Simply enter in a URI string for a postgres database
<Gif of homepage>
- Click and drag to view foreign-key relationships between tables
<Gif of dynamic-move>
- Add a new table using the + button on the Add New Table component
- Add a column from the drop-down table to the right
- In the pop-out, name the column and select its data type from the drop-down menu
- Click Save to add.
- To rename columns, use the pencil tool
- To delete a column, simply click the trashcan, you will be asked "Are you sure?"
- To delete a table, use the menu to the right
<Gif of functional-tests>

- To download a migration file of any changes made, use the menu at the top left corner of the browser
<Gif of download-migration>