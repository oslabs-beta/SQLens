import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import OutlinedInput from '@mui/material/OutlinedInput';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
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
const dataTypes = ['bit(8)',
    'bool',
    'date',
    'decimal',
    'int',
    'json',
    'varchar (255)'];
export default function DataTypeSelector({ handleDataTypeChange, selectedDataType, }) {
    //   const theme = useTheme();
    // const [selectedDataType, setSelectedDataType] = React.useState<string[]>([]); //moved to parent
    return (_jsx("div", { children: _jsx(FormControl, { sx: { m: 1, width: 300, mt: 3 }, children: _jsxs(Select, { displayEmpty: true, value: selectedDataType, onChange: handleDataTypeChange, input: _jsx(OutlinedInput, {}), MenuProps: MenuProps, inputProps: { 'aria-label': 'Without label' }, children: [_jsx(MenuItem, { disabled: true, value: '', children: _jsx("em", { children: "Select Data Type" }) }), dataTypes.map((dataType) => (_jsx(MenuItem, { value: dataType, children: dataType }, dataType)))] }) }) }));
}
