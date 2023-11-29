import React, { useState, useRef, useEffect } from 'react';
import { styled, useTheme, alpha } from '@mui/material/styles';
import {
    Box,
    Drawer as MuiDrawer,
    AppBar as MuiAppBar,
    Toolbar,
    Tooltip,
    List,
    CssBaseline,
    Typography,
    Divider,
    IconButton,
    Button,
    ListItem,
    ListItemButton,
    ListItemIcon,
    ListItemText,
    InputBase,
} from '@mui/material';
import {
    Menu,
    ChevronLeft as ChevronLeftIcon,
    ChevronRight as ChevronRightIcon,
    Dashboard,
    Groups,
    Assessment,
    Settings,
    Search as SearchIcon,
    AccountBox,
    ShoppingCartCheckout,
    Logout,
    LocalBar,
    LocalDining
} from '@mui/icons-material';
import { NavLink, useLocation } from 'react-router-dom';
import AccountMenu from './AccountMenu.jsx';
import { useAuth } from '../../contexts/AuthenticationContext.js';

const drawerWidth = 180;
const openedMixin = (theme) => ({
    width: drawerWidth,
    transition: theme.transitions.create('width', {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.enteringScreen,
    }),
    overflowX: 'hidden',
    backgroundColor: theme.palette.primary.light
});

const closedMixin = (theme) => ({
    transition: theme.transitions.create('width', {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.leavingScreen,
    }),
    overflowX: 'hidden',
    width: `calc(${theme.spacing(7)} + 1px)`,
    [theme.breakpoints.up('sm')]: {
        width: `calc(${theme.spacing(8)} + 1px)`,
    },
    backgroundColor: theme.palette.primary.main

});

const DrawerHeader = styled('div')(({ theme }) => ({
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'flex-end',
    padding: theme.spacing(0, 1),
    // necessary for content to be below app bar
    ...theme.mixins.toolbar,
}));

const AppBar = styled(MuiAppBar, {
    shouldForwardProp: (prop) => prop !== 'open',
})(({ theme, open }) => ({
    zIndex: theme.zIndex.drawer + 1,
    transition: theme.transitions.create(['width', 'margin'], {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.leavingScreen,
    }),
    ...(open && {
        marginLeft: drawerWidth,
        width: `calc(100% - ${drawerWidth}px)`,
        transition: theme.transitions.create(['width', 'margin'], {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.enteringScreen,
        }),
    }),
}));

const Drawer = styled(MuiDrawer, { shouldForwardProp: (prop) => prop !== 'open' })(
    ({ theme, open }) => ({
        width: drawerWidth,
        flexShrink: 0,
        whiteSpace: 'nowrap',
        boxSizing: 'border-box',
        ...(open && {
            ...openedMixin(theme),
            '& .MuiDrawer-paper': {
                ...openedMixin(theme),
            }
        }),
        ...(!open && {
            ...closedMixin(theme),
            '& .MuiDrawer-paper': closedMixin(theme),
        }),
    }),
);

// const Search = styled('div')(({ theme }) => ({
//     position: 'relative',
//     borderRadius: theme.shape.borderRadius,
//     backgroundColor: alpha(theme.palette.common.white, 0.15),
//     '&:hover': {
//         backgroundColor: alpha(theme.palette.common.white, 0.25),
//     },
//     marginLeft: 0,
//     width: '100%',
//     [theme.breakpoints.up('sm')]: {
//         marginLeft: theme.spacing(1),
//         width: 'auto',
//     },
// }));

// const SearchIconWrapper = styled('div')(({ theme }) => ({
//     padding: theme.spacing(0, 2),
//     height: '100%',
//     position: 'absolute',
//     pointerEvents: 'none',
//     display: 'flex',
//     alignItems: 'center',
//     justifyContent: 'center',
// }));

const StyledInputBase = styled(InputBase)(({ theme }) => ({
    color: 'inherit',
    '& .MuiInputBase-input': {
        padding: theme.spacing(1, 1, 1, 0),
        // vertical padding + font size from searchIcon
        paddingLeft: `calc(1em + ${theme.spacing(4)})`,
        transition: theme.transitions.create('width'),
        width: '100%',
        [theme.breakpoints.up('sm')]: {
            width: '12ch',
            '&:focus': {
                width: '20ch',
            },
        },
    },
}));

