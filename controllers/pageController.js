export const getIndexpage = (req, res) => {
    res.status(200).render('index');
};

export const getAboutPage = (req, res) => {
    res.status(200).render('about');
};
