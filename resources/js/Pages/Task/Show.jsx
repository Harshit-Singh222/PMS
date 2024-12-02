import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout.jsx";
import {Head, Link} from "@inertiajs/react";
import {
    TASK_PRIORITY_CLASS_MAP,
    TASK_PRIORITY_TEXT_MAP,
    TASK_STATUS_CLASS_MAP,
    TASK_STATUS_TEXT_MAP
} from "@/Pages/constants.jsx";

export default function Show({task}){
    return(
        <AuthenticatedLayout
            header={
                <div className="flex justify-between items-center">
                    <h2 className="text-xl font-semibold leading-tight text-gray-800">
                        {`Task "${task.data.name}"`}
                    </h2>
                    <Link href={route('task.edit', task.data.id)} className="py-1 px-3 bg-amber-600 text-white rounded shadow transition-all hover:bg-amber-500" >
                        Edit
                    </Link>
                </div>
            }
        >
            <Head title="task.datas"/>
            <div className="py-12">
                <div className="mx-auto max-w-7xl sm:px-6 lg:px-8">
                    <div className="overflow-hidden bg-white shadow-sm sm:rounded-lg">
                        <div>
                            <img src={task.data.image_path}
                                 alt=""
                                 className="w-full h-64 object-cover"/>
                        </div>
                        <div className="p-6 text-gray-900">
                            <div className="grid gap-1 grid-cols-2">
                                <div>
                                    <div>
                                        <label className="font-bold text-lg">Task ID</label>
                                        <p className="mt-1">{task.data.id}</p>
                                    </div>
                                    <div className="mt-4">
                                        <label className="font-bold text-lg">Task Name</label>
                                        <p className="mt-1">{task.data.name}</p>
                                    </div>
                                    <div className="mt-4">
                                        <label className="font-bold text-lg">Task Status</label>
                                        <p className="mt-1">
                                        <span className={
                                            "p-2 text-white rounded-lg " +
                                            [TASK_STATUS_CLASS_MAP[task.data.status]]
                                        }
                                        >{TASK_STATUS_TEXT_MAP[task.data.status]}</span>
                                        </p>
                                    </div>
                                    <div className="mt-4">
                                        <label className="font-bold text-lg">Task Priority</label>
                                        <p className="mt-1">
                                        <span className={
                                            "p-2 text-white rounded-lg " +
                                            [TASK_PRIORITY_CLASS_MAP[task.data.priority]]
                                        }
                                        >{TASK_PRIORITY_TEXT_MAP[task.data.priority]}</span>
                                        </p>
                                    </div>
                                    <div className="mt-4">
                                        <label className="font-bold text-lg">Created By</label>
                                        <p className="mt-1">{task.data.createdBy.name}</p>
                                    </div>
                                </div>
                                <div>
                                    <div>
                                        <label className="font-bold text-lg">Due Date</label>
                                        <p className="mt-1">{task.data.due_date}</p>
                                    </div>
                                    <div className="mt-4">
                                        <label className="font-bold text-lg">Created Date</label>
                                        <p className="mt-1">{task.data.created_at}</p>
                                    </div>
                                    <div className="mt-4">
                                        <label className="font-bold text-lg">Uploaded By</label>
                                        <p className="mt-1">{task.data.updatedBy.name}</p>
                                    </div>
                                    <div className="mt-4">
                                        <label className="font-bold text-lg">Assigned User</label>
                                        <p className="mt-1">{task.data.assignedUser.name}</p>
                                    </div>
                                    <div className="mt-4">
                                        <label className="font-bold text-lg">Project</label>
                                        <p className="mt-1 hover:underline">
                                            <Link href={route('project.show', task.data.project.id)}>
                                                {task.data.project.name}
                                            </Link>
                                        </p>
                                    </div>
                                </div>
                            </div>
                            <div className="mt-4">
                                <label className="font-bold text-lg">Description</label>
                                <p className="mt-1">{task.data.description}</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
)
}
