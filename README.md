# Wiley Test

This is a practical Frontend development test for Wiley.  
It consists of generating a React.js interface with CRUD operations (Create, Read, Update, and Delete) integrated with the FakeStore API (https://fakestoreapi.com).

## Installation

After cloning the repository, open the project folder in your terminal where you saved it, and simply install the NPM packages with the command:

```
npm install
```

Then run the application in developer mode by typing:

```
npm run dev
```

If the application does not automatically launch in the browser, check the terminal for the address where the application will be running. It will be something like:

```
http://localhost:5173
```

### Important

The version 18.17.0 of Node.js was used for this development.

## API Integration

The FakeStore API is public, so there was no need to generate any kind of authentication. Although it was available in the documentation, the test did not require the implementation of this feature. To consume and persist data, I used the `axios` library, creating a service layer where I made calls to the necessary endpoints.

I used the `Redux` and `Redux Toolkit` libraries to make asynchronous service calls and manage the global state of the application.

## Other Integrations

I noticed that the API required images to only contain the file URLs. I considered this a limitation to be addressed for a better experience. So, I created an instance on a CDN to store files as in a real application.

I enabled an instance of `UploadCare` (https://uploadcare.com), but the free service will expire soon. I believe there will be enough time for test evaluation before that happens. If not, please contact me so I can update the public key.

## Interface

I chose to use `Material UI` to generate the interfaces. This way, I didn't need to write much code for styling the pages, which became responsive and intuitive, as the test requested.

## Forms

The libraries used for data validation were `react hook form` and `zod`. They work together, delivering schemas and strong typing inferred with `TypeScript`.

## Other Libraries

In addition to the ones mentioned, I chose to use `Vite` as the boilerplate, as it is simple to configure and already integrated with `ESLint`. For routing, I used `React router dom`.

# Thank You
