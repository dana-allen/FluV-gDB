import React, {useEffect, useState} from "react"
import { TextField, Box, InputLabel, MenuItem, FormControl, Select } from '@mui/material';

import { Button, ButtonGroup } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faTrashCan, faPlus } from '@fortawesome/free-solid-svg-icons'
import SequencesTable from '../sequences/SequencesTable'

import '../../../assets/styles/filters.css'

const AdvancedFilter = () => {

    const [resultsData, setResultsData] = useState([]);

    const [children, setChildren] = useState([]);

    const [columnNames, setColumnNames] = useState([])
    const [tableColumns, setTableColumns] = React.useState([]);

    useEffect(() => {
        fetch(`${process.env.REACT_APP_BACKEND_URL}/api/get_meta_data_columns/`, {
            headers: { 'database': process.env.REACT_APP_DATABASE },
        })
            .then((response) => {
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                return response.json();
            })
            .then((data) => {
                setTableColumns(data)
            })
            .catch((error) => {
                console.error('Error:', error);
            });
    }, [])

    useEffect(() => {
        children.forEach((child, idx) => {
            const { id, content } = child;

            if (content) {
            const { searchField, searchExpression, searchValue, dropdown } = content;

            // Format the expression like the component does
            let formattedValue = `'${searchValue}'`;
            if (searchExpression === 'IN' || searchExpression === 'NOT IN') {
                const items = searchValue.split(",").map(i => i.trim());
                formattedValue = `('${items.join("', '")}')`;
            } else if (searchExpression === 'BETWEEN') {
                const items = searchValue.split(",").map(i => i.trim());
                formattedValue = `${items.join(' AND ')}`;
            } else if (searchExpression === 'LIKE') {
                formattedValue = `'%${searchValue}%'`;
            }

            const fullExpression = `${searchField} ${searchExpression} ${formattedValue}`;

            handleChildData({ child: id, content: fullExpression, dropdown });
                if (idx > 0) {
                    handleQueryChain(id, 'AND');
                }
            }
        });
    }, [children]);

    const handleChildData = (data) => {
         // Update state with the data received from the child
        const currentChild = data.child
        const filteredFeatures = columnNames.filter(column => column.child === currentChild);
        
        var queries
        if(filteredFeatures.length>0){
            queries = columnNames.map(item => {
                
                if(item.child === currentChild){
                    item.content = data.content
                    item.dropdown = data.dropdown
                }
                return item;
            });
        } else {
            queries = columnNames.concat(data)
            
        }
        setColumnNames(queries)
    };
    
    const handleAddMore = () => {
      // Add a new child, using a unique key (e.g., timestamp or index)
      setChildren((prevChildren) => [
        ...prevChildren,
        { id: Date.now(), content: `Child ${prevChildren.length + 1}` },
      ]);
    };
  
    const handleRemove = (id) => {
      // Remove a specific child by its ID
      setColumnNames((columnNames) => columnNames.filter((child) => child.child != id));
      setChildren((prevChildren) => prevChildren.filter((child) => child.id !== id));
    
    };

    const handleQueryChain = (child, chain) => {
        const filteredFeatures = columnNames.filter(column => column.child === child);
        
        var queries
        if(filteredFeatures.length>0){
            queries = columnNames.map(item => {
                if(item.child === child){
                    item.chain = chain
                }
                return item;
            });
        } else {
            queries = columnNames.concat({"child":child, "chain":chain})
            
        }
        setColumnNames(queries)

    }

    const handleSearchButton = () => {
        var tmp = columnNames.map((item, key) => {
            return `${(key !== 0 && item.chain ? item.chain : "")}  ${item.content}`   
        }).join(" ")
        fetch(`${process.env.REACT_APP_BACKEND_URL}/api/advanced_filter/${tmp}`, {
            headers: { 'database': process.env.REACT_APP_DATABASE },
        })
            .then((response) => {
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                return response.json();
            })
            .then((data) => {
                setResultsData(data)
            })
            .catch((error) => {
                console.error('Error:', error);
            });
    }

    const handleLoadExampleButton = () => {
        const exampleChildren = [
            { id: 1, content: { searchField: "host", searchExpression: "IN", searchValue: "dog, cat", dropdown: "TEXT" }, dropdown: "TEXT" },
        ];
        setChildren(exampleChildren);
    }

    const handleResetButton = () => {
        setColumnNames([]);
        setChildren([]);
        setResultsData([]);
    }

    return (
        <div>
            <h6>Search Query</h6>
            <div>
                { columnNames.length > 0 && 
                    <Box
                        sx={{
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'space-between', // Evenly space the items
                        border: '1px solid',
                        borderColor: 'divider',
                        borderRadius: 1,
                        bgcolor: 'background.paper',
                        padding: '10px', // Optional padding for the box
                        }}>   
                        <p className='float-left' > 
                            SELECT * from meta_data WHERE {columnNames.map((item, key) => (
                            <a>{item.chain && (key != 0 && item.chain) } {item.content}</a>
                            ))}
                        </p>
                        <Button className='btn-main-filled float-right' onClick={() => handleSearchButton()} size='sm'>Search</Button>
                        
                    </Box>
                }
                <br></br>
                <ButtonGroup>
                    <Button className='btn-main-filled' onClick={() => handleLoadExampleButton()}>Load Example</Button>
                    <Button className='btn-main' onClick={() => handleResetButton()}>Reset</Button>
                </ButtonGroup>
                    
            </div>
            <br></br>
            <h6>Search Conditions</h6>
        

            <div>
                { children.length === 0 && 
                    <p className='info-text'>Select <i>Add more <FontAwesomeIcon icon={faPlus}/></i> button below to start</p>
                }
                {children.map((child, key) => (
                    <div>
                        {key != 0 &&
                            <ButtonGroup className='primary-background'>
                                <Button className='primary-background' onClick={() => handleQueryChain(child.id, 'AND')} size='sm'>AND</Button>
                                <Button className='primary-background'onClick={() => handleQueryChain(child.id, 'OR')} size='sm'>OR</Button>
                            </ButtonGroup>
                        }
                        <ChildComponent
                            key={child.id}
                            id={child.id}
                            content={child.content}
                            onRemove={handleRemove}
                            onSendData={handleChildData}
                            tableColumns={tableColumns}
                        />
                    
                    </div>
                ))}
            </div>

            <Button className='btn-main-filled' onClick={handleAddMore}><FontAwesomeIcon icon={faPlus}/> Add More</Button>
            <br></br>
            <br></br>
            {resultsData.length > 0 && <SequencesTable data={resultsData} />}

        </div>
    )

}

