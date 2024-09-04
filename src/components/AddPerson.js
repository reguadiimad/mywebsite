import { useSelector, useDispatch } from "react-redux";
import { addPerson } from "../reduxToolKit/slices/personSlice";
import { useState } from "react";

export default function AddPerosn () {

    const dispatch = useDispatch(),
    [firstName, setFirstName] = useState(''),
    [lastName, setLastName] = useState(''),
    [error, setError] = useState(null),
    handleSubmit = async e => {
        e.preventDefault()
        setError(null)
        try{
            await dispatch(addPerson({ first_name: firstName, last_name: lastName })).unwrap();
            setFirstName('');
            setLastName('');
        }catch(error){
            setError('Failed to add person.')
        }
    }

    return (
        <div className="max-w-md mx-auto p-6 bg-white shadow-lg rounded-lg m-10">
            <h2 className="text-xl font-semibold text-center m-2">Add Perosn</h2>
            {error && <p className="text-red-500 text-center mb-4">{error}</p>}
            <form onSubmit={handleSubmit}>

                <label htmlFor="firstName" className=" block text-gray-700 text-sm font-medium  mb-2"> Fisrt Name </label>
                <input value={firstName} id="firstName" onChange={e => setFirstName(e.target.value)} 
                className="p-3 w-full border mb-2 border-gray-300 rounded-md hover:border-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 " placeholder="Imad"></input>

                <label htmlFor="lastName" className="block text-gray-700 text-sm font-medium  mb-2"> Last Name </label>
                <input value={lastName} id="lastName" onChange={e => setLastName(e.target.value)} 
                className="p-3 w-full border mb-2 border-gray-300 rounded-md hover:border-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 " placeholder="reguadi"></input>

                <button type="submit"
                className=" mt-3 w-full py-3 px-4 bg-blue-500 text-white font-semibold rounded-md shadow-lg hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500">
                    Add Person
                </button>
            </form>
        </div>
    )
}