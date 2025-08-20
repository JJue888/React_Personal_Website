import {Link} from "react-router";
import WorkDisplay from "~/components/WorkDisplay";
// @ts-ignore
import { EXPERIENCE_DATA } from "~/data/experience.js";

function Experiences() {

    return (
        <>
            <div>
                <header className="w-full py-6 text-center  dark:bg-gray-950">
                    <h1 className="text-3xl font-bold text-black dark:text-white">Projects</h1>
                </header>
                <div>
                    <ul className="flex flex-wrap gap-4 justify-evenly pb-2">
                        {EXPERIENCE_DATA.map((project: { title: string; image: string[]; }) => (
                            <li key={project.title} className="w-[40vw] bg-gray-950 p-4 rounded-lg shadow-md">
                                <Link to={project.title}>
                                    <WorkDisplay {...project} />
                                </Link>
                            </li>
                        ))}
                    </ul>
                </div>
            </div>
        </>
    )
}

export default Experiences;