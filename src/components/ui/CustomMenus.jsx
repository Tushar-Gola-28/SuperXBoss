import { Menu, MenuItem } from '@mui/material'

export default function CustomMenus({ open, anchorEl, handleClose, menuList = [] }) {
    return (
        <Menu
            id="actions"
            open={open}
            anchorEl={anchorEl}
            onClose={handleClose}
            anchorOrigin={{
                vertical: 'bottom',
                horizontal: 'left',
            }}
            transformOrigin={{
                vertical: 'top',
                horizontal: 'left',
            }}
        >
            {
                menuList.map((item, index) => {
                    return (
                        <MenuItem onClick={item?.onClick ? item?.onClick : null}
                            disabled={item?.isLoading}
                            sx={item.sx} key={index}>
                            {item.render ? item.render() : item.label}
                        </MenuItem>
                    )
                })
            }

        </Menu>
    )
}
