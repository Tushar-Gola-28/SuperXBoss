import React, { useEffect, useState } from 'react'
import PageStructure from '../../components/PageStructure'
import Grid from '@mui/material/Grid2'
import { Button, FormControl, InputAdornment, MenuItem, Paper, Select, Stack, TextField, Typography } from '@mui/material'
import { CustomInput, notify } from '../../components'
import CloseIcon from '@mui/icons-material/Close';
import { useMutation, useQuery } from '@tanstack/react-query'
import { useNavigate } from 'react-router'
import { useLocation } from 'react-router'
import { LoadingButton } from '@mui/lab'
import { handleAdd, handleChangeValue, handleKeywordValue, handleRemove } from '../../functions';
import { createBlogsEventMetaData, createBlogsMetaData, fetchBlogsData, getEventsBlogsMetaData } from '../../services/blogs'
export function CreateBlogsMeta() {
    const navigate = useNavigate()
    const location = useLocation()
    const [keywordsData, setKeywordsData] = useState([''])
    const [blogs, setBlogs] = useState([])
    const [values, setValues] = useState({ title: "", description: "", blog_id: "" })
    const [events, setEvents] = useState([])
    const mutation = useMutation({
        mutationFn: async (data) => {
            return await createBlogsMetaData(data)
        },
    })
    const mutationEvent = useMutation({
        mutationFn: async (data) => {
            return await createBlogsEventMetaData(data)
        },
    })

    const { data } = useQuery({
        queryKey: ['blogs'],
        queryFn: ({ signal }) => fetchBlogsData(signal)
    })
    useEffect(() => {
        if (data) {
            setBlogs(data?._payload)
        }
    }, [data])

    const handleSubmit = () => {
        const { title, blog_id, description } = values
        if (!blog_id.trim()) {
            return notify('Blog is required.')
        }
        if (!title.trim()) {
            return notify('Title is required.')
        }
        if (!description.trim()) {
            return notify('Description is required.')
        }

        if (keywordsData.some((kw) => kw == '')) {
            return notify('One or more keywords are empty. Please remove or update them.')

        }
        mutation.mutate({ ...values, key_word: keywordsData, }, {
            onSuccess: () => {
                if (events.length > 0) {
                    const blog_handle = blogs.find((it) => it._id == blog_id)
                    mutationEvent.mutate({ events, blog_handle: blog_handle.handle }, {
                        onSuccess: () => {
                            notify('Created Successfully.', "success")
                            navigate(-1)
                        },
                    })
                } else {
                    notify('Created Successfully.', "success")
                    navigate(-1)
                }
            },
            onError: ({ response: { data: { message } } }) => {
                notify(message)

            }
        })

    }

    useEffect(() => {
        if (location.state && data) {
            const { title, description, venue_data, key_word } = location.state
            setValues({
                title: title, description: description, blog_id: venue_data?._id
            })
            setBlogs((prev) => {
                return [...prev, venue_data]
            })
            setKeywordsData(key_word)
        }
    }, [location.state, data])

    const response = useQuery({
        queryKey: ["events-list-spo", location.state?.venue_data?._id || undefined],
        queryFn: ({ signal }) => getEventsBlogsMetaData(signal, location.state?.venue_data?.handle || undefined)
    })
    useEffect(() => {
        if (response?.data && location.state) {
            setEvents(response.data.filter((it) => it.isAdded).map((ite) => ite.event_id))
        }
    }, [response.data])


    return (
        <div>
            <PageStructure title={location.state ? "Update Blog Meta" : "Create Blog Meta"}>
                <Grid container spacing={1}>
                    <Grid size={{ xs: 12, md: 7 }}>
                        <Grid container spacing={2}>
                            <Grid size={12}>
                                <CustomInput
                                    label="Select Blog"
                                    required
                                    input={
                                        <FormControl fullWidth size="small">
                                            <Select
                                                labelId="demo-select-small-label"
                                                id="demo-select-small"
                                                value={values?.blog_id}

                                                onChange={(e) => {
                                                    handleChangeValue(e, setValues);
                                                    const blogsData = blogs?.find((it) => it?._id == e.target.value)
                                                    handleKeywordValue(0, blogsData?.title, setKeywordsData)
                                                }}
                                                name='blog_id'
                                                disabled={!!location.state}
                                                displayEmpty
                                            >
                                                <MenuItem value="">
                                                    <em>Select Blog</em>
                                                </MenuItem>
                                                {
                                                    blogs?.map((it) => {
                                                        return <MenuItem value={it?._id} key={it?._id}>{it?.title}</MenuItem>
                                                    })
                                                }
                                            </Select>
                                        </FormControl>
                                    }
                                />

                            </Grid>
                            <Grid size={12}>
                                <CustomInput
                                    label="Select Events"
                                    input={
                                        <FormControl fullWidth size="small">
                                            <Select
                                                labelId="demo-select-small-label"
                                                id="demo-select-small"
                                                value={events}
                                                multiple
                                                onChange={(e) => {
                                                    setEvents(e.target.value)
                                                }}
                                                name='blog_id'
                                                // disabled={!!location.state}
                                                displayEmpty
                                            >
                                                <MenuItem value="">
                                                    <em>Select Events</em>
                                                </MenuItem>
                                                {
                                                    response.data && response?.data?.map((it) => {
                                                        return <MenuItem value={it?.event_id} key={it?.event_id}>{it?.name}</MenuItem>
                                                    })
                                                }
                                            </Select>
                                        </FormControl>
                                    }
                                />

                            </Grid>
                            <Grid size={12}>
                                <CustomInput
                                    required
                                    label="Blog Title"
                                    input={
                                        <TextField fullWidth placeholder='Enter blog title.'
                                            value={values?.title}
                                            onChange={(e) => handleChangeValue(e, setValues)}
                                            name='title'
                                            slotProps={{ htmlInput: { maxLength: 65 } }}
                                            InputProps={{
                                                endAdornment: (
                                                    <InputAdornment position="end">
                                                        <Typography variant="body1" sx={{ color: "secondary.main" }}>{`${values?.title?.length}/65`}</Typography>
                                                    </InputAdornment>
                                                ),
                                            }}
                                        />
                                    }
                                />
                            </Grid>
                            <Grid size={12}>
                                <CustomInput
                                    required
                                    label="Blog Description"
                                    input={
                                        <TextField fullWidth placeholder='Enter blog description.'
                                            value={values?.description}
                                            onChange={(e) => handleChangeValue(e, setValues)}
                                            name='description'
                                            slotProps={{ htmlInput: { maxLength: 250 } }}
                                            rows={5}
                                            multiline
                                            InputProps={{
                                                endAdornment: (
                                                    <InputAdornment position="end">
                                                        <Typography variant="body1" sx={{ color: "secondary.main" }}>{`${values?.description?.length}/250`}</Typography>
                                                    </InputAdornment>
                                                ),
                                            }}
                                        />
                                    }
                                />
                            </Grid>
                            <Grid size={12}>
                                <CustomInput
                                    required
                                    label="Blog Keywords"
                                    input={
                                        <Paper sx={{ padding: "10px", border: "1px solid lightGrey" }}>
                                            <Stack direction="row" flexDirection="column" alignItems="flex-start">
                                                <Stack sx={{ width: "100%" }} spacing={1}>
                                                    {
                                                        keywordsData?.map((it, index) => {
                                                            return (
                                                                <TextField fullWidth placeholder={`Enter keyword ${index + 1}`} key={index}
                                                                    value={it}
                                                                    disabled={index == 0}
                                                                    onChange={(e) => handleKeywordValue(index, e.target.value, setKeywordsData)}
                                                                    InputProps={{
                                                                        endAdornment: (
                                                                            index != 0 && <InputAdornment position="start" sx={{ cursor: "pointer" }} onClick={() => handleRemove(index, setKeywordsData)}>
                                                                                <CloseIcon sx={{ color: "primary.main" }} />
                                                                            </InputAdornment>
                                                                        ),
                                                                    }}

                                                                />
                                                            )
                                                        })
                                                    }
                                                </Stack>
                                                <Button variant="outlined" sx={{ mt: 2 }} onClick={() => handleAdd(setKeywordsData)}>Add Keywords</Button>
                                            </Stack>
                                        </Paper>
                                    }
                                />
                            </Grid>
                            <Grid size={12}>
                                <Stack direction="row" spacing={1}>
                                    <LoadingButton loading={mutation.isPending} disabled={mutation.isPending} variant="contained" onClick={handleSubmit}>

                                        {
                                            location.state ? "Update Meta" : "Create Meta"
                                        }
                                    </LoadingButton>
                                    <Button variant="outlined" onClick={() => navigate(-1)}>Cancel</Button>
                                </Stack>
                            </Grid>
                        </Grid>
                    </Grid>
                </Grid>
            </PageStructure>
        </div>
    )
}
