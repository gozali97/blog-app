import React from "react";
import App from "@/Layouts/App.jsx";
import {Head, router, useForm} from "@inertiajs/react";
import Container from "@/Components/Container.jsx";
import Header from "@/Components/Header.jsx";
import PrimaryButton from "@/Components/PrimaryButton.jsx";
import ArticleForm from "@/Components/ArticleForm.jsx";

export default function Create({statuses,tags}){
    const {data, setData} = useForm({
        title: '',
        teaser: '',
        category_id: '',
        body: '',
        image: '',
        tags: [tags[0], tags[1]],
        status:statuses[0]
    })

    function submit(e) {
        e.preventDefault();
        router.post(route('articles.store'), {
            ...data,
            category_id: data.category_id.id,
            status: data.status.id,
            tags: data.tags.map(t => t.id),

        })
    }
    return(
        <div className="mt-14 md:mt-10">
            <Head title="Create new article"/>
            <Header>
                <Header.Title>
                    {data.title || 'The title ..'}
                </Header.Title>
                <Header.Content>
                    {data.teaser || 'The teaser ..'}
                </Header.Content>
            </Header>
            <Container>
                <form onSubmit={submit}>
                    <ArticleForm {...{data, setData}}/>
                    <PrimaryButton type='submit'>Submit</PrimaryButton>
                </form>
            </Container>
        </div>
    )
}

Create.layout = page => <App children={page}/>
