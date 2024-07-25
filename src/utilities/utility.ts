export const getTables = async function () {
  const response = await fetch("/api/graphql", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
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
    throw new Error("Error fetching tables");
  }
  return final.data.getTableNames;
};

export const fetchColumnData = async (tableName: string) => {
  const response = await fetch("/api/graphql", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
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
    throw new Error("Error fetching column data");
  }
  return result.data.getTableData;
};

export const getTableDetails = async function (tableName: string) {
  const response = await fetch("/api/graphql", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
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
    throw new Error("Error fetching table details");
  }
  return final.data.getTableDetails;
};

export const mutateFetch = async (
  query: string,
  variables: { [key: string]: string; },
  errMsg: string
): Promise<boolean> => {
  try {
    const response = await fetch("/api/graphql", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        query,
        variables
      }),
    });

    const final = await response.json();
    if (final.errors) {
      console.error(final.errors[0].message);
      alert(final.errors[0].message);
      return false;
    } else {
      return true;
    }
  } catch (error) {
    console.error(`${errMsg}:`, error);
    return false;
  }
};
