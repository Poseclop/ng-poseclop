# NgResponsiveUi

This library provides a service and 2 directives to implement [Material Design Responsive Layout](https://material.io/design/layout/responsive-layout-grid.html#columns-gutters-and-margins) in your application.

## Installation
1. Install the Package with `npm install @poseclop/ng-responsive-ui`
2. Import the module in your application
    ```
    @ngModule({
        ...,
        imports: [
            ...,
            NgResponsiveUIModule
        ]
    })
    ```

**Since the module exports directives, best practice is to export it from a shared module to consume in your application**

## API
#### ResponsiveUIService
###### Properties
Name | Description
---- | -----------
gutter$: Observable\<number> | The margin / padding / gutter size in px
columns$: Observable\<number> | The number of columns for responsive grid
screenLayout$: Observable\<ScreenLayout> | The current screen breakPoint

###### ScreenLayout (matches @angular/core/layout > Breakpoints)
- HandsetPortrait
- HandsetLandscape
- TabletPortrait
- TabletLandscape
- WebPortrait
- WebLandscape

#### ResponsiveContainerDirective
center the component horizontally and set margins according to [material design responsive layout practices](https://material.io/design/layout/responsive-layout-grid.html#breakpoints).
###### Selector
\[responsiveContainer]
###### Inputs
Name | Type | Description
---- | ---- | -----------
maxWidth | number | The max width of the container in px
verticalMargin | number | the vertical margin of the container in px

#### ResponsiveGridDirective
Style the component as a grid following [Material Design best practices](https://material.io/design/layout/responsive-layout-grid.html#breakpoints)
###### Selector
\[responsiveGrid]
###### Inputs
Name | Type | Description
---- | ---- | -----------
maxWidth | number | The max width of the container in px
verticalMargin | number | the vertical margin of the container in px