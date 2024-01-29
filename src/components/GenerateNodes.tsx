// import Node from 'react-flow';
interface Table {
    name: string;
    columns: string[];
    foreignKeys: ForeignKey[];
  }

 const generateNodes = (tables: Table[]) => {
    const nodes: Node[] = [];
    let layoutX: number = 0;
    let layoutY: number = 0;

    tables.forEach((table: TableObj, 
        // tIndex: number
        ): void => {
      //layout calcs
      if (layoutY > 600) {
        layoutY = 0;
        layoutX += 375;
      }

      //create group node for each table
      const groupNode: Node = {
        id: `table-${table.name}`, //tables[index][name]
        type: 'turbo',
        // type: 'input',
        data: {
          label: table.name,
        //   fetchAndUpdateTables: fetchTables,
        },
        className: 'light',
        position: { x: layoutX, y: layoutY },
        style: {
          width: 250,
          height: 75 + table.columns.length * 40,
          // backgroundColor: "rgba(245, 245, 245, 0.9)",
          // borderRadius: "4px",
          // boxShadow: "0px 2px 4px rgba(0,0,0,0.1)",
        },
      };
    //   console.log(table.name);
      nodes.push(groupNode);

      //initialize column node position at 45px from top
      let y = 60;
      // iterate through columns array and create node for each column name
      table.columns.forEach((column: string, 
        // cIndex: number
        ): void => {
        const columnNode: Node = {
          // id: 'A-2',
          id: `table-${table.name}-column-${column}`,
          // type: 'custom',
          data: {
            label: column,
            parent: table.name,
            // fetchAndUpdateTables: fetchTables,
          },
          type: 'colNode',
          position: { x: 15, y: y },
          parentNode: `table-${table.name}`,
          draggable: false,
          extent: 'parent',
          style: {
            width: 220,
            height: 40,
          },
        };
        // console.log(column);
        nodes.push(columnNode);
        y += 40;
      });
      layoutY += 150 + table.columns.length * 40;
    });

    // makes a custom node to allow for adding tables
    const addTable: Node = {
      id: 'add-table-node', // A unique identifier for your custom node
      type: 'turbo', // Define a custom type if needed
      data: {
        label: 'Add New Table',
        // fetchAndUpdateTables: fetchTables,
        // Custom label or any other data you want to include
        // Other custom data properties...
      },
      position: { x: layoutX, y: layoutY }, // Define the position
      // position: { x: 700, y: 1100 }, // Define the position
      style: {
        width: 250,
        // height: 60 + table.columns.length * 40,
        // backgroundColor: "rgba(245, 245, 245, 0.9)",
        // borderRadius: "4px",
        // boxShadow: "0px 2px 4px rgba(0,0,0,0.1)",
      },
      // Other properties if needed...
    };
    nodes.push(addTable);

    console.log('nodes generated');
    return nodes;
  };

  export default generateNodes;