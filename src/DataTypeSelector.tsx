import * as React from 'react';
import { Theme } from '@mui/material/styles';
import OutlinedInput from '@mui/material/OutlinedInput';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select, { SelectChangeEvent } from '@mui/material/Select';

const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
  PaperProps: {
    style: {
      maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
      width: 250,
    },
  },
};

const dataTypes = ['int', 'date', 'bool', 'varchar(255)'];

function getStyles(name: string, personName: readonly string[], theme: Theme) {
  return {
    fontWeight:
      personName.indexOf(name) === -1
        ? theme.typography.fontWeightRegular
        : theme.typography.fontWeightMedium,
  };
}

export default function DataTypeSelector({
  handleDataTypeChange,
  selectedDataType,
}) {
  //   const theme = useTheme();
  // const [selectedDataType, setSelectedDataType] = React.useState<string[]>([]); //moved to parent

  return (
    <div>
      <FormControl sx={{ m: 1, width: 300, mt: 3 }}>
        <Select
          displayEmpty
          value={selectedDataType}
          onChange={handleDataTypeChange}
          input={<OutlinedInput />}
          MenuProps={MenuProps}
          inputProps={{ 'aria-label': 'Without label' }}
        >
          <MenuItem disabled value=''>
            <em>Select Data Type</em>
          </MenuItem>
          {dataTypes.map((dataType: string) => (
            <MenuItem key={dataType} value={dataType}>
              {dataType}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
    </div>
  );
}
