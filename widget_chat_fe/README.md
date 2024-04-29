# Widget Project

This project is built using React.js to create a widget.

## Getting Started

Follow the instructions below to get the widget source code.

## Prerequisites

Ensure you have Node.js version 18 or higher installed.

## Installation

Install the project dependencies by running:

```bash
npm install
```

## Build the project

After installing the project dependencies you can use the following command to build the project:

```bash
npm run build
```

This command will build the project and provide you with minified `.js` file inside `build/static/js` folder

The filename will look like this `main.${randomhash}.js`

This is the file that you will need to use as source code of your widget

You can import the widget into your project by adding this code snippet at the end of your body tag

```
    <div id="chat-widget-container"></div>
    <script src="./build/static/js/main.399fc869.js"></script>
    <script>
      chatWidget.mountChatWidget('chat-widget-container', {
        key: 'qynyhmqzz0echnshxsil',
        wsHost: 'localhost',
        wsPort: 8081,
        reverbSchema: 'http',
        apiUrl: 'http://localhost:8000/api',
      })
    </script>
```
The ID `chat-widget-container` can be replaced by any unique identifier

`main.399fc869.js` file should be replaced by the `.js` file generated during the build process inside `build/static/js`

`key` `wsHost` `wsProt` `reverbSchema` `apiUrl` can be replaced with your custom configs, this parameters can be found inside the `.env.example` file in the root of this project

### You can find the example in `page.html` file