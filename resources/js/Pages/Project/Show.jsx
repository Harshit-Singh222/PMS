import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout.jsx";
import {Head, Link} from "@inertiajs/react";
import {PROJECT_STATUS_CLASS_MAP, PROJECT_STATUS_TEXT_MAP} from "@/Pages/constants.jsx";
import TasksTable from "@/Pages/Task/TasksTable.jsx";

export default function Show({project, queryPara, tasks}){
    return(
        <AuthenticatedLayout
            header={
            <div className="flex justify-between items-center">
                <h2 className="text-xl font-semibold leading-tight text-gray-800">
                    {`Projects "${project.name}"`}
                </h2>
                <Link href={route('project.edit', project.id)} className="py-1 px-3 bg-amber-600 text-white rounded shadow transition-all hover:bg-amber-500" >
                    Edit
                </Link>
            </div>
            }
        >
            <Head title="Projects"/>

            <div className="py-12">
                <div className="mx-auto max-w-7xl sm:px-6 lg:px-8">
                    <div className="overflow-hidden bg-white shadow-sm sm:rounded-lg">
                        <div>
                            <img src={project.image_path}
                                 alt=""
                                 className="w-full h-64 object-cover"/>
                        </div>
                        <div className="p-6 text-gray-900">
                            <div className="grid gap-1 grid-cols-2">
                                <div>
                                    <div>
                                        <label className="font-bold text-lg">Project ID</label>
                                        <p className="mt-1">{project.id}</p>
                                    </div>
                                    <div className="mt-4">
                                        <label className="font-bold text-lg">Project Name</label>
                                        <p className="mt-1">{project.name}</p>
                                    </div>
                                    <div className="mt-4">
                                        <label className="font-bold text-lg">Project Status</label>
                                        <p className="mt-1">
                                        <span className={
                                            "p-2 text-white rounded-lg " +
                                            [PROJECT_STATUS_CLASS_MAP[project.status]]
                                        }
                                        >{PROJECT_STATUS_TEXT_MAP[project.status]}</span>
                                        </p>
                                    </div>
                                    <div className="mt-4">
                                        <label className="font-bold text-lg">Created By</label>
                                        <p className="mt-1">{project.createdBy.name}</p>
                                    </div>
                                </div>
                                <div>
                                    <div>
                                        <label className="font-bold text-lg">Due Date</label>
                                        <p className="mt-1">{project.due_date}</p>
                                    </div>
                                    <div className="mt-4">
                                        <label className="font-bold text-lg">Created Date</label>
                                        <p className="mt-1">{project.created_at}</p>
                                    </div>
                                    <div className="mt-4">
                                        <label className="font-bold text-lg">Uploaded By</label>
                                        <p className="mt-1">{project.updatedBy.name}</p>
                                    </div>
                                </div>
                            </div>
                            <div className="mt-4">
                                <label className="font-bold text-lg">Description</label>
                                <p className="mt-1">{project.description}</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div className="pb-12">
                <div className="mx-auto max-w-7xl sm:px-6 lg:px-8">
                    <div className="overflow-hidden bg-white shadow-sm sm:rounded-lg">
                        <div className="p-6 text-gray-900">
                            <TasksTable tasks={tasks} queryPara={queryPara} hideProjectName={true} />
                        </div>
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
)
}
