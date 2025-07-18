

import { useState } from 'react';
import {
    Avatar,
    Box,
    Fade,
    Paper,
    Popper,
    Stack,
} from '@mui/material';



const HoverAvatar = ({
    src,
    alt = "Preview",
    avatarSize = 40,
    tooltipSize = 200,
    avatarSx = {},
    tooltipSx = {},
    PopperProps = {},
}) => {
    const [anchorEl, setAnchorEl] = useState(null);
    const [open, setOpen] = useState(false);

    const handleMouseEnter = (event) => {
        setAnchorEl(event.currentTarget);
        setOpen(true);
    };

    const handleMouseLeave = () => {
        setOpen(false);
    };

    return (
        <>
            <Stack direction="row" justifyContent="center">
                <Avatar
                    src={src}
                    alt={alt}
                    onMouseEnter={handleMouseEnter}
                    onMouseLeave={handleMouseLeave}
                    sx={{
                        width: avatarSize,
                        height: avatarSize,
                        cursor: 'pointer',
                        transition: 'transform 0.2s',
                        '&:hover': {
                            transform: 'scale(1.1)',
                        },
                        ...avatarSx,
                    }}
                />
            </Stack>

            <Popper
                open={open}
                anchorEl={anchorEl}
                placement="top"
                transition
                modifiers={[
                    {
                        name: 'offset',
                        options: {
                            offset: [0, 10],
                        },
                    },
                ]}
                {...PopperProps}
                sx={{
                    zIndex: 9999,
                    ...PopperProps?.sx,
                }}
            >
                {({ TransitionProps }) => (
                    <Fade {...TransitionProps} timeout={200}>
                        <Paper
                            sx={{
                                p: 1,
                                bgcolor: 'background.paper',
                                boxShadow: 3,
                                border: '1px solid',
                                borderColor: 'divider',
                                ...tooltipSx,
                            }}
                            onMouseEnter={handleMouseEnter}
                            onMouseLeave={handleMouseLeave}
                        >
                            <Box
                                component="img"
                                src={src}
                                alt={alt}
                                sx={{
                                    display: 'block',
                                    width: 'auto',
                                    height: 'auto',
                                    maxWidth: tooltipSize,
                                    maxHeight: tooltipSize,
                                }}
                            />
                        </Paper>
                    </Fade>
                )}
            </Popper>
        </>
    );
};

export { HoverAvatar };