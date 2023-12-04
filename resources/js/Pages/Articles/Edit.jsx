import React from "react";
import App from "@/Layouts/App.jsx";
import {Head, useForm} from "@inertiajs/react";
import Container from "@/Components/Container.jsx";
import Header from "@/Components/Header.jsx";
import PrimaryButton from "@/Components/PrimaryButton.jsx";
import {Inertia} from "@inertiajs/inertia";
import ArticleForm from "@/Components/ArticleForm.jsx";

export default function Edit({article, tags}){

    const {data, setData} = useForm({
        title: article.title,
        teaser: article.teaser,
        category_id: article.category,
        body: article.body,
        picture: '',
        tags: article.tags,
    })

    const onSubmit = (e) => {
        e.preventDefault();

        Inertia.put(route('articles.update', article.slug), {
            ...data,
            _method: "PUT",
            category_id: data.category_id.id,
            tags: data.tags.map(t => t.id),

        })
    }
    return(
        <div className="mt-14 md:mt-10">
            <Head title="Edit new article"/>
            <Header>
                <Header.Title>
                    {data.title || 'The title ..'}
                </Header.Title>
                <Header.Content>
                    {data.teaser || 'The teaser ..'}
                </Header.Content>
            </Header>
            <Container>
                <form onSubmit={onSubmit}>
                    <ArticleForm {...{data, setData}}/>
                    <PrimaryButton>Update</PrimaryButton>
                </form>
            </Container>
        </div>
    )
}

Edit.layout = page => <App children={page}/>
