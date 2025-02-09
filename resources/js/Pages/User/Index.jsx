import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout.jsx";
import {Head, Link, router} from "@inertiajs/react";
import Pagination from "@/Components/Pagination.jsx";
import TextInput from "@/Components/TextInput.jsx";
import TableHead from "@/Components/TableHead.jsx";

export default function Index({users, queryPara = null, success}){
    queryPara = queryPara || {};
    const searchFieldChanged = (name, value) => {
        if(value){
            queryPara[name] = value;
        } else {
            delete queryPara[name];
        }

        router.get(route('user.index'), queryPara);
    }

    const onKeyPress = (name, e) => {
        if(e.key !== 'Enter') return;

        searchFieldChanged(name, e.target.value);
    }
    const sortChanged = (name) => {
        if(name === queryPara.sort_field){
            if(queryPara.sort_dir === 'asc'){
                queryPara.sort_dir = 'desc'
            } else {
                queryPara.sort_dir = 'asc'
            }
        } else {
            queryPara.sort_field = name
            queryPara.sort_dir = 'asc'
        }
        router.get(route('user.index'), queryPara);
    }
    const deleteUser = (user) => {
        if(window.confirm('Are you sure you want to delete the user?')){
            router.delete(route('user.destroy', user.id))
        }
    }

    return(
        <AuthenticatedLayout
            header={
            <div className="flex justify-between items-center">
                <h2 className="text-xl font-semibold leading-tight text-gray-800">
                    Users
                </h2>
                <Link href={route('user.create')} className="py-1 px-3 bg-emerald-500 text-white rounded shadow transition-all hover:bg-emerald-600" >
                    Add New
                </Link>
            </div>
            }
        >
            <Head title="Users" />



            <div className="py-12">
                <div className="mx-auto max-w-7xl sm:px-6 lg:px-8">
                    {success && <div className="py-2 px-4 bg-emerald-500 text-white rounded-t-lg">
                        {success}
                    </div>}
                    <div className={
                        ("overflow-hidden bg-white shadow-sm ")+
                        (success ? 'rounded-b-lg' : 'rounded-lg')
                    }>
                        <div className="p-6 text-gray-900">
                            <table className="w-full text-sm text-left rtl:text-right text-gray-500">
                                <thead className="text-xs text-gray-700 uppercase bg-gray-200 border-b-2 border-gray-300">
                                    <tr className="text-nowrap">
                                        <TableHead
                                            sortChanged={sortChanged}
                                            sort_field={queryPara.sort_field}
                                            sort_dir={queryPara.sort_dir}
                                            name={'id'}>
                                            ID
                                        </TableHead>
                                        <TableHead
                                            sortChanged={sortChanged}
                                            sort_field={queryPara.sort_field}
                                            sort_dir={queryPara.sort_dir}
                                            name={'name'}>
                                            Name
                                        </TableHead>
                                        <TableHead
                                            sortChanged={sortChanged}
                                            sort_field={queryPara.sort_field}
                                            sort_dir={queryPara.sort_dir}
                                            name={'email'}>
                                            Email
                                        </TableHead>
                                        <TableHead
                                            sortChanged={sortChanged}
                                            sort_field={queryPara.sort_field}
                                            sort_dir={queryPara.sort_dir}
                                            name={'created_at'}>
                                            Created At
                                        </TableHead>
                                        <th className="px-3 py-2 text-right">Points</th>
                                        <th className="px-3 py-2 text-right">Actions</th>
                                    </tr>
                                </thead>
                                <thead className="text-xs text-gray-700 uppercase bg-gray-200 border-b-2 border-gray-300">
                                <tr className="text-nowrap">
                                    <th className="px-3 py-2"></th>
                                    <th className="px-3 py-2">
                                        <TextInput
                                            defaultValue={queryPara.name}
                                            className="w-full"
                                            placeholder="User Name"
                                            onBlur={e => {
                                                searchFieldChanged('name', e.target.value)
                                            }}
                                            onKeyPress={e => {
                                                onKeyPress('name', e)
                                            }}/>
                                    </th>
                                    <th className="px-3 py-2">
                                        <TextInput
                                            defaultValue={queryPara.email}
                                            className="w-full"
                                            placeholder="User Email"
                                            onBlur={e => {
                                                searchFieldChanged('email', e.target.value)
                                            }}
                                            onKeyPress={e => {
                                                onKeyPress('email', e)
                                            }}/>
                                    </th>
                                    <th className="px-3 py-2"></th>
                                    <th className="px-3 py-2"></th>
                                    <th className="px-3 py-2"></th>
                                    </tr>
                                </thead>
                                <tbody>
                                {users.data.map(user => (
                                    <tr key={user.id}
                                        className="bg-white border-b">
                                        <td className="px-3 py-2">{user.id}</td>
                                        <td className="px-3 py-2 text-nowrap">
                                                {user.name}
                                        </td>
                                        <td className="px-3 py-2 text-nowrap">{user.email}</td>
                                        <td className="px-3 py-2 text-nowrap">{user.created_at}</td>
                                        <td className="px-3 py-2 text-nowrap text-center">
                                            <div className={
                                                user.points > 10 ? (' text-green-600') : (' text-red-600')
                                            }>
                                                {user.points}
                                            </div>
                                        </td>
                                        <td className="px-3 py-2 text-nowrap text-right">
                                            <Link href={route('user.edit', user.id)} className="font-medium text-blue-600 hover:underline mx-1">
                                                Edit
                                            </Link>
                                            <button onClick={e => deleteUser(user)} className="font-medium text-red-600 hover:underline mx-1">
                                                Delete
                                            </button>
                                        </td>
                                    </tr>
                                ))}
                                </tbody>
                            </table>
                            <Pagination links={users.meta.links } />
                        </div>
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    )
}
