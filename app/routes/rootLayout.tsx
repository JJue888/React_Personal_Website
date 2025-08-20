import {Outlet} from "react-router";
import NavBar from "~/components/NavBar";

function RootLayout() {
    return (
        <>
            <NavBar />
            <main>
                <Outlet />
            </main>
        </>
    )
}