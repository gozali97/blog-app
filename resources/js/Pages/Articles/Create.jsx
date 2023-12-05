import React from "react";
import App from "@/Layouts/App.jsx";
import {Head, Link, router, useForm} from "@inertiajs/react";
import Container from "@/Components/Container.jsx";
import Header from "@/Components/Header.jsx";
import PrimaryButton from "@/Components/PrimaryButton.jsx";
import ArticleForm from "@/Components/ArticleForm.jsx";
import {toast} from 'react-toastify';

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
        }, {
            onSuccess:() =>{
                toast.success("Article created successfully!");

            },
            onError:()=>{
                toast.error("Article created failed!");
            }
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
                    <div className="flex gap-4">
                        <Link href={route('article.table')} className="py-1.5 px-3 bg-rose-600 hover:bg-rose-700 text-white rounded">Back</Link>
                        <PrimaryButton type='submit'>Submit</PrimaryButton>
                    </div>
                </form>
            </Container>
        </div>
    )
}

Create.layout = page => <App children={page}/>
