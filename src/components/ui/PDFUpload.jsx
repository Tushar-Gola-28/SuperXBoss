import React, { useState, useCallback, useEffect, forwardRef } from 'react';
import {
    Box,
    Typography,
    Button,
    IconButton,
    Chip,
    Grid2
} from '@mui/material';
import PictureAsPdfIcon from '@mui/icons-material/PictureAsPdf';
import DeleteIcon from '@mui/icons-material/Delete';
import { notify } from './notify';

const PDFUpload = forwardRef(({
    label = "Add PDF",
    description = "Files must be in PDF format.",
    required = true,
    onFileChange,
    onRemovePathsChange,
    initialFiles = [],
    maxFiles = 1,
    removePath = false,
    MAX_SIZE_MB = 1
}, ref) => {
    const [files, setFiles] = useState(initialFiles);
    const [pathsToRemove, setPathsToRemove] = useState([]);

    useEffect(() => {
        if (initialFiles?.length) {
            setFiles(initialFiles);
        }
    }, [initialFiles]);

    const inputRef = React.useRef(null);

    const handleFileChange = useCallback((e) => {
        const selectedFiles = Array.from(e.target.files || []);

        if (selectedFiles.length === 0) return;

        // Validate file types
        const validTypes = ['application/pdf'];
        const invalidFiles = selectedFiles.filter(file => !validTypes.includes(file.type));

        if (invalidFiles.length > 0) {
            notify('Please upload only PDF files.');
            return;
        }

        const MAX_SIZE_BYTES = MAX_SIZE_MB * 1024 * 1024;
        // Validate file sizes
        const oversizedFiles = selectedFiles.filter(file => file.size > MAX_SIZE_BYTES);
        if (oversizedFiles.length > 0) {
            const fileNames = oversizedFiles.map(file => file.name).join(', ');
            notify(`These files exceed the ${MAX_SIZE_MB}MB limit: ${fileNames}`);
            return;
        }

        // Check if adding these files would exceed maxFiles
        if (maxFiles !== -1 && (files.length + selectedFiles.length) > maxFiles) {
            notify(`You can upload a maximum of ${maxFiles} file(s).`);
            return;
        }

        // For single file upload, replace existing file
        if (maxFiles === 1) {
            const file = selectedFiles[0];
            const newFile = {
                file,
                name: file.name,
                size: file.size
            };
            setFiles([newFile]);
            if (onFileChange) onFileChange([newFile]);
        } else {
            // For multiple files
            const newFiles = selectedFiles.map(file => ({
                file,
                name: file.name,
                size: file.size
            }));

            const updatedFiles = [...files, ...newFiles];
            setFiles(updatedFiles);
            if (onFileChange) onFileChange(updatedFiles);
        }

        // Reset input value to allow selecting the same file again
        if (inputRef.current) {
            inputRef.current.value = '';
        }
    }, [files, maxFiles, onFileChange, MAX_SIZE_MB]);

    const handleRemoveFile = (index) => {
        // Check if the item being removed is a URL (existing path)
        const isUrl = typeof files[index] === 'string' ||
            (files[index] && files[index].url);

        if (removePath && isUrl) {
            const removedPath = typeof files[index] === 'string'
                ? files[index]
                : files[index].url;
            const newPathsToRemove = [...pathsToRemove, removedPath];
            setPathsToRemove(newPathsToRemove);
            if (onRemovePathsChange) onRemovePathsChange(newPathsToRemove);
        }

        const newFiles = files.filter((_, i) => i !== index);
        setFiles(newFiles);
        if (onFileChange) onFileChange(newFiles);

        // Reset file input if all files are removed
        if (newFiles.length === 0 && inputRef.current) {
            inputRef.current.value = '';
        }
    };

    const formatFileSize = (bytes) => {
        if (bytes === 0) return '0 Bytes';
        const k = 1024;
        const sizes = ['Bytes', 'KB', 'MB', 'GB'];
        const i = Math.floor(Math.log(bytes) / Math.log(k));
        return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
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
                onChange={handleFileChange}
                accept="application/pdf"
                style={{ display: 'none' }}
                multiple={maxFiles !== 1}
            />

            {files.length > 0 ? (
                <Grid2 container spacing={1}>
                    {files.map((file, index) => (
                        <Grid2 item size={{ xs: 12, md: 6, lg: 4 }} key={index}>
                            <Box sx={{
                                position: 'relative',
                                border: '1px solid #ddd',
                                borderRadius: 1,
                                p: 2,
                                display: 'flex',
                                flexDirection: 'column',
                                alignItems: 'center',
                                justifyContent: 'center',
                                height: 150
                            }}>
                                <PictureAsPdfIcon sx={{ fontSize: "50px", color: 'error.main' }} />
                                <Typography variant="body2" sx={{ mt: 1, textAlign: 'center' }} noWrap>
                                    {file.name || (typeof file === 'string' ? file.split('/').pop() : 'PDF Document')}
                                </Typography>
                                {file.size && (
                                    <Typography variant="caption" color="text.secondary">
                                        {formatFileSize(file.size)}
                                    </Typography>
                                )}
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
                                    onClick={() => handleRemoveFile(index)}
                                >
                                    <DeleteIcon fontSize="small" />
                                </IconButton>
                            </Box>
                        </Grid2>
                    ))}

                    {maxFiles === -1 || files.length < maxFiles ? (
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
                                <PictureAsPdfIcon sx={{ fontSize: "50px" }} />
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
                        <PictureAsPdfIcon sx={{ fontSize: "50px" }} />
                        <Typography variant="caption">Click to select PDFs</Typography>
                    </Button>
                </Grid2>
            )}

            {maxFiles > 1 && (
                <Box sx={{ mt: 1 }}>
                    <Chip
                        label={`${files.length}/${maxFiles} files uploaded`}
                        size="small"
                        color={files.length === maxFiles ? 'success' : 'default'}
                    />
                </Box>
            )}
        </Box>
    );
});

export default PDFUpload;