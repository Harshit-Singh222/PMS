import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout.jsx";
import {Head, Link} from "@inertiajs/react";
import TasksTable from "@/Pages/Task/TasksTable.jsx";

export default function Index({tasks, queryPara}){

    return(
        <AuthenticatedLayout
            header={
            <div className="flex justify-between items-center">
                <h2 className="text-xl font-semibold leading-tight text-gray-800">
                    Tasks
                </h2>
                <Link href={route('task.create')} className="py-1 px-3 bg-emerald-500 text-white rounded shadow transition-all hover:bg-emerald-600" >
                    Add New
                </Link>
            </div>
            }
        >
            <Head title="Tasks" />

            <div className="py-12">
                <div className="mx-auto max-w-7xl sm:px-6 lg:px-8">
                    <div className="overflow-hidden bg-white shadow-sm sm:rounded-lg">
                        <div className="p-6 text-gray-900">
                            <TasksTable tasks={tasks} queryPara={queryPara} forwardToRoute={route('task.index')} />
                        </div>
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    )
}
