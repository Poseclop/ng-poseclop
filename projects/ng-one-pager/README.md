# NgOnePager

This Angular library provides 2 components <one-pager-container> and <one-pager> that allows you to build views with a 1 pager UI. Each pages takes 100vh and 100vw. The scrollbar is hidden. 
The user can then scroll between pages by using either the mousewheel or the provided controls.

## Installation

run `npm install @poseclop/ng-page-scroller`

## Dependencies
This module requires [@angular/material](https://www.npmjs.com/package/@angular/material)

## Limitations
The package does not include gestures recognition. You can set them up manually in your app by installing HammerJS and binding PosPageScroller methods to gestures.

## Usage
##### Import NgOnePagerModule in your application

    @ngModule({
        ...
        imports: [
            ...,
            NgOnePagerModule,
        ]
    })

##### Consume the components in your HTML.

    <pos-page-container>
        <pos-page>
            <h1>My First Page</h1>
            <main>...</main>
        </pos-page>
        <pos-page>
            <h1>My Second Page</h1>
            <main>...</main>
        </pos-page>
    </pos-page-container>

**Since the module exports directives, best practice is to export it from a shared module to consume in your application**

## API
##### PosPageScrollerComponent
**Properties**
Name | Description
---- | -----------
@Input() pageIndex: number | Index of the selected page
@Input() scrollSensivity: number | A number from 1 to 10 that indicates the sensivity to mouse wheel (default 5)
@Input() colorIdle: The color of the scrollbar controls buttons and markers in idle mode
@Input() colorActive: The color of the selected page marker
pageQueryList: QueryList | A query list of all PosPageComponents included in PosPageScroller
scrollBarWidth: number | The width in pixels of the scrollBar for current window

**Methods**
Name | Description
---- | -----------
next(): void | Scroll to the next page
previous(): void | Scroll the previous page
scrollToPage(index: number): void | Scroll to the specified page

**Events**
Name | Description
---- | -----------
pageChange: TPageEvent | Emitted when navigatting to to a new page

##### PosPageComponent
Name | Description
---- | -----------
elementRef: ElementRef | the elementRef of the PosPage Component

## Todo List
- [ ] Add possibility to toggle controls on/off.
- [ ] Add possibility to customize controls
- [x] Reset mouseWheel progress on a timer