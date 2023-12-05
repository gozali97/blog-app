import {toast} from 'react-toastify';
import swal from 'sweetalert';
import {router} from "@inertiajs/react";

export default function useSwal() {
    const ask = ({
                     url,
                     message = 'Make sure you make good decisions!',
                     method = 'post',
                     data = []
                 }) => {
        swal({
            icon: 'warning',
            text: message,
            buttons: ['No', 'Yes'],
        }).then((value) => {
            if (value == true) {
                router[method](url, data, {
                    preserveScroll: true,
                },
                {
                    onSuccess: () => toast.success("Article deleted successfully!")
                },
            );
            }
        });
    };
    return { ask };
}
