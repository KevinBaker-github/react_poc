import React, {useState, useEffect} from 'react'
import {Link, useHistory , useParams } from 'react-router-dom';
import PropertyService from '../services/PropertyService';

const AddPropertyComponent = () => {

    //property.getName(), property.getStatus(), property.getHotelCode(),
				//property.getOrgCode(), property.getAddress()
    const [name, setName] = useState('')
    const [status, setStatus] = useState('')
    const [hotelCode, setHotelCode] = useState('')
    const [orgCode, setOrgCode] = useState('')
    const [address, setAddress] = useState('')
    const history = useHistory();
    const {id} = useParams();

    const saveOrUpdateProperty = (e) => {
        e.preventDefault();

        const property = {name, status, hotelCode, orgCode, address}

        if(id){
            PropertyService.updateProperty(id, property).then((response) => {
                history.push('/editProperty')
            }).catch(error => {
                console.log(error)
            })

        }else{
            PropertyService.addProperty(property).then((response) =>{

                console.log(response.data)
    
                history.push('/editProperty');
    
            }).catch(error => {
                console.log(error)
            })
        }
        
    }

    useEffect(() => {

        PropertyService.getPropertyById(id).then((response) =>{
            setName(response.data.name)
            setStatus(response.data.status)
            setHotelCode(response.data.hotelCode)
            setOrgCode(response.data.orgCode)
            setAddress(response.data.address)
        }).catch(error => {
            console.log(error)
        })
    }, [])

    const title = () => {

        if(id){
            return <h2 className = "text-center">Update Property</h2>
        }else{
            return <h2 className = "text-center">Add Property</h2>
        }
    }

    return (
        <div>
           <br /><br />
           <div className = "container">
                <div className = "row">
                    <div className = "card col-md-6 offset-md-3 offset-md-3">
                       {
                           title()
                       }
                        <div className = "card-body">
                            <form>
                                <div className = "form-group mb-2">
                                    <label className = "form-label"> Name :</label>
                                    <input
                                        type = "text"
                                        placeholder = "Enter property name"
                                        name = "name"
                                        className = "form-control"
                                        value = {name}
                                        onChange = {(e) => setName(e.target.value)}
                                    >
                                    </input>
                                </div>

                                <div className = "form-group mb-2">
                                    <label className = "form-label"> Status :</label>
                                    <input
                                        type = "text"
                                        placeholder = "Enter status"
                                        name = "status"
                                        className = "form-control"
                                        value = {status}
                                        onChange = {(e) => setStatus(e.target.value)}
                                    >
                                    </input>
                                </div>

                                <div className = "form-group mb-2">
                                    <label className = "form-label"> Hotel Code :</label>
                                    <input
                                        type = "text"
                                        placeholder = "Enter hotel Code"
                                        name = "hotelCode"
                                        className = "form-control"
                                        value = {hotelCode}
                                        onChange = {(e) => setHotelCode(e.target.value)}
                                    >
                                    </input>
                                </div>

                                <div className = "form-group mb-2">
                                    <label className = "form-label"> Org Code :</label>
                                    <input
                                        type = "text"
                                        placeholder = "Enter org Code"
                                        name = "orgCode"
                                        className = "form-control"
                                        value = {orgCode}
                                        onChange = {(e) => setOrgCode(e.target.value)}
                                    >
                                    </input>
                                </div>

                                <div className = "form-group mb-2">
                                    <label className = "form-label"> Address :</label>
                                    <input
                                        type = "text"
                                        placeholder = "Enter address"
                                        name = "address"
                                        className = "form-control"
                                        value = {address}
                                        onChange = {(e) => setAddress(e.target.value)}
                                    >
                                    </input>
                                </div>

                                <button className = "btn btn-success" onClick = {(e) => saveOrUpdateProperty(e)} >Submit </button>
                                  <Link to="/editProperty" className="btn btn-danger"> Cancel </Link>
                            </form>

                        </div>
                    </div>
                </div>

           </div>

        </div>
    )
}

export default AddPropertyComponent