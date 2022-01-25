import { FormControl, FormHelperText, Input } from '@material-ui/core'
import React from 'react'
import { useField } from 'formik';

export default function FormikTextInput({
    name,
    label,
    type,
}) {
    const [field, meta] = useField(name);

    return (
        <FormControl error={meta.touched && !!meta.error} >
            <FormHelperText> {label} </FormHelperText>
            <Input type={type} {...field} />
            {meta.touched && meta.error && (
                <FormHelperText> {meta.error} </FormHelperText>
            )}
        </FormControl>
    )
}