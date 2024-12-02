import {Link} from "@inertiajs/react";

export default function Pagination({links}){
    return(
        <nav className="mt-4 text-center">
            {links.map(link => (
                <Link
                    preserveScroll
                    href={link.url ?? ""}
                    key={link.label}
                    className={
                    "inline-block py-2 px-3 rounded-lg text-gray-500 text-sm " +
                    (link.active ? "bg-gray-950 text-gray-200 " : " ") +
                    (!link.url ? "text-gray-400 cursor-not-allowed " : "hover:bg-gray-950 hover:text-gray-200 hover:underline")
                }
                    dangerouslySetInnerHTML={{__html: link.label}}></Link>
            ))}
        </nav>
    )
}
