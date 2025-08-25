import { CustomInput, CustomModal, CustomRadio, notify } from '../../../components';
import { Button, Checkbox, FormControl, ListItemText, MenuItem, Select, Stack, TextField } from '@mui/material';
import { LoadingButton } from '@mui/lab';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { useMutation, useQuery } from '@tanstack/react-query';
import ImageUpload from '../../../components/ui/ImageUpload';
import { useEffect, useState } from 'react';
import { fetchBrandType } from '../../../services/for-all';
import { createBrand, editBrand } from '../../../services/brands';
import { fetchSegmentsAll } from '../../../services/segments';
import { SegmentModal } from '../../segment/modal/SegmentModal';
import { useModalControl } from '../../../hooks/useModalControl';
import { fetchCategories } from '../../../services';
import { CreateCategory } from '../../categories/modals/create-category';

export function BrandSpareModal({ open, close, refetch, editData, handleEditData }) {
    const [images, setImages] = useState()
    const { open: isOpen, handleCloseModal, handleOpenModal } = useModalControl()
    const { open: isOpen2, handleCloseModal: handleCloseModal2, handleOpenModal: handleOpenModal2 } = useModalControl()
    const formik = useFormik({
        initialValues: {
            name: '',
            description: '',
            status: "true",
            type: "",
            category: [],
        },
        validationSchema: Yup.object({
            name: Yup.string().required('Name is required'),
        }),
        onSubmit: (values) => {
            if (!images) {
                return notify("Image is required.")
            }
            if (!formik.values.type) {
                return notify("Brand Type is required.")
            }
            let formData = new FormData()
            formData.append("name", values.name)
            formData.append("type", values.type)
            if (images[0]?.file) {
                formData.append("logo", images[0]?.file)
            }
            formData.append("description", values.description)
            formData.append("status", values.status)
            values.category.forEach(element => {
                formData.append("categories", element)
            });
            if (editData) {
                updateMutation.mutate(formData, {
                    onSuccess: ({ data: data }) => {
                        if (data) {
                            refetch()
                            handleEditData(null)
                            notify("Brand Update Successfully.", "success")
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
                        notify("Brand Created Successfully.", "success")
                        close()
                    }

                }
            })

        }
    });

    const { data: brandTypes } = useQuery({
        queryKey: ['brandTypes',],
        queryFn: ({ signal }) => fetchBrandType(signal)
    })

    useEffect(() => {
        if (brandTypes?._payload?.length) {
            const valueData = brandTypes?._payload.find((it) => it.name == "Spare Parts")
            if (valueData) {
                formik.setFieldValue("type", valueData._id)
            }
        }
    }, [brandTypes])
    const createMutation = useMutation({
        mutationFn: async (data) => {
            return await createBrand(data)
        },
    })
    const updateMutation = useMutation({
        mutationFn: async (data) => {
            return await editBrand(data, editData?._id)
        },
    })
    const { data: category, refetch: categoryRefetch } = useQuery({
        queryKey: ['categories',],
        queryFn: ({ signal }) => fetchCategories(signal, 1, 15, undefined, undefined, "false")
    })
    useEffect(() => {
        if (editData && brandTypes?._payload) {
            formik.setValues({
                name: editData?.name,
                description: editData?.description,
                status: String(editData?.status),
                category: editData?.categories?.length > 0 ? editData?.categories?.map((it) => it._id) : []

            })
            setImages([{ preview: editData?.logo }])
        }
    }, [editData, brandTypes?._payload, category?._payload])

    return (
        <div>
            <CustomModal
                {...{
                    open,
                    close,
                    heading: editData ? "Update Spare Brand" : 'Create Spare Brand',
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
                                required
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
                    {/* {brandTypes?._payload?.find((it) => it._id == formik.values.type)?.name == "Spare Parts" && <CustomInput
                        label="Categories"
                        input={
                            <Box>

                                <FormControl fullWidth>
                                    <Select
                                        value={formik.values.category}
                                        onChange={formik.handleChange}
                                        onBlur={formik.handleBlur}
                                        name="category"
                                        multiple
                                        ret
                                        renderValue={(selected) =>
                                            category?._payload
                                                ?.filter(({ _id }) => selected.includes(_id))
                                                .map(({ name }) => name)
                                                .join(', ')
                                        }
                                    >
                                        <MenuItem value={""}>
                                            <em> <ListItemText primary={"Select Categories"} /></em>
                                        </MenuItem>
                                        {category?._payload?.map(({ name, _id }) => (
                                            <MenuItem key={name} value={_id}>
                                                <Checkbox checked={formik.values.category.includes(_id)} />
                                                <ListItemText primary={name} />
                                            </MenuItem>
                                        ))}
                                    </Select>
                                </FormControl>
                                <Stack direction="row" justifyContent="flex-end" mt={1}>
                                    <Button variant="outlined" onClick={handleOpenModal2}>
                                        Add Category
                                    </Button>

                                </Stack>
                            </Box>
                        }
                    />} */}

                    {brandTypes?._payload?.find((it) => it._id == formik.values.type)?.name == "Spare Parts" && (
                        <CustomInput
                            label="Categories"
                            input={
                                <>
                                    <FormControl fullWidth>
                                        <Select
                                            value={formik.values.category}
                                            onChange={(e) => {
                                                const value = e.target.value;

                                                // If user clicks "all"
                                                if (value.includes("all")) {
                                                    if (formik.values.category.length === category?._payload?.length) {
                                                        // Deselect all
                                                        formik.setFieldValue("category", []);
                                                    } else {
                                                        // Select all
                                                        formik.setFieldValue(
                                                            "category",
                                                            category?._payload?.map(({ _id }) => _id) || []
                                                        );
                                                    }
                                                } else {
                                                    formik.setFieldValue("category", value);
                                                }
                                            }}
                                            onBlur={formik.handleBlur}
                                            name="category"
                                            multiple
                                            MenuProps={{
                                                PaperProps: {
                                                    style: {
                                                        maxHeight: 250, // 👈 fixed max height
                                                        width: 300,     // optional: fix width
                                                    },
                                                },
                                            }}
                                            renderValue={(selected) =>
                                                category?._payload
                                                    ?.filter(({ _id }) => selected.includes(_id))
                                                    .map(({ name }) => name)
                                                    .join(", ")
                                            }
                                        >
                                            {/* ✅ Select All Option */}
                                            <MenuItem value="all">
                                                <Checkbox
                                                    checked={
                                                        formik.values.category.length === category?._payload?.length
                                                    }
                                                    indeterminate={
                                                        formik.values.category.length > 0 &&
                                                        formik.values.category.length < category?._payload?.length
                                                    }
                                                />
                                                <ListItemText primary="Select All" />
                                            </MenuItem>

                                            {/* Default option */}
                                            {/* <MenuItem value="">
                                                <em>
                                                    <ListItemText primary={"Select Categories"} />
                                                </em>
                                            </MenuItem> */}

                                            {/* Dynamic categories */}
                                            {category?._payload?.map(({ name, _id }) => (
                                                <MenuItem key={_id} value={_id}>
                                                    <Checkbox checked={formik.values.category.includes(_id)} />
                                                    <ListItemText primary={name} />
                                                </MenuItem>
                                            ))}
                                        </Select>
                                    </FormControl>

                                    <Stack direction="row" justifyContent="flex-end" mt={1}>
                                        <Button variant="outlined" onClick={handleOpenModal2}>
                                            Add Category
                                        </Button>
                                    </Stack>
                                </>
                            }
                        />
                    )}

                    {/* <CustomInput
                        label="Vehicle Segment"
                        input={
                            <Box>
                                <FormControl fullWidth>
                                    <InputLabel >Vehicle Segment</InputLabel>
                                    <Select
                                        multiple
                                        value={brand}

                                        onChange={(e) => {
                                            setBrand(e.target.value || []);
                                        }}
                                        input={<OutlinedInput label="Vehicle Segment" />}
                                        renderValue={(selected) =>
                                            data?._payload
                                                ?.filter(({ _id }) => selected.includes(_id))
                                                .map(({ name }) => name)
                                                .join(', ')
                                        }
                                    >
                                        {data?._payload?.map(({ _id, name }) => (
                                            <MenuItem key={_id} value={_id}>
                                                <Checkbox checked={brand.includes(_id)} />
                                                <ListItemText primary={name} />
                                            </MenuItem>
                                        ))}
                                    </Select>
                                </FormControl>
                                <Stack direction="row" justifyContent="flex-end" mt={1}>
                                    <Button variant="outlined" onClick={handleOpenModal}>Add Segment</Button>
                                </Stack>
                            </Box>
                        }
                    /> */}
                    {/* <CustomRadio
                        name="brand_day"
                        title="Brand Day"
                        required
                        value={formik.values.brand_day}
                        handleChange={formik.handleChange}
                        options={
                            [
                                { value: "true", label: "Yes" },
                                { value: "false", label: "No" },
                            ]
                        }
                    /> */}
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
                {isOpen && <SegmentModal open={isOpen} close={() => { handleCloseModal(); }} refetch={segmentRefetch} />}
                {isOpen2 && <CreateCategory open={isOpen2} close={() => { handleCloseModal2(); }} refetch={categoryRefetch} />}
            </CustomModal>
        </div>
    )
}
