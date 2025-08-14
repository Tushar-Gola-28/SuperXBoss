import { Backdrop, Box, Button, CircularProgress, FormControlLabel, Grid2, Stack, Switch, TextField } from '@mui/material';
import { useEffect, useState } from 'react';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import SectionHeader from '../../components/SectionHeader';
import { CustomInput, CustomPaper, notify } from '../../components';
import { useMutation, useQuery } from '@tanstack/react-query';
import { editCharges, fetchCharges } from '../../services/charges';

export function ChargesPage() {
    const updateMutation = useMutation({
        mutationFn: async (data) => {
            return await editCharges(data)
        },
    })
    const [disable, setDisable] = useState(true)
    const formik = useFormik({
        initialValues: {
            platformCharges: '',
            deliveryChargesPerKM: '',
        },
        validationSchema: Yup.object({
            platformCharges: Yup.number()
                .typeError('Must be a number')
                .required('Platform charges are required')
                .min(1, 'Cannot be negative'),
            deliveryChargesPerKM: Yup.number()
                .typeError('Must be a number')
                .required('Delivery charges are required')
                .min(1, 'Cannot be negative'),
        }),
        onSubmit: (values) => {
            updateMutation.mutate(values, {
                onSuccess: ({ data }) => {
                    console.log(data, "res");
                    if (data.success) {
                        setDisable(true)
                        notify("Update Successfully.", "success")
                    }


                }
            })
        },
    });

    const { data, isLoading } = useQuery({
        queryKey: ["charges"],
        queryFn: ({ signal }) => fetchCharges(signal)
    })
    useEffect(() => {
        if (data) {
            formik.setValues(data)
        }
    }, [data])



    if (isLoading) {
        return <Backdrop
            sx={{ color: "#fff", zIndex: (theme) => theme.zIndex.drawer + 1 }}
            open={true}
        >
            <CircularProgress color="inherit" />
        </Backdrop>
    }

    return (
        <div>
            <Box>
                <SectionHeader
                    heading="Charges & Fees"
                    icon="https://ticketsque-public.s3.ap-south-1.amazonaws.com/icons/Events.svg"
                />
            </Box>
            <Stack maxWidth={700}>
                <CustomPaper sx={{ p: 5 }}>
                    <form onSubmit={formik.handleSubmit}>
                        <Grid2 container spacing={2}>
                            <Grid2 size={{ xs: 12, }}>
                                <Stack direction="row" justifyContent="flex-end">
                                    <FormControlLabel sx={{ gap: 1 }} control={<Switch checked={disable} onChange={(e) => setDisable(e.target.checked)} />} label={disable ? "Disable" : "Enable"} />
                                </Stack>
                            </Grid2>
                            <Grid2 size={{ xs: 12, md: 6 }}>
                                <CustomInput
                                    label="Platform Charges"
                                    required
                                    input={
                                        <TextField
                                            fullWidth
                                            type="number"
                                            required
                                            disabled={disable}
                                            name="platformCharges"
                                            value={formik.values.platformCharges}
                                            onChange={formik.handleChange}
                                            onBlur={formik.handleBlur}
                                            placeholder="Enter Platform Charges"
                                            onWheel={(e) => e.target.blur()}
                                            error={
                                                formik.touched.platformCharges &&
                                                Boolean(formik.errors.platformCharges)
                                            }
                                            helperText={
                                                formik.touched.platformCharges &&
                                                formik.errors.platformCharges
                                            }
                                        />
                                    }
                                />
                            </Grid2>

                            <Grid2 size={{ xs: 12, md: 6 }}>
                                <CustomInput
                                    label="Delivery Charges Per KM"
                                    required
                                    input={
                                        <TextField
                                            fullWidth
                                            disabled={disable}
                                            type="number"
                                            name="deliveryChargesPerKM"
                                            required
                                            value={formik.values.deliveryChargesPerKM}
                                            onChange={formik.handleChange}
                                            onBlur={formik.handleBlur}
                                            placeholder="Enter Delivery Charges Per KM"
                                            onWheel={(e) => e.target.blur()}
                                            error={
                                                formik.touched.deliveryChargesPerKM &&
                                                Boolean(formik.errors.deliveryChargesPerKM)
                                            }
                                            helperText={
                                                formik.touched.deliveryChargesPerKM &&
                                                formik.errors.deliveryChargesPerKM
                                            }
                                        />
                                    }
                                />
                            </Grid2>

                            <Grid2 size={{ xs: 12 }} mt={2}>
                                <Stack direction="row" justifyContent="flex-end" >
                                    <Button variant="contained" type="submit" disabled={disable}>
                                        Submit
                                    </Button>
                                </Stack>
                            </Grid2>
                        </Grid2>
                    </form>
                </CustomPaper>
            </Stack>
        </div>
    );
}
