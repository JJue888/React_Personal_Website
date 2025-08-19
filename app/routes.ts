import {type RouteConfig, index, route} from "@react-router/dev/routes";


export default [
    route("/", "./routes/rootLayout.tsx", [
        index("routes/index.tsx"),
        route("about", "./routes/about.tsx"),
        route("experiences", "./routes/experiences.tsx", [
            route(":experienceId", "./routes/experienceDetails.tsx"),
        ]),
        route("projects", "./routes/projects.tsx", [
            route(":projectId", "./routes/projectDetails.tsx"),
        ]),
        route("contact", "./routes/contact.tsx"),
    ])
] satisfies RouteConfig;
