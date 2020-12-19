# NgGetPipe

Add a pipe that send a get request with the provided input string and transform it with the response.

## Installation
1. Install the Package with `npm install @poseclop/ng-get-pipe`
2. Import the module in your application. You can include a default url that will prefix all requests
    ```
    @ngModule({
        ...,
        imports: [
            ...,
            NgGetPipeModule.forRoot('http://www.exemple-default-url.com')
        ]
    })
    ```

### Usage
The pipe can take an argument to provide a root url that will prefix the request

###### Exemple 1: complete url
```
<img [src]="'http://my-media-url/images/my-image.jpg' | get">
```
###### Exemple 2: Provide the default url via pipe argument
```
<img [src]="'my-image.jpg' | get:'http://my-media-url/images'">
```
###### Exemple 3: ...if default url was provided in forRoot method of the module
```
<img src={{ 'my-image.jpg' | get }}>
```