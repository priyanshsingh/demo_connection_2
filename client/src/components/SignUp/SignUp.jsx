import * as React from 'react';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';
import GoogleButton from 'react-google-button';
import Button from '@mui/material/Button';



export default function BasicTextFields() {
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
                <Typography variant="h3" color="grey" style={{ marginTop: '10px', marginBottom: '10px' }}>Register Now</Typography>
                <TextField className="text_field_email" required label="FirstName" style={{ margin: '10px 0', width: '80%' }} />
                <TextField className="text_field_email" required label="FirstName" style={{ margin: '10px 0', width: '80%' }} />
                <TextField className="text_field_email" required label="E-Mail" style={{ margin: '10px 0', width: '80%' }} />
                <TextField className="text_field_email" required label="UserName" style={{ margin: '10px 0', width: '80%' }} />

                <TextField
                    className="text_field_pass"
                    required
                    label="Password"
                    type="password"
                    autoComplete="current-password"
                    style={{ margin: '10px 0', width: '80%' }}
                />
                <br />
                <Button variant="contained" size="large" style={{fontSize:'1.3rem', marginTop:'10px', marginBottom:'10px'}}>
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
