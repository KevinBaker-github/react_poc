import axios from 'axios'
const PROPERTY_REST_BASE_API_URL = 'http://localhost:8080/api/';
const PROPERTY_REST_API_URL = 'http://localhost:8080/api/propertylist';
const GET_PROPERTY = 'propertylist';
const GET_ACTIVE_PROPERTY = 'activepropertyList';
const ADD_PROPERTY = 'addproperty';
const UPDATE_PROPERTY = 'updateproperty';
const DELETE = 'delete'


class PropertyService {

    getPropertyList(){
        return axios.get(PROPERTY_REST_BASE_API_URL + GET_PROPERTY)
    }

    getPropertyById(id){
            return axios.get(PROPERTY_REST_BASE_API_URL +'/'+id)
    }

    addProperty(property){
        return axios.post(PROPERTY_REST_BASE_API_URL + ADD_PROPERTY, property)
    }

    deleteProperty(id){
        return axios.delete(PROPERTY_REST_BASE_API_URL + DELETE + '/' + id)
    }

    updateProperty(id, property){
        return axios.put(PROPERTY_REST_BASE_API_URL + UPDATE_PROPERTY + '/'+ id, property)
    }
}

export default new PropertyService();