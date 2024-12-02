import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout.jsx";
import {Head, Link, useForm} from "@inertiajs/react";
import InputLabel from "@/Components/InputLabel.jsx";
import TextInput from "@/Components/TextInput.jsx";
import InputError from "@/Components/InputError.jsx";

export default function Create(){
    const {data, setData, post, errors} = useForm({
        name: '',
        email: '',
        password: '',
        password_confirmation: '',
    })
    const submit = (e) => {
        e.preventDefault();
        post(route('user.store'))
    }

    return(
        <AuthenticatedLayout
            header={
                <div className="flex justify-between items-center">
                    <h2 className="text-xl font-semibold leading-tight text-gray-800">
                        Users
                    </h2>
                </div>
            }
        >
            <Head title="Create User"/>

            <div className="py-12">
                <div className="mx-auto max-w-7xl sm:px-6 lg:px-8">
                    <div className="overflow-hidden bg-white shadow-sm sm:rounded-lg">
                        <div className="p-6 text-gray-900">
                            <form className="p-4 shadow rounded-lg"
                                onSubmit={submit}>
                                <div className="mt-4">
                                    <InputLabel htmlFor="user_name" value="User Name" />
                                    <TextInput
                                        id='user_name'
                                        name="name"
                                        value={data.name}
                                        className="mt-1 block w-full"
                                        onChange={e => {setData('name', e.target.value)}}
                                        isFocused={true} />
                                    <InputError message={errors.name} className="mt-2" />
                                </div>
                                <div className="mt-4">
                                    <InputLabel htmlFor="user_email" value="User Email" />
                                    <TextInput
                                        id='user_email'
                                        name="email"
                                        value={data.email}
                                        className="mt-1 block w-full"
                                        onChange={e => {setData('email', e.target.value)}}
                                    />
                                    <InputError message={errors.email} className="mt-2" />
                                </div>
                                <div className="mt-4">
                                    <InputLabel htmlFor="user_password" value="Password" />
                                    <TextInput
                                        id='user_password'
                                        name="password"
                                        type="password"
                                        value={data.password}
                                        className="mt-1 block w-full"
                                        onChange={e => {setData('password', e.target.value)}}
                                    />
                                    <InputError message={errors.password} className="mt-2" />
                                </div>
                                <div className="mt-4">
                                    <InputLabel htmlFor="user_password_confirmation" value="Confirm Password" />
                                    <TextInput
                                        id='user_password_confirmation'
                                        name="password_confirmation"
                                        type="password"
                                        value={data.password_confirmation}
                                        className="mt-1 block w-full"
                                        onChange={e => {setData('password_confirmation', e.target.value)}}
                                    />
                                    <InputError message={errors.password_confirmation} className="mt-2" />
                                </div>
                                <div className="mt-4 text-right">
                                    <Link href={route('user.index')} className="m-2 bg-gray-100 py-1 px-3 text-gray-800 rounded shadow transition-all hover:bg-gray-200">
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
