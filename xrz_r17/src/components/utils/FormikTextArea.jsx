import { FormControl, FormHelperText, Input } from '@material-ui/core'
import React from 'react'
import { useField } from 'formik';

export default function FormikTextArea({
    name,
    label,
    rowsMax,
}) {
    const [field, meta] = useField(name);

    return (
        <FormControl error={meta.touched && !!meta.error} >
            <FormHelperText> {label} </FormHelperText>
            <Input 
                {...field} 
                multiline={true}
                rowsMax={rowsMax}
            />
            {meta.touched && meta.error && (
                <FormHelperText> {meta.error} </FormHelperText>
            )}
        </FormControl>
    )
}