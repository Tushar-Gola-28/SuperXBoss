
// /* eslint-disable react/prop-types */
// import { styled } from "@mui/material/styles";
// import MuiAppBar from "@mui/material/AppBar";
// import Toolbar from "@mui/material/Toolbar";
// import {
//     Stack,
//     IconButton,
//     Box,
//     Typography,
//     Avatar,
//     Menu,
//     MenuItem,
//     Button,
// } from "@mui/material";

// import MenuIcon from "@mui/icons-material/Menu";

// import { navHeight, sideBarClose, sideBarOpen } from "../../config-global";
// import { useAuthValidator } from "../store";
// import { useModalControl } from "../hooks/useModalControl";
// import useMenu from "../hooks/useMenu";
// import LogoutModal from "./ui/Logout";
// import { useNavigate } from "react-router";

// const AppBar = styled(MuiAppBar, {
//     shouldForwardProp: (prop) => prop !== "open",
// })(({ theme, open }) => ({
//     zIndex: theme.zIndex.drawer,
//     transition: theme.transitions.create(["width", "margin"], {
//         easing: theme.transitions.easing.sharp,
//         duration: theme.transitions.duration.leavingScreen,
//     }),
//     [theme.breakpoints.only("xs")]: {
//         paddingLeft: 0,
//     },
// }));

// const Navbar = ({ open, handleDrawerToggle }) => {
//     const { user } = useAuthValidator((state) => state);
//     const navigate = useNavigate()
//     const { open: isOpen, handleCloseModal, handleOpenModal } = useModalControl();
//     const { open: isOpenMenu, anchorEl, handleClick, handleClose } = useMenu();

//     return (
//         <>
//             <AppBar
//                 position="fixed"
//                 open={open}
//                 sx={{
//                     boxShadow: "0px 4px 12px rgba(2, 118, 229, 0.15)",
//                     bgcolor: "#FFFFFF",
//                     height: navHeight,
//                     display: "flex",
//                     justifyContent: "center",
//                 }}
//             >
//                 <Toolbar sx={{ width: "100%" }}>
//                     <Stack
//                         width="100%"
//                         direction="row"
//                         justifyContent="space-between"
//                         alignItems="center"
//                     >
//                         {/* Left side: Drawer + Logo + Menus */}
//                         <Stack direction="row" spacing={2} alignItems="center"

//                             sx={{ pl: { xs: "0px", md: open ? sideBarOpen : sideBarClose }, }}
//                         >
//                             <IconButton
//                                 color="inherit"
//                                 edge="start"
//                                 onClick={handleDrawerToggle}
//                                 sx={{ display: { md: "none" }, color: "#0276E5" }}
//                             >
//                                 <MenuIcon />
//                             </IconButton>


//                             <Box
//                                 component="img"
//                                 src={"/half_logo.svg"}
//                                 alt="Icon"
//                                 sx={{
//                                     height: 34,
//                                     width: "auto",
//                                     display: { md: "none" },
//                                     ml: "0px !important"
//                                 }}
//                             />

//                             {/* Menus (only show on md and up) */}
//                             <Stack
//                                 direction="row"
//                                 spacing={1}
//                                 alignItems="center"
//                                 sx={{ display: { xs: "none", md: "flex" }, ml: 2 }}
//                             >
//                                 <Button
//                                     variant="text"
//                                     sx={{
//                                         textTransform: "none",
//                                         fontWeight: 600,
//                                         color: "#0276E5",
//                                         "&:hover": { color: "#015bb5", background: "transparent" },
//                                     }}
//                                 >
//                                     Dashboard
//                                 </Button>
//                                 <Button
//                                     variant="text"
//                                     sx={{
//                                         textTransform: "none",
//                                         fontWeight: 600,
//                                         color: "#0276E5",
//                                         "&:hover": { color: "#015bb5", background: "transparent" },
//                                     }}
//                                 >
//                                     Products
//                                 </Button>
//                                 <Button
//                                     variant="text"
//                                     sx={{
//                                         textTransform: "none",
//                                         fontWeight: 600,
//                                         color: "#0276E5",
//                                         "&:hover": { color: "#015bb5", background: "transparent" },
//                                     }}
//                                 >
//                                     Orders
//                                 </Button>
//                                 <Button
//                                     variant="text"
//                                     sx={{
//                                         textTransform: "none",
//                                         fontWeight: 600,
//                                         color: "#0276E5",
//                                         "&:hover": { color: "#015bb5", background: "transparent" },
//                                     }}
//                                 >
//                                     Queries
//                                 </Button>
//                             </Stack>
//                         </Stack>

