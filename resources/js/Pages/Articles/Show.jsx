import React from "react";
import App from "@/Layouts/App.jsx";
import { Head } from "@inertiajs/react";
import Header from "@/Components/Header.jsx";
import Container from "@/Components/Container.jsx";
import Markdown from "@/Components/Markdown.jsx";

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
                <div className="grid grid-cols-12 gap-16">
                    <div className="col-span-9">
                        <Markdown>{article.body}</Markdown>
                    </div>
                    <div className="col-span-3">

                    </div>
                </div>

            </Container>
        </div>
    )
}

Show.layout = page => <App children={page}/>
