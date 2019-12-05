const makePagination = (page: number, amountOfPages: number, dotsDistance: number = 3, aroundPage: number = 2): any[] => {
    let paginatorMin = 1;
    let paginatorMax = amountOfPages;
    const pages = [];

    if (page > dotsDistance) {
        paginatorMin = page - aroundPage;
    }

    if (page <= amountOfPages - dotsDistance) {
        paginatorMax = page + aroundPage;
    }

    for (let i = paginatorMin; i <= paginatorMax; i++) {
        pages.push(i);
    }

    if (page > dotsDistance) {
        pages.unshift(1, '...');
    }

    if (page <= amountOfPages - dotsDistance) {
        pages.push('...', amountOfPages);
    }

    return pages;
};

export default makePagination;
