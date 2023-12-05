import React, {Fragment, useEffect, useRef, useState} from "react";
import App from "@/Layouts/App.jsx";
import { Head, Link, router } from "@inertiajs/react";
import Container from "@/Components/Container.jsx";
import Pagination from "@/Components/Pagination.jsx";
import Table from "@/Components/Table.jsx";
import useSwal from "@/Hooks/useSwal.jsx";
import clsx from "clsx";
import Header from "@/Components/Header.jsx";
import {pickBy} from "lodash";

export default function ArticleTable(props){
    const {data: articles, meta, links} = props.articles

    const { data } = articles,
        [query, setQuery] = useState({
            search: ""
        });
    const perpage= useRef(articles.per_page);
    const [isloading, seIsLoading] = useState(false)

    const {ask} = useSwal();

    const handleChangePerpage = (e) =>{
        perpage.current = e.target.value
        getData()
    }

    const [search, setSearch] = useState('');

    const handleSearch = (e) => {
        e.preventDefault();
        getData();
    };
    const handleKeyUp = (e) => {
        if (e.key === 'Enter') {
            handleSearch();
        }
    };

    const getData = () => {
        seIsLoading(true);
        router.get("/articles/table",pickBy(
            {
                perpage: perpage.current,
                search: search
            }
        ),{
            preserveScroll: true,
            preserveState: true,
            onFinish: seIsLoading(false)
        })
    }
    return(
        <div className="mt-14 md:mt-8 py-10 bg-white dark:bg-gray-800">
            <Head title="My Article"/>
            <Header>
                <Header.Title>
                    The Article
                </Header.Title>
                <Header.Content>
                    Lorem ipsum dolor sit amet, consectetur adipisicing elit.
                </Header.Content>
            </Header>
            <Container>
                <div className="p-4 rounded-lg shadow-lg border border-gray-100">
                <div className="flex flex-column sm:flex-row flex-wrap space-y-4 sm:space-y-0 items-center justify-between pb-4">
                    <div className="flex gap-2">
                        <div>
                            <select id="perpage" name="perpage" value={perpage.current} onChange={handleChangePerpage} className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-20 py-2 px-3 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500">
                                <option>10</option>
                                <option>25</option>
                                <option>100</option>
                            </select>
                        </div>
                        <div className="mt-2">
                        <Link href={route('articles.create')} className="py-2 px-3 bg-blue-600 hover:bg-blue-700 text-white rounded">Add Article</Link>
                        </div>
                    </div>
                      <div>
                              <div className="relative">
                                  <div className="absolute inset-y-0 left-0 rtl:inset-r-0 rtl:right-0 flex items-center ps-3 pointer-events-none">
                                      <svg className="w-5 h-5 text-gray-500 dark:text-gray-400" aria-hidden="true" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path  d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z"></path></svg>
                                  </div>
                                  <input type="search" name="search" value={search} id="table-search"
                                         onChange={(e) => setSearch(e.target.value)} onKeyUp={handleKeyUp} onBlur={handleSearch} className="block p-2 ps-10 text-sm text-gray-900 border border-gray-300 rounded-lg w-80 bg-gray-50 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Search for items"/>
                              </div>
                        </div>
                  </div>

                <Table>
                    <Table.Thead>
                    <tr>
                        <Table.Th>#</Table.Th>
                        <Table.Th>Title</Table.Th>
                        <Table.Th>Category</Table.Th>
                        <Table.Th>Tags</Table.Th>
                        <Table.Th>Status</Table.Th>
                        <Table.Th></Table.Th>
                    </tr>
                    </Table.Thead>
                    <Table.Tbody>
                        {isloading ? (
                            <>
                                <tr>
                                    <td>
                                    ... Loading
                                    </td>
                                </tr>
                            </>
                        ):articles.length ?
                                    (
                                        articles.map((article, i) => (
                                            <tr key={article.id}>
                                                <Table.Td>{meta.from + i}</Table.Td>
                                                <Table.Td>
                                                    <Link href={article.url}>{article.title}</Link>
                                                </Table.Td>
                                                <Table.Td>
                                                    <Link href={article.category.url}>{article.category.name}</Link>
                                                </Table.Td>
                                                <Table.Td>
                                                    {article.tags.map((tag, i) =>(
                                                        <span key={i} className="bg-indigo-100 text-indigo-800 text-xs font-medium me-2 px-2.5 py-0.5 rounded dark:bg-indigo-900 dark:text-indigo-300 hover:bg-indigo-200 dark:hover:bg-indigo-800">
                                                <Link href={route('tags.show', tag.slug)} key={i}>{tag.name}</Link>
                                            </span>

                                                    ))}
                                                </Table.Td>
                                                <Table.Td>
                                            <span className={clsx(
                                                article.status == 'Published' && 'bg-green-100 text-green-800  dark:bg-green-900 dark:text-green-300 hover:bg-green-200dark:hover:bg-green-800',
                                                article.status == 'Unpublished' && 'bg-amber-100 text-amber-800  dark:bg-amber-900 dark:text-amber-300 hover:bg-green-200dark:hover:bg-green-800',
                                                article.status == 'Preview' && 'bg-blue-100 text-blue-800  dark:bg-blue-900 dark:text-blue-300 hover:bg-green-200dark:hover:bg-green-800',
                                                'text-xs font-medium me-2 px-2.5 py-0.5 rounded  '
                                            )}>
                                               {article.status}
                                            </span>
                                                </Table.Td>
                                                <td>
                                                    <Table.Dropdown>
                                                        <Table.DropdownItem href={route('articles.show', article.slug)}>View</Table.DropdownItem>
                                                        <Table.DropdownItem href={route('articles.edit', article.slug)}>Edit</Table.DropdownItem>
                                                        <Table.DropdownButton className='hover:bg-rose-500 hover:text-white' onClick={() => {
                                                            ask({
                                                                url: route('articles.destroy', article),
                                                                message: "Are you sure want to delete ?",
                                                                method: "delete"
                                                            })
                                                        }}>Delete</Table.DropdownButton>
                                                    </Table.Dropdown>
                                                </td>
                                            </tr>
                                        ))
                                    )
                                    :
                                    <tr aria-colspan={5}>
                                        <td>
                                            <p>
                                                Youd dont have article yet
                                            </p>
                                        </td>
                                    </tr>
                            }
                    </Table.Tbody>
                </Table>
                <Pagination {...{meta, links}}/>
                </div>
            </Container>
        </div>
    )
}

ArticleTable.layout = page => <App children={page}/>
