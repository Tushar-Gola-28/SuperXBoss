import React, { useState, useCallback } from 'react';
import {
    Box,
    Typography,
    Button,
    IconButton,
    Avatar,
    Chip,
    Grid
} from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import PlayCircleOutlineIcon from '@mui/icons-material/PlayCircleOutline';
import VideoCameraBackIcon from '@mui/icons-material/VideoCameraBack';
const VideoUpload = ({
    label = "Add Video",
    description = "Videos must be in MP4 or MOV format.",
    required = true,
    onVideoChange,
    initialVideos = [],
    maxVideos = 1,
    acceptedFormats = ['video/mp4', 'video/quicktime']
}) => {
    const [videos, setVideos] = useState(initialVideos);
    const [previews, setPreviews] = useState(initialVideos.map(v => v.preview));

    const inputRef = React.useRef(null);

    const handleVideoChange = useCallback((e) => {
        const files = Array.from(e.target.files || []);

        if (files.length === 0) return;

        // Validate file types
        const invalidFiles = files.filter(file => !acceptedFormats.includes(file.type));

        if (invalidFiles.length > 0) {
            alert(`Please upload only ${acceptedFormats.map(f => f.split('/')[1]).join(', ')} format videos.`);
            return;
        }

        // Check max videos limit
        if (maxVideos !== -1 && (videos.length + files.length) > maxVideos) {
            alert(`You can upload a maximum of ${maxVideos} video(s).`);
            return;
        }

        // Process videos
        const newVideos = files.map(file => ({
            file,
            preview: URL.createObjectURL(file)
        }));

        // For single video upload, replace existing video
        if (maxVideos === 1) {
            setVideos(newVideos);
            setPreviews(newVideos.map(v => v.preview));
            if (onVideoChange) onVideoChange(newVideos);
        } else {
            // For multiple videos
            const updatedVideos = [...videos, ...newVideos];
            const updatedPreviews = [...previews, ...newVideos.map(v => v.preview)];

            setVideos(updatedVideos);
            setPreviews(updatedPreviews);
            if (onVideoChange) onVideoChange(updatedVideos);
        }

        // Reset input value to allow selecting the same file again
        if (inputRef.current) {
            inputRef.current.value = '';
        }
    }, [videos, maxVideos, onVideoChange, acceptedFormats]);

    const handleRemoveVideo = (index) => {
        // Revoke object URL to prevent memory leaks
        URL.revokeObjectURL(previews[index]);

        const newVideos = videos.filter((_, i) => i !== index);
        const newPreviews = previews.filter((_, i) => i !== index);

        setVideos(newVideos);
        setPreviews(newPreviews);
        if (onVideoChange) onVideoChange(newVideos);

        // Reset file input if all videos are removed
        if (newVideos.length === 0 && inputRef.current) {
            inputRef.current.value = '';
        }
    };

    const triggerFileInput = () => {
        inputRef.current?.click();
    };

    return (
        <Box sx={{ width: '100%' }}>
            <Typography variant="subtitle1" gutterBottom>
                {label}
                {required && <span style={{ color: 'red' }}> *</span>}
            </Typography>

            <Typography variant="body2" color="text.secondary" gutterBottom>
                {description}
            </Typography>

            <input
                type="file"
                ref={inputRef}
                onChange={handleVideoChange}
                accept={acceptedFormats.join(',')}
                style={{ display: 'none' }}
                multiple={maxVideos !== 1}
            />

            {previews.length > 0 ? (
                <Grid container spacing={2}>
                    {previews.map((preview, index) => (
                        <Grid item xs={12} sm={6} md={4} key={index}>
                            <Box sx={{
                                position: 'relative',
                                width: '100%',
                                height: 150,
                                border: '1px solid #ddd',
                                borderRadius: 1,
                                overflow: 'hidden',
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center',
                                backgroundColor: '#f5f5f5'
                            }}>
                                <Box sx={{
                                    position: 'relative',
                                    width: '100%',
                                    height: '100%',
                                    display: 'flex',
                                    alignItems: 'center',
                                    justifyContent: 'center'
                                }}>
                                    <PlayCircleOutlineIcon sx={{
                                        fontSize: 48,
                                        color: 'primary.main',
                                        position: 'absolute',
                                        zIndex: 1
                                    }} />
                                    <Box
                                        component="video"
                                        src={preview}
                                        sx={{
                                            width: '100%',
                                            height: '100%',
                                            objectFit: 'cover',
                                            opacity: 0.7
                                        }}
                                    />
                                </Box>
                                <IconButton
                                    size="small"
                                    sx={{
                                        position: 'absolute',
                                        top: 4,
                                        right: 4,
                                        backgroundColor: 'rgba(0,0,0,0.5)',
                                        color: 'white',
                                        '&:hover': {
                                            backgroundColor: 'rgba(0,0,0,0.7)'
                                        }
                                    }}
                                    onClick={() => handleRemoveVideo(index)}
                                >
                                    <DeleteIcon fontSize="small" />
                                </IconButton>
                            </Box>
                        </Grid>
                    ))}

                    {maxVideos === -1 || previews.length < maxVideos ? (
                        <Grid item xs={12} sm={6} md={4}>
                            <Button
                                variant="outlined"
                                onClick={triggerFileInput}
                                sx={{
                                    width: '100%',
                                    height: 150,
                                    display: 'flex',
                                    flexDirection: 'column',
                                    gap: 1
                                }}
                            >
                                <VideoCameraBackIcon sx={{ fontSize: "50px" }} />
                                <Typography variant="caption">Add video</Typography>
                            </Button>
                        </Grid>
                    ) : null}
                </Grid>
            ) : (
                <Grid item xs={12} sm={6} md={4}>
                    <Button
                        variant="outlined"
                        onClick={triggerFileInput}
                        sx={{
                            width: 200,
                            height: 150,
                            display: 'flex',
                            flexDirection: 'column',
                            gap: 1
                        }}
                    >
                        <VideoCameraBackIcon sx={{ fontSize: "50px" }} />
                        <Typography variant="caption">Click to select videos</Typography>
                    </Button>
                </Grid>
            )}

            {maxVideos > 1 && (
                <Box sx={{ mt: 1 }}>
                    <Chip
                        label={`${previews.length}/${maxVideos} videos uploaded`}
                        size="small"
                        color={previews.length === maxVideos ? 'success' : 'default'}
                    />
                </Box>
            )}
        </Box>
    );
};

export { VideoUpload };