import MeImg from '../assets/me/juejw.jpg'

function About() {
    return (
        <>
            <div className="flex flex-row justify-around items-center pt-[2.5%] items-start">
                <div>
                    <img src={MeImg} alt="me" />
                </div>
                <div className="pl-[5%] flex items-start flex-col items-center">
                    <h2 className="text-2xl text-center pb-[5%]">About Me</h2>
                    <p>Hi, welcome to my website. I'm Joshua Jue, a Junior Computer Science and Software Engineering major at Rose-Hulman Institute of
                        Technology. I'm interested in a variety of topics in Computer Science. Feel free to look around my projects
                        and reach out to me!
                    </p>
                </div>
            </div>
        </>
    )
}

export default About;