import { Box, Button, Grid2, Stack, Typography } from '@mui/material'
import { useState, useEffect } from 'react'
import SectionHeader from '../../components/SectionHeader'
import PDFUpload from '../../components/ui/PDFUpload'
import { CustomPaper } from '../../components'
import { notify } from '../../components/ui/notify'
import { uploadDocumentsFiles, fetchDocuments } from '../../services/documents'
import { useMutation, useQuery } from '@tanstack/react-query'

export default function DocumentsPage() {
    const [privacyPolicyFiles, setPrivacyPolicyFiles] = useState([])
    const [termsConditionFiles, setTermsConditionFiles] = useState([])
    const [aboutUsFiles, setAboutUsFiles] = useState([])
    const [privacyPolicyPathsToRemove, setPrivacyPolicyPathsToRemove] = useState([])
    const [termsConditionPathsToRemove, setTermsConditionPathsToRemove] = useState([])
    const [aboutUsPathsToRemove, setAboutUsPathsToRemove] = useState([])

    // Fetch documents from API on component mount
    const { data: documentsData, isLoading, refetch } = useQuery({
        queryKey: ['documents'],
        queryFn: ({ signal }) => fetchDocuments(signal),
    })

    // Prefill form when data is loaded
    useEffect(() => {
        if (documentsData && documentsData.success) {
            const { privacyPolicy, termsCondition, aboutUs } = documentsData?._payload ? documentsData._payload : {};

            // Prefill privacy policy if it exists
            if (privacyPolicy && privacyPolicy.url) {
                setPrivacyPolicyFiles([{
                    url: privacyPolicy.url,
                    name: privacyPolicy.fileName,
                    size: privacyPolicy.fileSize,
                    // Add any other properties your PDFUpload component expects
                }]);
            }

            // Prefill terms and conditions if it exists
            if (termsCondition && termsCondition.url) {
                setTermsConditionFiles([{
                    url: termsCondition.url,
                    name: termsCondition.fileName,
                    size: termsCondition.fileSize,
                }]);
            }

            // Prefill about us if it exists
            if (aboutUs && aboutUs.url) {
                setAboutUsFiles([{
                    url: aboutUs.url,
                    name: aboutUs.fileName,
                    size: aboutUs.fileSize,
                }]);
            }
        }
    }, [documentsData]);

    const uploadMutation = useMutation({
        mutationFn: async (formData) => {
            return await uploadDocumentsFiles(formData)
        },
        onSuccess: (data) => {
            notify('All documents uploaded successfully!', 'success')
            // Reset paths to remove after successful upload
            setPrivacyPolicyPathsToRemove([])
            setTermsConditionPathsToRemove([])
            setAboutUsPathsToRemove([])
            // Refetch documents to update the UI with new data
            refetch()
        },
        onError: (error) => {
            console.error('Error uploading documents:', error)
            notify('Failed to upload documents. Please try again.', 'error')
        }
    })

    // Function to handle saving all documents with a single API call
    const handleSaveDocuments = async () => {
        if (
            privacyPolicyFiles.length === 0 ||
            termsConditionFiles.length === 0 ||
            aboutUsFiles.length === 0
        ) {
            notify("Please upload all required documents before saving.", "error");
            return;
        }

        // Create FormData for all documents
        const formData = new FormData()

        // Add privacy policy file if exists
        if (privacyPolicyFiles.length > 0 && privacyPolicyFiles[0].file) {
            formData.append('privacyPolicy', privacyPolicyFiles[0].file)
        }

        // Add terms and condition file if exists
        if (termsConditionFiles.length > 0 && termsConditionFiles[0].file) {
            formData.append('termsCondition', termsConditionFiles[0].file)
        }

        // Add about us file if exists
        if (aboutUsFiles.length > 0 && aboutUsFiles[0].file) {
            formData.append('aboutUs', aboutUsFiles[0].file)
        }

        // Add paths to remove for each document type
        if (privacyPolicyPathsToRemove.length > 0) {
            formData.append('privacyPolicyPathsToRemove', JSON.stringify(privacyPolicyPathsToRemove))
        }

        if (termsConditionPathsToRemove.length > 0) {
            formData.append('termsConditionPathsToRemove', JSON.stringify(termsConditionPathsToRemove))
        }

        if (aboutUsPathsToRemove.length > 0) {
            formData.append('aboutUsPathsToRemove', JSON.stringify(aboutUsPathsToRemove))
        }

        // Make single API call
        uploadMutation.mutate(formData)
    }
    console.log(termsConditionPathsToRemove, 'termsConditionPathsToRemove');


    return (
        <div>
            <Box>
                <SectionHeader
                    heading="Documents"
                />
                <CustomPaper sx={{ pb: 10, pt: 4, px: 4 }}>
                    {isLoading ? (
                        <Box display="flex" justifyContent="center" alignItems="center" height={200}>
                            <Typography>Loading documents...</Typography>
                        </Box>
                    ) : (
                        <Grid2 container spacing={4}>
                            <Grid2 size={{ xs: 12, md: 6 }}>
                                <PDFUpload
                                    label="Upload Privacy Policy PDF Documents"
                                    description="Please upload PDF files only (max 1MB each)"
                                    maxFiles={1}
                                    onFileChange={setPrivacyPolicyFiles}
                                    onRemovePathsChange={setPrivacyPolicyPathsToRemove}
                                    removePath={true}
                                    initialFiles={privacyPolicyFiles}
                                />
                            </Grid2>
                            <Grid2 size={{ xs: 12, md: 6 }}>
                                <PDFUpload
                                    label="Upload Term And Condition PDF Documents"
                                    description="Please upload PDF files only (max 1MB each)"
                                    maxFiles={1}
                                    onFileChange={setTermsConditionFiles}
                                    onRemovePathsChange={setTermsConditionPathsToRemove}
                                    removePath={true}
                                    initialFiles={termsConditionFiles}
                                />
                            </Grid2>
                            <Grid2 size={{ xs: 12, md: 6 }}>
                                <PDFUpload
                                    label="Upload About Us PDF Documents"
                                    description="Please upload PDF files only (max 1MB each)"
                                    maxFiles={1}
                                    onFileChange={setAboutUsFiles}
                                    onRemovePathsChange={setAboutUsPathsToRemove}
                                    removePath={true}
                                    initialFiles={aboutUsFiles}
                                />
                            </Grid2>
                            <Grid2 size={{ xs: 12 }}>
                                <Stack direction="row" gap={1} justifyContent="flex-end">
                                    <Button variant="outlined">
                                        Cancel
                                    </Button>
                                    <Button
                                        variant="contained"
                                        onClick={handleSaveDocuments}
                                        disabled={uploadMutation.isPending}
                                    >
                                        {uploadMutation.isPending ? 'Uploading...' : 'Save Changes'}
                                    </Button>
                                </Stack>
                            </Grid2>
                        </Grid2>
                    )}
                </CustomPaper>
            </Box>
        </div>
    )
}