import React from "react";
import App from "@/Layouts/App.jsx";
import { Head } from "@inertiajs/react";
import Header from "@/Components/Header.jsx";
import Container from "@/Components/Container.jsx";

export default function Show({article}){
    return(
        <div className="mt-14 md:mt-10">
            <Head title={article.title}/>
            <Header>
                <Header.Title>
                    {article.title}
                </Header.Title>
                <Header.Subtitle>
                    This page {article.teaser}
                </Header.Subtitle>
            </Header>
            <Container>
                {article.body}
            </Container>
        </div>
    )
}

Show.layout = page => <App children={page}/>