//                         {/* Right side: User avatar + name */}
//                         <Stack
//                             direction="row"
//                             spacing={1.5}
//                             alignItems="center"
//                             sx={{ mr: 2 }}
//                         >
//                             <Stack
//                                 onClick={handleClick}
//                                 sx={{
//                                     border: "2px solid #E0E0E0",
//                                     borderRadius: "50%",
//                                     p: 0.2,
//                                     cursor: "pointer",
//                                     transition: "0.2s",
//                                     "&:hover": {
//                                         borderColor: "#0276E5",
//                                         transform: "scale(1.05)",
//                                     },
//                                 }}
//                             >
//                                 <Avatar
//                                     src={user.profile}
//                                     alt={user?.name}
//                                     sx={{ width: 40, height: 40 }}
//                                 />
//                             </Stack>

//                             {user?.name && (
//                                 <Typography
//                                     variant="subtitle1"
//                                     fontWeight={600}
//                                     sx={{ color: "#333", display: { xs: "none", sm: "block" } }}
//                                 >
//                                     {user?.name}
//                                 </Typography>
//                             )}

//                             <Menu
//                                 id="basic-menu"
//                                 anchorEl={anchorEl}
//                                 open={isOpenMenu}
//                                 onClose={handleClose}
//                                 PaperProps={{
//                                     elevation: 3,
//                                     sx: { borderRadius: 2, mt: 1 },
//                                 }}
//                             >
//                                 <MenuItem onClick={handleOpenModal}>Logout</MenuItem>
//                             </Menu>
//                         </Stack>
//                     </Stack>
//                 </Toolbar>

//                 {isOpen && <LogoutModal open={isOpen} close={handleCloseModal} />}
//             </AppBar>
//         </>
//     );
// };

// export default Navbar;




// /* eslint-disable react/prop-types */
// import { styled } from "@mui/material/styles";
// import MuiAppBar from "@mui/material/AppBar";
// import Toolbar from "@mui/material/Toolbar";
// import {
//     Stack,
//     IconButton,
//     Box,
//     Typography,
//     Avatar,
//     Menu,
//     MenuItem,
//     Button,
//     Badge,
// } from "@mui/material";

// import MenuIcon from "@mui/icons-material/Menu";
// import NotificationsNoneIcon from "@mui/icons-material/NotificationsNone";
// import HelpOutlineIcon from "@mui/icons-material/HelpOutline";

// import { navHeight, sideBarClose, sideBarOpen } from "../../config-global";
// import { useAuthValidator } from "../store";
// import { useModalControl } from "../hooks/useModalControl";
// import useMenu from "../hooks/useMenu";
// import LogoutModal from "./ui/Logout";
// import { useNavigate } from "react-router";
// import { urls } from "../routes";

// const AppBar = styled(MuiAppBar, {
//     shouldForwardProp: (prop) => prop !== "open",
// })(({ theme, open }) => ({
//     // zIndex: theme.zIndex.drawer + 1,
//     transition: theme.transitions.create(["width", "margin"], {
//         easing: theme.transitions.easing.sharp,
//         duration: theme.transitions.duration.leavingScreen,
//     }),
//     [theme.breakpoints.only("xs")]: {
//         paddingLeft: 0,
//     },
// }));

// const NavButton = styled(Button)(({ theme }) => ({
//     textTransform: "none",
//     fontWeight: 600,
//     color: theme.palette.text.secondary,
//     borderRadius: theme.shape.borderRadius,
//     padding: theme.spacing(0.75, 3),
//     "&:hover": {
//         backgroundColor: theme.palette.action.hover,
//         color: theme.palette.primary.main,
//     },
//     "&.active": {
//         color: theme.palette.primary.main,
//         backgroundColor: theme.palette.primary.lighter,
//     },
// }));

// const Navbar = ({ open, handleDrawerToggle }) => {
//     const { user } = useAuthValidator((state) => state);
//     const { open: isOpen, handleCloseModal, handleOpenModal } = useModalControl();
//     const { open: isOpenMenu, anchorEl, handleClick, handleClose } = useMenu();
//     const navigate = useNavigate()

