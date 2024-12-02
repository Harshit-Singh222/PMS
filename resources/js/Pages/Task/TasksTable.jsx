import TableHead from "@/Components/TableHead.jsx";
import TextInput from "@/Components/TextInput.jsx";
import SelectInput from "@/Components/SelectInput.jsx";
import {
    TASK_PRIORITY_CLASS_MAP,
    TASK_PRIORITY_TEXT_MAP,
    TASK_STATUS_CLASS_MAP,
    TASK_STATUS_TEXT_MAP
} from "@/Pages/constants.jsx";
import {Link, router} from "@inertiajs/react";
import Pagination from "@/Components/Pagination.jsx";

export default function TasksTable({tasks, queryPara = null, hideProjectName = false, forwardToRoute}){
    queryPara = queryPara || {};
    const searchFieldChanged = (name, value) => {
        if(value){
            queryPara[name] = value;
        } else {
            delete queryPara[name];
        }
        router.get(forwardToRoute, queryPara);
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
        router.get(forwardToRoute, queryPara);
    }
    const deleteTask = (task) => {
        if(window.confirm('Are you sure you want to delete the project?')){
            router.delete(route('task.destroy', task.id))
        }
    }
    return(
        <>
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
                        Task Name
                    </TableHead>
                    {!hideProjectName && (
                        <th className="px-3 py-2">Project Name</th>
                    )}
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
                        name={'priority'}>
                        Priority
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
                <thead
                    className="text-xs text-gray-700 uppercase bg-gray-200 border-b-2 border-gray-300">
                <tr className="text-nowrap">
                    <th className="px-3 py-2"></th>
                    <th className="px-3 py-2"></th>
                    <th className="px-3 py-2">
                        <TextInput
                            defaultValue={queryPara.name}
                            className="w-full"
                            placeholder="Task Name"
                            onBlur={e => {
                                searchFieldChanged('name', e.target.value)
                            }}
                            onKeyPress={e => {
                                onKeyPress('name', e)
                            }}/>
                    </th>
                    {!hideProjectName && (
                        <th className="px-3 py-2"></th>
                    )}
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
                    <th className="px-1 py-2">
                        <SelectInput
                            defaultValue={queryPara.priority}
                            className="w-full"
                            onChange={e => {
                                searchFieldChanged('priority', e.target.value)
                            }}>
                            <option value="">Show All</option>
                            <option value="low">Low</option>
                            <option value="medium">Medium</option>
                            <option value="high">High</option>
                        </SelectInput>
                    </th>
                    <th className="px-3 py-2"></th>
                    <th className="px-3 py-2"></th>
                    <th className="px-3 py-2"></th>
                    <th className="px-3 py-2"></th>
                </tr>
                </thead>
                <tbody>
                {tasks.data.map(task => (
                    <tr key={task.id}
                        className="bg-white border-b">
                        <td className="px-3 py-2">{task.id}</td>
                        <td className="px-3 py-2">
                            <img src={task.image_path} style={{width: 100}} alt="image"/>
                        </td>
                        <th className="px-3 py-2 hover:underline">
                            <Link href={route('task.show',task.id)}>
                                {task.name}
                            </Link>
                        </th>
                        {!hideProjectName && (
                            <td className="px-3 py-2">{task.project.name}</td>
                        )}
                        <td className="px-3 py-2">
                            <span className={
                                "p-2 text-white rounded-lg " +
                                [TASK_STATUS_CLASS_MAP[task.status]]
                            }
                            >{TASK_STATUS_TEXT_MAP[task.status]}</span>
                        </td>
                        <td className="px-3 py-2">
                            <span className={
                                "p-2 text-white rounded-lg " +
                                [TASK_PRIORITY_CLASS_MAP[task.priority]]
                            }
                            >{TASK_PRIORITY_TEXT_MAP[task.priority]}</span>
                        </td>
                        <td className="px-3 py-2 text-nowrap">{task.created_at}</td>
                        <td className="px-3 py-2 text-nowrap">{task.due_date}</td>
                        <td className="px-3 py-2">{task.createdBy.name}</td>
                        <td className="px-3 py-2 text-nowrap">
                            <Link href={route('task.edit', task.id)}
                                  className="font-medium text-blue-600 hover:underline mx-1">
                                Edit
                            </Link>
                            <button onClick={e => deleteTask(task)}
                                    className="font-medium text-red-600 hover:underline mx-1">
                                Delete
                            </button>
                        </td>
                    </tr>
                ))}
                </tbody>
            </table>
            <Pagination links={tasks.meta.links}/>
        </>
    )
}
