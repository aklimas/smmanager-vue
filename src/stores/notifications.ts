import { createToast } from 'mosha-vue-toastify';

export function successMessage(value: string) {
    createToast(value, {
        hideProgressBar: false,
        showIcon: true,
        position: 'bottom-right',
        type: 'success',
        transition: 'bounce',
        swipeClose: true
    });
}

export function errorMessage(error: any) {
    let errors: { [x: string]: any; } = {};

    if (error && error.violations) {
        error.violations.forEach((er: any) => {
            errors[er.propertyPath] = er.message;
            createToast(er.message, {
                hideProgressBar: false,
                showIcon: true,
                position: 'bottom-right',
                type: 'danger',
                transition: 'bounce',
                swipeClose: true
            });
        });
    } else {
        createToast(error, {
            hideProgressBar: false,
            showIcon: true,
            position: 'bottom-right',
            type: 'danger',
            transition: 'bounce',
            swipeClose: true
        });
    }

    return Object.keys(errors).length > 0 ? errors : null;
}