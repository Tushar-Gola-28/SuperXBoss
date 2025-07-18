/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable react-refresh/only-export-components */
// Nav menu
/* eslint-disable react/prop-types */
import MuiDrawer from "@mui/material/Drawer";
import MobileDrawer from "@mui/material/Drawer";
import List from "@mui/material/List";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import ListItem from "@mui/material/ListItem";
import CompanyLogo from "./CampanyLogo";
import styled from "@emotion/styled";
import { useTheme } from "@mui/material/styles";
import useMediaQuery from "@mui/material/useMediaQuery";
import {
    Box,
    Collapse,
    IconButton,
    ListItemButton,
    ListItemIcon,
    ListItemText,
    Popover,
} from "@mui/material";
import Grid from '@mui/material/Grid2'
import DashboardCustomizeIcon from '@mui/icons-material/DashboardCustomize';
import AddToPhotosIcon from '@mui/icons-material/AddToPhotos';
import BrandingWatermarkIcon from '@mui/icons-material/BrandingWatermark';
import ProductionQuantityLimitsIcon from '@mui/icons-material/ProductionQuantityLimits';
import GradingIcon from '@mui/icons-material/Grading';
import PeopleAltIcon from '@mui/icons-material/PeopleAlt';
import AdminPanelSettingsIcon from '@mui/icons-material/AdminPanelSettings';
import PersonOutlineIcon from '@mui/icons-material/PersonOutline';
import NotificationAddIcon from '@mui/icons-material/NotificationAdd';
import LogoutIcon from '@mui/icons-material/Logout';
import KeyboardArrowRightIcon from '@mui/icons-material/KeyboardArrowRight';
import LocalShippingIcon from '@mui/icons-material/LocalShipping';
import LocalOfferIcon from '@mui/icons-material/LocalOffer';
import CurrencyRupeeIcon from '@mui/icons-material/CurrencyRupee';
import InfoIcon from '@mui/icons-material/Info';
import ViewCarouselIcon from '@mui/icons-material/ViewCarousel';
import QuizIcon from '@mui/icons-material/Quiz';

import React, { useEffect, useRef, useState } from "react";
import { useNavigate, useLocation } from "react-router";
import ExpandLess from "@mui/icons-material/ExpandLess";
import ExpandMore from "@mui/icons-material/ExpandMore";
import { sideBarClose, sideBarOpen } from "../../config-global";

const MenuItem = ({
    path,
    label,
    icon,
    open,
    activeLink,
    setActiveLink,
    navigate,
    mobileOpen,
    handleDrawerToggle,
    setMobileOpen,
    closePopup,
}) => (
    <ListItemButton
        sx={{
            pl: open ? 5 : 0 && mobileOpen && 0,
            margin: "0.5rem 1rem",
            background: activeLink === path ? "#0276E5" : "",
            borderRadius: "0.25rem",
            "&:hover": {
                backgroundColor: activeLink === path ? "#0276E5" : "",
            },
        }}
        onClick={() => {
            navigate(path || "");
            setActiveLink(path);
            mobileOpen && handleDrawerToggle();
            closePopup();
            setMobileOpen(false);
        }}
        key={label}
    >
        {icon && (
            <ListItemIcon
                sx={{
                    minWidth: 0,
                    mr: 1,
                    justifyContent: "center",
                }}
            >
                <Box
                    // component="img"
                    // src={icon}
                    alt="Campaign"
                    sx={{
                        display: "block",
                        marginLeft: "6px",
                        filter:
                            activeLink === path &&
                            "brightness(0) saturate(100%) invert(100%) sepia(0%) saturate(0%) hue-rotate(93deg) brightness(103%) contrast(103%)",
                    }}
                >
                    {icon}
                </Box>
            </ListItemIcon>
        )}
        <ListItemText
            primary={label}
            sx={{
                span: {
                    color: {
                        textDecoration: "none",
                        display: "flex",
                        justifyContent: "flex-start",
                        alignItems: "center",
                        color: activeLink === path ? "#FFFFFF" : "#2A2A2A",
                        width: "100%",
                        fontSize: "0.875rem",
                        fontWeight: 500,
                    },
                },
            }}
        />
    </ListItemButton>
);

