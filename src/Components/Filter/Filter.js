import Form from 'react-bootstrap/Form';
import { Button } from 'react-bootstrap';
import "bootstrap-icons/font/bootstrap-icons.css";
import './filter.css';
import { useEffect, useState } from 'react';
import GetPriorities from '../../API/GetPriorities';
import GetDifficulties from '../../API/GetDifficulties';
import Select from 'react-select'


function Filter({ filter, setFilter }) {
    const [priorites, setPriorities] = useState([]);
    const [difficulties, setDifficulties] = useState([]);

    useEffect(() => {
        async function GetData() {
            const prioritesApi = await GetPriorities();
            const difficultiesApi = await GetDifficulties();

            const mappedPriorities = prioritesApi.map(p => ({
                value: p.id,
                label: p.name
              }))
              const mappedDifficulties = difficultiesApi.map(d => ({
                value: d.id,
                label: d.name
              }))    
              setPriorities(mappedPriorities);
              setDifficulties(mappedDifficulties);
        }

        GetData();
    }, [])
    return (
        <div className='filter-container'>
            <div className="filter-component">
                <div className='filter-input-container'>
                <Select options={difficulties}
                    onChange={(option) => setFilter({...filter, difficulty_id: option.value})}
                    className='filter-task-select' placeholder="Difficulty" />
                <Select options={priorites}
                    onChange={(option) => setFilter({...filter, priority_id: option.value})}
                    className='filter-task-select' placeholder="Priority" />
                    
                <Form.Control onChange={(e) => setFilter({...filter, val: e.target.value})}
                 type="text" placeholder="Search Tasks" className='filter-input' />
                {"\u00A0"}
                </div>
            </div>
        </div>
    )
}

export default Filter;