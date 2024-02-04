import { describe, it } from 'vitest';
import { render, screen } from '@testing-library/react';
import assert from 'assert'; 
import App from '../src/App';
import { MockedProvider } from '@apollo/client/testing';
import { MemoryRouter } from 'react-router-dom';
import { GET_TABLE_NAMES } from '../src/utilities/queries';

const mocks = [
  {
    request: {
      query: GET_TABLE_NAMES,
    },
    result: {
      data: {
        getTableNames: [
          {
            name: "Table1",
            columns: ["column1", "column2"], 
            foreignKeys: [
              {
                columnName: "column1",
                foreignTableName: "ForeignTable",
                foreignColumnName: "foreignColumn1",
              },
            ],
          },
        ],
      },
    },
  },
];

describe('App Routing to Flow', () => {
  it('renders the Flow component when navigating to /flow', async () => {
    render(
      <MockedProvider mocks={mocks} addTypename={false}>
        <App router={props => <MemoryRouter {...props} initialEntries={["/flow"]} />} />
      </MockedProvider>
    );

    // Wait for the element to appear in the DOM
    const flowContainer = await screen.findByTestId('flow-container');
    // Assert that the flow container is rendered
    assert.ok(flowContainer);
  });
});

describe('App Routing to Landing Page', () => {
    it('renders the Flow component when navigating to /flow', async () => {
      render(
        <MockedProvider mocks={mocks} addTypename={false}>
          <App router={props => <MemoryRouter {...props} initialEntries={["/"]} />} />
        </MockedProvider>
      );
  
      // Wait for the element to appear in the DOM
      const flowContainer = await screen.findByTestId('outer-container');
      // Assert that the flow container is rendered
      assert.ok(flowContainer);
    });
  });