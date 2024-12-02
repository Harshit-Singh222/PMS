import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout.jsx";
import {Head, Link, useForm} from "@inertiajs/react";
import InputLabel from "@/Components/InputLabel.jsx";
import TextInput from "@/Components/TextInput.jsx";
import InputError from "@/Components/InputError.jsx";
import TextAreaInput from "@/Components/TextAreaInput.jsx";
import SelectInput from "@/Components/SelectInput.jsx";

export default function Edit({task, users}){
    const {data, setData, post, errors} = useForm({
        image: '',
        name: task.data.name || '',
        status: task.data.status || '',
        description: task.data.description || '',
        priority: task.data.priority || '',
        due_date: task.data.due_date || '',
        assigned_user_to: task.data.assignedUser.id || '',
        _method: 'PUT',
    })
    const submit = (e) => {

        e.preventDefault();
        post(route('task.update', task.data.id))
    }

    return(
        <AuthenticatedLayout
            header={
                <div className="flex justify-between items-center">
                    <h2 className="text-xl font-semibold leading-tight text-gray-800">
                        Edit Task "{task.data.name}"
                    </h2>
                </div>
            }
        >
            <Head title="Create Task"/>
            <div className="py-12">
                <div className="mx-auto max-w-7xl sm:px-6 lg:px-8">
                    <div className="overflow-hidden bg-white shadow-sm sm:rounded-lg">
                        <div className="p-6 text-gray-900">
                            <form className="p-4 shadow rounded-lg"
                                  onSubmit={submit}>
                                {task.data.image_path && (
                                    <div className="mb-4">
                                        <img src={task.data.image_path} className="w-64" alt="image"/>
                                    </div>
                                )}
                                <div>
                                    <InputLabel htmlFor="task_image_path" value="Task Image"/>
                                    <TextInput
                                        id='task_image_path'
                                        type="file"
                                        name="image"
                                        className="mt-1 block w-full"
                                        onChange={e => {
                                            setData('image', e.target.files[0])
                                        }}/>
                                    <InputError message={errors.image} className="mt-2"/>
                                </div>
                                <div className="mt-4">
                                    <InputLabel htmlFor="task_name" value="Task Name"/>
                                    <TextInput
                                        id='task_name'
                                        name="name"
                                        value={data.name}
                                        className="mt-1 block w-full"
                                        onChange={e => {
                                            setData('name', e.target.value)
                                        }}
                                        isFocused={true}/>
                                    <InputError message={errors.name} className="mt-2"/>
                                </div>
                                <div className="mt-4">
                                    <InputLabel htmlFor="task_description" value="Task Description"/>
                                    <TextAreaInput
                                        id='task_description'
                                        name="description"
                                        value={data.description}
                                        className="mt-1 block w-full"
                                        onChange={e => {
                                            setData('description', e.target.value)
                                        }}/>
                                    <InputError message={errors.description} className="mt-2"/>
                                </div>
                                <div className="mt-4">
                                    <InputLabel htmlFor="task_due_date" value="Task Due Date"/>
                                    <TextInput
                                        id='task_due_date'
                                        type="date"
                                        name="due_date"
                                        value={data.due_date}
                                        className="mt-1 block w-full"
                                        onChange={e => {
                                            setData('due_date', e.target.value)
                                        }}/>
                                    <InputError message={errors.due_date} className="mt-2"/>
                                </div>
                                <div className="mt-4">
                                    <InputLabel htmlFor="task_status" value="Task Status"/>
                                    <SelectInput
                                        id='task_status'
                                        name="status"
                                        value={data.status}
                                        className="mt-1 block w-full"
                                        onChange={e => {
                                            setData('status', e.target.value)
                                        }}>
                                        <option value="">Select Option</option>
                                        <option value="pending">Pending</option>
                                        <option value="in_progress">In Progress</option>
                                        <option value="completed">Completed</option>
                                    </SelectInput>
                                    <InputError message={errors.status} className="mt-2"/>
                                </div>
                                <div className="mt-4">
                                    <InputLabel htmlFor="task_priority" value="Task Priority"/>
                                    <SelectInput
                                        id='task_priority'
                                        name="priority"
                                        value={data.priority}
                                        className="mt-1 block w-full"
                                        onChange={e => {
                                            setData('priority', e.target.value)
                                        }}>
                                        <option value="">Select Option</option>
                                        <option value="low">Low</option>
                                        <option value="medium">Medium</option>
                                        <option value="high">High</option>
                                    </SelectInput>
                                    <InputError message={errors.priority} className="mt-2"/>
                                </div>
                                <div className="mt-4">
                                    <InputLabel htmlFor="task_assigned_user" value="Assign User"/>
                                    <SelectInput
                                        id='task_assigned_user'
                                        name="assigned_user_to"
                                        value={data.assigned_user_to}
                                        className="mt-1 block w-full"
                                        onChange={e => {
                                            setData('assigned_user_to', e.target.value)
                                        }}>
                                        <option value="">Select Option</option>
                                        {users.data.map(user => (
                                            <option key={user.id} value={user.id}>{user.name}</option>
                                        ))}
                                    </SelectInput>
                                    <InputError message={errors.project_id} className="mt-2"/>
                                </div>
                                <div className="mt-4 text-right">
                                    <Link href={route('task.index')}
                                          className="m-2 bg-gray-100 py-1 px-3 text-gray-800 rounded shadow transition-all hover:bg-gray-200">
                                        Cancel
                                    </Link>
                                    <button
                                        className="mx-2 bg-emerald-500 py-1 px-3 text-white rounded shadow transition-all hover:bg-emerald-600">
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
