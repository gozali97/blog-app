import App from '@/Layouts/App.jsx';
import { Head } from '@inertiajs/react';
import Container from "@/Components/Container.jsx";

export default function Dashboard({ auth }) {
    return (
            <>
                <Head title="Dashboard" />

                <Container>Dashboard</Container>
            </>
    );
}

Dashboard.layout = page => <App children={page}/>