const MiniDrawer = () => {
    const theme = useTheme();
    const { user, logout } = useAuth();
    const [open, setOpen] = useState(false);
    const ref = useRef(null);
    const location = useLocation();

    const handleDrawerOpen = () => setOpen(true);
    const handleDrawerClose = () => setOpen(false);

    const handleLogout = () => {
        logout();
    }

    const navItems = [
        { text: 'Dashboard', icon: <Dashboard color='quaternary' fontSize='medium' />, path: '/dashboard' },
        { text: 'Employees', icon: <AccountBox color='quaternary' fontSize='medium' />, path: '/employees/all' },
        { text: 'Support Staff', icon: <Groups color='quaternary' fontSize='medium' />, path: '/support' },
        // { text: 'Checkouts', icon: <ShoppingCartCheckout color='quaternary' fontSize='medium' />, path: '/checkouts' },
        { text: 'Servers', icon: <LocalDining color='quaternary' fontSize='medium' />, path: '/checkouts' },
        { text: 'Bartenders', icon: <LocalBar color='quaternary' />, path: '/bartender' },
        { text: 'Reports', icon: <Assessment color='quaternary' fontSize='medium' />, path: '/reports' },
    ];

    const currentPageTitle = navItems.find((item) => item.path === location.pathname)?.text || 'Employees';

    useEffect(() => {
        const handleClickOutside = (e) => {
            if (ref.current) handleDrawerClose();
        };

        document.addEventListener('mousedown', handleClickOutside);
        return () => document.removeEventListener('mousedown', handleClickOutside);
    }, []);

    return (
        <Box sx={{ display: 'flex' }}>
            <AppBar position="fixed" open={open}>
                <Toolbar>
                    <IconButton
                        aria-label="open drawer"
                        onClick={handleDrawerOpen}
                        edge="start"
                        color='quaternary'
                        sx={{
                            marginRight: 5,
                            ...(open && { display: 'none' }),
                        }}
                    >
                        <Menu fontSize='medium' />
                    </IconButton>
                    <Box width={1} m={0} p={0} sx={{ display: 'flex', justifyContent: 'space-between' }}>
                        <Typography variant="h5" noWrap color={theme.palette.quaternary.main} component="div" alignSelf='center'>
                            {currentPageTitle}
                        </Typography>
                        {/* <Search alignSelf='center' >
                            <SearchIconWrapper>
                                <SearchIcon />
                            </SearchIconWrapper>
                            <StyledInputBase
                                placeholder="Search…"
                                inputProps={{ 'aria-label': 'search' }}
                            />
                        </Search> */}
                        <AccountMenu />
                    </Box>
                </Toolbar>
            </AppBar>
            <Drawer variant="permanent" open={open} ref={ref}>
                <DrawerHeader>
                    <IconButton onClick={handleDrawerClose} sx={{ color: theme.palette.quaternary.main }}>
                        {theme.direction === 'rtl' ? <ChevronRightIcon /> : <ChevronLeftIcon />}
                    </IconButton>
                </DrawerHeader>
                <Divider />
                <List>
                    {navItems.map((item) => (
                        <ListItem
                            key={item.text}
                            disablePadding
                            sx={{ display: 'block' }}
                        >
                            <NavLink
                                to={item.path}
                                style={{ textDecoration: 'none', color: 'black', margin: 'none' }}
                            >
                                <ListItemButton
                                    sx={{
                                        minHeight: 48,
                                        justifyContent: open ? 'initial' : 'center',
                                        px: 2.5,
                                        backgroundColor: item.path === location.pathname ? theme.navHover : 'inherit',
                                    }}
                                >
                                    <ListItemIcon
                                        sx={{
                                            minWidth: 0,
                                            mr: open ? 3 : 'auto',
                                            justifyContent: 'center',
                                        }}
                                    >
                                        {item.icon}
                                    </ListItemIcon>
                                    <ListItemText primary={item.text} sx={{ opacity: open ? 1 : 0, lineHeight: 1, position: 'relative', top: '1px' }} />
                                </ListItemButton>
                            </NavLink>
                        </ListItem>
                    ))}
                </List>
                <Divider />
                <List>
                    <ListItem
                        disablePadding
                        sx={{ display: 'block' }}
                        onClick={handleLogout}
                    >
                        <ListItemButton
                            sx={{
                                minHeight: 48,
                                justifyContent: open ? 'initial' : 'center',
                                px: 2.5,
                            }}
                        >
                            <ListItemIcon
                                sx={{
                                    minWidth: 0,
                                    mr: open ? 3 : 'auto',
                                    justifyContent: 'center',
                                }}
                            >
                                <Logout color='quaternary' fontSize='medium' onClick={handleLogout} />
                            </ListItemIcon>
                            <ListItemText primary='Logout' sx={{ opacity: open ? 1 : 0, lineHeight: 1, position: 'relative', top: '1px' }} />
                        </ListItemButton>
                    </ListItem>
                </List>
            </Drawer>
        </Box>
    );
};

export default MiniDrawer;