import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import {Head, Link} from '@inertiajs/react';
import {TASK_STATUS_CLASS_MAP, TASK_STATUS_TEXT_MAP} from "@/Pages/constants.jsx";

export default function Dashboard(
    {
        pendingTasks,
        completedTasks,
        inProgressTasks,
        tasks,
        totalInProgressTasks,
        totalPendingTasks,
        totalCompletedTasks,
    }) {
    return (
        <AuthenticatedLayout
            header={
                <h2 className="text-xl font-semibold leading-tight text-gray-800">
                    Dashboard
                </h2>
            }
        >
            <Head title="Dashboard"/>

            <div className="py-12">
                <div className="mx-auto max-w-7xl sm:px-6 lg:px-8">
                    <div className="overflow-hidden bg-white shadow-sm sm:rounded-lg">
                        <div className="p-6 text-gray-900 flex gap-4 justify-between">
                            <div className="block w-full p-6 bg-white border border-gray-200 rounded-lg shadow">
                                <h5 className="mb-2 text-2xl font-bold tracking-tight text-amber-800">Pending Tasks</h5>
                                <p className="ml-3 pt-2 font-normal text-gray-700"><span
                                    className="font-bold">{pendingTasks}</span> / {totalPendingTasks}</p>
                            </div>
                            <div className="block w-full p-6 bg-white border border-gray-200 rounded-lg shadow">
                                <h5 className="mb-2 text-2xl font-bold tracking-tight text-blue-800">In Progress
                                    Tasks</h5>
                                <p className="ml-3 pt-2 font-normal text-gray-700"><span
                                    className="font-bold">{inProgressTasks}</span> / {totalInProgressTasks}</p>
                            </div>
                            <div className="block w-full p-6 bg-white border border-gray-200 rounded-lg shadow">
                                <h5 className="mb-2 text-2xl font-bold tracking-tight text-green-800">Completed
                                    Tasks</h5>
                                <p className="ml-3 pt-2 font-normal text-gray-700"><span
                                    className="font-bold">{completedTasks}</span> / {totalCompletedTasks}</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div className="pb-12">
                <div className="mx-auto max-w-7xl sm:px-6 lg:px-8">
                    <div className="overflow-hidden bg-white shadow-sm sm:rounded-lg">
                        <div className="p-6 text-gray-900">
                            <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900">
                                Active Tasks
                            </h5>
                            <table className="mt-4 w-full text-sm text-left rtl:text-right text-gray-500">
                                <thead className="text-xs text-gray-700 uppercase bg-gray-200 border-b-2 border-gray-300">
                                    <tr className="text-nowrap">
                                        <th className="py-2 px-3">ID</th>
                                        <th className="py-2 px-3 pl-4">Project Name</th>
                                        <th className="py-2 px-3 pl-4">Name</th>
                                        <th className="py-2 px-3 pl-4">Status</th>
                                        <th className="py-2 px-3">Due Date</th>
                                    </tr>
                                </thead>
                                <tbody>
                                {tasks.data.map(task => (
                                    <tr className="bg-white border-b" key={task.id}>
                                        <td className="py-3 px-3">{task.id}</td>
                                        <td className="py-2 px-3 text-gray-900 hover:underline">
                                            <Link href={route('project.show', task.project.id)}>
                                                {task.project.name}
                                            </Link>
                                        </td>
                                        <td className="py-2 px-3 text-gray-900 hover:underline">
                                            <Link href={route('task.show', task.id)}>
                                                {task.name}
                                            </Link>
                                        </td>
                                        <td className="px-3 py-2 text-nowrap">
                                            <span className={
                                                "p-2 text-white rounded-lg " +
                                                [TASK_STATUS_CLASS_MAP[task.status]]
                                            }
                                            >{TASK_STATUS_TEXT_MAP[task.status]}</span>
                                        </td>
                                        <td className="py-2 px-3 text-nowrap">{task.due_date}</td>
                                    </tr>
                                ))}
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
);
}
