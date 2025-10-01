import React from 'react';
import Typography from '@mui/material/Typography';
import { AppBar, Toolbar, Box, Button } from '@mui/material';
import Link from 'next/link';
import TextField from '@mui/material/TextField';
import style from './style.module.css'

const Header = () => {
    return (
        <AppBar position='relative' className={`${style.appbar}`}>
            <Toolbar className={`${style.toolbar}`}>
                <Link href="/">
                    <Typography
                        variant="h6"
                        component="div"
                        className={`${style.textStyle}${style.block}${style.flexGrow}`}
                    >
                        Recipe App
                    </Typography>
                </Link>
                <Box className={`${style.textStyle}${style.block}`}>
                    <Link href="/login">
                        <Button className={`${style.whiteColor}`}>
                            Login
                        </Button>
                    </Link>
                </Box>
            </Toolbar>
        </AppBar>
    )
}

export default Header;