const ChildComponent = ({ id, content, tableColumns, dropdown, onRemove, onSendData }) => {

     const text_option_fields = [
        {display_name:'equals', value:'='},
        {display_name:'does not equal', value:'!='},
        {display_name:'contains', value:'IN', definition:' - enter comma seperated list'},
        {display_name:'does not contain', value:'NOT IN', definition:' - enter comma seperated list'},
        {display_name:'like', value:'LIKE', definition:' - '},
        {display_name:'is null', value:'IS NULL'},
        {display_name:'is not null', value:'IS NOT NULL'}
    ]

    const integer_option_fields = [
        {display_name:'between', value:'BETWEEN', definition:' - enter comma seperated upper and lower value'},
        {display_name:'<', value:'<'},
        {display_name:'>', value:'>'},
        {display_name:'<=', value:'<='},
        {display_name:'>=', value:'>='}
    ]

    const fieldDefinitions = [
        {value:'length', example:'Total length of nucleotide sequence'},
        {value:'primary_accession', example:'NCBI primary accession identifier (ex: HI591996)'},
        {value:'locus', example:''},
        {value:'strandedness', example:'double or single strand'},
        {value:'molecule_type', example:''},
        {value:'topology', example:''},
        {value:'division', example:''},
        {value:'definition', example:''},
        {value:'accession_version', example:''},
        {value:'source', example:''},
        {value:'organism', example:''},
        {value:'taxonomy', example:''},
        {value:'pubmed_id', example:''},
        {value:'mol_type', example:''},
        {value:'isolate', example:''},
        {value:'isolate_source', example:''},
    ]
    const [searchField, setSearchField] = React.useState(content.searchField ? content.searchField : '');
    const [searchExpression, setSearchExpression] = React.useState(content.searchExpression ? content.searchExpression : '');
    const [searchValue, setSearchValue] = React.useState(content.searchValue ? content.searchValue : '');

    const [dropDownFields, setDropdownFields] = React.useState(content.dropdown ? content.dropdown === 'TEXT' ? text_option_fields : integer_option_fields: []);
    const [searchExample, setSearchExample] = React.useState('');
    const [expressionExample, setExpressionExample] = React.useState('');

    useEffect(() => {
        const result = updateSearchExpression(searchValue);
            const fullExpression = `${searchField} ${searchExpression} ${result}`;
            onSendData({ child: id, content: fullExpression, dropdown });
        if (id) {
            
        }
    }, []); // run only once on mount

    const handleSearchFieldChange = (event) => {
        setSearchField(event.target.value);

        const selectedColumn = tableColumns.find(item => item.name === event.target.value);
        const example = fieldDefinitions.find(item => item.value === event.target.value)


        example ? setSearchExample(example.example) : setSearchExample('')
        selectedColumn.type === 'TEXT' ? setDropdownFields(text_option_fields) : setDropdownFields(integer_option_fields)

        
        onSendData({"child":id, "content":`${event.target.value} ${searchExpression} ${searchValue}`})


    };


    const handleSearchExpressionChange = (event) => {
        setSearchExpression(event.target.value);

        var result = updateSearchExpression(searchValue)
        const example = dropDownFields.find(item => item.value === event.target.value)
        example ? setExpressionExample(example.definition) : setExpressionExample('')


        onSendData({"child":id, "content":`${searchField} ${event.target.value} ${result}`})
    };

    const updateSearchExpression = (value) => {
        var result;
        if (searchExpression === 'IN' || searchExpression === 'NOT IN'){

            const items = value.split(",").map(item => item.trim());
            result = `('${items.join("', '")}')`;

        } else if (searchExpression === 'BETWEEN'){

            const items = value.split(",").map(item => item.trim());
            result = `${items.join(' AND ')}`;

        } else if (searchExpression === 'LIKE'){

            result = `'%${value}%'`
        
        } else {

            result = `'${value}'`
        }

        return result
    }

    const handleSearchValueChange = (event) => {
        setSearchValue(event.target.value);
        var result = updateSearchExpression(event.target.value)
        onSendData({"child":id, "content":`${searchField} ${searchExpression} ${result} `})
    };

    return (
        <div className="advanced-container">
            <Box
                sx={{
                    display: 'flex',
                    flexWrap: 'wrap',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    bgcolor: 'background.paper',
                    padding: '2px',
                }}
            >
            {/* Column 1 */}
            <div className='advanced-child-1'>
                <FormControl fullWidth > {/* Ensure it fills the column */}
                    <InputLabel id="demo-simple-select-label"></InputLabel>
                    <Select
                            labelId="demo-simple-select-label"
                            id="demo-simple-select"
                            value={searchField}
                            onChange={handleSearchFieldChange}
                            size="small">
                        {tableColumns.map((name) => (
                            <MenuItem key={name.name} value={name.name}>
                                {name.name}
                            </MenuItem>
                        ))}
                    </Select>
                </FormControl>
                
            </div>

            {/* Column 2 */}
            <div className='advanced-child-1'>
                <FormControl fullWidth > {/* Ensure it fills the column */}
                    <InputLabel id="demo-simple-select-label" size="small"></InputLabel>
                    <Select
                            value={searchExpression}
                            onChange={handleSearchExpressionChange}
                            size="small">
                        {dropDownFields.map((name) => (
                            <MenuItem key={name.value} value={name.value}>
                                {name.display_name}
                            </MenuItem>
                        ))}
                    </Select>
                </FormControl>
            </div>
                <div className='advanced-child-1'>
                    <FormControl fullWidth >
                        <TextField 
                            value={searchValue}
                            size="small" 
                            margin="none" 
                            fullWidth
                            placeholder="Value to search" 
                            variant="outlined"
                            onChange={handleSearchValueChange}>
                        </TextField>
                    </FormControl>
                </div>

                {/* Column 3 (Button) */}
                <div className='advanced-child-btn'>
                    <Button size="sm" className="btn-main-outline" onClick={() => onRemove(id)}>
                        <FontAwesomeIcon icon={faTrashCan} />
                    </Button>
                </div>

                <div className='advanced-child-2'>  
                    <p className='advanced-child-2-label'>{searchExample} {expressionExample}</p>
                </div>
                
            </Box>
            
        </div>
    );
  };

export default AdvancedFilter;