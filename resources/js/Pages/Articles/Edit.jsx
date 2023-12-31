import React from "react";
import App from "@/Layouts/App.jsx";
import {Head, Link, router, useForm} from "@inertiajs/react";
import Container from "@/Components/Container.jsx";
import Header from "@/Components/Header.jsx";
import PrimaryButton from "@/Components/PrimaryButton.jsx";
import ArticleForm from "@/Components/ArticleForm.jsx";
import {toast} from "react-toastify";

export default function Edit({article, statuses}){

    const {data, setData} = useForm({
        title: article.title,
        teaser: article.teaser,
        category_id: article.category,
        body: article.body,
        image: '',
        tags: article.tags,
        status: statuses.find((i) => i.id == article.status),
    })

    function submit(e) {
        e.preventDefault();

        router.post(route('articles.update', article.slug), {
            ...data,
            category_id: data.category_id.id,
            status: data.status.id,
            tags: data.tags.map(t => t.id),
        }, {
            onSuccess:() =>{
                    toast.success("Article edited successfully!");

            },
            onError:()=>{
                toast.error("Article edited failed!");
            }
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
                <form onSubmit={submit}>
                    <ArticleForm {...{data, setData}}/>
                    <div className="flex gap-4">
                        <Link href={route('article.table')} className="py-1.5 px-3 bg-rose-600 hover:bg-rose-700 text-white rounded">Back</Link>
                    <PrimaryButton>Update</PrimaryButton>
                    </div>
                </form>
            </Container>
        </div>
    )
}

Edit.layout = page => <App children={page}/>
