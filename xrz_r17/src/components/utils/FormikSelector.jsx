import { FormControl, FormHelperText, MenuItem, Select } from '@material-ui/core'
import React from 'react'
import { useField } from 'formik';

export default function FormikSelector({
    name,
    label,
    opts,
}) {
    const [field, meta, helpers] = useField(name);
    return (
        <FormControl error={meta.touched && !!meta.error} >
            <FormHelperText> {label} </FormHelperText>
            <Select
                value={field.value}
                onChange={(e, d) => helpers.setValue(d.props.value)}
                onBlur={() => helpers.setTouched(true)}
            >
                {opts.map((category, idx) => 
                    <MenuItem key={idx} value={category.val}> {category.txt} </MenuItem>
                )}
            </Select>
            {meta.touched && meta.error && (
                <FormHelperText> {meta.error} </FormHelperText>
            )}
        </FormControl>
    )
}