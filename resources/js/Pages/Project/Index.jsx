import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout.jsx";
import {Head, Link, router} from "@inertiajs/react";
import Pagination from "@/Components/Pagination.jsx";
import {PROJECT_STATUS_CLASS_MAP, PROJECT_STATUS_TEXT_MAP} from "@/Pages/constants.jsx";
import TextInput from "@/Components/TextInput.jsx";
import SelectInput from "@/Components/SelectInput.jsx";
import ChevronUp from "@/Components/ChevronUp.jsx";
import ChevronDown from "@/Components/ChevronDown.jsx";
import TableHead from "@/Components/TableHead.jsx";

export default function Index({projects, queryPara = null, success}){
    queryPara = queryPara || {};
    const searchFieldChanged = (name, value) => {
        if(value){
            queryPara[name] = value;
        } else {
            delete queryPara[name];
        }

        router.get(route('project.index'), queryPara);
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
        router.get(route('project.index'), queryPara);
    }
    const deleteProject = (project) => {
        if(window.confirm('Are you sure you want to delete the project?')){
            router.delete(route('project.destroy', project.id))
        }
    }

    return(
        <AuthenticatedLayout
            header={
            <div className="flex justify-between items-center">
                <h2 className="text-xl font-semibold leading-tight text-gray-800">
                    Projects
                </h2>
                <Link href={route('project.create')} className="py-1 px-3 bg-emerald-500 text-white rounded shadow transition-all hover:bg-emerald-600" >
                    Add New
                </Link>
            </div>
            }
        >
            <Head title="Projects" />



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
                                        <th className="px-3 py-2">Image</th>
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
                                            name={'status'}>
                                            Status
                                        </TableHead>
                                        <TableHead
                                            sortChanged={sortChanged}
                                            sort_field={queryPara.sort_field}
                                            sort_dir={queryPara.sort_dir}
                                            name={'created_at'}>
                                            Created At
                                        </TableHead>
                                        <TableHead
                                            sortChanged={sortChanged}
                                            sort_field={queryPara.sort_field}
                                            sort_dir={queryPara.sort_dir}
                                            name={'due_date'}>
                                            Due Date
                                        </TableHead>
                                        <th className="px-3 py-2">Created By</th>
                                        <th className="px-3 py-2 text-right">Actions</th>
                                    </tr>
                                </thead>
                                <thead className="text-xs text-gray-700 uppercase bg-gray-200 border-b-2 border-gray-300">
                                <tr className="text-nowrap">
                                    <th className="px-3 py-2"></th>
                                    <th className="px-3 py-2"></th>
                                    <th className="px-3 py-2">
                                        <TextInput
                                            defaultValue={queryPara.name}
                                            className="w-full"
                                            placeholder="Project Name"
                                            onBlur={e => {
                                                searchFieldChanged('name', e.target.value)
                                            }}
                                            onKeyPress={e => {
                                                onKeyPress('name', e)
                                            }}/>
                                    </th>
                                    <th className="px-1 py-2">
                                        <SelectInput
                                            defaultValue={queryPara.status}
                                            className="w-full"
                                            onChange={e => {
                                                searchFieldChanged('status', e.target.value)
                                            }}>
                                            <option value="">Show All</option>
                                            <option value="pending">Pending</option>
                                                <option value="in_progress">In Progress</option>
                                                <option value="completed">Completed</option>
                                            </SelectInput>
                                        </th>
                                        <th className="px-3 py-2"></th>
                                        <th className="px-3 py-2"></th>
                                        <th className="px-3 py-2"></th>
                                        <th className="px-3 py-2"></th>
                                    </tr>
                                </thead>
                                <tbody>
                                {projects.data.map(project => (
                                    <tr key={project.id}
                                        className="bg-white border-b">
                                        <td className="px-3 py-2">{project.id}</td>
                                        <td className="px-3 py-2">
                                            <img src={project.image_path} style={{width: 100}} alt="image"/>
                                        </td>
                                        <td className="px-3 py-2">
                                            <Link href={route('project.show', project.id)}
                                                  className="font-bold hover:underline">
                                                {project.name}
                                            </Link>
                                        </td>
                                        <td className="px-3 py-2">
                                            <span className={
                                                "p-2 text-white rounded-lg "+
                                                [PROJECT_STATUS_CLASS_MAP[project.status]]
                                            }
                                            >{PROJECT_STATUS_TEXT_MAP[project.status]}</span>
                                        </td>
                                        <td className="px-3 py-2 text-nowrap">{project.created_at}</td>
                                        <td className="px-3 py-2 text-nowrap">{project.due_date}</td>
                                        <td className="px-3 py-2">{project.createdBy.name}</td>
                                        <td className="px-3 py-2 text-nowrap">
                                            <Link href={route('project.edit', project.id)} className="font-medium text-blue-600 hover:underline mx-1">
                                                Edit
                                            </Link>
                                            <button onClick={e => deleteProject(project)} className="font-medium text-red-600 hover:underline mx-1">
                                                Delete
                                            </button>
                                        </td>
                                    </tr>
                                ))}
                                </tbody>
                            </table>
                            <Pagination links={projects.meta.links } />
                        </div>
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    )
}
