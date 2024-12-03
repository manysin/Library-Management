'use client'
import React, { useState } from 'react';
import {
    Box,
    Button,
    Checkbox,
    Divider,
    FormControl,
    FormControlLabel,
    FormLabel,
    TextField,
    Typography,
} from '@mui/material';
import { styled } from '@mui/material/styles';
import { GoogleIcon } from '@/lib/CutomIcons';

const CustomButton = styled(Button)(({ theme }) => ({
    textTransform: 'none',
    borderRadius: theme.shape.borderRadius,
    padding: theme.spacing(1.5),
    width: '100%',
    marginTop: theme.spacing(2),
    borderColor: 'rgba(0, 0, 0, 0.23)',
    '&:hover': {
        borderColor: 'rgba(0, 0, 0, 0.87)',
    },
}));

const RegisterForm = () => {
    const [email, setEmail] = useState("");
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");

    const handleOnSubmit = async () => {
        const data = {
            email: email,
            username: username,
            password: password,
        };

        try {
            const response = await fetch('/api/users', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(data),
            });

            if (response.ok) {
                const result = await response.json();
                console.log('Data saved successfully:', result);
            } else {
                console.error('Error saving data:', response.statusText);
            }
        } catch (error) {
            console.error('Error:', error);
        }
    };

    return (
        <Box
            sx={{
                width: 430,
                margin: 'auto',
                padding: 5,
                boxShadow: 3,
                borderRadius: 2,
                backgroundColor: '#FBFBFB',
            }}
        >
            <Typography variant="h5" fontWeight="bold" mb={3} sx={{ color: '#0E46A3' }}>
                Sign up
            </Typography>
            <Box
                component="form"
                noValidate
                sx={{
                    display: 'flex',
                    flexDirection: 'column',
                    width: '100%',
                    gap: 2,
                }}
            >
                <FormControl>
                    <FormLabel
                        htmlFor="text"
                        sx={{
                            fontSize: '14px',
                            fontWeight: 'bold',
                            color: '#61677A',
                            marginBottom: '5px',
                        }}
                    >
                        Username
                    </FormLabel>
                    <TextField
                        name="text"
                        placeholder="Username"
                        type="text"
                        id="text"
                        autoFocus
                        required
                        fullWidth
                        size="small"
                        variant="outlined"
                        sx={{
                            '& .MuiOutlinedInput-root': {
                                borderRadius: '10px',
                            },
                        }}
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                    />
                </FormControl>
                <FormControl>
                    <FormLabel
                        htmlFor="email"
                        sx={{
                            fontSize: '14px',
                            fontWeight: 'bold',
                            color: '#61677A',
                            marginBottom: '5px',
                        }}
                    >
                        Email
                    </FormLabel>
                    <TextField
                        id="email"
                        type="email"
                        name="email"
                        placeholder="your@email.com"
                        autoComplete="email"
                        autoFocus
                        required
                        fullWidth
                        size="small"
                        variant="outlined"
                        sx={{
                            '& .MuiOutlinedInput-root': {
                                borderRadius: '10px',
                            },
                        }}
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                    />
                </FormControl>
                <FormControl>
                    <FormLabel
                        htmlFor="password"
                        sx={{
                            fontSize: '14px',
                            fontWeight: 'bold',
                            color: '#61677A',
                            marginBottom: '5px',
                        }}
                    >
                        Password
                    </FormLabel>
                    <TextField
                        name="password"
                        placeholder="••••••"
                        type="password"
                        id="password"
                        autoComplete="current-password"
                        autoFocus
                        required
                        fullWidth
                        size="small"
                        variant="outlined"
                        sx={{
                            '& .MuiOutlinedInput-root': {
                                borderRadius: '10px',
                            },
                        }}
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                    />
                </FormControl>
            </Box>
            <CustomButton
                sx={{
                    bgcolor: '#0E46A3',
                    color: 'white',
                    fontWeight: 'bold',
                    border: 'aliceblue',
                    height: '40px',
                    borderRadius: '10px',
                    borderColor: 'rgba(0, 0, 0, 0.23)',
                    marginTop: "30px"
                }}
                onClick={handleOnSubmit}
            >
                Register
            </CustomButton>
            <Divider sx={{ mt: 2 }}>or</Divider>

            <CustomButton
                variant="outlined"
                startIcon={<GoogleIcon />}
                color="inherit"
                sx={{
                    borderRadius: '10px',
                    height: '40px',
                    backgroundColor: '#F5F5F5',
                    borderColor: 'rgba(0, 0, 0, 0.23)', // Same border color
                    fontWeight: 'semibold',
                    '&:hover': {
                        borderColor: 'rgba(0, 0, 0, 0.87)',
                    },
                    fontWeight: "600",
                    fontSize: "13px",
                    color: "#61677A"
                }}
            >
                Sign in with Google
            </CustomButton>
            <Typography
                align="center"
                mt={2}
                sx={{ fontSize: '14px', fontWeight: 'bold', color: '#61677A' }}
            >
                Already have an account?{' '}
                <a
                    href="#"
                    style={{ textDecoration: 'none', color: '#1976d2' }}
                >
                    Sign up
                </a>
            </Typography>
        </Box>
    );
};

export default RegisterForm;
