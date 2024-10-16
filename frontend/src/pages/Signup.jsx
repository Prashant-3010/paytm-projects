import { BottomWarning } from "../components/BottomWarning"
import { Button } from "../components/button"
import { Heading } from "../components/Heading"
import { InputBox } from "../components/InputBox"
import { SubHeading } from "../components/SubHeading"
import axios from "axios"
import { useState } from "react"

export const Signup = () => {
    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");

    return <div className="bg-slate-300 h-screen flex justify-center">
        <div className="flex flex-col justify-center">
            <div className="rounded-lg bg-white w-80 text-center p-2 h-max px-4">
                <Heading label={"Sign up"}/>
                <SubHeading label={"Enter your Information to create an account"} />
                <InputBox onChange = { (e) => {
                    setFirstName(e.target.value);
                }} label={"First Name"} placeHolder={"John"}/>
                <InputBox onChange = { (e) => {
                    setLastName(e.target.value);
                }} label={"Last Name"} placeHolder={"Doe"}/>
                <InputBox onChange = { (e) => {
                    setUsername(e.target.value);
                }} label={"Email"} placeHolder={"prashant@gmail.com"}/>
                <InputBox onChange = { (e) => {
                    setPassword(e.target.value);
                }} label={"Password"} placeHolder={"123456"}/>
                <div className="pt-4">
                    <Button onClick={ async() => {
                        const response = await axios.post("http://localhost:3000/api/v1/user/signup", {
                            username,
                            firstName,
                            lastName,
                            password
                        })
                        localStorage.setItem("token", response.data.token)
                    }} label={"Sign up"}/>    
                </div>
                <BottomWarning label={"Already have an account?"} buttonText={"Sign in"} to={"/Signin"}/>
            </div>
        </div>
    </div>
}
                