//     return (
//         <>
//             <AppBar
//                 position="fixed"
//                 open={open}
//                 sx={{
//                     boxShadow: "0px 1px 4px rgba(0, 0, 0, 0.1)",
//                     bgcolor: "background.paper",
//                     height: navHeight,
//                     display: "flex",
//                     justifyContent: "center",
//                     borderBottom: "1px solid",
//                     borderColor: "divider",
//                 }}
//             >
//                 <Toolbar sx={{ width: "100%", px: { xs: 2, md: 3 } }}>
//                     <Stack
//                         width="100%"
//                         direction="row"
//                         justifyContent="space-between"
//                         alignItems="center"
//                     >
//                         {/* Left side: Drawer + Logo + Menus */}
//                         <Stack
//                             direction="row"
//                             spacing={2}
//                             alignItems="center"
//                             sx={{
//                                 pl: {
//                                     xs: "0px",
//                                     md: open ? sideBarOpen : sideBarClose
//                                 },
//                             }}
//                         >
//                             <IconButton
//                                 color="inherit"
//                                 edge="start"
//                                 onClick={handleDrawerToggle}
//                                 sx={{
//                                     color: "text.primary",
//                                     mr: { xs: 1, md: 2 },
//                                     display: { md: "none" }, color: "#0276E5"
//                                 }}
//                             >
//                                 <MenuIcon />
//                             </IconButton>

//                             <Box
//                                 component="img"
//                                 src={"/half_logo.svg"}
//                                 alt="Logo"
//                                 sx={{
//                                     height: 34,
//                                     width: "auto",
//                                     display: { md: "none" },
//                                 }}
//                             />

//                             {/* Menus (only show on md and up) */}
//                             <Stack
//                                 direction="row"
//                                 alignItems="center"
//                                 sx={{
//                                     display: { xs: "none", md: "flex" },
//                                     ml: { md: 1, lg: 1 }
//                                 }}
//                             >
//                                 <NavButton onClick={() => navigate(urls.DASHBOARD)}>Dashboard</NavButton>
//                                 <NavButton onClick={() => navigate(urls.PRODUCTS)}>Products</NavButton>
//                                 <NavButton onClick={() => navigate(urls.QUERIES)}>Queries</NavButton>
//                             </Stack>
//                         </Stack>

//                         {/* Right side: Icons + User profile */}
//                         <Stack
//                             direction="row"
//                             spacing={{ xs: 1, sm: 2 }}
//                             alignItems="center"
//                         >
//                             <IconButton sx={{ color: "text.secondary" }} onClick={() => navigate(urls.ORDERS)}>
//                                 {/* <Badge badgeContent={3} color="error"> */}
//                                 <NotificationsNoneIcon />
//                                 {/* </Badge> */}
//                             </IconButton>

//                             <IconButton sx={{ color: "text.secondary" }} onClick={() => navigate(urls.FAQ)}>
//                                 <HelpOutlineIcon />
//                             </IconButton>

//                             <Stack
//                                 direction="row"
//                                 spacing={1.5}
//                                 alignItems="center"
//                                 sx={{
//                                     ml: { xs: 0, sm: 1 },
//                                     borderLeft: { xs: 0, sm: "1px solid" },
//                                     borderColor: "divider",
//                                     pl: { xs: 0, sm: 2 }
//                                 }}
//                             >
//                                 <Stack
//                                     onClick={handleClick}
//                                     sx={{
//                                         border: "2px solid",
//                                         borderColor: "divider",
//                                         borderRadius: "50%",
//                                         p: 0.2,
//                                         cursor: "pointer",
//                                         transition: "all 0.2s ease",
//                                         "&:hover": {
//                                             borderColor: "primary.main",
//                                             transform: "scale(1.05)",
//                                         },
//                                     }}
//                                 >
//                                     <Avatar
//                                         src={user.profile}
//                                         alt={user?.name}
//                                         sx={{
//                                             width: 36,
//                                             height: 36,
//                                             bgcolor: "primary.light"
//                                         }}
//                                     />
//                                 </Stack>

//                                 {user?.name && (
//                                     <Typography
//                                         variant="subtitle1"
//                                         fontWeight={600}
//                                         sx={{
//                                             color: "primary.main",
//                                             display: { xs: "none", sm: "block" },
//                                             maxWidth: 120,
//                                             whiteSpace: "nowrap",
//                                             overflow: "hidden",
//                                             textOverflow: "ellipsis"
//                                         }}
//                                     >
//                                         {user?.name}
//                                     </Typography>
//                                 )}
//                             </Stack>
//                         </Stack>
//                     </Stack>
//                 </Toolbar>

