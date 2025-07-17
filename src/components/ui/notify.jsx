import { enqueueSnackbar } from 'notistack';

export function notify(message, type="error") {
    enqueueSnackbar(message, {
        variant: type,
        anchorOrigin: {
            vertical: "top",
            horizontal: "right",
        },
    });
}
