import { faCirclePlus, faCircleXmark } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon  } from '@fortawesome/react-fontawesome';
import React, {useEffect, useState} from 'react';
import '../pages/Favorites/Favorites.css';
import { Alert, Modal } from '@mui/material';

export const PantryGrid = () => {
    const [ingredients, setIngredients] = useState([]);
    const [openModal, setOpenModal] = useState(false);

    const addIngredient = async (ingredient) => {
        if(ingredient == ""){
            document.getElementById("addError").innerHTML = "Cannot add empty items"
            return;
        }
        else if(ingredients.includes(ingredient)){
            document.getElementById("addError").innerHTML = "Cannot add repeat items"
            return;
        }
        document.getElementById("addError").innerHTML = "";
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
            var jsonIngredients = json.pantryIngredients;
            var newIngredients = jsonIngredients.filter(el => {
                return el != null && el != '';
            });
            setIngredients(newIngredients);
        } catch (error){
            console.log(error);
        };
        setOpenModal(false);
    }

    const deleteIngredient = async (index) => {
        var ingredientName = document.getElementById(index).innerHTML;
        alert("Delete Confirmation: " + ingredientName);
        var token = localStorage.getItem('token-info');
        var email = localStorage.getItem('email-info');
        const URL = 'https://newpantry.herokuapp.com/api/pantry';
        const body = JSON.stringify({email: email, ingredient: ingredientName});
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
            var jsonIngredients = json.pantryIngredients;
            var newIngredients = jsonIngredients.filter(el => {
                return el != null && el != '';
            });
            setIngredients(newIngredients);
        } catch (error){
            console.log(error);
        };
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
            var jsonIngredients = json.pantryIngredients;
            var newIngredients = jsonIngredients.filter(el => {
                return el != null && el != '';
            });
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
                                    <h2 id="addError"></h2>
                                </div>
                            </Modal>
                            <FontAwesomeIcon className="plus-pic" onClick={() => addButton()} icon={faCirclePlus} />
                        </div>
            <div className="items">
                <table id="pantryTable">
                    {
                        ingredients.map( (ingredient, index) => 
                        {
                            return[
                                (index*2 + 1)<ingredients.length ? (
                                    <tr>
                                        <td>
                                            <div className="gridTable">
                                                <div className="gridChildTable" id={index*2}>
                                                    {ingredients[index*2]}
                                                </div>
                                                <div className="gridChildTable">
                                                    <button id={index*2} className="deleteButton">
                                                        <FontAwesomeIcon className="delete-pic" onClick={() => deleteIngredient(index*2)} icon={faCircleXmark} />
                                                    </button>
                                                </div>
                                            </div>
                                        </td>
                                        <td>
                                            <div className="gridTable">
                                                <div className="gridChildTable" id={index*2 + 1}>
                                                    {ingredients[index*2 + 1]}
                                                </div>
                                                <div className="gridChildTable">
                                                    <button id={index*2 + 1} className="deleteButton">
                                                        <FontAwesomeIcon className="delete-pic" onClick={() => deleteIngredient(index*2 + 1)} icon={faCircleXmark} />
                                                    </button>
                                                </div>
                                            </div>
                                        </td>
                                    </tr>
                                    ) : ((index * 2) < ingredients.length ? (
                                    <tr>
                                        <td>
                                            <div className="gridTable">
                                                <div className="gridChildTable" id={index*2}>
                                                    {ingredients[index*2]}
                                                </div>
                                                <div className="gridChildTable">
                                                    <button id={index*2} className="deleteButton">
                                                        <FontAwesomeIcon className="delete-pic" onClick={() => deleteIngredient(index*2)} icon={faCircleXmark} />
                                                    </button>
                                                </div>
                                            </div>
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