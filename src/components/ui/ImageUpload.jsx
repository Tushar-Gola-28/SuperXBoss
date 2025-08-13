import React, { useState, useCallback, useEffect, forwardRef } from 'react';
import {
    Box,
    Typography,
    Button,
    IconButton,
    Chip,
    Grid2
} from '@mui/material';
import AddPhotoAlternateIcon from '@mui/icons-material/AddPhotoAlternate';
import DeleteIcon from '@mui/icons-material/Delete';
import { notify } from './notify';

const ImageUpload = forwardRef(({
    label = "Add Image",
    description = "Images must be in PNG, JPEG, or JPG format.",
    ratio = "1:1",
    required = true,
    onImageChange,
    onRemovePathsChange, // New callback for removed paths
    initialImages = [],
    maxImages = 1,
    removePath = false, // New prop to enable path removal tracking
    MAX_SIZE_MB = 2
}, ref) => {
    const [images, setImages] = useState(initialImages);
    const [previews, setPreviews] = useState(initialImages);
    const [pathsToRemove, setPathsToRemove] = useState([]);

    useEffect(() => {
        if (initialImages?.length) {
            setPreviews(initialImages.map((it) => typeof it == "string" ? it : it.preview));
            setImages(initialImages);
        }
    }, [initialImages]);

    const inputRef = React.useRef(null);

    const handleImageChange = useCallback((e) => {
        const files = Array.from(e.target.files || []);

        if (files.length === 0) return;

        // Validate file types
        const validTypes = ['image/png'];
        const invalidFiles = files.filter(file => !validTypes.includes(file.type));

        if (invalidFiles.length > 0) {
            alert('Please upload only PNG, JPEG, or JPG format images.');
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


        // Check if adding these files would exceed maxImages
        if (maxImages !== -1 && (images.length + files.length) > maxImages) {
            alert(`You can upload a maximum of ${maxImages} image(s).`);
            return;
        }

        // For single image upload, replace existing image
        if (maxImages === 1) {
            const file = files[0];
            const reader = new FileReader();
            reader.onload = () => {
                const newImage = {
                    file,
                    preview: reader.result
                };
                setImages([newImage]);
                setPreviews([reader.result]);
                if (onImageChange) onImageChange([newImage]);
            };
            reader.readAsDataURL(file);
        } else {
            // For multiple images
            const newImages = [];
            const newPreviews = [];

            files.forEach(file => {
                const reader = new FileReader();
                reader.onload = () => {
                    newImages.push({
                        file,
                        preview: reader.result
                    });
                    newPreviews.push(reader.result);

                    // When all files are processed
                    if (newImages.length === files.length) {
                        const updatedImages = [...images, ...newImages];
                        const updatedPreviews = [...previews, ...newPreviews];

                        setImages(updatedImages);
                        setPreviews(updatedPreviews);
                        if (onImageChange) onImageChange(updatedImages);
                    }
                };
                reader.readAsDataURL(file);
            });
        }

        // Reset input value to allow selecting the same file again
        if (inputRef.current) {
            inputRef.current.value = '';
        }
    }, [images, maxImages, onImageChange, removePath, pathsToRemove]);

    const handleRemoveImage = (index) => {
        // Check if the item being removed is a URL (existing path)
        const isUrl = typeof previews[index] === 'string' &&
            (previews[index].startsWith('http://') || previews[index].startsWith('https://'));

        if (removePath && isUrl) {
            const removedPath = previews[index];
            const newPathsToRemove = [...pathsToRemove, removedPath];
            setPathsToRemove(newPathsToRemove);
            if (onRemovePathsChange) onRemovePathsChange(newPathsToRemove);
        }

        const newImages = images.filter((_, i) => i !== index);
        const newPreviews = previews.filter((_, i) => i !== index);

        setImages(newImages);

        setPreviews(newPreviews);
        if (onImageChange) onImageChange(newImages);

        // Reset file input if all images are removed
        if (newImages.length === 0 && inputRef.current) {
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
                onChange={handleImageChange}
                accept="image/png"
                style={{ display: 'none' }}
                multiple={maxImages !== 1}
            />

            {previews.length > 0 ? (
                <Grid2 container spacing={1}>
                    {previews.map((preview, index) => (
                        <Grid2 item size={{ xs: 12, md: 6, lg: 4 }} key={index}>
                            <Box sx={{ position: 'relative' }}>
                                <Box
                                    component="img"
                                    src={preview}
                                    sx={{
                                        width: "100%",
                                        height: 150,
                                        objectFit: 'cover',
                                        border: '1px solid #ddd',
                                        borderRadius: 1
                                    }}
                                />
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
                                    onClick={() => handleRemoveImage(index)}
                                >
                                    <DeleteIcon fontSize="small" />
                                </IconButton>
                            </Box>
                        </Grid2>
                    ))}

                    {maxImages === -1 || previews.length < maxImages ? (
                        <Grid2 item size={{ xs: 12, md: 6, lg: 4 }}>
                            <Button
                                variant="outlined"
                                onClick={triggerFileInput}
                                sx={{
                                    width: "100%",
                                    height: 150,
                                    display: 'flex',
                                    flexDirection: 'column',
                                    gap: 1
                                }}
                            >
                                <AddPhotoAlternateIcon sx={{ fontSize: "50px" }} />
                                <Typography variant="caption">Add more</Typography>
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
                        <AddPhotoAlternateIcon sx={{ fontSize: "50px" }} />
                        <Typography variant="caption">Click to select images</Typography>
                        <Typography variant="caption" color="text.secondary">
                            ({ratio} ratio)
                        </Typography>
                    </Button>
                </Grid2>
            )}

            {maxImages > 1 && (
                <Box sx={{ mt: 1 }}>
                    <Chip
                        label={`${previews.length}/${maxImages} images uploaded`}
                        size="small"
                        color={previews.length === maxImages ? 'success' : 'default'}
                    />
                </Box>
            )}
        </Box>
    );
});

export default ImageUpload;