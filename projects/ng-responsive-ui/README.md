# NgResponsiveUi
---

This library provides a service and 2 directives to implement [Material Design Responsive Layout](https://material.io/design/layout/responsive-layout-grid.html#columns-gutters-and-margins) in your angular application.

:warning: This module was not tested in depth for production. Use at your own risk and peril.

## Dependencies
This module requires [@angular/cdk](https://www.npmjs.com/package/@angular/cdk).

## Installation
1. Install the Package with `npm install @poseclop/ng-responsive-ui`
2. Import the module in your application
    ```typescript
    @ngModule({
        ...,
        imports: [
            ...,
            NgResponsiveUIModule
        ]
    })
    ```

**Since the module exports directives, best practice is to export it from a shared module to consume across your application feature modules**

## API
#### ResponsiveUIService
###### Properties
Name | Description
---- | -----------
`gutter$: Observable<number>` | The margin / padding / gutter size in px for current screen
`columns$: Observable<number>` | The number of columns for responsive grid
`screenLayout$: Observable<ScreenLayout>` | The current screen breakPoint

###### ScreenLayout (matches @angular/core/layout > Breakpoints)
- HandsetPortrait
- HandsetLandscape
- TabletPortrait
- TabletLandscape
- WebPortrait
- WebLandscape

#### ResponsiveContainerDirective
Center the component horizontally and set margins according to [material design responsive layout practices](https://material.io/design/layout/responsive-layout-grid.html#breakpoints).
###### Selector
\[responsiveContainer]
###### Inputs
Name | Description
---- | -----------
`maxWidth: number` | The max width of the container in px
`verticalMargin: number` | the vertical margin of the container in px

#### ResponsiveGridDirective
Style the component as a grid following [Material Design best practices](https://material.io/design/layout/responsive-layout-grid.html#breakpoints) (gutter size and number of columns)
###### Selector
\[responsiveGrid]