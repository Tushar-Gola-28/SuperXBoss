import { Stack, TextField } from "@mui/material";
import { CustomInput, CustomModal, CustomPaper, CustomRadio, notify } from "../../../components";
import { LoadingButton } from "@mui/lab";
import { useFormik } from "formik";
import { useMutation } from "@tanstack/react-query";
import { createFaq, updateFaq } from "../../../services/faq";
import { useEffect } from "react";

export function FaqModal({ open, close, refetch, editData }) {
    const { values, handleChange, handleSubmit, handleBlur, errors, touched, setValues } = useFormik({
        initialValues: {
            question: "",
            answer: "",
            status: "false", // Added this since you're using featured radio
            type: "general"
        },
        onSubmit: (formData) => {

            if (editData) {
                uploadMutation.mutate(formData, {
                    onSuccess: ({ data: data }) => {
                        if (data) {
                            refetch()
                            notify("Update Successfully.", "success")
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
                        notify("Created Successfully.", "success")
                        close()
                    }

                }
            })
        }
    });
    const createMutation = useMutation({
        mutationFn: async (data) => {
            return await createFaq(data)
        },
    })
    const uploadMutation = useMutation({
        mutationFn: async (data) => {
            return await updateFaq(data, editData?._id)
        },
    })

    useEffect(() => {
        if (editData) {
            const { question, answer, type, status } = editData
            setValues({ question, answer, type, status })
        }
    }, [editData])

    return (
        <CustomModal heading="Create FAQ" open={open} close={close}
            action={<LoadingButton type="submit" variant="contained" form="faq"  >
                Create
            </LoadingButton>}
        >
            <form onSubmit={handleSubmit} id="faq">
                <Stack >
                    <CustomPaper p="15px" >
                        <Stack spacing={1.5}>
                            <CustomInput
                                required
                                label="Question"
                                input={
                                    <TextField
                                        fullWidth
                                        placeholder='Enter Question'
                                        name="question"
                                        value={values.question}
                                        onChange={handleChange}
                                        onBlur={handleBlur}
                                        error={touched.question && Boolean(errors.question)}
                                        helperText={touched.question && errors.question}
                                        required
                                    />
                                }
                            />
                            <CustomInput
                                required
                                label="Answer"
                                input={
                                    <TextField
                                        fullWidth
                                        placeholder='Enter Answer'
                                        name="answer"
                                        value={values.answer}
                                        onChange={handleChange}
                                        onBlur={handleBlur}
                                        error={touched.answer && Boolean(errors.answer)}
                                        helperText={touched.answer && errors.answer}
                                        required
                                    />
                                }
                            />
                            <CustomRadio
                                name="status"
                                required
                                title="Status"
                                value={values.status}
                                handleChange={handleChange}
                                options={[
                                    { value: "true", label: "Yes" },
                                    { value: "false", label: "No" },
                                ]}
                            />
                            <CustomRadio
                                name="type"
                                required
                                title="Type"
                                value={values.type}
                                handleChange={handleChange}
                                options={[
                                    { value: "general", label: "General" },
                                    { value: "technical", label: "Technical" },
                                    { value: "account", label: "Account" },
                                ]}
                            />
                        </Stack>
                    </CustomPaper>
                </Stack>
            </form>
        </CustomModal>
    )
}
