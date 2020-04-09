function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

(window["webpackJsonp"] = window["webpackJsonp"] || []).push([["main"], {
  /***/
  "./$$_lazy_route_resource lazy recursive":
  /*!******************************************************!*\
    !*** ./$$_lazy_route_resource lazy namespace object ***!
    \******************************************************/

  /*! no static exports found */

  /***/
  function $$_lazy_route_resourceLazyRecursive(module, exports) {
    function webpackEmptyAsyncContext(req) {
      // Here Promise.resolve().then() is used instead of new Promise() to prevent
      // uncaught exception popping up in devtools
      return Promise.resolve().then(function () {
        var e = new Error("Cannot find module '" + req + "'");
        e.code = 'MODULE_NOT_FOUND';
        throw e;
      });
    }

    webpackEmptyAsyncContext.keys = function () {
      return [];
    };

    webpackEmptyAsyncContext.resolve = webpackEmptyAsyncContext;
    module.exports = webpackEmptyAsyncContext;
    webpackEmptyAsyncContext.id = "./$$_lazy_route_resource lazy recursive";
    /***/
  },

  /***/
  "./src/app/app.component.ts":
  /*!**********************************!*\
    !*** ./src/app/app.component.ts ***!
    \**********************************/

  /*! exports provided: AppComponent */

  /***/
  function srcAppAppComponentTs(module, __webpack_exports__, __webpack_require__) {
    "use strict";

    __webpack_require__.r(__webpack_exports__);
    /* harmony export (binding) */


    __webpack_require__.d(__webpack_exports__, "AppComponent", function () {
      return AppComponent;
    });
    /* harmony import */


    var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(
    /*! @angular/core */
    "./node_modules/@angular/core/__ivy_ngcc__/fesm2015/core.js");

    var AppComponent = function AppComponent() {
      _classCallCheck(this, AppComponent);

      this.title = 'my-landing';
    };

    AppComponent.ɵfac = function AppComponent_Factory(t) {
      return new (t || AppComponent)();
    };

    AppComponent.ɵcmp = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdefineComponent"]({
      type: AppComponent,
      selectors: [["app-root"]],
      decls: 10,
      vars: 0,
      consts: [[1, "ml-section"], [1, "ml-container"], [1, "ml-button--white"], [1, "ml-button--grey"], [1, "ml-button--primary"]],
      template: function AppComponent_Template(rf, ctx) {
        if (rf & 1) {
          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](0, "section", 0);

          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](1, "div", 1);

          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](2, "h1");

          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](3, "ewgwwgw");

          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();

          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](4, "button", 2);

          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](5, "ewgegww");

          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();

          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](6, "button", 3);

          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](7, "ewgegww");

          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();

          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](8, "button", 4);

          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](9, "ewgegww");

          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();

          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();

          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        }
      },
      styles: ["[class*=ml-button--][_ngcontent-%COMP%] {\n  border-radius: 20px;\n  height: 40px;\n  padding: 0 18px;\n  white-space: nowrap;\n  overflow: hidden;\n  text-overflow: ellipsis;\n  font-size: 12px;\n  text-transform: uppercase;\n  font-family: \"Roboto\", Arial, sans-serif;\n  font-weight: 600;\n  transition: border-color 150ms linear, background-color 150ms linear, color 150ms linear;\n}\n\n.ml-button--grey[_ngcontent-%COMP%] {\n  border: 2px solid #66615B;\n  background: transparent;\n  color: #66615B;\n}\n\n.ml-button--grey[_ngcontent-%COMP%]:active, .ml-button--grey[_ngcontent-%COMP%]:focus {\n  border-color: #66615B;\n  background: #66615B;\n  color: #fff;\n  cursor: pointer;\n}\n\n@media (hover: hover) {\n  .ml-button--grey[_ngcontent-%COMP%]:hover {\n    border-color: #66615B;\n    background: #66615B;\n    color: #fff;\n    cursor: pointer;\n  }\n}\n\n.ml-button--white[_ngcontent-%COMP%] {\n  border: 2px solid #fff;\n  background: transparent;\n  color: #fff;\n}\n\n.ml-button--white[_ngcontent-%COMP%]:active, .ml-button--white[_ngcontent-%COMP%]:focus {\n  border-color: #fff;\n  background: #fff;\n  color: #111;\n  cursor: pointer;\n}\n\n@media (hover: hover) {\n  .ml-button--white[_ngcontent-%COMP%]:hover {\n    border-color: #fff;\n    background: #fff;\n    color: #111;\n    cursor: pointer;\n  }\n}\n\n.ml-button--primary[_ngcontent-%COMP%] {\n  border: 2px solid transparent;\n  background: linear-gradient(270deg, #f7395f 0%, #fe702e 100%);\n  color: #fff;\n  border: none;\n}\n\n.ml-button--primary[_ngcontent-%COMP%]:active, .ml-button--primary[_ngcontent-%COMP%]:focus {\n  border-color: #403D39;\n  background: #403D39;\n  color: #fff;\n  cursor: pointer;\n}\n\n@media (hover: hover) {\n  .ml-button--primary[_ngcontent-%COMP%]:hover {\n    border-color: #403D39;\n    background: #403D39;\n    color: #fff;\n    cursor: pointer;\n  }\n}\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInNyYy9hcHAvRDpcXERFVlxcbXktbGFuZGluZy9zcmNcXHN0eWxlc1xcYnV0dG9uc1xcYnV0dG9uLnNjc3MiLCJzcmMvYXBwL0Q6XFxERVZcXG15LWxhbmRpbmcvc3JjXFxzdHlsZXNcXHZhcmlhYmxlc1xcdmFyaWFibGUuc2NzcyIsInNyYy9hcHAvYXBwLmNvbXBvbmVudC5zY3NzIiwic3JjL2FwcC9EOlxcREVWXFxteS1sYW5kaW5nL3NyY1xcc3R5bGVzXFxidXR0b25zXFxtaXhpbi1idXR0b24tdmFyaWFudC5zY3NzIiwic3JjL2FwcC9EOlxcREVWXFxteS1sYW5kaW5nL3NyY1xcc3R5bGVzXFx2YXJpYWJsZXNcXHZhcmlhYmxlLXRoZW1lLnNjc3MiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBR0E7RUFDRSxtQkFBQTtFQUNBLFlDWVc7RURYWCxlQ1lVO0VEWFYsbUJBQUE7RUFDQSxnQkFBQTtFQUNBLHVCQUFBO0VBQ0EsZUNOVztFRE9YLHlCQUFBO0VBQ0Esd0NDVlk7RURXWixnQkFBQTtFQUNBLHdGQUFBO0FFRkY7O0FGS0E7RUdoQkUseUJBQUE7RUFDQSx1QkhnQjBDO0VHZjFDLGNDRmdCO0FGaUJsQjs7QUNiRTtFQUVFLHFCQ05jO0VET2QsbUJDUGM7RURRZCxXQ0lVO0VESFYsZUFBQTtBRGNKOztBQ1pFO0VBRUk7SUFDRSxxQkNkVTtJRGVWLG1CQ2ZVO0lEZ0JWLFdDSk07SURLTixlQUFBO0VEYU47QUFDRjs7QUZaQTtFR25CRSxzQkFBQTtFQUNBLHVCSG1Cc0M7RUdsQnRDLFdDVVk7QUZ5QmQ7O0FDakNFO0VBRUUsa0JDTVU7RURMVixnQkNLVTtFREpWLFdDRlU7RURHVixlQUFBO0FEa0NKOztBQ2hDRTtFQUVJO0lBQ0Usa0JDRk07SURHTixnQkNITTtJRElOLFdDVk07SURXTixlQUFBO0VEaUNOO0FBQ0Y7O0FGN0JBO0VHdEJFLDZCQUFBO0VBQ0EsNkRDYWM7RURaZCxXQ1VZO0VKWVosWUFBQTtBRWtDRjs7QUN0REU7RUFFRSxxQkNQZ0I7RURRaEIsbUJDUmdCO0VEU2hCLFdDSVU7RURIVixlQUFBO0FEdURKOztBQ3JERTtFQUVJO0lBQ0UscUJDZlk7SURnQlosbUJDaEJZO0lEaUJaLFdDSk07SURLTixlQUFBO0VEc0ROO0FBQ0YiLCJmaWxlIjoic3JjL2FwcC9hcHAuY29tcG9uZW50LnNjc3MiLCJzb3VyY2VzQ29udGVudCI6WyJAaW1wb3J0IFwiLi4vdmFyaWFibGVzL3ZhcmlhYmxlXCI7XHJcbkBpbXBvcnQgXCIuLi9idXR0b25zL21peGluLWJ1dHRvbi12YXJpYW50XCI7XHJcblxyXG5bY2xhc3MqPSdtbC1idXR0b24tLSdde1xyXG4gIGJvcmRlci1yYWRpdXM6ICRidG4taGVpZ2h0LzI7XHJcbiAgaGVpZ2h0OiAkYnRuLWhlaWdodDtcclxuICBwYWRkaW5nOiAkYnRuLXNwYWNlO1xyXG4gIHdoaXRlLXNwYWNlOiBub3dyYXA7XHJcbiAgb3ZlcmZsb3c6IGhpZGRlbjtcclxuICB0ZXh0LW92ZXJmbG93OiBlbGxpcHNpcztcclxuICBmb250LXNpemU6ICRmb250LXNtYWxsO1xyXG4gIHRleHQtdHJhbnNmb3JtOiB1cHBlcmNhc2U7XHJcbiAgZm9udC1mYW1pbHk6ICRmb250LXJvYm90bztcclxuICBmb250LXdlaWdodDogNjAwO1xyXG4gIHRyYW5zaXRpb246IGJvcmRlci1jb2xvciAxNTBtcyBsaW5lYXIsIGJhY2tncm91bmQtY29sb3IgMTUwbXMgbGluZWFyLCBjb2xvciAxNTBtcyBsaW5lYXI7XHJcbn1cclxuXHJcbi5tbC1idXR0b24tLWdyZXkge1xyXG4gIEBpbmNsdWRlIGJ1dHRvbi12YXJpYW50KCRjb2xvci1ncmV5LWRhcmssIHRyYW5zcGFyZW50LCAkY29sb3ItZ3JleS1kYXJrLCAkY29sb3ItZ3JleS1kYXJrLCAkY29sb3ItZ3JleS1kYXJrLCAkY29sb3Itd2hpdGUpO1xyXG59XHJcbi5tbC1idXR0b24tLXdoaXRlIHtcclxuICBAaW5jbHVkZSBidXR0b24tdmFyaWFudCgkY29sb3Itd2hpdGUsIHRyYW5zcGFyZW50LCAkY29sb3Itd2hpdGUsICRjb2xvci13aGl0ZSwgJGNvbG9yLXdoaXRlLCAkY29sb3ItYmxhY2spO1xyXG59XHJcbi5tbC1idXR0b24tLXByaW1hcnkge1xyXG4gIEBpbmNsdWRlIGJ1dHRvbi12YXJpYW50KHRyYW5zcGFyZW50LCAkY29sb3ItcHJpbWFyeSwgJGNvbG9yLXdoaXRlLCAkY29sb3ItZ3JleS1kYXJrZXIsICRjb2xvci1ncmV5LWRhcmtlciwgJGNvbG9yLXdoaXRlKTtcclxuICBib3JkZXI6IG5vbmU7XHJcbn1cclxuIiwiQGltcG9ydCAndmFyaWFibGUtdGhlbWUnO1xyXG5cclxuJGZvbnQtcm9ib3RvOiBcIlJvYm90b1wiLCBBcmlhbCwgc2Fucy1zZXJpZjtcclxuJGZvbnQtYmFzZTogMTVweDtcclxuJGZvbnQtc21hbGw6IDEycHg7XHJcblxyXG4kZm9udC1oMTogMzhweDtcclxuJGZvbnQtaDM6IDM4cHg7XHJcbiRmb250LWg0OiAyMnB4O1xyXG5cclxuJHNwYWNlLXNlY3Rpb246IDcwcHggMDtcclxuJHNwYWNlLWgzOiAwIDAgNDZweCAwO1xyXG5cclxuJG1heC13aWR0aDogMTIwMHB4O1xyXG5cclxuLy8gQnV0dG9ucy5cclxuXHJcbiRidG4taGVpZ2h0OiA0MHB4O1xyXG4kYnRuLXNwYWNlOiAwIDE4cHg7XHJcbiIsIltjbGFzcyo9bWwtYnV0dG9uLS1dIHtcbiAgYm9yZGVyLXJhZGl1czogMjBweDtcbiAgaGVpZ2h0OiA0MHB4O1xuICBwYWRkaW5nOiAwIDE4cHg7XG4gIHdoaXRlLXNwYWNlOiBub3dyYXA7XG4gIG92ZXJmbG93OiBoaWRkZW47XG4gIHRleHQtb3ZlcmZsb3c6IGVsbGlwc2lzO1xuICBmb250LXNpemU6IDEycHg7XG4gIHRleHQtdHJhbnNmb3JtOiB1cHBlcmNhc2U7XG4gIGZvbnQtZmFtaWx5OiBcIlJvYm90b1wiLCBBcmlhbCwgc2Fucy1zZXJpZjtcbiAgZm9udC13ZWlnaHQ6IDYwMDtcbiAgdHJhbnNpdGlvbjogYm9yZGVyLWNvbG9yIDE1MG1zIGxpbmVhciwgYmFja2dyb3VuZC1jb2xvciAxNTBtcyBsaW5lYXIsIGNvbG9yIDE1MG1zIGxpbmVhcjtcbn1cblxuLm1sLWJ1dHRvbi0tZ3JleSB7XG4gIGJvcmRlcjogMnB4IHNvbGlkICM2NjYxNUI7XG4gIGJhY2tncm91bmQ6IHRyYW5zcGFyZW50O1xuICBjb2xvcjogIzY2NjE1Qjtcbn1cbi5tbC1idXR0b24tLWdyZXk6YWN0aXZlLCAubWwtYnV0dG9uLS1ncmV5OmZvY3VzIHtcbiAgYm9yZGVyLWNvbG9yOiAjNjY2MTVCO1xuICBiYWNrZ3JvdW5kOiAjNjY2MTVCO1xuICBjb2xvcjogI2ZmZjtcbiAgY3Vyc29yOiBwb2ludGVyO1xufVxuQG1lZGlhIChob3ZlcjogaG92ZXIpIHtcbiAgLm1sLWJ1dHRvbi0tZ3JleTpob3ZlciB7XG4gICAgYm9yZGVyLWNvbG9yOiAjNjY2MTVCO1xuICAgIGJhY2tncm91bmQ6ICM2NjYxNUI7XG4gICAgY29sb3I6ICNmZmY7XG4gICAgY3Vyc29yOiBwb2ludGVyO1xuICB9XG59XG5cbi5tbC1idXR0b24tLXdoaXRlIHtcbiAgYm9yZGVyOiAycHggc29saWQgI2ZmZjtcbiAgYmFja2dyb3VuZDogdHJhbnNwYXJlbnQ7XG4gIGNvbG9yOiAjZmZmO1xufVxuLm1sLWJ1dHRvbi0td2hpdGU6YWN0aXZlLCAubWwtYnV0dG9uLS13aGl0ZTpmb2N1cyB7XG4gIGJvcmRlci1jb2xvcjogI2ZmZjtcbiAgYmFja2dyb3VuZDogI2ZmZjtcbiAgY29sb3I6ICMxMTE7XG4gIGN1cnNvcjogcG9pbnRlcjtcbn1cbkBtZWRpYSAoaG92ZXI6IGhvdmVyKSB7XG4gIC5tbC1idXR0b24tLXdoaXRlOmhvdmVyIHtcbiAgICBib3JkZXItY29sb3I6ICNmZmY7XG4gICAgYmFja2dyb3VuZDogI2ZmZjtcbiAgICBjb2xvcjogIzExMTtcbiAgICBjdXJzb3I6IHBvaW50ZXI7XG4gIH1cbn1cblxuLm1sLWJ1dHRvbi0tcHJpbWFyeSB7XG4gIGJvcmRlcjogMnB4IHNvbGlkIHRyYW5zcGFyZW50O1xuICBiYWNrZ3JvdW5kOiBsaW5lYXItZ3JhZGllbnQoMjcwZGVnLCAjZjczOTVmIDAlLCAjZmU3MDJlIDEwMCUpO1xuICBjb2xvcjogI2ZmZjtcbiAgYm9yZGVyOiBub25lO1xufVxuLm1sLWJ1dHRvbi0tcHJpbWFyeTphY3RpdmUsIC5tbC1idXR0b24tLXByaW1hcnk6Zm9jdXMge1xuICBib3JkZXItY29sb3I6ICM0MDNEMzk7XG4gIGJhY2tncm91bmQ6ICM0MDNEMzk7XG4gIGNvbG9yOiAjZmZmO1xuICBjdXJzb3I6IHBvaW50ZXI7XG59XG5AbWVkaWEgKGhvdmVyOiBob3Zlcikge1xuICAubWwtYnV0dG9uLS1wcmltYXJ5OmhvdmVyIHtcbiAgICBib3JkZXItY29sb3I6ICM0MDNEMzk7XG4gICAgYmFja2dyb3VuZDogIzQwM0QzOTtcbiAgICBjb2xvcjogI2ZmZjtcbiAgICBjdXJzb3I6IHBvaW50ZXI7XG4gIH1cbn0iLCJAbWl4aW4gYnV0dG9uLXZhcmlhbnQoJGJvcmRlci1jb2xvciwgJGJhY2tncm91bmQtY29sb3IsICR0ZXh0LWNvbG9yLCAkYmFja2dyb3VuZC1jb2xvci1hY3Rpb24sICRib3JkZXItY29sb3ItYWN0aW9uLCAkdGV4dC1jb2xvci1hY3Rpb24pIHtcclxuICBib3JkZXI6IDJweCBzb2xpZCAkYm9yZGVyLWNvbG9yO1xyXG4gIGJhY2tncm91bmQ6ICRiYWNrZ3JvdW5kLWNvbG9yO1xyXG4gIGNvbG9yOiAkdGV4dC1jb2xvcjtcclxuXHJcbiAgJjphY3RpdmUsXHJcbiAgJjpmb2N1cyB7XHJcbiAgICBib3JkZXItY29sb3I6ICRib3JkZXItY29sb3ItYWN0aW9uO1xyXG4gICAgYmFja2dyb3VuZDogJGJhY2tncm91bmQtY29sb3ItYWN0aW9uO1xyXG4gICAgY29sb3I6ICR0ZXh0LWNvbG9yLWFjdGlvbjtcclxuICAgIGN1cnNvcjogcG9pbnRlcjtcclxuICB9XHJcbiAgQG1lZGlhIChob3Zlcjpob3Zlcil7XHJcbiAgICAmIHtcclxuICAgICAgJjpob3ZlciB7XHJcbiAgICAgICAgYm9yZGVyLWNvbG9yOiAkYm9yZGVyLWNvbG9yLWFjdGlvbjtcclxuICAgICAgICBiYWNrZ3JvdW5kOiAkYmFja2dyb3VuZC1jb2xvci1hY3Rpb247XHJcbiAgICAgICAgY29sb3I6ICR0ZXh0LWNvbG9yLWFjdGlvbjtcclxuICAgICAgICBjdXJzb3I6IHBvaW50ZXI7XHJcbiAgICAgIH1cclxuICAgIH1cclxuICB9XHJcbn1cclxuIiwiJGNvbG9yLWdyZXktZGFya2VyOiAjNDAzRDM5O1xyXG4kY29sb3ItZ3JleS1kYXJrOiAjNjY2MTVCO1xyXG4kY29sb3ItZ3JleTogIzg2OGU5NjtcclxuJGNvbG9yLWdyZXktbGlnaHQ6ICNCNEIwQjA7XHJcbiRjb2xvci1ncmV5LWxpZ2h0ZXI6ICNGNUZBRkQ7XHJcbiRjb2xvci1ncmV5LWxpZ2h0ZXN0OiAjZWVlO1xyXG5cclxuJGNvbG9yLWJsYWNrOiAjMTExO1xyXG5cclxuJGNvbG9yLW9yYW5nZTogI2Y1NTkzZDtcclxuJGNvbG9yLW9yYW5nZS1saXRlOiAjZmU3MDJlO1xyXG4kY29sb3ItcGluazogI2Y3Mzk1ZjtcclxuXHJcbiRjb2xvci13aGl0ZTogI2ZmZjtcclxuJGNvbG9yLWJnLWJhc2U6ICRjb2xvci13aGl0ZTtcclxuJGNvbG9yLXByaW1hcnk6IGxpbmVhci1ncmFkaWVudCgyNzBkZWcsICRjb2xvci1waW5rIDAlLCAkY29sb3Itb3JhbmdlLWxpdGUgMTAwJSk7XHJcbiJdfQ== */"]
    });
    /*@__PURE__*/

    (function () {
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵsetClassMetadata"](AppComponent, [{
        type: _angular_core__WEBPACK_IMPORTED_MODULE_0__["Component"],
        args: [{
          selector: 'app-root',
          templateUrl: './app.component.html',
          styleUrls: ['./app.component.scss']
        }]
      }], null, null);
    })();
    /***/

  },

  /***/
  "./src/app/app.module.ts":
  /*!*******************************!*\
    !*** ./src/app/app.module.ts ***!
    \*******************************/

  /*! exports provided: AppModule */

  /***/
  function srcAppAppModuleTs(module, __webpack_exports__, __webpack_require__) {
    "use strict";

    __webpack_require__.r(__webpack_exports__);
    /* harmony export (binding) */


    __webpack_require__.d(__webpack_exports__, "AppModule", function () {
      return AppModule;
    });
    /* harmony import */


    var _angular_platform_browser__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(
    /*! @angular/platform-browser */
    "./node_modules/@angular/platform-browser/__ivy_ngcc__/fesm2015/platform-browser.js");
    /* harmony import */


    var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(
    /*! @angular/core */
    "./node_modules/@angular/core/__ivy_ngcc__/fesm2015/core.js");
    /* harmony import */


    var _app_component__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(
    /*! ./app.component */
    "./src/app/app.component.ts");

    var AppModule = function AppModule() {
      _classCallCheck(this, AppModule);
    };

    AppModule.ɵmod = _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵdefineNgModule"]({
      type: AppModule,
      bootstrap: [_app_component__WEBPACK_IMPORTED_MODULE_2__["AppComponent"]]
    });
    AppModule.ɵinj = _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵdefineInjector"]({
      factory: function AppModule_Factory(t) {
        return new (t || AppModule)();
      },
      providers: [],
      imports: [[_angular_platform_browser__WEBPACK_IMPORTED_MODULE_0__["BrowserModule"]]]
    });

    (function () {
      (typeof ngJitMode === "undefined" || ngJitMode) && _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵsetNgModuleScope"](AppModule, {
        declarations: [_app_component__WEBPACK_IMPORTED_MODULE_2__["AppComponent"]],
        imports: [_angular_platform_browser__WEBPACK_IMPORTED_MODULE_0__["BrowserModule"]]
      });
    })();
    /*@__PURE__*/


    (function () {
      _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵsetClassMetadata"](AppModule, [{
        type: _angular_core__WEBPACK_IMPORTED_MODULE_1__["NgModule"],
        args: [{
          declarations: [_app_component__WEBPACK_IMPORTED_MODULE_2__["AppComponent"]],
          imports: [_angular_platform_browser__WEBPACK_IMPORTED_MODULE_0__["BrowserModule"]],
          providers: [],
          bootstrap: [_app_component__WEBPACK_IMPORTED_MODULE_2__["AppComponent"]]
        }]
      }], null, null);
    })();
    /***/

  },

  /***/
  "./src/environments/environment.ts":
  /*!*****************************************!*\
    !*** ./src/environments/environment.ts ***!
    \*****************************************/

  /*! exports provided: environment */

  /***/
  function srcEnvironmentsEnvironmentTs(module, __webpack_exports__, __webpack_require__) {
    "use strict";

    __webpack_require__.r(__webpack_exports__);
    /* harmony export (binding) */


    __webpack_require__.d(__webpack_exports__, "environment", function () {
      return environment;
    }); // This file can be replaced during build by using the `fileReplacements` array.
    // `ng build --prod` replaces `environment.ts` with `environment.prod.ts`.
    // The list of file replacements can be found in `angular.json`.


    var environment = {
      production: false
    };
    /*
     * For easier debugging in development mode, you can import the following file
     * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
     *
     * This import should be commented out in production mode because it will have a negative impact
     * on performance if an error is thrown.
     */
    // import 'zone.js/dist/zone-error';  // Included with Angular CLI.

    /***/
  },

  /***/
  "./src/main.ts":
  /*!*********************!*\
    !*** ./src/main.ts ***!
    \*********************/

  /*! no exports provided */

  /***/
  function srcMainTs(module, __webpack_exports__, __webpack_require__) {
    "use strict";

    __webpack_require__.r(__webpack_exports__);
    /* harmony import */


    var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(
    /*! @angular/core */
    "./node_modules/@angular/core/__ivy_ngcc__/fesm2015/core.js");
    /* harmony import */


    var _environments_environment__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(
    /*! ./environments/environment */
    "./src/environments/environment.ts");
    /* harmony import */


    var _app_app_module__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(
    /*! ./app/app.module */
    "./src/app/app.module.ts");
    /* harmony import */


    var _angular_platform_browser__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(
    /*! @angular/platform-browser */
    "./node_modules/@angular/platform-browser/__ivy_ngcc__/fesm2015/platform-browser.js");

    if (_environments_environment__WEBPACK_IMPORTED_MODULE_1__["environment"].production) {
      Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["enableProdMode"])();
    }

    _angular_platform_browser__WEBPACK_IMPORTED_MODULE_3__["platformBrowser"]().bootstrapModule(_app_app_module__WEBPACK_IMPORTED_MODULE_2__["AppModule"])["catch"](function (err) {
      return console.error(err);
    });
    /***/

  },

  /***/
  0:
  /*!***************************!*\
    !*** multi ./src/main.ts ***!
    \***************************/

  /*! no static exports found */

  /***/
  function _(module, exports, __webpack_require__) {
    module.exports = __webpack_require__(
    /*! D:\DEV\my-landing\src\main.ts */
    "./src/main.ts");
    /***/
  }
}, [[0, "runtime", "vendor"]]]);
//# sourceMappingURL=main-es5.js.map