import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout.jsx";
import {Head, Link, useForm} from "@inertiajs/react";
import InputLabel from "@/Components/InputLabel.jsx";
import TextInput from "@/Components/TextInput.jsx";
import InputError from "@/Components/InputError.jsx";
import TextAreaInput from "@/Components/TextAreaInput.jsx";
import SelectInput from "@/Components/SelectInput.jsx";

export default function Edit({project}){
    const {data, setData, post, errors} = useForm({
        image: '',
        name: project.name || '',
        status: project.status || '',
        description: project.description || '',
        due_date: project.due_date || '',
        _method: 'PUT',
    })
    const submit = (e) => {

        e.preventDefault();
        post(route('project.update', project.id))
    }

    return(
        <AuthenticatedLayout
            header={
                <div className="flex justify-between items-center">
                    <h2 className="text-xl font-semibold leading-tight text-gray-800">
                        Edit Project "{project.name}"
                    </h2>
                </div>
            }
        >
            <Head title="Create Project"/>

            <div className="py-12">
                <div className="mx-auto max-w-7xl sm:px-6 lg:px-8">
                    <div className="overflow-hidden bg-white shadow-sm sm:rounded-lg">
                        <div className="p-6 text-gray-900">
                            <form className="p-4 shadow rounded-lg"
                                onSubmit={submit}>
                                {project.image_path && (
                                    <div className="mb-4">
                                        <img src={project.image_path} className="w-64" alt="image"/>
                                    </div>
                                )}
                                <div>
                                    <InputLabel htmlFor="project_image_path" value="Project Image" />
                                    <TextInput
                                        id='project_image_path'
                                        type="file"
                                        name="image"
                                        className="mt-1 block w-full"
                                        onChange={e => {setData('image', e.target.files[0])}}  />
                                    <InputError message={errors.image} className="mt-2" />
                                </div>
                                <div className="mt-4">
                                    <InputLabel htmlFor="project_name" value="Project Name" />
                                    <TextInput
                                        id='project_name'
                                        name="name"
                                        value={data.name}
                                        className="mt-1 block w-full"
                                        onChange={e => {setData('name', e.target.value)}}
                                        isFocused={true} />
                                    <InputError message={errors.name} className="mt-2" />
                                </div>
                                <div className="mt-4">
                                    <InputLabel htmlFor="project_description" value="Project Description" />
                                    <TextAreaInput
                                        id='project_description'
                                        name="description"
                                        value={data.description}
                                        className="mt-1 block w-full"
                                        onChange={e => {setData('description', e.target.value)}}  />
                                    <InputError message={errors.description} className="mt-2" />
                                </div>
                                <div className="mt-4">
                                    <InputLabel htmlFor="project_due_date" value="Project Due Date" />
                                    <TextInput
                                        id='project_due_date'
                                        type="date"
                                        name="due_date"
                                        value={data.due_date}
                                        className="mt-1 block w-full"
                                        onChange={e => {setData('due_date', e.target.value)}}  />
                                    <InputError message={errors.due_date} className="mt-2" />
                                </div>
                                <div className="mt-4">
                                    <InputLabel htmlFor="project_status" value="Project Status" />
                                    <SelectInput
                                        id='project_status'
                                        name="status"
                                        value={data.status}
                                        className="mt-1 block w-full"
                                        onChange={e => {setData('status', e.target.value)}}>
                                        <option value="">Select Option</option>
                                        <option value="pending">Pending</option>
                                        <option value="in_progress">In Progress</option>
                                        <option value="completed">Completed</option>
                                    </SelectInput>
                                    <InputError message={errors.status} className="mt-2" />
                                </div>
                                <div className="mt-4 text-right">
                                    <Link href={route('project.index')} className="m-2 bg-gray-100 py-1 px-3 text-gray-800 rounded shadow transition-all hover:bg-gray-200">
                                        Cancel
                                    </Link>
                                    <button className="mx-2 bg-emerald-500 py-1 px-3 text-white rounded shadow transition-all hover:bg-emerald-600">
                                        Submit
                                    </button>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
)
}
