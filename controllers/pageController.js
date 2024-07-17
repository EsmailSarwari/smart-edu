import nodemailer from 'nodemailer';

export const getIndexpage = (req, res) => {
    console.log(req.session.userID);
    res.status(200).render('index', {
        page_name: 'index',
    });
};

export const getAboutPage = (req, res) => {
    res.status(200).render('about', {
        page_name: 'about',
    });
};

export const getContactPage = (req, res) => {
    res.status(200).render('contact', {
        page_name: 'contact',
    });
};

export const sendEmail = async (req, res) => {
    try {
        const outputMessage = `
        <h3> Name: </h3> <p> Mr. ${req.body.name} </p>
        <h3> Email: </h3> <p> ${req.body.email} </p>
    
        <h3> Message: </h3>
        <p> ${req.body.message} </p>
        
        `;

        const transporter = nodemailer.createTransport({
            host: 'smtp.ethereal.email',
            port: 587,
            auth: {
                user: 'conner.langworth@ethereal.email',
                pass: 'mVt7Nhv4nGEchSeBZU',
            },
        });

        // async..await is not allowed in global scope, must use a wrapper
        async function main() {
            // send mail with defined transport object
            const info = await transporter.sendMail({
                from: '"Maddison Foo Koch 👻" <ora.skiles@ethereal.email>', // sender address
                to: 'esmail.sarwari10@gmail.com', // list of receivers
                subject: 'SMART EDU ✔', // Subject line
                html: outputMessage, // html body
            });

            console.log('Message sent: %s', info.messageId);
            // Message sent: <d786aa62-4e0a-070a-47ed-0b0666549519@ethereal.email>
        }

        await main();

        req.flash('success', 'Your Messages has been received successfully');
        res.status(200).redirect('/contact');
    } catch (error) {
        req.flash('error', `Error occured ${error}`);
        res.status(400).redirect('/contact');
    }
};

export const getRegisterPage = (req, res) => {
    res.status(200).render('register', {
        page_name: 'register',
    });
};

export const getLoginPage = (req, res) => {
    res.status(200).render('login', {
        page_name: 'login',
    });
};
