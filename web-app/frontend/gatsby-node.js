const { getPages } = require(`./src/helpers/routes`);

exports.createPages = ({ actions }) => {
    const { createPage, createRedirect } = actions;
    const redirectMap = { "/home": "/" };
    for (const { page, path, link } of getPages()) {
        redirectMap[link] = path;
        createPage(page);
    }
    for (const fromPath in redirectMap) {
        createRedirect({
            fromPath,
            toPath: redirectMap[fromPath],
            redirectInBrowser: true,
            isPermanent: true,
        });
    }
};
