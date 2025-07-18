import { CustomInput, CustomModal, CustomPaper, CustomRadio, notify } from '../../../components';
import { Checkbox, FormControl, InputLabel, ListItemText, MenuItem, OutlinedInput, Select, Stack, TextField } from '@mui/material';
import { LoadingButton } from '@mui/lab';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { useMutation, useQuery } from '@tanstack/react-query';
import { createCategory, editCategory } from '../../../services';
import ImageUpload from '../../../components/ui/ImageUpload';
import { useEffect, useState } from 'react';
import { BASE_URL } from '../../../../config-global';
import { fetchVehicleSegmentType } from '../../../services/for-all';
const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
    PaperProps: {
        style: {
            maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
            width: 250,
        },
    },
};
export function BrandModal({ open, close, refetch, editData }) {
    const [images, setImages] = useState()

    const formik = useFormik({
        initialValues: {
            name: '',
            description: '',
            status: "true",
            type: "",
            brand_day_offer: ""

        },
        validationSchema: Yup.object({
            name: Yup.string().required('Name is required'),
            description: Yup.string().required('Description is required')
        }),
        onSubmit: (values, { setSubmitting }) => {
            // if (!images) {
            //     return notify("Image is required.")
            // }
            let formData = new FormData()
            // formData.append("file", images[0]?.file)
            // formData.append("name", values.name)
            // formData.append("description", values.description)
            // formData.append("status", values.status)
            createMutation.mutate(values, {
                onSuccess: ({ data: data }) => {
                    console.log(data);
                    if (data) {
                        refetch()
                        close()
                    }

                }
            })

        }
    });

    const { data, isLoading } = useQuery({
        queryKey: ['vehicleSegmentType',],
        queryFn: ({ signal }) => fetchVehicleSegmentType(signal)
    })

    const createMutation = useMutation({
        mutationFn: async (data) => {
            return await createCategory(data)
        },
    })
    const updateMutation = useMutation({
        mutationFn: async (data) => {
            return await editCategory(data)
        },
    })
    useEffect(() => {
        if (editData) {
            formik.setValues({ name: editData?.name, description: editData?.description, status: String(editData?.status) })
            setImages([`${BASE_URL}/upload/categories/${editData?.icon}`])
        }
    }, [editData])
    const types = [
        {
            value: "vehicle",
            label: "Vehicle"

        }, {
            value: "Spare Parts",
            label: "Spare Parts"
        },
        {
            value: "vehicle_SpareParts",
            label: "Vehicle + Spare Parts"
        }
    ];
    return (
        <div>
            <CustomModal
                {...{
                    open,
                    close,
                    heading: 'Create Brand',
                    action: (
                        <LoadingButton
                            variant="contained"
                            loading={createMutation.isSuccess}
                            disabled={createMutation.isSuccess}
                            onClick={formik.handleSubmit}
                        >
                            Create
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
                        input={
                            <TextField
                                fullWidth
                                name="name"
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
                        label="Brand Day Offer"
                        input={
                            <TextField
                                fullWidth
                                name="description"
                                placeholder="Enter brand day offer"
                                value={formik.values.description}
                                onChange={formik.handleChange}
                                onBlur={formik.handleBlur}
                                error={formik.touched.description && Boolean(formik.errors.description)}
                                helperText={formik.touched.description && formik.errors.description}
                            />
                        }
                    />
                    <CustomInput
                        label="Brand Day Offer"
                        input={
                            <FormControl fullWidth>
                                {/* <InputLabel id="demo-multiple-checkbox-label">Brand Day Offer</InputLabel> */}
                                <Select
                                    value={formik.values.type}
                                    onChange={formik.handleChange}
                                    onBlur={formik.handleBlur}
                                    name="type"
                                    displayEmpty
                                // input={<OutlinedInput label="Brand Day Offer" />}
                                >
                                    <MenuItem value={""}>
                                        <em> <ListItemText primary={"Brand Day Offer"} /></em>
                                    </MenuItem>
                                    {types.map(({ label }) => (
                                        <MenuItem key={label} value={label}>
                                            <ListItemText primary={label} />
                                        </MenuItem>
                                    ))}
                                </Select>
                            </FormControl>
                        }
                    />
                    <CustomInput
                        label="Vehicle Segment"
                        input={
                            <FormControl fullWidth>
                                <InputLabel id="demo-multiple-checkbox-label">Vehicle Segment</InputLabel>
                                <Select
                                    multiple
                                    id="demo-multiple-checkbox-label"
                                    value={[]}
                                    // onChange={handleChange}

                                    input={<OutlinedInput label="Vehicle Segment" />}
                                    renderValue={(selected) => selected.join(', ')}
                                >
                                    {data?.map(({ id, name }) => (
                                        <MenuItem key={name} value={name}>
                                            <Checkbox />
                                            <ListItemText primary={name} />
                                        </MenuItem>
                                    ))}
                                </Select>
                            </FormControl>
                        }
                    />
                    <CustomRadio
                        name="status"
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
            </CustomModal>
        </div>
    )
}
