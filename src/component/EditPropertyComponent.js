import React, { useState, useEffect } from 'react'

import { Link } from 'react-router-dom'

import PropertyService from '../services/PropertyService'




function EditPropertyComponent() {




    const [properties, setProperties] = useState([])




    useEffect(() => {




        getAllProperties();

    }, [])




    const getAllProperties = () => {

        PropertyService.getPropertyList().then((response) => {

            setProperties(response.data)

            console.log(response.data);

        }).catch(error => {

            console.log(error);

        })

    }




    const deleteProperty = (propertyId) => {

        PropertyService.deleteProperty(propertyId).then((response) => {

            getAllProperties();



        }).catch(error => {

            console.log(error);

        })



    }




    return (

        <div className="container">

            <h2 className="text-center "> Create/Edit Properties </h2>

            <Link to="/addProperty" className="btn btn-primary mb-2" > Add Property </Link>

            <table className="table table-bordered table-striped">

                <thead>

                    <th className="text-center "> Property Id </th>

                    <th className="text-center ">  Name </th>

                    <th className="text-center ">  Code </th>

                    <th className="text-center "> Status </th>

                    <th className="text-center "> Address </th>

                    <th className="text-center ">Action</th>

                </thead>

                <tbody>

                    {

                        properties.map(

                            property =>

                                <tr key={property.id}>

                                    <td className="text-center "> {property.id} </td>

                                    <td className="text-center "> {property.name} </td>

                                    <td className="text-center ">{property.hotelCode}</td>

                                    <td className="text-center ">{property.status}</td>

                                    <td className="text-center ">{property.address}</td>

                                    <td>

                                        <Link className="btn btn-info" to={`/editProperty/${property.id}`} >Update</Link>

                                        <button className="btn btn-danger" onClick={() => deleteProperty(property.id)}

                                            style={{ marginLeft: "10px" }}> Delete</button>

                                    </td>

                                </tr>

                        )

                    }

                </tbody>

            </table>

        </div>

    );

}




export default EditPropertyComponent