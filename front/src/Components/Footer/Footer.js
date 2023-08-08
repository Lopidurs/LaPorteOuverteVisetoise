import Box from '@mui/material/Box'
import Typography from '@mui/material/Typography'
import Logo from '../../Assets/logo-porte-ouverte-blanc.png'
import FacebookIcon from '@mui/icons-material/Facebook'
import Link from '@mui/material/Link'

const Footer = () => {
    return (
        <Box
            component="footer"
            sx={{
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                background: '#2f2e2e',
                padding: '10px',
                color: '#fff',
                position: 'fixed',
                bottom: 0,
                width: '100%'
            }}>
            <Box
                sx={{
                    display: 'flex',
                    alignItems: 'center',
                    width: '25%'
                }}>
                <Link href="#" sx={linkStyles}>
                    Mentions légales
                </Link>
                <Link href="#" sx={linkStyles}>
                    Politique en matière de cookies
                </Link>
                <Link href="#" sx={linkStyles}>
                    Politique de confidentialité
                </Link>
                <Link href="#" sx={linkStyles}>
                    Crédits
                </Link>
            </Box>

            <Box
                sx={{
                    display: 'flex',
                    alignItems: 'center',
                    flexDirection: 'column',
                    width: '25%'
                }}>
                <Box
                    component={'img'}
                    sx={{
                        display: {
                            xs: 'none',
                            md: 'flex',
                            height: '30px',
                            width: '30px',
                            justifyContent: 'center',
                            alignItems: 'center'
                        },
                        mr: 1
                    }}
                    src={Logo}
                />
                <Typography variant="caption" color="inherit">
                    Copyright ©2022. Nathan Sancke
                </Typography>
            </Box>

            <Box
                sx={{
                    display: 'flex',
                    alignItems: 'center',
                    width: '25%',
                    justifyContent: 'center'
                }}>
                <Link href="https://www.facebook.com/your_page" sx={linkStyles}>
                    <FacebookIcon />
                </Link>
            </Box>
        </Box>
    )
}

const linkStyles = {
    color: '#fff',
    marginLeft: '8px',
    marginRight: '8px',
    textDecoration: 'none',
    '&:hover': {
        textDecoration: 'underline'
    }
}

export default Footer
