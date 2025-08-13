// import React, { useState, useCallback, useEffect } from 'react';
// import {
//     Box,
//     Typography,
//     Button,
//     IconButton,
//     Avatar,
//     Chip,
//     Grid2
// } from '@mui/material';
// import DeleteIcon from '@mui/icons-material/Delete';
// import PlayCircleOutlineIcon from '@mui/icons-material/PlayCircleOutline';
// import VideoCameraBackIcon from '@mui/icons-material/VideoCameraBack';
// const VideoUpload = ({
//     label = "Add Video",
//     description = "Videos must be in MP4 or MOV format.",
//     required = true,
//     onVideoChange,
//     initialVideos = [],
//     maxVideos = 1,
//     acceptedFormats = ['video/mp4', 'video/quicktime']
// }) => {
//     const [videos, setVideos] = useState(initialVideos);
//     const [previews, setPreviews] = useState(initialVideos);
//     useEffect(() => {
//         if (initialVideos?.length) {
//             setPreviews(initialVideos)
//         }
//     }, [initialVideos])
//     const inputRef = React.useRef(null);

//     const handleVideoChange = useCallback((e) => {
//         const files = Array.from(e.target.files || []);

//         if (files.length === 0) return;

//         // Validate file types
//         const invalidFiles = files.filter(file => !acceptedFormats.includes(file.type));

//         if (invalidFiles.length > 0) {
//             alert(`Please upload only ${acceptedFormats.map(f => f.split('/')[1]).join(', ')} format videos.`);
//             return;
//         }

//         // Check max videos limit
//         if (maxVideos !== -1 && (videos.length + files.length) > maxVideos) {
//             alert(`You can upload a maximum of ${maxVideos} video(s).`);
//             return;
//         }

//         // Process videos
//         const newVideos = files.map(file => ({
//             file,
//             preview: URL.createObjectURL(file)
//         }));

//         // For single video upload, replace existing video
//         if (maxVideos === 1) {
//             setVideos(newVideos);
//             setPreviews(newVideos.map(v => v.preview));
//             if (onVideoChange) onVideoChange(newVideos);
//         } else {
//             // For multiple videos
//             const updatedVideos = [...videos, ...newVideos];
//             const updatedPreviews = [...previews, ...newVideos.map(v => v.preview)];

//             setVideos(updatedVideos);
//             setPreviews(updatedPreviews);
//             if (onVideoChange) onVideoChange(updatedVideos);
//         }

//         // Reset input value to allow selecting the same file again
//         if (inputRef.current) {
//             inputRef.current.value = '';
//         }
//     }, [videos, maxVideos, onVideoChange, acceptedFormats]);

//     const handleRemoveVideo = (index) => {
//         // Revoke object URL to prevent memory leaks
//         URL.revokeObjectURL(previews[index]);

//         const newVideos = videos.filter((_, i) => i !== index);
//         const newPreviews = previews.filter((_, i) => i !== index);

//         setVideos(newVideos);
//         setPreviews(newPreviews);
//         if (onVideoChange) onVideoChange(newVideos);

//         // Reset file input if all videos are removed
//         if (newVideos.length === 0 && inputRef.current) {
//             inputRef.current.value = '';
//         }
//     };

//     const triggerFileInput = () => {
//         inputRef.current?.click();
//     };

//     return (
//         <Box sx={{ width: '100%' }}>
//             <Typography variant="subtitle1" gutterBottom>
//                 {label}
//                 {required && <span style={{ color: 'red' }}> *</span>}
//             </Typography>

//             <Typography variant="body2" color="text.secondary" gutterBottom>
//                 {description}
//             </Typography>

//             <input
//                 type="file"
//                 ref={inputRef}
//                 onChange={handleVideoChange}
//                 accept={acceptedFormats.join(',')}
//                 style={{ display: 'none' }}
//                 multiple={maxVideos !== 1}
//             />

//             {previews.length > 0 ? (
//                 <Grid2 container spacing={2}>
//                     {previews.map((preview, index) => (
//                         <Grid2 item size={{ xs: 12, md: 6, lg: 4 }} key={index}>
//                             <Box sx={{
//                                 position: 'relative',
//                                 width: '100%',
//                                 height: 150,
//                                 border: '1px solid #ddd',
//                                 borderRadius: 1,
//                                 overflow: 'hidden',
//                                 display: 'flex',
//                                 alignItems: 'center',
//                                 justifyContent: 'center',
//                                 backgroundColor: '#f5f5f5'
//                             }}>
//                                 <Box sx={{
//                                     position: 'relative',
//                                     width: '100%',
//                                     height: '100%',
//                                     display: 'flex',
//                                     alignItems: 'center',
//                                     justifyContent: 'center'
//                                 }}>
//                                     <PlayCircleOutlineIcon sx={{
//                                         fontSize: 48,
//                                         color: 'primary.main',
//                                         position: 'absolute',
//                                         zIndex: 1
//                                     }} />
//                                     <Box
//                                         component="video"
//                                         src={preview}
//                                         sx={{
//                                             width: '100%',
//                                             height: '100%',
//                                             objectFit: 'cover',
//                                             opacity: 0.7
//                                         }}
//                                     />
//                                 </Box>
//                                 <IconButton
//                                     size="small"
//                                     sx={{
//                                         position: 'absolute',
//                                         top: 4,
//                                         right: 4,
//                                         backgroundColor: 'rgba(0,0,0,0.5)',
//                                         color: 'white',
//                                         '&:hover': {
//                                             backgroundColor: 'rgba(0,0,0,0.7)'
//                                         }
//                                     }}
//                                     onClick={() => handleRemoveVideo(index)}
//                                 >
//                                     <DeleteIcon fontSize="small" />
//                                 </IconButton>
//                             </Box>
//                         </Grid2>
//                     ))}

