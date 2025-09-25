import React from 'react';
import { Alert } from '@mui/material';
import { errorInterface } from '@/services/error';

const Error = ({ title, description }: errorInterface) => {
    return (
        <Alert severity="error" sx={{backgroundColor:"red", width:"fit-content", textAlign:"center"}}>{title}<br />{description}</Alert>
    )
}

export default Error