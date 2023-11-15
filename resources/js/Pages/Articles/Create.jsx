import React from "react";
import App from "@/Layouts/App.jsx";
import {Head, useForm} from "@inertiajs/react";
import Container from "@/Components/Container.jsx";
import Header from "@/Components/Header.jsx";
import Input from "@/Components/Input.jsx";
import Label from "@/Components/Label.jsx";
import InputFile from "@/Components/InputFile.jsx";
import Textarea from "@/Components/Textarea.jsx";
import Editor from "@/Components/Editor.jsx";
import PrimaryButton from "@/Components/PrimaryButton.jsx";
import Select from "@/Components/Select.jsx";
import MultipleSelect from "@/Components/MultipleSelect.jsx";
import {Inertia} from "@inertiajs/inertia";
import Error from "@/Components/Error.jsx";

export default function Create({categories, tags, errors}){
    const {data, setData} = useForm({
        title: '',
        teaser: '',
        category_id: '',
        body: '',
        picture: '',
        tags: [tags[0], tags[1]],
    })

    const onChange = (e) => setData(e.target.name, e.target.value);
    const onSubmit = (e) => {
        e.preventDefault();

        Inertia.post(route('articles.store'), {
            ...data,
            category_id: data.category_id.id,
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
                <form onSubmit={onSubmit}>
                    <div className="mb-6">
                        <Label value='Picture' />
                        <InputFile name='picture' id='picture' onChange={(e) => setData('picture', e.target.files[0])}/>
                        {errors.picture ?
                            <Error value={errors.picture}/>
                            : null}
                    </div>
                    <div className="grid grid-cols-12 gap-6 mb-6">
                        <div className="col-span-4">
                            <div>
                                <Label>Category</Label>
                                <Select value={data.category_id} data={categories} onChange={(e) => setData('category_id', e)}/>
                                {errors.category_id ?
                                    <Error value={errors.category_id}/>
                                    : null}
                            </div>
                        </div>
                        <div className="col-span-8">
                            <div>
                                <Label>Tags</Label>
                                <MultipleSelect selectedItem={data.tags}  data={tags} onChange={(e) => setData('tags', e)} />
                                {errors.tags ?
                                    <Error value={errors.tags}/>
                                    : null}
                            </div>
                        </div>
                    </div>
                    <div className="mb-6">
                        <Label value='Title' />
                        <Input name='title' id='title' onChange={onChange} value={data.title}/>
                        {errors.title ?
                            <Error value={errors.title}/>
                            : null}
                    </div>
                    <div className="mb-6">
                        <Label value='Teaser' />
                        <Textarea name='teaser' id='teaser' onChange={onChange} value={data.teaser}/>
                        {errors.teaser ?
                            <Error value={errors.teaser}/>
                            : null}
                    </div>
                    <div className="mb-6">
                        <Label value='Article' />
                        <Editor name='body' id='body' onChange={onChange} value={data.body}/>
                        {errors.body ?
                            <Error value={errors.body}/>
                            : null}
                    </div>
                    <PrimaryButton type='submit'>Submit</PrimaryButton>
                </form>
            </Container>
        </div>
    )
}

Create.layout = page => <App children={page}/>