const Sidebar = ({
    handleDrawer,
    open,
    mobileOpen,
    handleDrawerToggle,
    setOpenMenu,
    openMenu,
    setOpen,
    setMobileOpen,
}) => {


    function removeTrailingSlash(url) {
        if (url.endsWith("/")) {
            return url.slice(0, -1);
        }
        return url;
    }

    const location = useLocation();
    const fullPath = location.pathname;
    const baseRoute = `/${fullPath.split("/")[1]}`;
    const [activeLink, setActiveLink] = useState(removeTrailingSlash(baseRoute));
    const [anchorEl, setAnchorEl] = useState(null);
    const [openPopupData, setOpenPopupData] = useState("");
    const listRef = useRef(null);  // Ref for the scrollable list
    const itemRefs = useRef({});  // Refs for each ListItemButton

    const openPopup = (event) => setAnchorEl(event.currentTarget);
    const closePopup = () => setAnchorEl(null);

    const isPopoverOpen = Boolean(anchorEl);

    useEffect(() => {
        closePopup();
    }, [location.pathname]);


    useEffect(() => {
        if (location.pathname) {
            setActiveLink(baseRoute);
        }
    }, [location.pathname]);

    const theme = useTheme();
    const navigate = useNavigate();

    const handleItemClick = (e, path, label, hasChildren) => {
        e.preventDefault();

        e.stopPropagation();

        if (hasChildren) {
            if (open && !mobileOpen) {

                setOpenMenu((prev) => {
                    if (prev?.includes(label)) {
                        return prev?.filter((item) => item !== label);
                    }
                    // return [...prev, label];
                    return [label];
                });

                localStorage.setItem("menu-item", label);
            } else {

                openPopup(e);
                setOpenPopupData(label);
                setOpenMenu((prev) => {
                    if (prev?.includes(label)) {
                        return prev?.filter((item) => item !== label);
                    }
                    // return [...prev, label];
                    return [label];
                });

                localStorage.setItem("menu-item", label);
            }
        } else {
            navigate(path || "");

            setActiveLink(path);

            closePopup();
            setOpenMenu([]);

            localStorage.setItem("menu-item", "");
        }

    };

    useEffect(() => {
        if (activeLink && itemRefs.current[activeLink] && listRef.current) {
            const itemPosition = itemRefs.current[activeLink].getBoundingClientRect();
            const listPosition = listRef.current.getBoundingClientRect();
            // Adjust scroll to keep the active item in view
            listRef.current.scrollTop += itemPosition.top - listPosition.top - listPosition.height / 2;
        }
    }, [activeLink, open, mobileOpen]);

    const Drawer = styled(MuiDrawer, {
        shouldForwardProp: (prop) => prop !== "open",
    })(({ theme, open }) => ({
        width: sideBarOpen,
        flexShrink: 0,
        whiteSpace: "nowrap",
        boxSizing: "border-box",
        ...(open && {
            ...openedMixin(theme),
            "& .MuiDrawer-paper": openedMixin(theme),
        }),
        ...(!open && {
            ...closedMixin(theme),
            "& .MuiDrawer-paper": closedMixin(theme),
        }),
    }));
    const openedMixin = (theme) => ({
        width: sideBarOpen,
        border: "none",
        transition: theme.transitions.create("width", {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.enteringScreen,
        }),
        boxShadow: "0px 4px 16px 0px #0276E526",
    });

    const closedMixin = (theme) => ({
        transition: theme.transitions.create("width", {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.leavingScreen,
        }),
        border: "none",
        boxShadow: "0px 4px 16px 0px #0276E526",
        width: sideBarClose,
    });

    const matches = useMediaQuery(theme.breakpoints.up("md"));

    const organizedMenu1 = [
        {

            icon: <DashboardCustomizeIcon />,
            label: "Dashboard",
            order: 0,
            parent: null,
            path: "/dashboard",
            children: []
        },


        {

            icon: <ProductionQuantityLimitsIcon />,
            label: "Product Hub",
            order: 0,
            parent: null,
            path: "/products",
            children: [
                {

                    icon: <AddToPhotosIcon />,
                    label: "Categories",
                    order: 0,
                    parent: null,
                    path: "/categories",
                    children: []
                },
                {

                    icon: <BrandingWatermarkIcon />,
                    label: "Brands",
                    order: 0,
                    parent: null,
                    path: "/brands",
                    children: []
                },
                {

                    icon: <ProductionQuantityLimitsIcon />,
                    label: "Product List",
                    order: 0,
                    parent: null,
                    path: "/products",
                    children: []
                },
            ]
        },

        {

            icon: <PeopleAltIcon />,
            label: "User Management",
            order: 0,
            parent: null,
            path: "/users",
            children: [
                {

                    icon: <PeopleAltIcon />,
                    label: "Users",
                    order: 0,
                    parent: null,
                    path: "/users",
                },
                {

                    icon: <AdminPanelSettingsIcon />,
                    label: "Roles Permissions",
                    order: 0,
                    parent: null,
                    path: "/role-permissions",
                    children: []
                },
            ]
        },
        {

            icon: <PersonOutlineIcon />,
            label: "Customer Mange...",
            order: 0,
            parent: null,
            path: "/customers",
            children: [
                {

                    icon: <PersonOutlineIcon />,
                    label: "Customers",
                    order: 0,
                    parent: null,
                    path: "/customers",
                    children: []
                },
                {

                    icon: <LocalShippingIcon />,
                    label: "Shipping",
                    order: 0,
                    parent: null,
                    path: "/shipping",
                    children: []
                },

                {

                    icon: <CurrencyRupeeIcon />,
                    label: "Recharge Offer",
                    order: 0,
                    parent: null,
                    path: "/wallet-offer",
                    children: []
                },
            ]
        },
        {

            icon: <GradingIcon />,
            label: "Orders",
            order: 0,
            parent: null,
            path: "/orders",
            children: []
        },




        {

            icon: <LocalOfferIcon />,
            label: "Coupon",
            order: 0,
            parent: null,
            path: "/coupon",
            children: []
        },


        {

            icon: <ViewCarouselIcon />,
            label: "Banner",
            order: 0,
            parent: null,
            path: "/banner",
            children: []
        },
        {

            icon: <NotificationAddIcon />,
            label: "Notification",
            order: 0,
            parent: null,
            path: "/notification",
            children: []
        },
        {

            icon: <InfoIcon />,
            label: "Information",
            order: 0,
            parent: null,
            path: "/information",
            children: []
        },
        {

            icon: <QuizIcon />,
            label: "FAQ",
            order: 0,
            parent: null,
            path: "/faq",
            children: []
        },




    ]

    return matches ? (
        <Drawer
            variant="permanent"
            // ref={drawerRef}
            open={open}
            sx={{
                "& .MuiDrawer-paper": {
                    borderRadius: "0px",
                    border: "0px",
                    overflowY: "visible",
                },
            }}
        >
            <Box sx={{ position: "relative" }}>
                <CompanyLogo open={open} />
                <IconButton
                    sx={{
                        position: "absolute",
                        top: "50%",
                        left: "98%",
                        transform: "translateY(-50%) translateX(-50%)",
                        minWidth: "25px",
                        height: "25px",
                        zIndex: "999999",
                        p: "0",
                        borderRadius: "50%",
                        background: "#F2F8FD",
                    }}
                    onClick={handleDrawer}
                >
                    {open ? <ChevronLeftIcon /> : <ChevronRightIcon />}
                </IconButton>
            </Box>

            <List
                ref={listRef}
                sx={{
                    py: open ? 2 : 0.5,
                    px: open ? 1 : 0.5,
                    overflowY: "scroll",
                    height: "100vh",
                    WebkitOverflowScrolling: "touch",
                    "&::-webkit-scrollbar": {
                        width: "0",
                    },
                    "&::-webkit-scrollbar-thumb": {
                        backgroundColor: "transparent",
                    },
                }}
            >
                {organizedMenu1
                    ?.map(({ label, path, icon, children }) => (
                        <Grid key={label}>
                            <ListItem
                                disablePadding
                                sx={{
                                    display: "block",
                                    padding: "5px 0px",
                                }}
                            >
                                <ListItemButton
                                    ref={(el) => (itemRefs.current[path] = el)}
                                    sx={{
                                        minHeight: 48,
                                        justifyContent: open ? "initial" : "center",
                                        px: 3,
                                        background:
                                            activeLink == path && !children.length ? "#0276E5" : "",
                                        borderRadius: "0.25rem",
                                        "&:hover": {
                                            backgroundColor:
                                                activeLink == path && !children.length ? "#0276E5" : "",
                                        },
                                        p: 0,
                                        padding: "0 0 0 10px",
                                        margin: "0 10px",
                                        flexDirection: open ? "row" : "column",
                                        textAlign: open ? "" : " center",
                                        alignItems: open ? "" : "center",
                                    }}
                                    onClick={(e) =>
                                        handleItemClick(e, path, label, children.length)
                                    }
                                >
                                    {icon && (
                                        <ListItemIcon
                                            sx={{
                                                minWidth: 0,
                                                mr: open ? 1.5 : 2,
                                                justifyContent: "center",
                                            }}
                                            className="icon-container"
                                        >
                                            <Box
                                                // component={icon}
                                                // src={icon}
                                                alt="Campaign"
                                                sx={{
                                                    display: "block",
                                                    marginLeft: "6px",
                                                    filter:
                                                        activeLink == path &&
                                                        !children.length &&
                                                        "brightness(0) saturate(100%) invert(100%) sepia(0%) saturate(0%) hue-rotate(93deg) brightness(103%) contrast(103%)",
                                                }}
                                            >
                                                {icon}
                                            </Box>

                                        </ListItemIcon>
                                    )}
                                    <ListItemText
                                        primary={label}

                                        sx={{
                                            span: {
                                                color: {
                                                    opacity: 1,
                                                    textDecoration: "none",
                                                    display: "flex",
                                                    justifyContent: "flex-start",
                                                    alignItems: "center",
                                                    color:
                                                        activeLink == path && !children?.length
                                                            ? "#FFFFFF"
                                                            : "#2A2A2A",
                                                    width: "100%",
                                                    fontSize: open ? "0.875rem" : "0.6rem",
                                                    fontWeight: 500,
                                                    margin: open ? "" : "0 10px 0 0px",
                                                },
                                            },
                                        }}
                                    />
                                    {children?.length ? (
                                        openMenu?.find((data) => data === label) ? (
                                            <ExpandLess sx={{ display: open ? "block" : "none" }} />
                                        ) : (
                                            <ExpandMore sx={{ display: open ? "block" : "none" }} />
                                        )
                                    ) : null}
                                </ListItemButton>
                            </ListItem>
                            {children && open && (
                                <Collapse

                                    in={openMenu?.find((data) => data === label)}
                                    timeout="auto"
                                    unmountOnExit
                                >
                                    <List component="div" disablePadding>
                                        {children
                                            ?.map(({ path, label, icon }) => (
                                                <MenuItem
                                                    key={label}
                                                    path={path}
                                                    label={label}
                                                    icon={icon}
                                                    open={open}
                                                    activeLink={activeLink}
                                                    setActiveLink={setActiveLink}
                                                    navigate={navigate}
                                                />
                                            ))}
                                    </List>
                                </Collapse>
                            )}
                            <Popover
                                open={isPopoverOpen}
                                anchorEl={anchorEl}
                                onClose={closePopup}
                                anchorOrigin={{
                                    vertical: "bottom",
                                    horizontal: "right",
                                }}
                                transformOrigin={{
                                    vertical: "top",
                                    horizontal: "left",
                                }}
                                PaperProps={{
                                    style: {
                                        boxShadow: "none",
                                        backgroundColor: "#fff",
                                        border: "1px solid #ccc",
                                        marginTop: "100px",
                                        marginLeft: "90px",
                                    },
                                }}
                            >
                                {
                                    <Collapse in={isPopoverOpen} timeout="auto" unmountOnExit>
                                        <List component="div" disablePadding>
                                            {organizedMenu1
                                                ?.find((item) => item.label === openPopupData)
                                                ?.children
                                                ?.map(({ path, label, icon }) => (
                                                    <MenuItem
                                                        key={label}
                                                        path={path}
                                                        label={label}
                                                        icon={icon}
                                                        open={open}
                                                        activeLink={activeLink}
                                                        setActiveLink={setActiveLink}
                                                        navigate={navigate}
                                                    />
                                                ))}
                                        </List>
                                    </Collapse>
                                }
                            </Popover>
                        </Grid>
                    ))}
            </List>

            {/* <Divider /> */}
        </Drawer>
    ) : (
        <MobileDrawer
            open={mobileOpen}
            onClose={handleDrawerToggle}
            sx={{
                width: mobileOpen && "130px",
                justifyContent: mobileOpen && "center",
                flexShrink: 0,
                whiteSpace: "nowrap",
                boxSizing: "border-box",
                "& .MuiDrawer-paper": {
                    width: 130,

                    borderRadius: "0px",
                },
            }}
        >
            {/* <DrawerHeader > */}
            <Box sx={{ position: "relative" }}>
                <CompanyLogo open={false} />
            </Box>
            <List
                sx={{
                    // py: open ? 2 : 0.5,
                    // px: open ? 1 : 0.5,
                    overflowY: "scroll",
                    height: "100vh",
                    WebkitOverflowScrolling: "touch",
                    "&::-webkit-scrollbar": {
                        width: "0",
                    },
                    "&::-webkit-scrollbar-thumb": {
                        backgroundColor: "transparent",
                    },
                }}
            >
                {organizedMenu1
                    ?.map(({ label, path, icon, children }) => (
                        <Grid key={label}>
                            <ListItem
                                disablePadding
                                sx={{
                                    display: "block",
                                    padding: "10px 0px",
                                }}
                            >
                                <ListItemButton
                                    sx={{
                                        minHeight: 48,
                                        justifyContent: open ? "initial" : "center",
                                        px: 3,
                                        background:
                                            activeLink == path && !children.length ? "#0276E5" : "",
                                        borderRadius: "0.25rem",
                                        "&:hover": {
                                            backgroundColor:
                                                activeLink == path && !children.length ? "#0276E5" : "",
                                        },
                                        p: 0,

                                        padding: "0 0 0 10px",
                                        margin: "0 10px",
                                        flexDirection: "column",
                                        textAlign: " center",
                                        alignItems: "center",
                                    }}
                                    onClick={(e) =>
                                        handleItemClick(e, path, label, children.length)
                                    }
                                >
                                    {icon && (
                                        <ListItemIcon
                                            sx={{
                                                minWidth: 0,
                                                mr: open ? 1.5 : 2,
                                                justifyContent: "center",
                                            }}
                                            className="icon-container"
                                        >
                                            <Box
                                                // component="img"
                                                // src={icon}
                                                alt="Campaign"
                                                sx={{
                                                    display: "block",
                                                    marginLeft: "6px",
                                                    filter:
                                                        activeLink == path &&
                                                        !children.length &&
                                                        "brightness(0) saturate(100%) invert(100%) sepia(0%) saturate(0%) hue-rotate(93deg) brightness(103%) contrast(103%)",
                                                }}
                                            >
                                                {icon}
                                            </Box>
                                        </ListItemIcon>
                                    )}
                                    <ListItemText
                                        primary={label}
                                        sx={{
                                            span: {
                                                color: {
                                                    textDecoration: "none",
                                                    display: "flex",
                                                    justifyContent: "flex-start",
                                                    alignItems: "center",
                                                    color:
                                                        activeLink == path && !children.length
                                                            ? "#FFFFFF"
                                                            : "#2A2A2A",
                                                    width: "100%",

                                                    fontSize: "0.8rem",
                                                    fontWeight: 500,
                                                    margin: open ? "" : "0 10px 0 0px",
                                                },
                                            },
                                        }}
                                    />
                                </ListItemButton>
                            </ListItem>

                            <Popover
                                open={isPopoverOpen}
                                anchorEl={anchorEl}
                                onClose={closePopup}
                                anchorOrigin={{
                                    vertical: "bottom",
                                    horizontal: "right",
                                }}
                                transformOrigin={{
                                    vertical: "top",
                                    horizontal: "left",
                                }}
                                PaperProps={{
                                    style: {
                                        boxShadow: "none",
                                        backgroundColor: "#fff",
                                        border: "1px solid #ccc",
                                        marginTop: "0px",
                                        marginLeft: "15px",
                                    },
                                }}
                            >
                                {
                                    <Collapse in={isPopoverOpen} timeout="auto" unmountOnExit>
                                        <List component="div" disablePadding>
                                            {organizedMenu1
                                                ?.find((item) => item.label === openPopupData)
                                                ?.children
                                                // .filter((data) => !['/table-reservation-dashboard'].includes(data?.path))
                                                ?.map(({ path, label, icon }) => (
                                                    <MenuItem
                                                        key={label}
                                                        path={path}
                                                        label={label}
                                                        icon={icon}
                                                        open={open}
                                                        activeLink={activeLink}
                                                        setActiveLink={setActiveLink}
                                                        navigate={navigate}
                                                        setMobileOpen={setMobileOpen}
                                                        closePopup={closePopup}
                                                    />
                                                ))}
                                        </List>
                                    </Collapse>
                                }
                            </Popover>
                        </Grid>
                    ))}
            </List>
        </MobileDrawer>
    );
};

export default React.memo(Sidebar);
