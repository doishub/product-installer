<img src="./docs/logo.svg" width="100%" alt="Product Installer">
<p align="center">
  <i>With this extension, products from Oveleon can be registered, managed and installed.</i>
</p>

### Known import limitations
- The database update must be performed manually
- Insert tags currently only support page (`{link::*}}`) and article (`{include_article::*}}`) references
- Insert tags with query parameter are not supported yet (e.g. `{{file::file.php?arg1=val}}`)
- Currently only single file connections within custom elements are supported (`singleSRC`)

#### ToDo
- Docs
- Validators:
  - settings -> icons 
  - user-group connections
  - imageUrl, url (insert tags and other connection)
  - more unknown...
- Use Download Process for Packages in Manager Process
- Create product update process (need server-side product management)
- Optimize styles in Firefox and mobile (Firefox does not support the `:has()` selector)
- Provide all dependencies for manual installation
- Create database and migration process
- Use translations everywhere

- Set bundle license
- Set bundle to public
