require('pug').renderFile('./index.pug', {filters: {
    'script': (text, options) => {
        delete options.filename;
        return `<script>${
            require('uglify-js').minify(text, options).code
        }</script>`;
    },
    'style': (text, options) => `<style>${
        require('sass').renderSync(Object.assign(options, {
            data: text,
            indentedSyntax: true,
            outputStyle: 'compressed'
        })).css.toString()
    }</style>`
}}, (err, html) => {
    if (err) throw err;
    process.stdout.write(html.replace(/\r?\n/g, ' '));
});