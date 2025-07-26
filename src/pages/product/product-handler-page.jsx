import { useEffect, useState } from 'react'
import PageStructure from '../../components/ui/PageStructure'
import { Button, Checkbox, FormControl, Grid2, IconButton, InputLabel, ListItemText, MenuItem, OutlinedInput, Select, Stack, TextField, Typography } from '@mui/material'
import ImageUpload from '../../components/ui/ImageUpload'
import { CustomInput, CustomPaper, CustomRadio, notify, VideoUpload } from '../../components'
import CloseIcon from '@mui/icons-material/Close';
import { useMutation, useQuery } from '@tanstack/react-query'
import { fetchVehicleSegmentType } from '../../services/for-all'
import { fetchActiveBrands } from '../../services/brands'
import { useFormik } from 'formik'
import { handleKeyPress } from '../../functions'
import { createProduct, fetchProductsById, updateProduct } from '../../services/product'
import { useNavigate, useParams } from 'react-router'
import * as Yup from 'yup';
import { BrandModal } from '../brands/modals/BrandModal'
import { useModalControl } from '../../hooks/useModalControl'
import { SegmentModal } from '../segment/modal/SegmentModal'
import { fetchSegmentsAll } from '../../services/segments'
import { UnitModal } from '../units/modals/ModalUnit'
import { fetchUnits } from '../../services/unit'
import { LoadingButton } from '@mui/lab'

