import React from 'react';
import Typography from '@mui/material/Typography';
import { AppBar, Toolbar, Box, Button } from '@mui/material';
import Link from 'next/link';
import TextField from '@mui/material/TextField';
import style from './style.module.css'

const Header = () => {
    return (
        <AppBar position='static' style={{ padding: '5px', background: "black", color: "white",borderBottom:"2px solid white" }}>
            <Toolbar sx={{ display: 'flex', flexDirection: "row", justifyContent: "space-between" }}>
                <Link href="/">
                    <Typography
                        variant="h6"
                        component="div"
                        className={style.textStyle}
                        sx={{ flexGrow: 1, display: 'block' }}
                    >
                        Product Catalogue
                    </Typography>
                </Link>
                <Box sx={{ display: 'block' }}>
                    <Link href="/cart">
                        <Button sx={{ color: '#fff' }}>
                            Cart
                        </Button>
                    </Link>
                </Box>
            </Toolbar>
        </AppBar>
    )
}

export default Header;