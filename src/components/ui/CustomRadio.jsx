import { FormControl, FormControlLabel, Radio, RadioGroup, Typography } from '@mui/material'
import React from 'react'

export function CustomRadio({ title, row = true, name, handleChange, options, value, ...rest }) {
    return (
        <div>
            <FormControl>
                <Typography variant="body1">{title}</Typography>
                <RadioGroup
                    row={row}
                    onChange={handleChange}
                    name={name}
                    value={value}
                    {...rest}
                >
                    {
                        options?.map(({ value, label, disable = false }) => {
                            return (
                                <FormControlLabel value={value} control={<Radio disabled={disable} />} label={label} />
                            )
                        })
                    }
                </RadioGroup>
            </FormControl>
        </div>
    )
}