export function ProductHandlePage() {
    const { product } = useParams()
    const [videos, setVideos] = useState()
    const [prevImages, setPrevImages] = useState()
    const [images, setImages] = useState()
    const [prevVideo, setPrevVideo] = useState()
    const [removeImages, setRemoveImages] = useState()
    const navigate = useNavigate()
    const [removeVideo, setRemoveVideo] = useState()
    const [discounts, setDiscounts] = useState([
        { count: "", discount: "" }
    ])

    const handleAddDiscount = () => {
        setDiscounts((prev) => [...prev, { count: "", discount: "" }])
    }
    const handleRemoveDiscount = (ind) => {
        setDiscounts((prev) => prev.filter((_, index) => index != ind))
    }
    const handleAddDiscountValue = (index, value, key) => {
        setDiscounts((prev) => {
            let update = [...prev];
            update[index][key] = value
            return update
        })
    }
    const { data, refetch: fetchSegment } = useQuery({
        queryKey: ['fetchSegmentsAll',],
        queryFn: ({ signal }) => fetchSegmentsAll(signal)
    })
    const { data: unitData, refetch: fetchUnit } = useQuery({
        queryKey: ['fetchUnits',],
        queryFn: ({ signal }) => fetchUnits(signal, 0, 15, undefined, false, true)
    })
    const { data: active_brand, refetch: fetchBrand } = useQuery({
        queryKey: ['fetchActiveBrands',],
        queryFn: ({ signal }) => fetchActiveBrands(signal)
    })
    const { data: product_data, isLoading } = useQuery({
        queryKey: ['fetchProductsById',],
        queryFn: ({ signal }) => fetchProductsById(signal, product),
        enabled: !!product
    })
    const validationSchema = Yup.object({
        name: Yup.string().required('Name is required'),
        point: Yup.number().typeError('Must be a number').min(0, 'Point must be at least 0').required('Point is required'),
        new_arrival: Yup.string().oneOf(['true', 'false'], 'Invalid value').required(),
        pop_item: Yup.string().oneOf(['true', 'false'], 'Invalid value').required(),
        part_no: Yup.string().required('Part number is required'),
        segment_type: Yup.array().of(Yup.string()),
        customer_price: Yup.number().typeError('Must be a number').min(0, 'Minimum 0').required('Customer Price is required.'),
        b2b_price: Yup.number().typeError('Must be a number').min(0, 'Minimum 0').required('B2B price is required.'),
        min_qty: Yup.number().typeError('Must be a number').min(1, 'Minimum 1').required('Minimum qty is required.'),
        wish_product: Yup.string().oneOf(['true', 'false'], 'Invalid value').required(),
        any_discount: Yup.number().typeError('Must be a number')
            .min(0, 'Minimum is 0%')
            .max(100, 'Maximum is 100%').nullable(),
        brand_id: Yup.string().required('Brand ID is required'),
        item_stock: Yup.number().typeError('Must be a number').min(0, 'Minimum 0').required('Stock is required.'),
        tax: Yup.number().typeError('Must be a number').min(0, 'Minimum is 0%')
            .max(100, 'Maximum is 100%').required('Tax is required'),
        sku_id: Yup.string().required('SKU ID is required'),
        hsn_code: Yup.string().required('HSN Code is required'),
        ship_days: Yup.number().typeError('Must be a number').min(0, 'Minimum 0').nullable(),
        return_days: Yup.number().typeError('Must be a number').min(0, 'Minimum 0').nullable(),
        return_policy: Yup.string().nullable(),
        unit: Yup.string().required("Unit is required."),
        status: Yup.string().oneOf(['true', 'false'], 'Invalid value').required(),
        trend_part: Yup.string().oneOf(['true', 'false'], 'Invalid value').required(),
    });
    const { handleBlur, handleChange, values, errors, touched, setValues, handleSubmit } = useFormik({
        initialValues: {
            name: '',
            point: "0",
            new_arrival: "false",
            pop_item: "false",
            part_no: "",
            segment_type: [],
            customer_price: '',
            b2b_price: '',
            min_qty: '1',
            wish_product: 'false',
            any_discount: '',
            brand_id: '',
            item_stock: '',
            tax: '',
            sku_id: '',
            hsn_code: '',
            ship_days: "",
            return_days: "",
            return_policy: "",
            unit: "",
            status: "false",
            trend_part: "false",
        },
        validationSchema,
        onSubmit: (values) => {
            const formData = new FormData();
            if (!images?.length) {
                return notify("Image is required.")
            }
            Object.entries(values).forEach(([key, value]) => {
                if (Array.isArray(value)) {
                    value.forEach((v) => formData.append(`${key}`, v));
                } else {
                    if (value) {
                        formData.append(key, value);
                    }
                }
            });

            if (removeVideo?.length) {
                formData.append("videoRemove", "true");
            }
            images.forEach((it) => {
                if (it.file) {
                    formData.append("images", it.file);
                }
            })
            if (removeImages) {
                removeImages.forEach((it) => {
                    formData.append("removed_images", it);
                })
            }
            if (videos && videos?.length) {
                videos.forEach((it) => {
                    formData.append("video", it.file);
                })
            }
            if (discounts.filter((it) => it.count)?.length) {
                formData.append("bulk_discount", JSON.stringify(discounts));
            }
            if (product) {
                updateMutation.mutate(formData, {
                    onSuccess: ({ data: data }) => {
                        if (data) {
                            notify("Product Update Successfully.", "success")
                            navigate(-1)
                        }

                    }
                })
                return
            }
            createMutation.mutate(formData, {
                onSuccess: ({ data: data }) => {
                    if (data) {
                        notify("Product Created Successfully.", "success")
                        navigate(-1)
                    }

                }
            })

        }
    })


    const createMutation = useMutation({
        mutationFn: async (data) => {
            return await createProduct(data)
        },
    })
    const updateMutation = useMutation({
        mutationFn: async (data) => {
            return await updateProduct(data, product)
        },
    })
    const units = [
        { value: "grams", label: "Grams" },
        { value: "kilograms", label: "Kilograms" },
        { value: "liter", label: "Liter" },
    ]

    // useEffect(() => {
    //     setValues({
    //         name: 'Product 1',
    //         point: "10",
    //         new_arrival: "false",
    //         pop_item: "false",
    //         part_no: "23456789",
    //         segment_type: [],
    //         customer_price: '1000',
    //         b2b_price: '1000',
    //         min_qty: '1',
    //         wish_product: 'false',
    //         any_discount: '0',
    //         brand_id: '',
    //         item_stock: '100',
    //         tax: '18',
    //         sku_id: '23456789',
    //         hsn_code: '12345',
    //         ship_days: "7",
    //         return_days: "10",
    //         return_policy: "",
    //         weight: "1000",
    //         unit: "kilograms",
    //         status: "false",
    //         trend_part: "false",
    //     })
    // }, [])
    useEffect(() => {
        if (product && product_data?._payload) {
            const { name, video, b2b_price, point, new_arrival, pop_item, part_no, customer_price, min_qty, wish_product, any_discount, item_stock, sku_id, tax, hsn_code, ship_days, return_days, weight, unit, status, trend_part, brand, images, bulk_discount, segment_type, return_policy } = product_data?._payload
            setValues({
                name,
                b2b_price,
                point,
                new_arrival,
                pop_item,
                part_no,
                customer_price,
                min_qty,
                wish_product,
                any_discount,
                item_stock,
                sku_id,
                tax,
                hsn_code,
                ship_days,
                return_days,
                unit,
                status,
                trend_part,
                brand_id: brand?._id,
                segment_type: segment_type.map((it) => it._id),
                return_policy
            })
            if (images) {
                setPrevImages(images)
                setImages(images)
            }
            if (video) {
                setPrevVideo([video])
            }
            if (bulk_discount?.length) {
                setDiscounts(bulk_discount)
            }
        }
    }, [product, product_data?._payload, active_brand?._payload, data?._payload])

    const { open, handleCloseModal, handleOpenModal } = useModalControl()
    const { open: isOpen, handleCloseModal: handleCloseSegmentModal, handleOpenModal: handleOpenSegmentModal } = useModalControl()
    const { open: isOpen2, handleCloseModal: handleCloseUnitModal, handleOpenModal: handleOpenUnitModal } = useModalControl()

    if (isLoading) {
        return
    }
    return (
        <PageStructure title={product ? "Update Product" : "Create Product"}>
            <Stack maxWidth={800}>
                <form onSubmit={handleSubmit}>
                    <Grid2 container spacing={1}>
                        <Grid2 size={{ xs: 12, md: 6 }}>
                            <CustomPaper>
                                <ImageUpload
                                    onImageChange={(images) => {
                                        setImages(images)
                                    }}
                                    initialImages={prevImages}
                                    maxImages={5}
                                    onRemovePathsChange={(video) => {
                                        setRemoveImages(video)
                                    }}
                                    removePath={product ? true : false}
                                />
                            </CustomPaper>
                        </Grid2>
                        <Grid2 size={{ xs: 12, md: 6 }}>
                            <CustomPaper sx={{ height: "100%" }} >

                                <VideoUpload
                                    onVideoChange={(video) => {
                                        setVideos(video)
                                    }}
                                    initialVideos={prevVideo}
                                    maxImages={5}
                                    onRemovePathsChange={(video) => {
                                        setRemoveVideo(video)
                                    }}
                                    removePath={product ? true : false}
                                />
                            </CustomPaper>
                        </Grid2>
                        <Grid2 size={{ xs: 12 }}>
                            <CustomPaper>
                                <Stack mb={1}>
                                    <Typography variant="h4" sx={{ color: "primary.main" }}>
                                        Basic Info*
                                    </Typography>
                                </Stack>
                                <Grid2 container spacing={1}>
                                    <Grid2 size={{ xs: 12, md: 6 }}>
                                        <CustomInput
                                            label="Name"
                                            required
                                            input={
                                                <TextField
                                                    fullWidth
                                                    placeholder='Enter Name'
                                                    onChange={handleChange}
                                                    required
                                                    name='name'
                                                    value={values.name}
                                                    onBlur={handleBlur}
                                                    error={errors.name && touched.name}
                                                    helperText={errors.name && touched.name ? errors.name : null}
                                                />
                                            }
                                        />
                                    </Grid2>
                                    <Grid2 size={{ xs: 12, md: 6 }}>
                                        <CustomInput
                                            label="Part number"
                                            required
                                            input={
                                                <TextField
                                                    fullWidth
                                                    placeholder='Enter Part number'
                                                    required
                                                    onChange={handleChange}
                                                    name='part_no'
                                                    value={values.part_no}
                                                    onBlur={handleBlur}
                                                    error={errors.part_no && touched.part_no}
                                                    helperText={errors.part_no && touched.part_no ? errors.part_no : null}
                                                />
                                            }
                                        />
                                    </Grid2>
                                    <Grid2 size={{ xs: 12, md: 6 }}>
                                        <CustomInput
                                            label="Customer Price"
                                            required
                                            input={
                                                <TextField
                                                    type="number"
                                                    fullWidth
                                                    required
                                                    onWheel={(e) => e.target.blur()}
                                                    placeholder='Enter Customer Price'
                                                    onChange={handleChange}
                                                    name='customer_price'
                                                    value={values.customer_price}
                                                    onBlur={handleBlur}
                                                    error={errors.customer_price && touched.customer_price}
                                                    helperText={errors.customer_price && touched.customer_price ? errors.customer_price : null}
                                                />
                                            }
                                        />
                                    </Grid2>
                                    <Grid2 size={{ xs: 12, md: 6 }}>
                                        <CustomInput
                                            required
                                            label="B2B Price"
                                            input={
                                                <TextField
                                                    fullWidth
                                                    required
                                                    onWheel={(e) => e.target.blur()}
                                                    type="number"
                                                    placeholder='Enter B2B Price'
                                                    onChange={handleChange}
                                                    name='b2b_price'
                                                    value={values.b2b_price}
                                                    onBlur={handleBlur}
                                                    error={errors.b2b_price && touched.b2b_price}
                                                    helperText={errors.b2b_price && touched.b2b_price ? errors.b2b_price : null}
                                                />
                                            }
                                        />
                                    </Grid2>
                                    <Grid2 size={{ xs: 12, md: 6 }}>
                                        <CustomInput
                                            label="Any Discount? (Optional)"

                                            input={
                                                <TextField
                                                    fullWidth
                                                    onWheel={(e) => e.target.blur()}
                                                    placeholder='Enter Any Discount'
                                                    type="number"
                                                    onChange={handleChange}
                                                    name='any_discount'
                                                    value={values.any_discount}
                                                    onBlur={handleBlur}
                                                    error={errors.any_discount && touched.any_discount}
                                                    helperText={errors.any_discount && touched.any_discount ? errors.any_discount : null}
                                                />
                                            }
                                        />
                                    </Grid2>
                                    <Grid2 size={{ xs: 12, md: 6 }}>
                                        <CustomInput
                                            label="Select Brand"
                                            required
                                            input={
                                                <FormControl fullWidth>
                                                    <Select
                                                        name="brand_id"
                                                        required
                                                        displayEmpty
                                                        onChange={handleChange}
                                                        value={values.brand_id}
                                                    >
                                                        <MenuItem value={""}>
                                                            <em> <ListItemText primary={"Select Brand"} /></em>
                                                        </MenuItem>
                                                        {active_brand?._payload?.map(({ name, _id }) => (
                                                            <MenuItem key={_id} value={_id}>
                                                                <ListItemText primary={name} />
                                                            </MenuItem>
                                                        ))}
                                                    </Select>
                                                </FormControl>
                                            }
                                        />
                                        <Stack direction="row" justifyContent="flex-end" mt={1}>
                                            <Button variant="outlined" onClick={handleOpenModal}>
                                                Add Brand
                                            </Button>
                                        </Stack>
                                    </Grid2>
                                    <Grid2 size={{ xs: 12 }}>
                                        <CustomInput
                                            label="Vehicle Segment"
                                            required
                                            input={
                                                <FormControl fullWidth>
                                                    <InputLabel id="demo-multiple-checkbox-label">Vehicle Segment</InputLabel>
                                                    <Select
                                                        multiple
                                                        onChange={handleChange}
                                                        name='segment_type'
                                                        required
                                                        value={values.segment_type}
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
                                                                <Checkbox checked={values.segment_type?.includes(_id)} />
                                                                <ListItemText primary={name} />
                                                            </MenuItem>
                                                        ))}
                                                    </Select>
                                                </FormControl>
                                            }
                                        />
                                        <Stack direction="row" justifyContent="flex-end" mt={1}>
                                            <Button variant="outlined" onClick={handleOpenSegmentModal}>
                                                Add Segment
                                            </Button>
                                        </Stack>
                                    </Grid2>
                                    <Grid2 size={{ xs: 12 }}>
                                        <CustomPaper>
                                            <Stack mb={1}>
                                                <Typography variant="h5" sx={{ color: "primary.main" }}>
                                                    Bulk Discount*
                                                </Typography>
                                            </Stack>
                                            {
                                                discounts?.map((it, index) => {
                                                    return (
                                                        <CustomPaper key={index} sx={{ mb: 1 }}>
                                                            <Grid2 container spacing={1} >
                                                                <Grid2 size={{ xs: 12, md: 6 }}>
                                                                    <CustomInput
                                                                        label="Item Count"
                                                                        input={
                                                                            <TextField
                                                                                fullWidth
                                                                                placeholder='Enter Item Count'
                                                                                name="count"
                                                                                value={it.count}
                                                                                onWheel={(e) => e.target.blur()}
                                                                                type="number"
                                                                                onChange={(e) => {
                                                                                    handleAddDiscountValue(index, e.target.value, e.target.name)
                                                                                }}
                                                                            />
                                                                        }
                                                                    />

                                                                </Grid2>
                                                                <Grid2 size={{ xs: 11, md: 5 }}>
                                                                    <CustomInput
                                                                        label="Discount Price"
                                                                        input={
                                                                            <TextField
                                                                                fullWidth
                                                                                placeholder='Enter Discount Price'
                                                                                name="discount"
                                                                                type="number"
                                                                                onWheel={(e) => e.target.blur()}
                                                                                value={it.discount}
                                                                                onChange={(e) => {
                                                                                    handleAddDiscountValue(index, e.target.value, e.target.name)
                                                                                }}
                                                                            />
                                                                        }
                                                                    />

                                                                </Grid2>
                                                                <Grid2 size={{ xs: 1, md: 1 }}>
                                                                    <Stack direction="row" justifyContent="center" alignItems="center" mt={3}>
                                                                        <IconButton color='primary' onClick={() => handleRemoveDiscount(index)}>
                                                                            <CloseIcon />
                                                                        </IconButton>
                                                                    </Stack>
                                                                </Grid2>
                                                            </Grid2>
                                                        </CustomPaper>
                                                    )
                                                })
                                            }

                                            <Stack direction="row" mt={2}>
                                                <Button variant="outlined" onClick={handleAddDiscount}>
                                                    Add New
                                                </Button>
                                            </Stack>

                                        </CustomPaper>
                                    </Grid2>

                                </Grid2>

                            </CustomPaper>
                        </Grid2>
                        <Grid2 size={{ xs: 12 }}>
                            <CustomPaper>
                                <Stack mb={1}>
                                    <Typography variant="h5" sx={{ color: "primary.main" }}>
                                        Invertory & Order Details*
                                    </Typography>
                                </Stack>
                                <Grid2 container spacing={1}>
                                    <Grid2 size={{ xs: 12, md: 6 }}>
                                        <CustomInput
                                            label="Item Stock Count"
                                            required
                                            input={
                                                <TextField
                                                    required
                                                    fullWidth
                                                    placeholder='Enter Item Stock Count'
                                                    type="number"
                                                    onWheel={(e) => e.target.blur()}
                                                    onKeyDown={handleKeyPress}
                                                    onChange={handleChange}
                                                    name='item_stock'
                                                    value={values.item_stock}
                                                    onBlur={handleBlur}
                                                    error={errors.item_stock && touched.item_stock}
                                                    helperText={errors.item_stock && touched.item_stock ? errors.item_stock : null}
                                                />
                                            }
                                        />
                                    </Grid2>
                                    <Grid2 size={{ xs: 12, md: 6 }}>
                                        <CustomInput
                                            label="SKU ID"
                                            required
                                            input={
                                                <TextField
                                                    required
                                                    fullWidth
                                                    placeholder='Enter SKU ID'
                                                    type="number"
                                                    onWheel={(e) => e.target.blur()}
                                                    onChange={handleChange}
                                                    name='sku_id'
                                                    value={values.sku_id}
                                                    onBlur={handleBlur}
                                                    error={errors.sku_id && touched.sku_id}
                                                    helperText={errors.sku_id && touched.sku_id ? errors.sku_id : null}
                                                />
                                            }
                                        />
                                    </Grid2>
                                    <Grid2 size={{ xs: 12, md: 6 }}>
                                        <CustomInput
                                            label="Unit"
                                            required
                                            input={
                                                <FormControl fullWidth>
                                                    <Select
                                                        required
                                                        onChange={handleChange}
                                                        name='unit'
                                                        value={values.unit}
                                                        displayEmpty
                                                    >
                                                        <MenuItem value={""}>
                                                            <em> <ListItemText primary={"Unit"} /></em>
                                                        </MenuItem>
                                                        {unitData?._payload?.map(({ _id, name, set, pc }) => (
                                                            <MenuItem key={_id} value={_id}>
                                                                <ListItemText primary={pc ? `${name} ${set} (${pc})` : `${name} ${set}`} />
                                                            </MenuItem>
                                                        ))}
                                                    </Select>
                                                </FormControl>
                                            }
                                        />
                                        <Stack direction="row" mt={2}>
                                            <Button variant="outlined" onClick={handleOpenUnitModal}>
                                                Add Unit
                                            </Button>
                                        </Stack>
                                    </Grid2>
                                    <Grid2 size={{ xs: 12, md: 6 }}>
                                        <CustomInput
                                            label="Minimum Quantity"
                                            required
                                            input={
                                                <TextField
                                                    type="number"
                                                    required
                                                    fullWidth
                                                    placeholder='Enter Minimum Quantity'
                                                    onWheel={(e) => e.target.blur()}
                                                    onChange={handleChange}
                                                    name='min_qty'
                                                    value={values.min_qty}
                                                    onBlur={handleBlur}
                                                    error={errors.min_qty && touched.min_qty}
                                                    helperText={errors.min_qty && touched.min_qty ? errors.min_qty : null}
                                                />
                                            }
                                        />
                                    </Grid2>
                                </Grid2>
                            </CustomPaper>


                        </Grid2>
                        <Grid2 size={{ xs: 12 }}>
                            <CustomPaper>
                                <Stack mb={1}>
                                    <Typography variant="h5" sx={{ color: "primary.main" }}>
                                        Points*
                                    </Typography>
                                </Stack>
                                <Grid2 container spacing={1}>
                                    <Grid2 size={{ xs: 12, md: 6 }}>
                                        <CustomInput
                                            label="Points"
                                            required
                                            input={
                                                <TextField
                                                    fullWidth
                                                    required
                                                    placeholder='Enter Points'
                                                    onChange={handleChange}
                                                    name='point'
                                                    value={values.point}
                                                    onBlur={handleBlur}
                                                    error={errors.point && touched.point}
                                                    helperText={errors.point && touched.point ? errors.point : null}
                                                />
                                            }
                                        />
                                    </Grid2>
                                </Grid2>
                            </CustomPaper>
                        </Grid2>
                        <Grid2 size={{ xs: 12 }}>
                            <CustomPaper>
                                <Stack mb={1}>
                                    <Typography variant="h5" sx={{ color: "primary.main" }}>
                                        Tax Information*
                                    </Typography>
                                </Stack>
                                <Grid2 container spacing={1}>
                                    <Grid2 size={{ xs: 12, md: 6 }}>
                                        <CustomInput
                                            label="Tax Rate(%)"
                                            required
                                            input={
                                                <TextField
                                                    fullWidth
                                                    name='tax'
                                                    type='number'
                                                    required
                                                    value={values.tax}
                                                    onWheel={(e) => e.target.blur()}
                                                    onBlur={handleBlur}
                                                    onChange={handleChange}
                                                    error={errors.tax && touched.tax}
                                                    helperText={errors.tax && touched.tax ? errors.tax : null}
                                                    placeholder='Enter Tax Rate(%)'
                                                />
                                            }
                                        />
                                    </Grid2>
                                    <Grid2 size={{ xs: 12, md: 6 }}>
                                        <CustomInput
                                            label="hsn Code"
                                            required
                                            input={
                                                <TextField
                                                    fullWidth
                                                    placeholder='Enter hsn Code'
                                                    required
                                                    name='hsn_code'
                                                    value={values.hsn_code}
                                                    onBlur={handleBlur}
                                                    onChange={handleChange}
                                                    error={errors.hsn_code && touched.hsn_code}
                                                    helperText={errors.hsn_code && touched.hsn_code ? errors.hsn_code : null}
                                                />
                                            }
                                        />
                                    </Grid2>
                                </Grid2>
                            </CustomPaper>
                        </Grid2>
                        <Grid2 size={{ xs: 12 }}>
                            <CustomPaper>
                                <Stack mb={1}>
                                    <Typography variant="h5" sx={{ color: "primary.main" }}>
                                        Shipping & Return*
                                    </Typography>
                                </Stack>
                                <Grid2 container spacing={1}>
                                    <Grid2 size={{ xs: 12, }}>
                                        <CustomInput
                                            label="Return period in days"
                                            input={
                                                <TextField
                                                    fullWidth
                                                    placeholder='Enter Return period in days'
                                                    name='return_days'
                                                    onChange={handleChange}
                                                    value={values.return_days}
                                                    onBlur={handleBlur}
                                                    error={errors.return_days && touched.return_days}
                                                    helperText={errors.return_days && touched.return_days ? errors.return_days : null}
                                                />
                                            }
                                        />
                                    </Grid2>
                                    <Grid2 size={{ xs: 12, }}>
                                        <CustomInput
                                            label="Write Return Policy"
                                            input={
                                                <TextField
                                                    multiline
                                                    onChange={handleChange}
                                                    minRows={8}
                                                    fullWidth
                                                    helperText="*Leave this box empty if you want to use default return policy"
                                                    placeholder='Write Return Policy'
                                                    name='return_policy'
                                                    value={values.return_policy}

                                                />
                                            }
                                        />
                                    </Grid2>
                                </Grid2>
                            </CustomPaper>
                        </Grid2>
                        <Grid2 size={{ xs: 12 }}>
                            <CustomPaper>
                                <Stack mb={1}>
                                    <Typography variant="h5" sx={{ color: "primary.main" }}>
                                        Product Show*
                                    </Typography>
                                </Stack>
                                <Grid2 container spacing={1}>
                                    <Grid2 size={{ xs: 12, }}>
                                        <CustomRadio
                                            name="pop_item"
                                            title="Popular Item"
                                            required
                                            value={values.pop_item}
                                            handleChange={handleChange}
                                            options={
                                                [
                                                    { value: "true", label: "Yes" },
                                                    { value: "false", label: "No" },
                                                ]
                                            }
                                        />
                                    </Grid2>
                                    <Grid2 size={{ xs: 12, }}>
                                        <CustomRadio
                                            name="wish_product"
                                            title="Wish Product"
                                            required
                                            value={values.wish_product}
                                            handleChange={handleChange}
                                            options={
                                                [
                                                    { value: "true", label: "Yes" },
                                                    { value: "false", label: "No" },
                                                ]
                                            }
                                        />
                                    </Grid2>
                                    <Grid2 size={{ xs: 12, }}>
                                        <CustomRadio
                                            name="trend_part"
                                            title="Trending Product"
                                            required
                                            value={values.trend_part}
                                            handleChange={handleChange}
                                            options={
                                                [
                                                    { value: "true", label: "Yes" },
                                                    { value: "false", label: "No" },
                                                ]
                                            }
                                        />
                                    </Grid2>
                                    <Grid2 size={{ xs: 12, }}>
                                        <CustomRadio
                                            name="new_arrival"
                                            title="New Arrival"
                                            required
                                            value={values.new_arrival}
                                            handleChange={handleChange}
                                            options={
                                                [
                                                    { value: "true", label: "Yes" },
                                                    { value: "false", label: "No" },
                                                ]
                                            }
                                        />
                                    </Grid2>
                                    <Grid2 size={{ xs: 12, }}>
                                        <CustomRadio
                                            name="status"
                                            title="Status"
                                            required
                                            value={values.status}
                                            handleChange={handleChange}
                                            options={
                                                [
                                                    { value: "true", label: "Active" },
                                                    { value: "false", label: "In Active" },
                                                ]
                                            }
                                        />
                                    </Grid2>

                                </Grid2>
                            </CustomPaper>
                        </Grid2>
                    </Grid2>
                    <Stack direction="row" gap="10px" mt={2}>
                        <LoadingButton variant="contained" type='submit'
                            loading={createMutation.isPending || updateMutation?.isPending}
                            disabled={createMutation.isPending || updateMutation?.isPending}
                        >
                            {product ? "Update" : "Create"}
                        </LoadingButton>
                        <Button variant="outlined">
                            Cancel
                        </Button>
                    </Stack>
                </form>
            </Stack>
            {open && <BrandModal open={open} close={() => { handleCloseModal(); }} refetch={fetchBrand} />}
            {isOpen && <SegmentModal open={isOpen} close={() => { handleCloseSegmentModal(); }} refetch={fetchSegment} />}
            {isOpen2 && <UnitModal open={isOpen2} close={() => { handleCloseUnitModal(); }} refetch={fetchUnit} />}
        </PageStructure>
    )
}
