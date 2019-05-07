HeliosMask
```sh
# make sure that `yo`, `gulp` and `bower` was installed on your system using this command:
npm install --global yo gulp-cli bower

# Transform updated source written by ES2015 (default option)
gulp babel

# or Using watch to update source continuously
gulp watch

# Make a production version extension
gulp build
```

## gulp tasks

### Babel

```sh
gulp babel
```

If you would like to have a continuous transforming by babel you can use `watch` task

### Watch

```bash
gulp watch
```

You need to load/reload extension after starting `gulp watch` for Live-reload to work. 

For content scripts you need to refresh pages where it is used.

### Build and Package

It will build your app as a result you can have a distribution version of the app in `dist`. Run this command to build your Chrome Extension app.

```bash
gulp build
```

You can also distribute your project with compressed file using the Chrome Developer Dashboard at Chrome Web Store. This command will compress your app built by `gulp build` command.

```bash
gulp package
```