//                 {/* User menu */}
//                 <Menu
//                     id="user-menu"
//                     anchorEl={anchorEl}
//                     open={isOpenMenu}
//                     onClose={handleClose}
//                     PaperProps={{
//                         elevation: 3,
//                         sx: {
//                             borderRadius: 2,
//                             mt: 1,
//                             minWidth: 180,
//                             "& .MuiMenuItem-root": {
//                                 px: 2,
//                                 py: 1,
//                                 typography: "body2",
//                             }
//                         },
//                     }}
//                     transformOrigin={{ horizontal: 'right', vertical: 'top' }}
//                     anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}
//                 >
//                     <MenuItem onClick={handleOpenModal}>Logout</MenuItem>
//                 </Menu>

//                 {isOpen && <LogoutModal open={isOpen} close={handleCloseModal} />}
//             </AppBar>
//         </>
//     );
// };

// export default Navbar;


/* eslint-disable react/prop-types */
import { styled } from "@mui/material/styles";
import MuiAppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import {
    Stack,
    IconButton,
    Box,
    Typography,
    Avatar,
    Menu,
    MenuItem,
    Button,
} from "@mui/material";

import MenuIcon from "@mui/icons-material/Menu";
import NotificationsNoneIcon from "@mui/icons-material/NotificationsNone";
import HelpOutlineIcon from "@mui/icons-material/HelpOutline";

import { navHeight, sideBarClose, sideBarOpen } from "../../config-global";
import { useAuthValidator } from "../store";
import { useModalControl } from "../hooks/useModalControl";
import useMenu from "../hooks/useMenu";
import LogoutModal from "./ui/Logout";
import { useNavigate, useLocation } from "react-router";
import { urls } from "../routes";

const AppBar = styled(MuiAppBar, {
    shouldForwardProp: (prop) => prop !== "open",
})(({ theme, open }) => ({
    transition: theme.transitions.create(["width", "margin"], {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.leavingScreen,
    }),
    [theme.breakpoints.only("xs")]: {
        paddingLeft: 0,
    },
}));

const NavButton = styled(Button)(({ theme }) => ({
    textTransform: "none",
    fontWeight: 600,
    color: theme.palette.text.secondary,
    borderRadius: theme.shape.borderRadius,
    padding: theme.spacing(0.75, 3),
    "&:hover": {
        backgroundColor: theme.palette.action.hover,
        color: theme.palette.primary.main,
    },
    "&.active": {
        color: theme.palette.primary.main,
        backgroundColor: theme.palette.primary.lighter,
    },
}));

