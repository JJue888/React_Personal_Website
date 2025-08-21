import { jsx, jsxs, Fragment } from "react/jsx-runtime";
import { PassThrough } from "node:stream";
import { createReadableStreamFromReadable } from "@react-router/node";
import { ServerRouter, NavLink, UNSAFE_withComponentProps, Outlet, UNSAFE_withErrorBoundaryProps, isRouteErrorResponse, Meta, Links, ScrollRestoration, Scripts, Link, useParams } from "react-router";
import { isbot } from "isbot";
import { renderToPipeableStream } from "react-dom/server";
import { useState, useEffect } from "react";
import { FaBars, FaTimes } from "react-icons/fa";
const streamTimeout = 5e3;
function handleRequest(request, responseStatusCode, responseHeaders, routerContext, loadContext) {
  return new Promise((resolve, reject) => {
    let shellRendered = false;
    let userAgent = request.headers.get("user-agent");
    let readyOption = userAgent && isbot(userAgent) || routerContext.isSpaMode ? "onAllReady" : "onShellReady";
    const { pipe, abort } = renderToPipeableStream(
      /* @__PURE__ */ jsx(ServerRouter, { context: routerContext, url: request.url }),
      {
        [readyOption]() {
          shellRendered = true;
          const body = new PassThrough();
          const stream = createReadableStreamFromReadable(body);
          responseHeaders.set("Content-Type", "text/html");
          resolve(
            new Response(stream, {
              headers: responseHeaders,
              status: responseStatusCode
            })
          );
          pipe(body);
        },
        onShellError(error) {
          reject(error);
        },
        onError(error) {
          responseStatusCode = 500;
          if (shellRendered) {
            console.error(error);
          }
        }
      }
    );
    setTimeout(abort, streamTimeout + 1e3);
  });
}
const entryServer = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: handleRequest,
  streamTimeout
}, Symbol.toStringTag, { value: "Module" }));
const navLinks = [
  { title: "Home", href: "/" },
  { title: "About", href: "/about" },
  { title: "Projects", href: "/projects" },
  { title: "Experiences", href: "/experiences" },
  { title: "Contact", href: "/contact" }
];
const modalColor = "bg-gray-900";
const NavBar = () => {
  const [isMobile, setIsMobile] = useState(() => {
    if (typeof window !== "undefined") {
      return window.innerWidth <= 769;
    }
    return false;
  });
  const [showModal, setShowModal] = useState(false);
  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth <= 769);
    };
    if (typeof window !== "undefined") {
      window.addEventListener("resize", handleResize);
    }
    return () => {
      if (typeof window !== "undefined") {
        window.removeEventListener("resize", handleResize);
      }
    };
  }, []);
  const toggleModal = () => {
    setIsMobile(!isMobile);
  };
  const handleBarsIconClick = () => {
    toggleModal();
  };
  return /* @__PURE__ */ jsx("header", { children: !isMobile ? (
    // Laptop Navbar Code Here
    /* @__PURE__ */ jsx("nav", { className: `relative bg-gray-800/50 after:pointer-events-none after:absolute after:inset-x-0 after:bottom-0 after:h-px after:bg-white/10`, children: /* @__PURE__ */ jsxs("div", { className: "flex justify-center mx-auto items-center py-4 px-24", children: [
      /* @__PURE__ */ jsx("ul", { className: "flex gap-8 md:gap-16 items-center justify-center text-center cursor-pointer", children: navLinks.map((link, index2) => /* @__PURE__ */ jsx(NavLink, { to: link.href, className: "text-white text-sm", children: link.title }, index2)) }),
      /* @__PURE__ */ jsx("ul", { className: "flex text-white gap-6 items-center cursor-pointer" })
    ] }) })
  ) : (
    // Mobile Navbar Code Here
    /* @__PURE__ */ jsxs("nav", { className: `relative bg-gray-800/50 after:pointer-events-none after:absolute after:inset-x-0 after:bottom-0 after:h-px after:bg-white/10 py-4 px-4`, children: [
      /* @__PURE__ */ jsx("div", { className: "mx-auto flex justify-between items-center ", children: /* @__PURE__ */ jsx("div", { className: "flex justify-end items-center gap-6 text-white cursor-pointer", children: /* @__PURE__ */ jsx(FaBars, { onClick: handleBarsIconClick, className: "text-white cursor-pointer" }) }) }),
      showModal && /* @__PURE__ */ jsxs("div", { className: "fixed inset-0 flex justify-center items-center", children: [
        /* @__PURE__ */ jsx("div", { className: `absolute inset-0 ${modalColor}` }),
        /* @__PURE__ */ jsx(
          FaTimes,
          {
            className: "absolute top-6 right-4 text-white cursor-pointer",
            onClick: toggleModal,
            style: { fontSize: "16px" }
          }
        ),
        /* @__PURE__ */ jsx("div", { className: "relative bg-gray-900 w-full", children: /* @__PURE__ */ jsx("div", { className: "flex flex-col gap-8 items-center justify-center h-full", children: navLinks.map((link, index2) => /* @__PURE__ */ jsx(NavLink, { to: link.href, className: "text-white font-light text-2xl cursor-pointer", children: link.title }, index2)) }) })
      ] })
    ] })
  ) });
};
const links = () => [{
  rel: "preconnect",
  href: "https://fonts.googleapis.com"
}, {
  rel: "preconnect",
  href: "https://fonts.gstatic.com",
  crossOrigin: "anonymous"
}, {
  rel: "stylesheet",
  href: "https://fonts.googleapis.com/css2?family=Inter:ital,opsz,wght@0,14..32,100..900;1,14..32,100..900&display=swap"
}];
function Layout({
  children
}) {
  return /* @__PURE__ */ jsxs("html", {
    lang: "en",
    className: "bg-white",
    children: [/* @__PURE__ */ jsxs("head", {
      children: [/* @__PURE__ */ jsx("meta", {
        charSet: "utf-8"
      }), /* @__PURE__ */ jsx("meta", {
        name: "viewport",
        content: "width=device-width, initial-scale=1"
      }), /* @__PURE__ */ jsx(Meta, {}), /* @__PURE__ */ jsx(Links, {})]
    }), /* @__PURE__ */ jsxs("body", {
      children: [children, /* @__PURE__ */ jsx(ScrollRestoration, {}), /* @__PURE__ */ jsx(Scripts, {})]
    })]
  });
}
const root = UNSAFE_withComponentProps(function App() {
  return /* @__PURE__ */ jsxs(Fragment, {
    children: [/* @__PURE__ */ jsx(NavBar, {}), /* @__PURE__ */ jsx("main", {
      children: /* @__PURE__ */ jsx(Outlet, {})
    })]
  });
});
const ErrorBoundary = UNSAFE_withErrorBoundaryProps(function ErrorBoundary2({
  error
}) {
  let message = "Oops!";
  let details = "An unexpected error occurred.";
  let stack;
  if (isRouteErrorResponse(error)) {
    message = error.status === 404 ? "404" : "Error";
    details = error.status === 404 ? "The requested page could not be found." : error.statusText || details;
  }
  return /* @__PURE__ */ jsxs("main", {
    className: "pt-16 p-4 container mx-auto",
    children: [/* @__PURE__ */ jsx("h1", {
      children: message
    }), /* @__PURE__ */ jsx("p", {
      children: details
    }), stack]
  });
});
const route0 = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  ErrorBoundary,
  Layout,
  default: root,
  links
}, Symbol.toStringTag, { value: "Module" }));
const route1 = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null
}, Symbol.toStringTag, { value: "Module" }));
function HomePage() {
  return /* @__PURE__ */ jsx(Fragment, {
    children: /* @__PURE__ */ jsx("h1", {
      children: "Welcome to my page"
    })
  });
}
const index = UNSAFE_withComponentProps(HomePage);
const route2 = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: index
}, Symbol.toStringTag, { value: "Module" }));
const MeImg = "/assets/juejw-qPB0FZQg.jpg";
function About() {
  return /* @__PURE__ */ jsx(Fragment, {
    children: /* @__PURE__ */ jsxs("div", {
      className: "flex flex-row justify-around items-center p-[2.5%]",
      children: [/* @__PURE__ */ jsx("div", {
        children: /* @__PURE__ */ jsx("img", {
          src: MeImg,
          alt: "me"
        })
      }), /* @__PURE__ */ jsxs("div", {
        className: "pl-[5%] flex items-start flex-col",
        children: [/* @__PURE__ */ jsx("h2", {
          className: "text-2xl text-center pb-[5%] text-black",
          children: "About Me"
        }), /* @__PURE__ */ jsx("p", {
          className: "text-black",
          children: "Hi, welcome to my website. I'm Joshua Jue, a Junior Computer Science and Software Engineering major at Rose-Hulman Institute of Technology. I'm interested in a variety of topics in Computer Science. Feel free to look around my projects and reach out to me!"
        })]
      })]
    })
  });
}
const about = UNSAFE_withComponentProps(About);
const route3 = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: about
}, Symbol.toStringTag, { value: "Module" }));
const WorkDisplay = ({ title, image }) => {
  return /* @__PURE__ */ jsx(Fragment, { children: /* @__PURE__ */ jsxs("div", { className: "", children: [
    /* @__PURE__ */ jsx("img", { src: image[0], alt: title }),
    /* @__PURE__ */ jsx("p", { className: "text-white text-center pt-2", children: title })
  ] }) });
};
const webmasterImage = "/assets/webmaster1-CxmLVhmp.png";
const EXPERIENCE_DATA = [
  {
    title: "Chinatown Community Development Center Intern",
    description: [],
    image: []
  },
  {
    title: "Delta Sigma Phi Webmaster",
    description: [
      "I am the Webmaster for the Delta Sigma Phi Zeta Lambda Chapter. My responsibilities include giving weekly reports on what I am working on, updating the website to be more relevant, and adding new features based on current needs.",
      "Through this role, I have experimented with different ways of displaying information and trying to improve user experience. This has allowed me to have a more in-depth understanding of what goes into creating and maintaining a website.",
      "Recently, I was tasked with finding a way to display all of the past composites to allow alumni to view them. To create this page, I developed different methods in JavaScript to build each part of the page. This allowed me to keep the code organized by having each method build off the other and helped me learn more about JavaScript. To display the composite in full screen, I used modal contents with onclick functions."
    ],
    image: [webmasterImage]
  }
];
function Experiences() {
  return /* @__PURE__ */ jsx(Fragment, {
    children: /* @__PURE__ */ jsxs("div", {
      children: [/* @__PURE__ */ jsx("header", {
        className: "w-full py-6 text-center  dark:bg-gray-950",
        children: /* @__PURE__ */ jsx("h1", {
          className: "text-3xl font-bold text-black dark:text-white",
          children: "Projects"
        })
      }), /* @__PURE__ */ jsx("div", {
        children: /* @__PURE__ */ jsx("ul", {
          className: "flex flex-wrap gap-4 justify-evenly pb-2",
          children: EXPERIENCE_DATA.map((project) => /* @__PURE__ */ jsx("li", {
            className: "w-[40vw] bg-gray-950 p-4 rounded-lg shadow-md",
            children: /* @__PURE__ */ jsx(Link, {
              to: project.title,
              children: /* @__PURE__ */ jsx(WorkDisplay, {
                ...project
              })
            })
          }, project.title))
        })
      })]
    })
  });
}
const experiences = UNSAFE_withComponentProps(Experiences);
const route4 = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: experiences
}, Symbol.toStringTag, { value: "Module" }));
function ExperienceDetails() {
  return /* @__PURE__ */ jsx("h1", {
    children: "Experience"
  });
}
const experienceDetails = UNSAFE_withComponentProps(ExperienceDetails);
const route5 = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: experienceDetails
}, Symbol.toStringTag, { value: "Module" }));
const garpImage = "/assets/Garp1-Bimb_f23.gif";
const airplaneImage = "/assets/airport_database-CZ9hV-uw.PNG";
const scheduleImage = "/assets/Schedule_img-BnP0Qdbh.PNG";
const sevenWondersImage = "/assets/SevenWonders-C1AS5LVY.png";
const mediaDataImage = "/assets/books-BMuxnu9X.PNG";
const PROJECT_DATA = [
  {
    title: "Seven Wonders",
    description: [],
    image: [sevenWondersImage]
  },
  {
    title: "Media Rating and Recommendation Manager",
    description: [],
    image: [mediaDataImage]
  },
  {
    title: "Airport and Airplane Database",
    description: [
      "For my Introduction to Databases class, I worked on a project with a partner to create a database in Microsoft SQL Server and develop an application to interact with the database. My partner and I decided to make a rating system for airports and airlines using a Java application.",
      "To populate the database with info, I exported data from Wikipedia into an Excel document. Using Apache POI and SQL stored procedures, I wrote a script to import data from Excel documents into the database.",
      "With my partner, I worked on writing queries to create tables to store information within the database. I also wrote stored procedures to allow us to add, delete, and modify information in the database. I also wrote views that ensured a user could only access their information.",
      "The Java application that we created contains login, search, review, and reply features. First, a user has the option to log in to an existing account or create a new account. Rather than storing passwords in plain text, a password is salted using a hash, and the salted password with the hash is stored in the database. Next, a user can access either the airport or airline table and is able to make more specific queries. These queries are done using prepared statements to prevent SQL injection attacks. After selecting something to rate, a user is presented with all existing reviews with the option to add a new review or reply to a review."
    ],
    image: [airplaneImage]
  },
  {
    title: "Schedule Planner",
    description: [
      "For my Introduction to Web Design final project, I worked with a partner to develop a web application that allows a user to create and customize various schedules based on their major at Rose-Hulman.",
      "The main functionality of the application was accomplished using a combination of Bootstrap cards and the Firestore database. The preset schedules were stored within a collection in Firestore with hashmaps and arrays and were displayed using interactive Bootstrap cards. A user had the option to save a schedule that would be stored in another Firestore collection. They would then be able to edit and delete the schedules that had been created by the user.",
      "Additionally, we implemented an authentication system that included both Firebase authentication and Rose-Hulman’s unique authentication. This allowed us to ensure a users would only be able to edit their own schedules by using the authentication to give a user a unique ID."
    ],
    image: [scheduleImage]
  },
  {
    title: "Genetic Algorithm Research Project",
    description: [
      "For my Introduction to Object-Oriented Programming final project, I worked with a team to develop a GUI that simulated the evolution of a population over generations using Java. Throughout this project, I practiced pair programming and got comfortable coding in a group environment.",
      "We used various JFrames to display the different aspects of the project such as the current population and the object in the population that fits whatever arbitrary criteria set. Additionally, we created an interactive graph that allowed a user to input different settings into the graph. This allowed us to visualize how each setting impacted the evolution of the population. One example of this would be a population that used truncation and had crossover.",
      "To wrap up the project, we created a presentation and paper to show our findings. We conducted various experiments using our GUI to see how various factors impacted the evolution of the population. We presented our findings to the class and successfully completed this project."
    ],
    image: [garpImage]
  }
];
function Projects() {
  return /* @__PURE__ */ jsx(Fragment, {
    children: /* @__PURE__ */ jsxs("div", {
      children: [/* @__PURE__ */ jsx("header", {
        className: "w-full py-6 text-center  dark:bg-gray-950",
        children: /* @__PURE__ */ jsx("h1", {
          className: "text-3xl font-bold text-black dark:text-white",
          children: "Projects"
        })
      }), /* @__PURE__ */ jsx("div", {
        children: /* @__PURE__ */ jsx("ul", {
          className: "flex flex-wrap gap-4 justify-evenly pb-2",
          children: PROJECT_DATA.map((project) => /* @__PURE__ */ jsx("li", {
            className: "w-[40vw] bg-gray-950 p-4 rounded-lg shadow-md",
            children: /* @__PURE__ */ jsx(Link, {
              to: project.title,
              children: /* @__PURE__ */ jsx(WorkDisplay, {
                ...project
              })
            })
          }, project.title))
        })
      })]
    })
  });
}
const projects = UNSAFE_withComponentProps(Projects);
const route6 = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: projects
}, Symbol.toStringTag, { value: "Module" }));
function ProjectDetails() {
  const params = useParams();
  const foundProject = PROJECT_DATA.find((project) => project.title === params.projectTitle);
  return /* @__PURE__ */ jsxs(Fragment, {
    children: [/* @__PURE__ */ jsx("h1", {
      children: "Projects"
    }), /* @__PURE__ */ jsx("p", {
      children: params.projectTitle
    }), /* @__PURE__ */ jsx("img", {
      src: foundProject.image[0],
      alt: params.projectTitle
    }), /* @__PURE__ */ jsx("ul", {
      children: foundProject.description.map((description, index2) => /* @__PURE__ */ jsx("p", {
        children: description
      }, index2))
    })]
  });
}
const projectDetails = UNSAFE_withComponentProps(ProjectDetails);
const route7 = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: projectDetails
}, Symbol.toStringTag, { value: "Module" }));
const textCss = "p-2";
function Contact() {
  return /* @__PURE__ */ jsx(Fragment, {
    children: /* @__PURE__ */ jsxs("div", {
      id: "Contact",
      className: "extra",
      children: [/* @__PURE__ */ jsx("h2", {
        className: "text-2xl text-center pb-8 pt-4",
        children: "Contact Info"
      }), /* @__PURE__ */ jsxs("ul", {
        className: "",
        children: [/* @__PURE__ */ jsx("li", {
          className: textCss,
          children: /* @__PURE__ */ jsxs("p", {
            children: ["Email:", /* @__PURE__ */ jsx("a", {
              href: "mailto:joshuajue888@gmail.com",
              children: "joshuajue888@gmail.com"
            })]
          })
        }), /* @__PURE__ */ jsx("li", {
          className: textCss,
          children: /* @__PURE__ */ jsxs("p", {
            children: ["LinkedIn:", /* @__PURE__ */ jsx("a", {
              className: "contact",
              href: "https://www.linkedin.com/in/josh-j-100147191/",
              children: "here"
            })]
          })
        }), /* @__PURE__ */ jsx("li", {
          className: textCss,
          children: /* @__PURE__ */ jsxs("p", {
            children: ["GitHub:", /* @__PURE__ */ jsx("a", {
              className: "contact",
              href: "https://github.com/JJue888",
              children: "here"
            })]
          })
        })]
      })]
    })
  });
}
const contact = UNSAFE_withComponentProps(Contact);
const route8 = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: contact
}, Symbol.toStringTag, { value: "Module" }));
const serverManifest = { "entry": { "module": "/assets/entry.client-x4N6jJuf.js", "imports": ["/assets/rootLayout-CdUO1L-D.js", "/assets/chunk-UH6JLGW7-Co_dqqgC.js"], "css": [] }, "routes": { "root": { "id": "root", "parentId": void 0, "path": "", "index": void 0, "caseSensitive": void 0, "hasAction": false, "hasLoader": false, "hasClientAction": false, "hasClientLoader": false, "hasClientMiddleware": false, "hasErrorBoundary": true, "module": "/assets/root-CVCGz4rO.js", "imports": ["/assets/rootLayout-CdUO1L-D.js", "/assets/chunk-UH6JLGW7-Co_dqqgC.js"], "css": ["/assets/root-C8g6pnnu.css"], "clientActionModule": void 0, "clientLoaderModule": void 0, "clientMiddlewareModule": void 0, "hydrateFallbackModule": void 0 }, "routes/rootLayout": { "id": "routes/rootLayout", "parentId": "root", "path": "/", "index": void 0, "caseSensitive": void 0, "hasAction": false, "hasLoader": false, "hasClientAction": false, "hasClientLoader": false, "hasClientMiddleware": false, "hasErrorBoundary": false, "module": "/assets/rootLayout-CdUO1L-D.js", "imports": [], "css": [], "clientActionModule": void 0, "clientLoaderModule": void 0, "clientMiddlewareModule": void 0, "hydrateFallbackModule": void 0 }, "routes/index": { "id": "routes/index", "parentId": "routes/rootLayout", "path": void 0, "index": true, "caseSensitive": void 0, "hasAction": false, "hasLoader": false, "hasClientAction": false, "hasClientLoader": false, "hasClientMiddleware": false, "hasErrorBoundary": false, "module": "/assets/index-D8b11UaV.js", "imports": ["/assets/chunk-UH6JLGW7-Co_dqqgC.js", "/assets/rootLayout-CdUO1L-D.js"], "css": [], "clientActionModule": void 0, "clientLoaderModule": void 0, "clientMiddlewareModule": void 0, "hydrateFallbackModule": void 0 }, "routes/about": { "id": "routes/about", "parentId": "routes/rootLayout", "path": "about", "index": void 0, "caseSensitive": void 0, "hasAction": false, "hasLoader": false, "hasClientAction": false, "hasClientLoader": false, "hasClientMiddleware": false, "hasErrorBoundary": false, "module": "/assets/about-C_RWo9UD.js", "imports": ["/assets/chunk-UH6JLGW7-Co_dqqgC.js", "/assets/rootLayout-CdUO1L-D.js"], "css": [], "clientActionModule": void 0, "clientLoaderModule": void 0, "clientMiddlewareModule": void 0, "hydrateFallbackModule": void 0 }, "routes/experiences": { "id": "routes/experiences", "parentId": "routes/rootLayout", "path": "experiences", "index": void 0, "caseSensitive": void 0, "hasAction": false, "hasLoader": false, "hasClientAction": false, "hasClientLoader": false, "hasClientMiddleware": false, "hasErrorBoundary": false, "module": "/assets/experiences-CGszi5_N.js", "imports": ["/assets/chunk-UH6JLGW7-Co_dqqgC.js", "/assets/rootLayout-CdUO1L-D.js", "/assets/WorkDisplay-BxAYe6dv.js"], "css": [], "clientActionModule": void 0, "clientLoaderModule": void 0, "clientMiddlewareModule": void 0, "hydrateFallbackModule": void 0 }, "routes/experienceDetails": { "id": "routes/experienceDetails", "parentId": "routes/rootLayout", "path": "experiences/:experienceTitle", "index": void 0, "caseSensitive": void 0, "hasAction": false, "hasLoader": false, "hasClientAction": false, "hasClientLoader": false, "hasClientMiddleware": false, "hasErrorBoundary": false, "module": "/assets/experienceDetails-CyHMe04J.js", "imports": ["/assets/chunk-UH6JLGW7-Co_dqqgC.js", "/assets/rootLayout-CdUO1L-D.js"], "css": [], "clientActionModule": void 0, "clientLoaderModule": void 0, "clientMiddlewareModule": void 0, "hydrateFallbackModule": void 0 }, "routes/projects": { "id": "routes/projects", "parentId": "routes/rootLayout", "path": "projects", "index": void 0, "caseSensitive": void 0, "hasAction": false, "hasLoader": false, "hasClientAction": false, "hasClientLoader": false, "hasClientMiddleware": false, "hasErrorBoundary": false, "module": "/assets/projects-CjVKVQwR.js", "imports": ["/assets/chunk-UH6JLGW7-Co_dqqgC.js", "/assets/rootLayout-CdUO1L-D.js", "/assets/projects-BOpeHbHM.js", "/assets/WorkDisplay-BxAYe6dv.js"], "css": [], "clientActionModule": void 0, "clientLoaderModule": void 0, "clientMiddlewareModule": void 0, "hydrateFallbackModule": void 0 }, "routes/projectDetails": { "id": "routes/projectDetails", "parentId": "routes/rootLayout", "path": "projects/:projectTitle", "index": void 0, "caseSensitive": void 0, "hasAction": false, "hasLoader": false, "hasClientAction": false, "hasClientLoader": false, "hasClientMiddleware": false, "hasErrorBoundary": false, "module": "/assets/projectDetails-Dwa75EFI.js", "imports": ["/assets/chunk-UH6JLGW7-Co_dqqgC.js", "/assets/rootLayout-CdUO1L-D.js", "/assets/projects-BOpeHbHM.js"], "css": [], "clientActionModule": void 0, "clientLoaderModule": void 0, "clientMiddlewareModule": void 0, "hydrateFallbackModule": void 0 }, "routes/contact": { "id": "routes/contact", "parentId": "routes/rootLayout", "path": "contact", "index": void 0, "caseSensitive": void 0, "hasAction": false, "hasLoader": false, "hasClientAction": false, "hasClientLoader": false, "hasClientMiddleware": false, "hasErrorBoundary": false, "module": "/assets/contact-h9O3gouw.js", "imports": ["/assets/chunk-UH6JLGW7-Co_dqqgC.js", "/assets/rootLayout-CdUO1L-D.js"], "css": [], "clientActionModule": void 0, "clientLoaderModule": void 0, "clientMiddlewareModule": void 0, "hydrateFallbackModule": void 0 } }, "url": "/assets/manifest-1e64bc5e.js", "version": "1e64bc5e", "sri": void 0 };
const assetsBuildDirectory = "build\\client";
const basename = "/";
const future = { "unstable_middleware": false, "unstable_optimizeDeps": false, "unstable_splitRouteModules": false, "unstable_subResourceIntegrity": false, "unstable_viteEnvironmentApi": false };
const ssr = true;
const isSpaMode = false;
const prerender = [];
const routeDiscovery = { "mode": "lazy", "manifestPath": "/__manifest" };
const publicPath = "/";
const entry = { module: entryServer };
const routes = {
  "root": {
    id: "root",
    parentId: void 0,
    path: "",
    index: void 0,
    caseSensitive: void 0,
    module: route0
  },
  "routes/rootLayout": {
    id: "routes/rootLayout",
    parentId: "root",
    path: "/",
    index: void 0,
    caseSensitive: void 0,
    module: route1
  },
  "routes/index": {
    id: "routes/index",
    parentId: "routes/rootLayout",
    path: void 0,
    index: true,
    caseSensitive: void 0,
    module: route2
  },
  "routes/about": {
    id: "routes/about",
    parentId: "routes/rootLayout",
    path: "about",
    index: void 0,
    caseSensitive: void 0,
    module: route3
  },
  "routes/experiences": {
    id: "routes/experiences",
    parentId: "routes/rootLayout",
    path: "experiences",
    index: void 0,
    caseSensitive: void 0,
    module: route4
  },
  "routes/experienceDetails": {
    id: "routes/experienceDetails",
    parentId: "routes/rootLayout",
    path: "experiences/:experienceTitle",
    index: void 0,
    caseSensitive: void 0,
    module: route5
  },
  "routes/projects": {
    id: "routes/projects",
    parentId: "routes/rootLayout",
    path: "projects",
    index: void 0,
    caseSensitive: void 0,
    module: route6
  },
  "routes/projectDetails": {
    id: "routes/projectDetails",
    parentId: "routes/rootLayout",
    path: "projects/:projectTitle",
    index: void 0,
    caseSensitive: void 0,
    module: route7
  },
  "routes/contact": {
    id: "routes/contact",
    parentId: "routes/rootLayout",
    path: "contact",
    index: void 0,
    caseSensitive: void 0,
    module: route8
  }
};
export {
  serverManifest as assets,
  assetsBuildDirectory,
  basename,
  entry,
  future,
  isSpaMode,
  prerender,
  publicPath,
  routeDiscovery,
  routes,
  ssr
};
