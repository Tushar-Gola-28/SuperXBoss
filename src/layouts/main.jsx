import React, { useState } from 'react'
import Navbar from '../components/NavBar'
import Sidebar from '../components/Slider'
import { Outlet } from 'react-router';
import { navHeight, sideBarClose, sideBarOpen } from '../../config-global';
import { Box } from '@mui/material';
import Container from '../components/ui/Container';

export function MainLayout() {
    const [open, setOpen] = useState(
        localStorage.getItem("slidebar") == "false" ? false : true
    );
    const [mobileOpen, setMobileOpen] = useState(false);
    const [openMenu, setOpenMenu] = useState([
    ]);
    const handleDrawerToggle = () => {

        setMobileOpen((prev) => !prev);
    };
    const handleDrawerOpen = () => {
        setOpen(false);
        localStorage.setItem("slidebar", false);
    };
    const handleDrawer = () => {
        setOpen(!open);
        if (open) {
            setOpenMenu([]);
        }
        localStorage.setItem("slidebar", !open);
    };
    return (
        <div>
            <Navbar
                handleDrawerToggle={handleDrawerToggle}
                handleDrawerOpen={handleDrawerOpen}
                open={open}
            />
            <Sidebar
                mobileOpen={mobileOpen}
                handleDrawerToggle={handleDrawerToggle}
                handleDrawer={handleDrawer}
                open={open}
                setOpen={setOpen}
                setOpenMenu={setOpenMenu}
                openMenu={openMenu}
                setMobileOpen={setMobileOpen}
            />
            <Box
                component="main"
                sx={{
                    pl: { xs: "0px", md: open ? sideBarOpen : sideBarClose },
                    paddingTop: navHeight,
                    minHeight: "100vh",
                    bgcolor: "#f2f8fdff",
                }}
            >
                <Container>
                    <Outlet />
                </Container>
            </Box>
        </div>
    )
}
