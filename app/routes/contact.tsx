const textCss = "p-2";

function Contact() {
    return (
        <>
            <div id="Contact" className="extra">
                <h2 className="text-2xl text-center pb-8 pt-4">Contact Info</h2>
                <ul className="">
                    <li className={textCss}>
                        <p>Email:
                            <a href="mailto:joshuajue888@gmail.com">joshuajue888@gmail.com</a>
                        </p>
                    </li>
                    <li className={textCss}>
                        <p>LinkedIn:
                            <a className="contact" href="https://www.linkedin.com/in/josh-j-100147191/">here</a>
                        </p>
                    </li>
                    <li className={textCss}>
                        <p>GitHub:
                            <a className="contact" href="https://github.com/JJue888">here</a>
                        </p>
                    </li>
                </ul>
            </div>
        </>
    )
}

export default Contact;