export const getIndexpage = (req, res) => {
    res.status(200).render('index', {
        page_name: 'index',
    });
};

export const getAboutPage = (req, res) => {
    res.status(200).render('about', {
        page_name: 'about',
    });
};

export const getDashboardPage = (req, res) => {
    res.status(200).render('dashboard', {
        page_name: 'dashboard',
    });
};

export const getContactPage = (req, res) => {
    res.status(200).render('contact', {
        page_name: 'contact',
    });
};