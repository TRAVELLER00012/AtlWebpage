'use client'

import { useState, useRef } from "react";
import { Item } from "../services/itemListService";
import itemListService from "../services/itemListService";
import Image from "next/image"
import styles from "../styles/item-list-admin-options.module.css"

import EditIcon from "@/public/images/edit.png"
import InsertIcon from "@/public/images/insert.png"
import RemoveIcon from "@/public/images/remove.png"
import CloseIcon from "@/public/images/close.png"


interface Props{
    data : Item[]
}

const AdminComponent = ({data}:Props) => {
    const [showRemove,setShowRemove] = useState(false);
    const [showAdd,setShowAdd] = useState(false);
    const [showEdit,setShowEdit] = useState(false);
    const itemsField = useRef<HTMLSelectElement>(null);
    const itemNameField = useRef<HTMLInputElement>(null);
    const itemQuantityField = useRef<HTMLInputElement>(null);
    const itemIssuableField = useRef<HTMLSelectElement>(null);
    
    const itemsEditField  = useRef<HTMLSelectElement>(null);
    const itemNameEditField = useRef<HTMLInputElement>(null);
    const itemQuantityEditField = useRef<HTMLInputElement>(null);
    const itemIssuableEditField = useRef<HTMLSelectElement>(null);
    return (
        <>
            <div className={styles.options}>
                <Image src={EditIcon} alt="Edit icon" className={styles.edit} onClick={() => setShowEdit(!showEdit)}/>
                <Image src={InsertIcon} alt="Insert icon" className={styles.insert} onClick={() => setShowAdd(!showAdd)}/>
                <Image src={RemoveIcon} alt="Remove icon" className={styles.remove} onClick={() => setShowRemove(!showRemove)}/>
            </div>
            {
                showRemove && 
                <div className={[styles.hiddenBox,styles.removeBox].join(" ")}>
                    <div className={styles.heading}>
                        <h1>Remove Item</h1>
                        <Image src={CloseIcon} alt="close icon" onClick={() => setShowRemove(false)} />
                    </div>
                    <div className={styles.content}>
                        <form onSubmit={(event) =>{
                            event.preventDefault();
                            let itemId = itemsField.current?.value;
                            if (itemId){
                                itemListService.deleteItem(parseInt(itemId))
                                window.location.reload()
                            }
                            
                        }}>
                            <select ref={itemsField} required >
                                {data?.map((d) =>(
                                    <option value={d.id} key={d.id}>{d.name}</option>
                                ))}
                            </select>
                            <button type="submit">Submit</button>
                        </form>
                    </div>
                </div>
            }
            {
                showAdd &&
                <div className={[styles.hiddenBox,styles.addBox].join(" ")}>
                    <div className={styles.heading}>
                        <h1>Add an Item</h1>
                        <Image src={CloseIcon} alt="close icon" onClick={() => setShowAdd(false)} />
                    </div>
                    <div className={styles.content}>
                        <form onSubmit={(event) =>{
                            event.preventDefault()
                            if (itemNameField.current && itemQuantityField.current && itemIssuableField.current){
                                let newItem  : Item = {
                                    id: 0,
                                    issuable : itemIssuableField.current.value == "Yes" ? true : false,
                                    name: itemNameField.current.value,
                                    quantity : parseInt(itemQuantityField.current.value)
                                }
                                itemListService.addItem(newItem);
                                window.location.reload()
                            }
                        }}>
                            <div>
                                <label htmlFor="name" className={styles.important}>Name</label>
                                <input type="text" id="name" required minLength={3} maxLength={60}  ref={itemNameField}/>
                            </div>
                            <div>
                                <label htmlFor="quantity" className={styles.important}>Quantity</label>
                                <input type="number" id="quantity" required min={1} ref={itemQuantityField}/>
                            </div>
                            <div>
                                <label htmlFor="issuable" className={styles.important}>Issuable</label>
                                <select id="issuable" required ref={itemIssuableField}>
                                    <option value={"Yes"}>Yes</option>
                                    <option value={"No"}>No</option>
                                </select>
                            </div>
                            <button type="submit">Submit</button>
                        </form>
                    </div>
                </div>
            }
            {
                showEdit && 
                <div className={[styles.hiddenBox,styles.editBox].join(" ")}>
                    <div className={styles.heading}>
                        <h1>Edit an Item</h1>
                        <Image src={CloseIcon} alt="close icon" onClick={() => setShowEdit(false)} />
                    </div>
                    <div className={styles.content}>
                        <form onSubmit={(event) =>{
                            event.preventDefault();
                            if(itemNameEditField.current && itemQuantityEditField.current && itemIssuableEditField.current && itemsEditField.current){
                                const newItem : Item = {
                                    id: parseInt(itemsEditField.current.value),
                                    quantity:itemQuantityEditField.current.valueAsNumber,
                                    name: itemNameEditField.current.value,
                                    issuable: itemIssuableEditField.current.value === "Yes" ? true : false
                                }
                                itemListService.updateItem(newItem.id,newItem);
                                window.location.reload()
                                
                            }
                            
                        }}>
                            <select  required
                                    ref={itemsEditField} 
                                    onChange={async (event) =>{
                                                    const {data} = await itemListService.getItem(parseInt(event.currentTarget.value))
                                                    if(itemNameEditField.current && itemQuantityEditField.current && itemIssuableEditField.current){
                                                        itemNameEditField.current.value = data.name
                                                        itemQuantityEditField.current.valueAsNumber = data.quantity
                                                        if (data.issuable) itemIssuableEditField.current.value = "Yes"
                                                        else itemIssuableEditField.current.value  = "No"
                                                    }
                                            }}>
                                {data?.map((d) =>(
                                    <option value={d.id} key={d.id}>{d.name}</option>
                                ))}
                            </select>
                            <div>
                                <label htmlFor="name" className={styles.important}>Name</label>
                                <input type="text" id="name" required minLength={3} maxLength={60}  ref={itemNameEditField} />
                            </div>
                            <div>
                                <label htmlFor="quantity" className={styles.important}>Quantity</label>
                                <input type="number" id="quantity" required min={1} ref={itemQuantityEditField}/>
                            </div>
                            <div>
                                <label htmlFor="issuable" className={styles.important}>Issuable</label>
                                <select id="issuable" required ref={itemIssuableEditField} > 
                                    <option value={"Yes"}>Yes</option>
                                    <option value={"No"}>No</option>
                                </select>
                            </div>
                            <button type="submit">Submit</button>
                        </form>
                    </div>
                </div>
            }
        </>
    )
}

export default AdminComponent