const Navbar = ({ open, handleDrawerToggle }) => {
    const { user } = useAuthValidator((state) => state);
    const { open: isOpen, handleCloseModal, handleOpenModal } = useModalControl();
    const { open: isOpenMenu, anchorEl, handleClick, handleClose } = useMenu();
    const navigate = useNavigate();
    const location = useLocation();

    // helper to check active route (supports sub-routes)
    const isActive = (path) => location.pathname.startsWith(path);

    return (
        <>
            <AppBar
                position="fixed"
                open={open}
                sx={{
                    boxShadow: "0px 1px 4px rgba(0, 0, 0, 0.1)",
                    bgcolor: "background.paper",
                    height: navHeight,
                    display: "flex",
                    justifyContent: "center",
                    borderBottom: "1px solid",
                    borderColor: "divider",
                }}
            >
                <Toolbar sx={{ width: "100%", px: { xs: 2, md: 3 } }}>
                    <Stack
                        width="100%"
                        direction="row"
                        justifyContent="space-between"
                        alignItems="center"
                    >
                        {/* Left side: Drawer + Logo + Menus */}
                        <Stack
                            direction="row"
                            spacing={2}
                            alignItems="center"
                            sx={{
                                pl: {
                                    xs: "0px",
                                    md: open ? sideBarOpen : sideBarClose,
                                },
                            }}
                        >
                            <IconButton
                                color="inherit"
                                edge="start"
                                onClick={handleDrawerToggle}
                                sx={{
                                    color: "text.primary",
                                    mr: { xs: 1, md: 2 },
                                    display: { md: "none" },
                                    color: "#0276E5",
                                }}
                            >
                                <MenuIcon />
                            </IconButton>

                            <Box
                                component="img"
                                src={"/half_logo.svg"}
                                alt="Logo"
                                sx={{
                                    height: 34,
                                    width: "auto",
                                    display: { md: "none" },
                                }}
                            />

                            {/* Menus (only show on md and up) */}
                            <Stack
                                direction="row"
                                alignItems="center"
                                sx={{
                                    display: { xs: "none", md: "flex" },
                                    ml: { md: 1, lg: 1 },
                                }}
                            >
                                <NavButton
                                    className={isActive(urls.DASHBOARD) ? "active" : ""}
                                    onClick={() => navigate(urls.DASHBOARD)}
                                >
                                    Dashboard
                                </NavButton>
                                <NavButton
                                    className={isActive(urls.PRODUCTS) ? "active" : ""}
                                    onClick={() => navigate(urls.PRODUCTS)}
                                >
                                    Products
                                </NavButton>
                                <NavButton
                                    className={isActive(urls.QUERIES) ? "active" : ""}
                                    onClick={() => navigate(urls.QUERIES)}
                                >
                                    Queries
                                </NavButton>
                            </Stack>
                        </Stack>

                        {/* Right side: Icons + User profile */}
                        <Stack
                            direction="row"
                            spacing={{ xs: 1, sm: 2 }}
                            alignItems="center"
                        >
                            <IconButton
                                sx={{ color: isActive(`/${urls.ORDERS}`) ? "primary.main" : "text.secondary" }}
                                onClick={() => navigate(urls.ORDERS)}
                            >
                                <NotificationsNoneIcon />
                            </IconButton>

                            <IconButton
                                sx={{ color: isActive(urls.FAQ) ? "primary.main" : "text.secondary" }}
                                onClick={() => navigate(urls.FAQ)}
                            >
                                <HelpOutlineIcon />
                            </IconButton>

                            <Stack
                                direction="row"
                                spacing={1.5}
                                alignItems="center"
                                sx={{
                                    ml: { xs: 0, sm: 1 },
                                    borderLeft: { xs: 0, sm: "1px solid" },
                                    borderColor: "divider",
                                    pl: { xs: 0, sm: 2 },
                                }}
                            >
                                <Stack
                                    onClick={handleClick}
                                    sx={{
                                        border: "2px solid",
                                        borderColor: "divider",
                                        borderRadius: "50%",
                                        p: 0.2,
                                        cursor: "pointer",
                                        transition: "all 0.2s ease",
                                        "&:hover": {
                                            borderColor: "primary.main",
                                            transform: "scale(1.05)",
                                        },
                                    }}
                                >
                                    <Avatar
                                        src={user.profile}
                                        alt={user?.name}
                                        sx={{
                                            width: 36,
                                            height: 36,
                                            bgcolor: "primary.light",
                                        }}
                                    />
                                </Stack>

                                {user?.name && (
                                    <Typography
                                        variant="subtitle1"
                                        fontWeight={600}
                                        sx={{
                                            color: "primary.main",
                                            display: { xs: "none", sm: "block" },
                                            maxWidth: 120,
                                            whiteSpace: "nowrap",
                                            overflow: "hidden",
                                            textOverflow: "ellipsis",
                                        }}
                                    >
                                        Hi, {user?.name}
                                    </Typography>
                                )}
                            </Stack>
                        </Stack>
                    </Stack>
                </Toolbar>

                {/* User menu */}
                <Menu
                    id="user-menu"
                    anchorEl={anchorEl}
                    open={isOpenMenu}
                    onClose={handleClose}
                    PaperProps={{
                        elevation: 3,
                        sx: {
                            borderRadius: 2,
                            mt: 1,
                            minWidth: 180,
                            "& .MuiMenuItem-root": {
                                px: 2,
                                py: 1,
                                typography: "body2",
                            },
                        },
                    }}
                    transformOrigin={{ horizontal: "right", vertical: "top" }}
                    anchorOrigin={{ horizontal: "right", vertical: "bottom" }}
                >
                    <MenuItem onClick={handleOpenModal}>Logout</MenuItem>
                </Menu>

                {isOpen && <LogoutModal open={isOpen} close={handleCloseModal} />}
            </AppBar>
        </>
    );
};

export default Navbar;
