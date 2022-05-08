import * as React from 'react';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';
import GoogleButton from 'react-google-button';
import Button from '@mui/material/Button';
import Checkbox from '@mui/material/Checkbox';

const label = { inputProps: { 'aria-label': 'Checkbox demo' } };


export default function BasicTextFields() {

    const navigate = useNavigate();
    const [user, setUser] = useState({
        firstName: "", lastName: "", email: "", username: "", password: ""
    })

    let name, value;

    const handleInputs = (e) => {
        console.log(e);
        name = e.target.name;
        value = e.target.value;

        setUser({ ...user, [name]: value });
    }

    const PostData = async (e) => {
        e.preventDefault();
        const{firstName, lastName, email, username, password} = user;

        const res = await fetch("/save", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                firstName: firstName, 
                lastName: lastName,
                username: username,
                password: password,
                email: email
            })
        });

        const data = await res.json();
        if(data.status === 403 || !data){
            window.alert("Invalid Registration");
            console.log("Invalid Reg of User");
        }
        else{
            window.alert("Registration Successful");
            console.log("Reg of User done");

            navigate("/login");
        }
    }

    return (

        <>
            <Box
                component="form"
                sx={{
                    "& .MuiTextField-root": { m: 1, width: "25ch" },
                }}
                noValidate
                autoComplete="off"
                style={{
                    width: '430px',
                    boxShadow: '0 0 25px 0 rgba(0,0,0,0.3)',
                    background: '#fff',
                    padding: '20px',
                    margin: '8% auto 0',
                    textAlign: 'center',
                    borderRadius: '10px'
                }}
            >
                <Typography
                    variant="h3"
                    color="grey"
                    style={{ marginTop: '10px', marginBottom: '10px' }}>Register Now</Typography>
                <form method="POST">
                    <TextField
                        value={user.firstName}
                        onChange={handleInputs}
                        name='firstName'
                        className="text_field_email"
                        required label="FirstName"
                        style={{ margin: '10px 0', width: '80%' }} />

                    <TextField
                        value={user.lastName}
                        onChange={handleInputs}
                        name='lastName'
                        className="text_field_email"
                        required label="LastName"
                        style={{ margin: '10px 0', width: '80%' }} />

                    <TextField
                        value={user.email}
                        onChange={handleInputs}
                        name='email'
                        className="text_field_email"
                        required label="E-Mail"
                        style={{ margin: '10px 0', width: '80%' }} />

                    <TextField
                        value={user.username}
                        onChange={handleInputs}
                        name='username'
                        className="text_field_email"
                        required label="UserName"
                        style={{ margin: '10px 0', width: '80%' }} />

                    <TextField
                        className="text_field_pass"
                        required
                        value={user.password}
                        onChange={handleInputs}
                        name='password'
                        label="Password"
                        type="password"
                        autoComplete="current-password"
                        style={{ margin: '10px 0', width: '80%' }}
                    />
                </form>
                <br />
                <Checkbox {...label} defaultChecked color="success" />
                I agree the privacy policy of the company and their TNC...
                <br />
                <Button type='submit' variant="contained" size="large" style={{ fontSize: '1.3rem', marginTop: '10px', marginBottom: '10px' }} onClick={PostData}>
                    Submit
                </Button>
                <hr style={{
                    height: '30px',
                    borderStyle: 'dotted',
                    borderColor: '#8c8b8b',
                    borderWidth: '1px 0 0 0',
                    borderRadius: '20px'
                }} />
                <p className="or">OR</p>
                <GoogleButton style={{ marginLeft: '80px' }} />
            </Box>
            <br />
            <br />
        </>
    );
}
