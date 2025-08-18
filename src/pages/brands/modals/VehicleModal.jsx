import { CustomInput, CustomModal, CustomRadio, notify } from '../../../components';
import { FormControlLabel, IconButton, InputAdornment, MenuItem, Stack, Switch, TextField } from '@mui/material';
import { LoadingButton } from '@mui/lab';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { useMutation } from '@tanstack/react-query';
import ImageUpload from '../../../components/ui/ImageUpload';
import { useEffect, useState } from 'react';
import { SegmentModal } from '../../segment/modal/SegmentModal';
import { useModalControl } from '../../../hooks/useModalControl';
import { useParams } from 'react-router';
import { createVehicle, updateVehicle } from '../../../services/vehicle';
import CloseRoundedIcon from '@mui/icons-material/CloseRounded';
export function VehicleModal({ open, close, refetch, editData, handleEditData }) {
    const { brand_id } = useParams()
    const [images, setImages] = useState()
    const currentYear = new Date().getFullYear();
    const startYear = 1950;
    const years = Array.from({ length: currentYear - startYear + 1 }, (_, i) => startYear + i);

    const { open: isOpen, handleCloseModal, handleOpenModal } = useModalControl()
    const formik = useFormik({
        initialValues: {
            name: '',
            description: '',
            status: "true",
            start_year: "",
            end_year: "",
            no_end_year: true, // NEW

        },
        validationSchema: Yup.object({
            name: Yup.string().required('Name is required'),
            start_year: Yup.number()
                .required('Start Year is required'),

            end_year: Yup.number()
                .nullable()
                .when('no_end_year', {
                    is: true,
                    then: (schema) => schema.notRequired().nullable(true),
                    otherwise: (schema) =>
                        schema
                            .typeError('End Year is required')
                            .required('End Year is required')
                            .min(Yup.ref('start_year'), 'End Year must be greater than or equal to Start Year'),
                }),
        }),
        onSubmit: (values) => {
            if (!images) {
                return notify("Image is required.")
            }
            let formData = new FormData()
            formData.append("name", values.name)
            // formData.append("brand_day_offer", values.brand_day_offer)
            if (images[0]?.file) {
                formData.append("picture", images[0]?.file)
            }
            formData.append("description", values.description)
            formData.append("status", values.status)
            formData.append("start_year", values.start_year)
            // formData.append("end_year", values.end_year)
            if (!values.no_end_year && values.end_year !== "" && values.end_year != null) {
                formData.append("end_year", Number(values.end_year));
            } // else: omit end_year to mean "Present"

            if (editData) {
                updateMutation.mutate(formData, {
                    onSuccess: ({ data: data }) => {
                        if (data) {
                            refetch()
                            handleEditData(null)
                            notify("Vehicle Update Successfully.", "success")
                            close()
                        }

                    }
                })
                return
            }
            createMutation.mutate(formData, {
                onSuccess: ({ data: data }) => {
                    if (data) {
                        refetch()
                        if (handleEditData) {
                            handleEditData(null)
                        }
                        notify("Vehicle Created Successfully.", "success")
                        close()
                    }

                }
            })

        }
    });
    console.log(formik.errors);

    const createMutation = useMutation({
        mutationFn: async (data) => {
            return await createVehicle(data, brand_id)
        },
    })
    const updateMutation = useMutation({
        mutationFn: async (data) => {
            return await updateVehicle(data, editData?._id, brand_id)
        },
    })
    useEffect(() => {
        if (editData) {
            const hasEnd = editData?.end_year != null && editData?.end_year !== '';
            formik.setValues({
                name: editData?.name,
                description: editData?.description,
                start_year: editData?.start_year,
                end_year: editData?.end_year,
                status: String(editData?.status),
                no_end_year: !hasEnd, // NEW

            })
            setImages([{ preview: editData?.logo }])
        }
    }, [editData,])

    return (
        <div>
            <CustomModal
                {...{
                    open,
                    close,
                    heading: editData ? "Update Vehicles Model" : 'Create Vehicles Model',
                    action: (
                        <LoadingButton
                            variant="contained"
                            loading={createMutation.isPending || updateMutation?.isPending}
                            disabled={createMutation.isPending || updateMutation?.isPending}
                            onClick={formik.handleSubmit}
                        >
                            {editData ? "Update" : "Create"}
                        </LoadingButton>
                    )
                }}
            >
                <Stack spacing={1}>
                    <ImageUpload
                        onImageChange={(images) => {
                            setImages(images)
                        }}
                        initialImages={editData ? images : []}
                        maxImages={1}
                    />
                    <CustomInput
                        label="Name"
                        required
                        input={
                            <TextField
                                fullWidth
                                name="name"
                                required
                                placeholder="Enter Name"
                                value={formik.values.name}
                                onChange={formik.handleChange}
                                onBlur={formik.handleBlur}
                                error={formik.touched.name && Boolean(formik.errors.name)}
                                helperText={formik.touched.name && formik.errors.name}
                            />
                        }
                    />

                    <CustomInput
                        label="Description"
                        input={
                            <TextField
                                fullWidth
                                multiline
                                minRows={5}
                                name="description"
                                placeholder="Enter Description"
                                value={formik.values.description}
                                onChange={formik.handleChange}
                                onBlur={formik.handleBlur}
                                error={formik.touched.description && Boolean(formik.errors.description)}
                                helperText={formik.touched.description && formik.errors.description}
                            />
                        }
                    />

                    <CustomInput
                        label="Start Year"
                        required
                        input={
                            <TextField
                                fullWidth
                                required
                                name="start_year"
                                placeholder="Enter Description"
                                value={formik.values.start_year}
                                onChange={formik.handleChange}
                                onBlur={formik.handleBlur}
                                error={formik.touched.start_year && Boolean(formik.errors.start_year)}
                                helperText={formik.touched.start_year && formik.errors.start_year}
                                select
                            >
                                {
                                    years?.map((it) => {
                                        return (
                                            <MenuItem key={it} value={it}>
                                                {it}
                                            </MenuItem>
                                        )
                                    })
                                }

                            </TextField>
                        }
                    />
                    {/* <CustomInput
                        label="End Year"
                        required
                        input={
                            <TextField
                                required
                                fullWidth
                                name="end_year"
                                placeholder="Enter Description"
                                value={formik.values.end_year}
                                onChange={formik.handleChange}
                                onBlur={formik.handleBlur}
                                error={formik.touched.end_year && Boolean(formik.errors.end_year)}
                                helperText={formik.touched.end_year && formik.errors.end_year}
                                select
                            >
                                {
                                    years
                                        ?.filter((it) => {
                                            const selectedStart = Number(formik.values.start_year);
                                            return !selectedStart || it >= selectedStart;
                                        })
                                        ?.map((it) => {
                                            return (
                                                <MenuItem key={it} value={it}>
                                                    {it}
                                                </MenuItem>
                                            )
                                        })
                                }

                            </TextField>
                        }
                    /> */}

                    <FormControlLabel
                        control={
                            <Switch
                                name="no_end_year"
                                checked={formik.values.no_end_year}
                                onChange={(e) => {
                                    const checked = e.target.checked;
                                    formik.setFieldValue('no_end_year', checked);
                                    if (checked) formik.setFieldValue('end_year', ""); // clear if Present
                                }}
                            />
                        }
                        label="No End Year (Present)"
                        sx={{ mt: 1, label: { ml: 1 } }}
                    />

                    <CustomInput
                        label="End Year"
                        required={!formik.values.no_end_year}
                        input={
                            <TextField
                                required={!formik.values.no_end_year}
                                fullWidth
                                name="end_year"
                                placeholder="Select End Year"
                                value={formik.values.end_year || ""}
                                onChange={formik.handleChange}
                                onBlur={formik.handleBlur}
                                error={!formik.values.no_end_year && formik.touched.end_year && Boolean(formik.errors.end_year)}
                                helperText={!formik.values.no_end_year && formik.touched.end_year && formik.errors.end_year}
                                select
                                disabled={formik.values.no_end_year}
                                SelectProps={{ displayEmpty: true }}
                                InputProps={{
                                    endAdornment: !formik.values.no_end_year && formik.values.end_year ? (
                                        <InputAdornment position="start" sx={{ right: "20px", position: "relative" }}>
                                            <IconButton
                                                aria-label="clear end year"
                                                edge="end"
                                                onClick={() => formik.setFieldValue('end_year', "")}
                                                size="small"
                                            >
                                                <CloseRoundedIcon fontSize="small" />
                                            </IconButton>
                                        </InputAdornment>
                                    ) : null
                                }}
                            >
                                {/* Optional "placeholder" row */}
                                <MenuItem value="">
                                    — Select —
                                </MenuItem>

                                {years
                                    ?.filter((it) => {
                                        const selectedStart = Number(formik.values.start_year);
                                        return !selectedStart || it >= selectedStart;
                                    })
                                    ?.map((it) => (
                                        <MenuItem key={it} value={it}>
                                            {it}
                                        </MenuItem>
                                    ))}
                            </TextField>
                        }
                    />
                    <CustomRadio
                        name="status"
                        required
                        title="Status"
                        value={formik.values.status}
                        handleChange={formik.handleChange}
                        options={
                            [
                                { value: "true", label: "Active" },
                                { value: "false", label: "In Active" },
                            ]
                        }
                    />
                </Stack>
                {isOpen && <SegmentModal open={isOpen} close={() => { handleCloseModal(); }} refetch={segmentRefetch} />}
            </CustomModal>
        </div>
    )
}
