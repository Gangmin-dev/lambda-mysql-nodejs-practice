let template = {
  html: (title, list, control) => {
    return `
        <!doctype html>
        <html>
        <head>
            <title>${title}</title>
            <meta charset="utf-8">
        </head>
        <body>
        <h1><a href="/">HOME</a></h1>
        <a href="/class">class</a>
            ${list}
            ${control}
        </body>
        </html>
    `;
  },

  list: (elements) => {
    let list = "<ul>";
    for (let i = 0; i < elements.length; i++) {
      list = list + `<li><a href="">${elements[i].name}</a></li>`;
    }
    list = list + "</ul>";
    return list;
  },
};

module.exports = template;
