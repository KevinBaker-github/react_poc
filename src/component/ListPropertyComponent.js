import React, {useState, useEffect} from 'react'
import {Link} from 'react-router-dom'
import PropertyService from '../services/PropertyService'
import { useFilters } from 'react-table'

function ListPropertyComponent() {
    const [search, setSearch] = React.useState({});

    const [properties, setProperties] = useState([])
    
    const filteredProperties = properties.filter((item) => {
        let searchFlag = true;
        for (const key in search) {
            if (search[key] !== null) {
                if (!item[key].toLowerCase().includes(search[key].toLowerCase())) {
                    searchFlag = false;
                }
            }
        }
        return searchFlag;
    })
    
    useEffect(() => {
        getAllProperties();
    }, [])

    const getAllProperties = () => {
        PropertyService.getPropertyList().then((response) => {
            setProperties(response.data)
            console.log(response.data);
        }).catch(error =>{
            console.log(error);
        })
    }

    const handleSearch = (event) => {
        const key = event.target.name;
        const value = event.target.value;

        setSearch({
            ...search, [key]:value
        });
    };

    return (
        <div className = "container">
            <h2 className = "text-center"> List Properties </h2>
            <table className="table table-bordered table-striped">
                <thead>
                    <th> Property Id
                        <label htmlFor="search">
                        <input
                            id="search"
                            type="text"
                            name="id"
                            onChange={handleSearch}
                            />
                        </label>
                    </th>
                    <th>  Name
                        <label htmlFor="search">
                            <input
                                id="search"
                                type="text"
                                name="name"
                                onChange={handleSearch}
                            />
                        </label>
                    </th>
                    <th>  Code <label htmlFor="search">
                        <input
                            id="search"
                            type="text"
                            name="code"
                            onChange={handleSearch}
                        />
                    </label>
                    </th>
                    <th> Status <label htmlFor="search">
                        <input
                            id="search"
                            type="text"
                            name="status"
                            onChange={handleSearch}
                        />
                    </label>
                    </th>
                    <th> Address <label htmlFor="search">
                        <input
                            id="search"
                            type="text"
                            name="address"
                            onChange={handleSearch}
                        />
                    </label>
                    </th>
                </thead>
                <tbody>
                    {
                        filteredProperties.map(
                            property =>
                            <tr key = {property.id}> 
                                <td> {property.id} </td>
                                <td> {property.name} </td>
                                <td>{property.hotelCode}</td>
                                <td>{property.status}</td>
                                <td>{property.address}</td>
                            </tr>
                        )
                    }
                </tbody>
            </table>
        </div>
    );
}

export default ListPropertyComponent