//                     {maxVideos === -1 || previews.length < maxVideos ? (
//                         <Grid2 item size={{ xs: 12, md: 6, lg: 4 }}>
//                             <Button
//                                 variant="outlined"
//                                 onClick={triggerFileInput}
//                                 sx={{
//                                     width: '100%',
//                                     height: 150,
//                                     display: 'flex',
//                                     flexDirection: 'column',
//                                     gap: 1
//                                 }}
//                             >
//                                 <VideoCameraBackIcon sx={{ fontSize: "50px" }} />
//                                 <Typography variant="caption">Add video</Typography>
//                             </Button>
//                         </Grid2>
//                     ) : null}
//                 </Grid2>
//             ) : (
//                 <Grid2 item size={{ xs: 12, md: 6, lg: 4 }}>
//                     <Button
//                         variant="outlined"
//                         onClick={triggerFileInput}
//                         sx={{
//                             width: 200,
//                             height: 150,
//                             display: 'flex',
//                             flexDirection: 'column',
//                             gap: 1
//                         }}
//                     >
//                         <VideoCameraBackIcon sx={{ fontSize: "50px" }} />
//                         <Typography variant="caption">Click to select videos</Typography>
//                     </Button>
//                 </Grid2>
//             )}

//             {maxVideos > 1 && (
//                 <Box sx={{ mt: 1 }}>
//                     <Chip
//                         label={`${previews.length}/${maxVideos} videos uploaded`}
//                         size="small"
//                         color={previews.length === maxVideos ? 'success' : 'default'}
//                     />
//                 </Box>
//             )}
//         </Box>
//     );
// };

// export { VideoUpload };

import React, { useState, useCallback, useEffect } from 'react';
import {
    Box,
    Typography,
    Button,
    IconButton,
    Chip,
    Grid2,
} from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import PlayCircleOutlineIcon from '@mui/icons-material/PlayCircleOutline';
import VideoCameraBackIcon from '@mui/icons-material/VideoCameraBack';

const VideoUpload = ({
    label = "Add Video",
    description = "Videos must be in MP4 or MOV format.",
    required = true,
    onVideoChange,
    onRemovePathsChange, // New callback for removed paths
    initialVideos = [],
    maxVideos = 1,
    acceptedFormats = ['video/mp4', 'video/quicktime'],
    removePath = false,
    MAX_SIZE_MB = 5
}) => {
    const [videos, setVideos] = useState(initialVideos);
    const [previews, setPreviews] = useState(initialVideos);
    const [pathsToRemove, setPathsToRemove] = useState([]);

    useEffect(() => {
        if (initialVideos?.length) {
            setPreviews(initialVideos);
            setVideos(initialVideos);
        }
    }, [initialVideos]);

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

        const MAX_SIZE_BYTES = MAX_SIZE_MB * 1024 * 1024;
        // Validate file sizes
        const oversizedFiles = files.filter(file => file.size > MAX_SIZE_BYTES);
        if (oversizedFiles.length > 0) {
            const fileNames = oversizedFiles.map(file => file.name).join(', ');
            notify(`These files exceed the ${MAX_SIZE_MB}MB limit: ${fileNames}`);
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
        // Check if the item being removed is a URL (existing path)
        const isUrl = typeof previews[index] === 'string' &&
            (previews[index].startsWith('http://') || previews[index].startsWith('https://'));

        if (removePath && isUrl) {
            const removedPath = previews[index];
            const newPathsToRemove = [...pathsToRemove, removedPath];
            setPathsToRemove(newPathsToRemove);
            if (onRemovePathsChange) onRemovePathsChange(newPathsToRemove);
        }

        // Revoke object URL to prevent memory leaks if it's a blob URL
        if (previews[index]?.startsWith?.('blob:')) {
            URL.revokeObjectURL(previews[index]);
        }

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
                <Grid2 container spacing={2}>
                    {previews.map((preview, index) => (
                        <Grid2 item size={{ xs: 12, md: 6, lg: 4 }} key={index}>
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
                        </Grid2>
                    ))}

                    {maxVideos === -1 || previews.length < maxVideos ? (
                        <Grid2 item size={{ xs: 12, md: 6, lg: 4 }}>
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
                        </Grid2>
                    ) : null}
                </Grid2>
            ) : (
                <Grid2 item size={{ xs: 12, md: 6, lg: 4 }}>
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
                </Grid2>
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

const VideoUploadWithRef = React.forwardRef(VideoUpload);
export { VideoUploadWithRef as VideoUpload };