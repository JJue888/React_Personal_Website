import {useParams} from "react-router";
// @ts-ignore
import { PROJECT_DATA } from "~/data/projects";

function ProjectDetails() {
    const params = useParams();
    const foundProject : { title: string; description: string[], image: string[]; } = PROJECT_DATA.find((project: { title: string | undefined; })   => project.title === params.projectTitle);
    return (
        <>
            <h1>Projects</h1>
            <p>{params.projectTitle}</p>
            <img src={foundProject.image[0]} alt={params.projectTitle} />
            <ul>
                {foundProject.description.map((description: string, index: number) => (
                    <p key={index}>{description}</p>
                ))}
            </ul>
        </>)
}

export default ProjectDetails;