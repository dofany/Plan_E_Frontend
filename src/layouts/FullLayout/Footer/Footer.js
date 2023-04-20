import React from 'react'
import {
    Box,
    Link,
    Typography,
    
  } from '@material-ui/core';
const Footer = () => {
    return ( 
        <Box sx={{p:3, textAlign:'center'}}>
            <Typography>© 2023 All rights reserved by <Link href="https://www.google.com">planE.com</Link> </Typography>
        </Box>
     );
}
 
export default Footer;