import { FormControl, FormHelperText } from '@material-ui/core'
import React from 'react'
import { useField } from 'formik';
import { DateTimePicker } from '@material-ui/pickers';

export default function FormikDateTimePicker({
    name,
    label,
}) {
    const [field, meta, helpers] = useField(name);

    return (
        <FormControl error={meta.touched && !!meta.error} >
            <DateTimePicker
                error={meta.touched && !!meta.error}
                {...field}
                value={field.value && new Date(field.value)}
                disablePast
                onChange={v => helpers.setValue(v)}
                label={label}
                showTodayButton
                format='MMMM d, yyyy h:mm aa'
            />
            {meta.touched && meta.error && (
                <FormHelperText> {meta.error} </FormHelperText>
            )}
        </FormControl>
    )
}