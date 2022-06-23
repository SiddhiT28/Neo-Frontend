import axios from 'axios';
import React, { useEffect, useState } from 'react'

export default function AddAddress({ onClick }) {

    const [states, setStates] = useState([]);

    const API_KEY = "dnZlSUJ2eW10dUxvSHJmOW1waE5KS0JLSnZ6YWdBRlo3VDVrNlViWA==";

    useEffect(() => {

        axios.get("https://api.countrystatecity.in/v1/countries/IN/states", {
            headers: {
                "X-CSCAPI-KEY": API_KEY
            }
        })
            .then(res => {
                setStates(res.data);
                states.sort((a, b) => (a.name > b.name));
            })
            .catch(err => {
                console.log(err);
            })

    }, [])

    const [cities, setCities] = useState([]);

    const [name, setName] = useState('');
    const [street, setStreet] = useState('');
    const [city, setCity] = useState('');
    const [state, setState] = useState('');
    const [zip, setZip] = useState('');


    const [stateInput, setStateInput] = useState('');

    const [showStateDropDown, setShowStateDropDown] = useState(false);


    const handleStateSelected = (state, name) => {

        setStateInput(name)
        setState(name);

        axios.get(`https://api.countrystatecity.in/v1/countries/IN/states/${state}/cities`, {
            headers: {
                "X-CSCAPI-KEY": API_KEY
            }
        })
            .then(res => {
                setCities(res.data);
                setShowStateDropDown(false)
            })
            .catch(err => {
                console.log(err);
            })

    }

    const handleButtonSubmit = (e) => {
        e.preventDefault();
        console.log({ name, street, city, state: stateInput, zip });
        if (name !== '' && street !== '' && city !== '' && stateInput !== '' && zip !== '') {
            onClick({ name, street, city, state: stateInput, zip });
        } else {
            alert('Please fill all the fields')
        }
    }

    return (
        <form className='content_form'>
            <p>Add New Address</p>
            <div className='input_grp'>
                <label htmlFor='name'>Name</label>
                <input
                    type='text'
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    id='name' />
            </div>
            <div className='input_grp'>
                <label htmlFor='name'>Street</label>
                <input
                    type='text'
                    value={street}
                    onChange={(e) => setStreet(e.target.value)}
                    id='name' />
            </div>
            <div className='input_grp'>
                <label htmlFor='name'>State</label>
                <select id='state' className='input_select' onChange={(e) => {
                    console.log(e.target.value);
                    setStateInput(e.target.value)
                }}>
                    <option value='' disabled>Select State</option>
                    {states.sort((a, b) => {
                        return a.name > b.name
                    }).map((state, index) => {

                        return (
                            <option key={index} value={state.name} onClick={() => {
                                handleStateSelected(state.name, state.name)
                            }
                            }>{state.name}</option>
                        )
                    }
                    )}

                </select>

                {
                    showStateDropDown &&
                    <div className='input_dropDown'>
                        {
                            states.sort((a, b) => (a.name > b.name)).slice(0, 3).map(state => {
                                return (
                                    <button
                                        type='button'
                                        key={state.id}
                                        onClick={() => {
                                            handleStateSelected(state.ciso2, state.name)
                                        }} >
                                        {state.name}
                                    </button>
                                )
                            })
                        }
                    </div>
                }
            </div>
            <div className='input_grp'>
                <label htmlFor='name'>City</label>
                <input
                    type='text'
                    value={city}
                    onChange={(e) => setCity(e.target.value)}
                    id='name' />
            </div>
            <div className='input_grp'>
                <label htmlFor='address'>Zipcode</label>
                <input
                    type={"number"}
                    value={zip}
                    onChange={(e) => setZip(e.target.value)}
                    id='address' />
            </div>
            <button onClick={handleButtonSubmit} className='addBtn'>
                Add Address
            </button>
        </form>
    )
}
