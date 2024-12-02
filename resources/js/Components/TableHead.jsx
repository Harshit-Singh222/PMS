import ChevronUp from "@/Components/ChevronUp.jsx";
import ChevronDown from "@/Components/ChevronDown.jsx";

export default function TableHead({sort_field, sort_dir, sortChanged, name, children}){
    return (
        <th onClick={e => { sortChanged(name) }}
            className="px-3 py-2 cursor-pointer">
            <div className="flex justify-between items-center gap-2">
                {children}
                <span>
                    <ChevronUp className={
                        ("w-4 ") +
                        (sort_field === name && sort_dir === "asc" ? 'text-blue-500' : '')
                    }/>
                    <ChevronDown className={
                        ("w-4 -mt-1.5 ") +
                        (sort_field === name && sort_dir === "desc" ? 'text-blue-500' : '')
                    }/>
                </span>
            </div>
        </th>
    )
}
