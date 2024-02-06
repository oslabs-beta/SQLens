// import { getTables } from '../App';



  export const getTables = async function () {
    const response = await fetch('/api/graphql', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      // This query is used to get the table names and columns from the database
      // This is a graphQL query, not a SQL query
      body: JSON.stringify({
        query: `
          query {
            getTableNames {
              name
              columns
              foreignKeys {
                columnName
                foreignTableName
                foreignColumnName
              }
            }
          }
        `,
      }),
    });
  
    const final = await response.json();
    if (final.errors) {
      console.error(final.errors);
      throw new Error('Error fetching tables');
    }
    return final.data.getTableNames;
  };

  export const fetchColumnData = async (tableName: string) => {
    const response = await fetch('/api/graphql', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        query: `
          query GetTableData($tableName: String!) {
            getTableData(tableName: $tableName) {
              columnData
            }
          }
        `,
        variables: { tableName },
      }),
    });

    const result = await response.json();
    if (result.errors) {
      console.error(result.errors);
      throw new Error('Error fetching column data');
    }
    return result.data.getTableData;
  };

  export const getTableDetails = async function(tableName: string) {
    const response = await fetch('/api/graphql', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        query: `
          query GetTableDetails($tableName: String!) {
            getTableDetails(tableName: $tableName) {
              name
              columns
              foreignKeys {
                columnName
                foreignTableName
                foreignColumnName
              }
            }
          }
        `,
        variables: { tableName },
      }),
    });
  
    const final = await response.json();
    if (final.errors) {
      console.error(final.errors);
      throw new Error('Error fetching table details');
    }
    // console.log(final.data)
    // console.log(final.data.getTableDetails)
    return final.data.getTableDetails;
  };


  // export const handleSubmit = async () => {
  //   const { databaseURI } = get(); 
  //   try {
  //     const response = await fetch('/api/setDatabaseUri', {
  //       method: 'POST',
  //       headers: { 'Content-Type': 'application/json' },
  //       body: JSON.stringify({ databaseURI }),
  //     });
  //     const data = await response.json();
  //     if (response.ok && data.message === 'Database connection updated successfully') {
  //       await fetchTables(set); 
  //     } else {
  //       console.error(data.error || 'Failed to update database URI');
  //     }
  //   } catch (error) {
  //     console.error('Error:', error);
  //   }
  // };




 