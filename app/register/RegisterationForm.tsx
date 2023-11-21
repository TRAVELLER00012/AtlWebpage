'use client';
import Image from "next/image";
import CloseIcon from "@/public/images/close.png"
import styles from "../styles/register.module.css";
import { useRef } from "react";
import axios from "axios";

export const RegisterationForm = () => {
    const firstName = useRef<HTMLInputElement>(null);
    const lastName = useRef<HTMLInputElement>(null);
    const phoneNumber = useRef<HTMLInputElement>(null);
    const years_in_atl = useRef<HTMLInputElement>(null);
    const age = useRef<HTMLInputElement>(null);
    const bus_number = useRef<HTMLInputElement>(null);
    const userClass = useRef<HTMLInputElement>(null);
    const section = useRef<HTMLInputElement>(null);
    const email = useRef<HTMLInputElement>(null);
    const password = useRef<HTMLInputElement>(null);

    return (
        <div className={styles.registerPage}>
            <div className={styles.heading}>
                <h1>Registration Form.</h1>
                <div className={styles.closeButton}><span>Close</span> <Image src={CloseIcon} alt="Close icon"/></div>
            </div>
            <div className={styles.content}>
                <div className={styles.nav}>
                    <div className={[styles.item,styles.selected].join(" ")}>Fill your details</div>
                </div>
                    <div className={styles.data}>
                        <form onSubmit={async (event) => {
                            event.preventDefault()
                            const response = await axios.post("http://localhost:3000/api/register", {
                                age: parseInt(age.current!.value),
                                firstName: firstName.current!.value,
                                lastName: lastName.current!.value,
                                phonenumber: phoneNumber.current!.value,
                                number_of_years_in_atl: parseInt(years_in_atl.current!.value),
                                bus_number: bus_number.current!.value,
                                class: parseInt(userClass.current!.value),
                                section: section.current!.value,
                                email: email.current!.value,
                                password: password.current!.value,
                                user_type:"Student"
                              })
                        }}>
                            <div className={styles.layer1}>
                                <div>
                                    <label htmlFor="firstName" className={styles.important}>First Name</label>
                                    <br />
                                    <input type="text" id="firstName" required minLength={3} maxLength={30}  ref={firstName}/>
                                </div>
                                <div>
                                    <label htmlFor="phoneNumber" className={styles.important}>Phone Number</label>
                                    <br />
                                    <input type="number" id="phoneNumber"  required ref={phoneNumber}/>
                                </div>
                                <div>
                                    <label htmlFor="yearsInAtl" className={styles.important}>Number of Years in ATL</label>
                                    <br />
                                    <input type="number" id="yearsInAtl" required min={0} max={100}  ref={years_in_atl}/>
                                </div>
                                <div>
                                    <label htmlFor="lastName" className={styles.important}>Last Name</label>
                                    <br />
                                    <input type="text" id="lastName" required minLength={3} maxLength={30} ref={lastName}/>
                                </div>
                                <div>
                                    <label htmlFor="age" className={styles.important}>Age</label>
                                    <br />
                                    <input type="number" id="age" required min={10} max={100}  ref={age}/>
                                </div>
                                <div>
                                    <label htmlFor="busNumber" className={styles.important}>Bus Number</label>
                                    <br />
                                    <input type="text" id="busNumber" required maxLength={4} ref={bus_number}/>
                                </div>
                            </div>
                            <div className={styles.layer2}>
                                <div>
                                    <label htmlFor="class" className={styles.important}>Class</label>
                                    <br />
                                    <input type="number" id="class" min={6} max={12} ref={userClass} required  />
                                </div>
                                <div>
                                    <label htmlFor="section" className={styles.important}>Section</label>
                                    <br />
                                    <input type="text" id="section"maxLength={1}  ref={section} required/>
                                </div>
                                <div>
                                    <label htmlFor="email" className={styles.important}>Email</label>
                                    <br />
                                    <input type="email" id="email" required maxLength={255}  ref={email}/>
                                </div>
                                <div>
                                    <label htmlFor="password" className={styles.important}>Password</label>
                                    <br />
                                    <input type="password" id="password" required minLength={8} maxLength={25} ref={password}/>
                                </div>
                            </div>
                            <div className={styles.layer3}>
                                <button type="reset" className={styles.reset}>Reset</button>
                                <button type="submit" className={styles.submit}>Submit</button>
                            </div>
                    </form>
                </div>
            </div>
        </div>
    );
};
export default RegisterationForm;