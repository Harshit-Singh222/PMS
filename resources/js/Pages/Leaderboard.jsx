import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import {Head, Link} from '@inertiajs/react';

export default function Leaderboard(
    {
        users,
    }) {
        return (
            <AuthenticatedLayout
                header={
                    <div className="flex justify-between items-center">
                        <h2 className="text-xl font-semibold leading-tight text-gray-800">
                            Leaderboard
                        </h2>
                        <Link href={route('task.my-tasks')}
                              className="py-1 px-3 bg-emerald-500 text-white rounded shadow transition-all hover:bg-emerald-600">
                            My Tasks
                        </Link>
                    </div>
                }
            >
                <Head title="Dashboard"/>

                <div className="py-12">
                    <div className="mx-auto max-w-7xl sm:px-6 lg:px-8">
                        <div className="overflow-hidden bg-white shadow-sm sm:rounded-lg">
                            <div className="p-6 text-gray-900">
                                <div className="relative overflow-x-auto shadow-sm sm:rounded-lg">
                                    <table className="w-full text-sm text-left rtl:text-right text-gray-500">
                                        <thead className="text-xs text-gray-700 uppercase bg-gray-50 text-center">
                                        <tr>
                                            <th scope="col" className="px-6 py-3">
                                                User Name
                                            </th>
                                            <th scope="col" className="px-6 py-3">
                                                Total Tasks
                                            </th>
                                            <th scope="col" className="px-6 py-3">
                                                Tasks Completed
                                            </th>
                                            <th scope="col" className="px-6 py-3">
                                                Points
                                            </th>
                                        </tr>
                                        </thead>
                                        <tbody>
                                        {users.data.map((user, index) =>(
                                            <tr key={index} className="odd:bg-white even:bg-gray-50 border-b border-gray-200 text-center">
                                                <th scope="row" className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap">
                                                    {user.name}
                                                </th>
                                                <td className="px-6 py-4">
                                                    {user.total_tasks}
                                                </td>
                                                <td className="px-6 py-4">
                                                    {user.completed_tasks}
                                                </td>
                                                <td className="px-6 py-4">
                                                    <div className={
                                                        user.points > 100 ? ('text-green-700') : ('text-red-700')
                                                    }>
                                                        {user.points}
                                                    </div>
                                                </td>
                                            </tr>
                                        ))}
                                        </tbody>
                                    </table>
                                </div>

                            </div>
                        </div>
                    </div>
                </div>
            </AuthenticatedLayout>
    );
}
