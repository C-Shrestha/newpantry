import { faCirclePlus, faCircleXmark, faPen } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon  } from '@fortawesome/react-fontawesome';
import React, {useEffect, useState} from 'react';
import '../pages/Favorites/Favorites.css';
import { Modal } from '@mui/material';

export const PantryGrid = () => {
    const [ingredients, setIngredients] = useState([]);
    const [openModal, setOpenModal] = useState(false);

    const addIngredient = async (ingredient) => {
        var token = localStorage.getItem('token-info');
        var email = localStorage.getItem('email-info');
        const URL = 'https://newpantry.herokuapp.com/api/pantry';
        const body = JSON.stringify({email: email, ingredient: ingredient});
        try{
            const response = await fetch(URL, {
                method: 'POST',
                body: body,
                headers: {
                'Content-Type': 'application/json',
                'Authorization': token,
                },
            });
            const json = await response.json();
            var newIngredients = json.pantryIngredients;
            if(newIngredients[newIngredients.length-1] == null){
                newIngredients.pop();
            }
            console.log(newIngredients);
            setIngredients(newIngredients);
        } catch (error){
            console.log(error);
        };
        setOpenModal(false);
    }

    const getIngredients = async () => {
        var token = localStorage.getItem('token-info');
        var email = localStorage.getItem('email-info');
        const URL = 'https://newpantry.herokuapp.com/api/pantry';
        const body = JSON.stringify({email: email});
        try{
            const response = await fetch(URL, {
                method: 'POST',
                body: body,
                headers: {
                'Content-Type': 'application/json', 
                'Authorization': token
                },
            });
            const json = await response.json();
            var newIngredients = json.pantryIngredients;
            if(newIngredients[newIngredients.length-1] == null){
                newIngredients.pop();
            }
            console.log(newIngredients);
            setIngredients(newIngredients);
        } catch (error){
            console.log(error);
        };
      }

    useEffect(() => {
        getIngredients();
      }, []);

    
    const addButton = () => {
        setOpenModal(true);
    }

    const cancelButton = () => {
        setOpenModal(false);
    }


    return(
        <div className="pantryGrid">
            <div className="top-bar">
                            <h1>My Pantry</h1>
                            <Modal open={openModal} className="modal">
                                <div className="addBox">
                                    <input className="addInput" id="addInput"></input>
                                    <button className="cancelBut" onClick={() => cancelButton()} >CANCEL</button>
                                    <button className="saveBut" onClick={() => addIngredient(document.getElementById('addInput').value)} >SAVE</button>
                                </div>
                            </Modal>
                            <FontAwesomeIcon className="plus-pic" onClick={() => addButton()} icon={faCirclePlus} />
                        </div>
            <div className="items">
                <table>
                    {
                        ingredients.map( (ingredient, index) => 
                        {
                            return[
                                (index*2 + 1)<ingredients.length ? (
                                    <tr>
                                        <td>
                                            {ingredients[index*2]}
                                        </td>
                                        <td>
                                            {ingredients[index*2 + 1]}
                                        </td>
                                    </tr>
                                    ) : ((index * 2) < ingredients.length ? (
                                    <tr>
                                        <td>
                                            {ingredients[index*2]}
                                        </td>
                                    </tr>
                                    ) : null )
                            ]
                        }
                        
                    )}
                </table>
            </div>
        </div>
    );
};

export default PantryGrid;