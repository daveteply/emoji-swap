import{b as wt,c as Tt,d as Mt,e as xt,f as Ct,g as Pt,h as Dt,i as It,l as St,m as Ot,n as Rt,p as Et,q as N,r as At}from"./chunk-UEOXSEQA.js";import{$ as q,$a as mt,A as f,Aa as nt,B as j,Ba as I,Ca as S,Cb as U,D as s,E as Q,Eb as W,Fa as w,Ga as O,Gb as bt,Ha as m,Hb as E,Ia as at,Ib as vt,J as V,Jb as A,K as x,Kb as yt,M as Z,Qa as st,Ra as rt,T as u,V as G,W as g,Xa as lt,Z as K,_ as F,a as y,ab as ct,ba as h,ca as _,da as C,db as dt,eb as pt,ga as J,gb as T,h as H,jb as R,kb as X,la as P,ma as l,mb as ht,na as r,oa as b,pa as Y,qa as tt,qb as ft,tb as ut,ua as D,ub as gt,va as et,wb as _t,x as p,xa as ot,ya as B,za as it}from"./chunk-FOZM44LR.js";var Vt=[{path:"",loadChildren:()=>import("./chunk-YJHEZOTV.js").then(i=>i.IntroModule)},{path:"game",loadChildren:()=>import("./chunk-G5BNB6IU.js").then(i=>i.GameModule)}],k=class i{static{this.\u0275fac=function(t){return new(t||i)}}static{this.\u0275mod=_({type:i})}static{this.\u0275inj=f({imports:[T.forRoot(Vt),T]})}};var Gt=(()=>{class i{static \u0275fac=function(e){return new(e||i)};static \u0275dir=C({type:i,selectors:[["mat-toolbar-row"]],hostAttrs:[1,"mat-toolbar-row"],exportAs:["matToolbarRow"]})}return i})(),kt=(()=>{class i{_elementRef=s(u);_platform=s(R);_document=s(x);color;_toolbarRows;ngAfterViewInit(){this._platform.isBrowser&&(this._checkToolbarMixedModes(),this._toolbarRows.changes.subscribe(()=>this._checkToolbarMixedModes()))}_checkToolbarMixedModes(){this._toolbarRows.length}static \u0275fac=function(e){return new(e||i)};static \u0275cmp=(function(){let t=["*",[["mat-toolbar-row"]]];return h({type:i,selectors:[["mat-toolbar"]],contentQueries:function(n,a,d){if(n&1&&it(d,Gt,5),n&2){let v;I(v=S())&&(a._toolbarRows=v)}},hostAttrs:[1,"mat-toolbar"],hostVars:6,hostBindings:function(n,a){n&2&&(O(a.color?"mat-"+a.color:""),w("mat-toolbar-multiple-rows",a._toolbarRows.length>0)("mat-toolbar-single-row",a._toolbarRows.length===0))},inputs:{color:"color"},exportAs:["matToolbar"],ngContentSelectors:["*","mat-toolbar-row"],decls:2,vars:0,template:function(n,a){n&1&&(ot(t),B(0),B(1,1))},styles:[`.mat-toolbar {
  background: var(--%NS%mat-toolbar-container-background-color, var(--%NS%mat-sys-surface));
  color: var(--%NS%mat-toolbar-container-text-color, var(--%NS%mat-sys-on-surface));
}
.mat-toolbar, .mat-toolbar h1, .mat-toolbar h2, .mat-toolbar h3, .mat-toolbar h4, .mat-toolbar h5, .mat-toolbar h6 {
  font-family: var(--%NS%mat-toolbar-title-text-font, var(--%NS%mat-sys-title-large-font));
  font-size: var(--%NS%mat-toolbar-title-text-size, var(--%NS%mat-sys-title-large-size));
  line-height: var(--%NS%mat-toolbar-title-text-line-height, var(--%NS%mat-sys-title-large-line-height));
  font-weight: var(--%NS%mat-toolbar-title-text-weight, var(--%NS%mat-sys-title-large-weight));
  letter-spacing: var(--%NS%mat-toolbar-title-text-tracking, var(--%NS%mat-sys-title-large-tracking));
  margin: 0;
}
@media (forced-colors: active) {
  .mat-toolbar {
    outline: solid 1px;
  }
}
.mat-toolbar .mat-form-field-underline,
.mat-toolbar .mat-form-field-ripple,
.mat-toolbar .mat-focused .mat-form-field-ripple {
  background-color: currentColor;
}
.mat-toolbar .mat-form-field-label,
.mat-toolbar .mat-focused .mat-form-field-label,
.mat-toolbar .mat-select-value,
.mat-toolbar .mat-select-arrow,
.mat-toolbar .mat-form-field.mat-focused .mat-select-arrow {
  color: inherit;
}
.mat-toolbar .mat-input-element {
  caret-color: currentColor;
}
.mat-toolbar .mat-mdc-button-base.mat-mdc-button-base.mat-unthemed {
  --%NS%mat-button-text-label-text-color: var(--%NS%mat-toolbar-container-text-color, var(--%NS%mat-sys-on-surface));
  --%NS%mat-button-outlined-label-text-color: var(--%NS%mat-toolbar-container-text-color, var(--%NS%mat-sys-on-surface));
}

.mat-toolbar-row, .mat-toolbar-single-row {
  display: flex;
  box-sizing: border-box;
  padding: 0 16px;
  width: 100%;
  flex-direction: row;
  align-items: center;
  white-space: nowrap;
  height: var(--%NS%mat-toolbar-standard-height, 64px);
}
@media (max-width: 599px) {
  .mat-toolbar-row, .mat-toolbar-single-row {
    height: var(--%NS%mat-toolbar-mobile-height, 56px);
  }
}

.mat-toolbar-multiple-rows {
  display: flex;
  box-sizing: border-box;
  flex-direction: column;
  width: 100%;
  min-height: var(--%NS%mat-toolbar-standard-height, 64px);
}
@media (max-width: 599px) {
  .mat-toolbar-multiple-rows {
    min-height: var(--%NS%mat-toolbar-mobile-height, 56px);
  }
}
`],encapsulation:2})})()}return i})();var Lt=(()=>{class i{static \u0275fac=function(e){return new(e||i)};static \u0275mod=_({type:i});static \u0275inj=f({imports:[E]})}return i})();var Bt=20;var Xt=new j("mat-tooltip-scroll-strategy",{providedIn:"root",factory:()=>{let i=s(V);return()=>Ct(i,{scrollThrottle:Bt})}}),Ut=new j("mat-tooltip-default-options",{providedIn:"root",factory:()=>({showDelay:0,hideDelay:0,touchendHideDelay:1500})});var zt="tooltip-panel",Wt={passive:!0},$t=8,Qt=8,Zt=24,Kt=200,$=(()=>{class i{_elementRef=s(u);_ngZone=s(Z);_platform=s(R);_ariaDescriber=s(_t);_focusMonitor=s(ht);_dir=s(bt);_injector=s(V);_viewContainerRef=s(q);_mediaMatcher=s(ft);_document=s(x);_renderer=s(K);_animationsDisabled=U();_defaultOptions=s(Ut,{optional:!0});_overlayRef=null;_tooltipInstance=null;_overlayPanelClass;_portal;_position="below";_positionAtOrigin=!1;_disabled=!1;_tooltipClass;_viewInitialized=!1;_pointerExitEventsInitialized=!1;_tooltipComponent=Ht;_viewportMargin=8;_currentPosition;_cssClassPrefix="mat-mdc";_ariaDescriptionPending=!1;_dirSubscribed=!1;get position(){return this._position}set position(t){t!==this._position&&(this._position=t,this._overlayRef&&(this._updatePosition(this._overlayRef),this._tooltipInstance?.show(0),this._overlayRef.updatePosition()))}get positionAtOrigin(){return this._positionAtOrigin}set positionAtOrigin(t){this._positionAtOrigin=W(t),this._detach(),this._overlayRef=null}get disabled(){return this._disabled}set disabled(t){let e=W(t);this._disabled!==e&&(this._disabled=e,e?this.hide(0):this._setupPointerEnterEventsIfNeeded(),this._syncAriaDescription(this.message))}get showDelay(){return this._showDelay}set showDelay(t){this._showDelay=X(t)}_showDelay;get hideDelay(){return this._hideDelay}set hideDelay(t){this._hideDelay=X(t),this._tooltipInstance&&(this._tooltipInstance._mouseLeaveHideDelay=this._hideDelay)}_hideDelay;touchGestures="auto";get message(){return this._message}set message(t){let e=this._message;this._message=t!=null?String(t).trim():"",!this._message&&this._isTooltipVisible()?this.hide(0):(this._setupPointerEnterEventsIfNeeded(),this._updateTooltipMessage()),this._syncAriaDescription(e)}_message="";get tooltipClass(){return this._tooltipClass}set tooltipClass(t){this._tooltipClass=t,this._tooltipInstance&&this._setTooltipClass(this._tooltipClass)}_eventCleanups=[];_touchstartTimeout=null;_destroyed=new H;_isDestroyed=!1;constructor(){let t=this._defaultOptions;t&&(this._showDelay=t.showDelay,this._hideDelay=t.hideDelay,t.position&&(this.position=t.position),t.positionAtOrigin&&(this.positionAtOrigin=t.positionAtOrigin),t.touchGestures&&(this.touchGestures=t.touchGestures),t.tooltipClass&&(this.tooltipClass=t.tooltipClass)),this._viewportMargin=$t}ngAfterViewInit(){this._viewInitialized=!0,this._setupPointerEnterEventsIfNeeded(),this._focusMonitor.monitor(this._elementRef).pipe(p(this._destroyed)).subscribe(t=>{t?t==="keyboard"&&this._ngZone.run(()=>this.show()):this._ngZone.run(()=>this.hide(0))})}ngOnDestroy(){let t=this._elementRef.nativeElement;this._touchstartTimeout&&clearTimeout(this._touchstartTimeout),this._overlayRef&&(this._overlayRef.dispose(),this._tooltipInstance=null),this._eventCleanups.forEach(e=>e()),this._eventCleanups.length=0,this._destroyed.next(),this._destroyed.complete(),this._isDestroyed=!0,this._ariaDescriber.removeDescription(t,this.message,"tooltip"),this._focusMonitor.stopMonitoring(t)}show(t=this.showDelay,e){if(this.disabled||!this.message||this._isTooltipVisible()){this._tooltipInstance?._cancelPendingAnimations();return}let o=this._createOverlay(e);this._detach(),this._portal=this._portal||new xt(this._tooltipComponent,this._viewContainerRef);let n=this._tooltipInstance=o.attach(this._portal).instance;n._triggerElement=this._elementRef.nativeElement,n._mouseLeaveHideDelay=this._hideDelay,n.afterHidden().pipe(p(this._destroyed)).subscribe(()=>this._detach()),this._setTooltipClass(this._tooltipClass),this._updateTooltipMessage(),n.show(t)}hide(t=this.hideDelay){let e=this._tooltipInstance;e&&(e.isVisible()?e.hide(t):(e._cancelPendingAnimations(),this._detach()))}toggle(t){this._isTooltipVisible()?this.hide():this.show(void 0,t)}_isTooltipVisible(){return!!this._tooltipInstance&&this._tooltipInstance.isVisible()}_createOverlay(t){if(this._overlayRef){let a=this._overlayRef.getConfig().positionStrategy;if((!this.positionAtOrigin||!t)&&a._origin instanceof u)return this._overlayRef;this._detach()}let e=this._injector.get(Tt).getAncestorScrollContainers(this._elementRef),o=`${this._cssClassPrefix}-${zt}`,n=Pt(this._injector,this.positionAtOrigin?t||this._elementRef:this._elementRef).withTransformOriginOn(`.${this._cssClassPrefix}-tooltip`).withFlexibleDimensions(!1).withViewportMargin(this._viewportMargin).withScrollableContainers(e).withPopoverLocation("global");return n.positionChanges.pipe(p(this._destroyed)).subscribe(a=>{this._updateCurrentPositionClass(a.connectionPair),this._tooltipInstance&&a.scrollableViewProperties.isOverlayClipped&&this._tooltipInstance.isVisible()&&this._ngZone.run(()=>this.hide(0))}),this._overlayRef=Dt(this._injector,{direction:this._dir,positionStrategy:n,panelClass:this._overlayPanelClass?[...this._overlayPanelClass,o]:o,scrollStrategy:this._injector.get(Xt)(),disableAnimations:this._animationsDisabled,eventPredicate:this._overlayEventPredicate}),this._updatePosition(this._overlayRef),this._overlayRef.detachments().pipe(p(this._destroyed)).subscribe(()=>this._detach()),this._overlayRef.outsidePointerEvents().pipe(p(this._destroyed)).subscribe(()=>this._tooltipInstance?._handleBodyInteraction()),this._overlayRef.keydownEvents().pipe(p(this._destroyed)).subscribe(a=>{a.preventDefault(),a.stopPropagation(),this._ngZone.run(()=>this.hide(0))}),this._defaultOptions?.disableTooltipInteractivity&&this._overlayRef.addPanelClass(`${this._cssClassPrefix}-tooltip-panel-non-interactive`),this._dirSubscribed||(this._dirSubscribed=!0,this._dir.change.pipe(p(this._destroyed)).subscribe(()=>{this._overlayRef&&this._updatePosition(this._overlayRef)})),this._overlayRef}_detach(){this._overlayRef&&this._overlayRef.hasAttached()&&this._overlayRef.detach(),this._tooltipInstance=null}_updatePosition(t){let e=t.getConfig().positionStrategy,o=this._getOrigin(),n=this._getOverlayPosition();e.withPositions([this._addOffset(y(y({},o.main),n.main)),this._addOffset(y(y({},o.fallback),n.fallback))])}_addOffset(t){let e=Qt,o=!this._dir||this._dir.value=="ltr";return t.originY==="top"?t.offsetY=-e:t.originY==="bottom"?t.offsetY=e:t.originX==="start"?t.offsetX=o?-e:e:t.originX==="end"&&(t.offsetX=o?e:-e),t}_getOrigin(){let t=!this._dir||this._dir.value=="ltr",e=this.position,o;e=="above"||e=="below"?o={originX:"center",originY:e=="above"?"top":"bottom"}:e=="before"||e=="left"&&t||e=="right"&&!t?o={originX:"start",originY:"center"}:(e=="after"||e=="right"&&t||e=="left"&&!t)&&(o={originX:"end",originY:"center"});let{x:n,y:a}=this._invertPosition(o.originX,o.originY);return{main:o,fallback:{originX:n,originY:a}}}_getOverlayPosition(){let t=!this._dir||this._dir.value=="ltr",e=this.position,o;e=="above"?o={overlayX:"center",overlayY:"bottom"}:e=="below"?o={overlayX:"center",overlayY:"top"}:e=="before"||e=="left"&&t||e=="right"&&!t?o={overlayX:"end",overlayY:"center"}:(e=="after"||e=="right"&&t||e=="left"&&!t)&&(o={overlayX:"start",overlayY:"center"});let{x:n,y:a}=this._invertPosition(o.overlayX,o.overlayY);return{main:o,fallback:{overlayX:n,overlayY:a}}}_updateTooltipMessage(){this._tooltipInstance&&(this._tooltipInstance.message=this.message,this._tooltipInstance._markForCheck(),G(()=>{this._tooltipInstance&&this._overlayRef.updatePosition()},{injector:this._injector}))}_setTooltipClass(t){this._tooltipInstance&&(this._tooltipInstance.tooltipClass=t instanceof Set?Array.from(t):t,this._tooltipInstance._markForCheck())}_invertPosition(t,e){return this.position==="above"||this.position==="below"?e==="top"?e="bottom":e==="bottom"&&(e="top"):t==="end"?t="start":t==="start"&&(t="end"),{x:t,y:e}}_updateCurrentPositionClass(t){let{overlayY:e,originX:o,originY:n}=t,a;if(e==="center"?this._dir&&this._dir.value==="rtl"?a=o==="end"?"left":"right":a=o==="start"?"left":"right":a=e==="bottom"&&n==="top"?"above":"below",a!==this._currentPosition){let d=this._overlayRef;if(d){let v=`${this._cssClassPrefix}-${zt}-`;d.removePanelClass(v+this._currentPosition),d.addPanelClass(v+a)}this._currentPosition=a}}_setupPointerEnterEventsIfNeeded(){this._disabled||!this.message||!this._viewInitialized||this._eventCleanups.length||(this._isTouchPlatform()?this.touchGestures!=="off"&&(this._disableNativeGesturesIfNecessary(),this._addListener("touchstart",t=>{let e=t.targetTouches?.[0],o=e?{x:e.clientX,y:e.clientY}:void 0;this._setupPointerExitEventsIfNeeded(),this._touchstartTimeout&&clearTimeout(this._touchstartTimeout);let n=500;this._touchstartTimeout=setTimeout(()=>{this._touchstartTimeout=null,this.show(void 0,o)},this._defaultOptions?.touchLongPressShowDelay??n)})):this._addListener("mouseenter",t=>{this._setupPointerExitEventsIfNeeded();let e;t.x!==void 0&&t.y!==void 0&&(e=t),this.show(void 0,e)}))}_setupPointerExitEventsIfNeeded(){if(!this._pointerExitEventsInitialized){if(this._pointerExitEventsInitialized=!0,!this._isTouchPlatform())this._addListener("mouseleave",t=>{let e=t.relatedTarget;(!e||!this._overlayRef?.overlayElement.contains(e))&&this.hide()}),this._addListener("wheel",t=>{if(this._isTooltipVisible()){let e=this._document.elementFromPoint(t.clientX,t.clientY),o=this._elementRef.nativeElement;e!==o&&!o.contains(e)&&this.hide()}});else if(this.touchGestures!=="off"){this._disableNativeGesturesIfNecessary();let t=()=>{this._touchstartTimeout&&clearTimeout(this._touchstartTimeout),this.hide(this._defaultOptions?.touchendHideDelay)};this._addListener("touchend",t),this._addListener("touchcancel",t)}}}_addListener(t,e){this._eventCleanups.push(this._renderer.listen(this._elementRef.nativeElement,t,e,Wt))}_isTouchPlatform(){let t=this._defaultOptions?.detectHoverCapability;return typeof t=="function"?!t():this._platform.IOS||this._platform.ANDROID?!0:this._platform.isBrowser?!!t&&this._mediaMatcher.matchMedia("(any-hover: none)").matches:!1}_disableNativeGesturesIfNecessary(){let t=this.touchGestures;if(t!=="off"){let e=this._elementRef.nativeElement,o=e.style;(t==="on"||e.nodeName!=="INPUT"&&e.nodeName!=="TEXTAREA")&&(o.userSelect=o.msUserSelect=o.webkitUserSelect=o.MozUserSelect="none"),(t==="on"||!e.draggable)&&(o.webkitUserDrag="none"),o.touchAction="none",o.webkitTapHighlightColor="transparent"}}_syncAriaDescription(t){this._ariaDescriptionPending||(this._ariaDescriptionPending=!0,this._ariaDescriber.removeDescription(this._elementRef.nativeElement,t,"tooltip"),this._isDestroyed||G({write:()=>{this._ariaDescriptionPending=!1,this.message&&!this.disabled&&this._ariaDescriber.describe(this._elementRef.nativeElement,this.message,"tooltip")}},{injector:this._injector}))}_overlayEventPredicate=t=>t.type==="keydown"?this._isTooltipVisible()&&t.keyCode===27&&!gt(t):!0;static \u0275fac=function(e){return new(e||i)};static \u0275dir=C({type:i,selectors:[["","matTooltip",""]],hostAttrs:[1,"mat-mdc-tooltip-trigger"],hostVars:2,hostBindings:function(e,o){e&2&&w("mat-mdc-tooltip-disabled",o.disabled)},inputs:{position:[0,"matTooltipPosition","position"],positionAtOrigin:[0,"matTooltipPositionAtOrigin","positionAtOrigin"],disabled:[0,"matTooltipDisabled","disabled"],showDelay:[0,"matTooltipShowDelay","showDelay"],hideDelay:[0,"matTooltipHideDelay","hideDelay"],touchGestures:[0,"matTooltipTouchGestures","touchGestures"],message:[0,"matTooltip","message"],tooltipClass:[0,"matTooltipClass","tooltipClass"]},exportAs:["matTooltip"]})}return i})(),Ht=(()=>{class i{_changeDetectorRef=s(st);_elementRef=s(u);_isMultiline=!1;message;tooltipClass;_showTimeoutId;_hideTimeoutId;_triggerElement;_mouseLeaveHideDelay;_animationsDisabled=U();_tooltip;_closeOnInteraction=!1;_isVisible=!1;_onHide=new H;_showAnimation="mat-mdc-tooltip-show";_hideAnimation="mat-mdc-tooltip-hide";show(t){this._hideTimeoutId!=null&&clearTimeout(this._hideTimeoutId),this._showTimeoutId=setTimeout(()=>{this._toggleVisibility(!0),this._showTimeoutId=void 0},t)}hide(t){this._showTimeoutId!=null&&clearTimeout(this._showTimeoutId),this._hideTimeoutId=setTimeout(()=>{this._toggleVisibility(!1),this._hideTimeoutId=void 0},t)}afterHidden(){return this._onHide}isVisible(){return this._isVisible}ngOnDestroy(){this._cancelPendingAnimations(),this._onHide.complete(),this._triggerElement=null}_handleBodyInteraction(){this._closeOnInteraction&&this.hide(0)}_markForCheck(){this._changeDetectorRef.markForCheck()}_handleMouseLeave({relatedTarget:t}){(!t||!this._triggerElement.contains(t))&&(this.isVisible()?this.hide(this._mouseLeaveHideDelay):this._finalizeAnimation(!1))}_onShow(){this._isMultiline=this._isTooltipMultiline(),this._markForCheck()}_isTooltipMultiline(){let t=this._elementRef.nativeElement.getBoundingClientRect();return t.height>Zt&&t.width>=Kt}_handleAnimationEnd({animationName:t}){(t===this._showAnimation||t===this._hideAnimation)&&this._finalizeAnimation(t===this._showAnimation)}_cancelPendingAnimations(){this._showTimeoutId!=null&&clearTimeout(this._showTimeoutId),this._hideTimeoutId!=null&&clearTimeout(this._hideTimeoutId),this._showTimeoutId=this._hideTimeoutId=void 0}_finalizeAnimation(t){t?this._closeOnInteraction=!0:this.isVisible()||this._onHide.next()}_toggleVisibility(t){let e=this._tooltip.nativeElement,o=this._showAnimation,n=this._hideAnimation;if(e.classList.remove(t?n:o),e.classList.add(t?o:n),this._isVisible!==t&&(this._isVisible=t,this._changeDetectorRef.markForCheck()),t&&!this._animationsDisabled&&typeof getComputedStyle=="function"){let a=getComputedStyle(e);(a.getPropertyValue("animation-duration")==="0s"||a.getPropertyValue("animation-name")==="none")&&(this._animationsDisabled=!0)}t&&this._onShow(),this._animationsDisabled&&(e.classList.add("_mat-animation-noopable"),this._finalizeAnimation(t))}static \u0275fac=function(e){return new(e||i)};static \u0275cmp=(function(){let t=["tooltip"];return h({type:i,selectors:[["mat-tooltip-component"]],viewQuery:function(o,n){if(o&1&&nt(t,7),o&2){let a;I(a=S())&&(n._tooltip=a.first)}},hostAttrs:["aria-hidden","true"],hostBindings:function(o,n){o&1&&D("mouseleave",function(d){return n._handleMouseLeave(d)})},decls:4,vars:5,consts:[["tooltip",""],[1,"mdc-tooltip","mat-mdc-tooltip",3,"animationend"],[1,"mat-mdc-tooltip-surface","mdc-tooltip__surface"]],template:function(o,n){o&1&&(Y(0,"div",1,0),et("animationend",function(d){return n._handleAnimationEnd(d)}),Y(2,"div",2),m(3),tt()()),o&2&&(O(n.tooltipClass),w("mdc-tooltip--multiline",n._isMultiline),g(3),at(n.message))},styles:[`.mat-mdc-tooltip {
  position: relative;
  transform: scale(0);
  display: inline-flex;
}
.mat-mdc-tooltip::before {
  content: "";
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  z-index: -1;
  position: absolute;
}
.mat-mdc-tooltip-panel-below .mat-mdc-tooltip::before {
  top: -8px;
}
.mat-mdc-tooltip-panel-above .mat-mdc-tooltip::before {
  bottom: -8px;
}
.mat-mdc-tooltip-panel-right .mat-mdc-tooltip::before {
  left: -8px;
}
.mat-mdc-tooltip-panel-left .mat-mdc-tooltip::before {
  right: -8px;
}
.mat-mdc-tooltip._mat-animation-noopable {
  animation: none;
  transform: scale(1);
}

.mat-mdc-tooltip-surface {
  word-break: normal;
  overflow-wrap: anywhere;
  padding: 4px 8px;
  min-width: 40px;
  max-width: 200px;
  min-height: 24px;
  max-height: 40vh;
  box-sizing: border-box;
  overflow: hidden;
  text-align: center;
  will-change: transform, opacity;
  background-color: var(--%NS%mat-tooltip-container-color, var(--%NS%mat-sys-inverse-surface));
  color: var(--%NS%mat-tooltip-supporting-text-color, var(--%NS%mat-sys-inverse-on-surface));
  border-radius: var(--%NS%mat-tooltip-container-shape, var(--%NS%mat-sys-corner-extra-small));
  font-family: var(--%NS%mat-tooltip-supporting-text-font, var(--%NS%mat-sys-body-small-font));
  font-size: var(--%NS%mat-tooltip-supporting-text-size, var(--%NS%mat-sys-body-small-size));
  font-weight: var(--%NS%mat-tooltip-supporting-text-weight, var(--%NS%mat-sys-body-small-weight));
  line-height: var(--%NS%mat-tooltip-supporting-text-line-height, var(--%NS%mat-sys-body-small-line-height));
  letter-spacing: var(--%NS%mat-tooltip-supporting-text-tracking, var(--%NS%mat-sys-body-small-tracking));
}
.mat-mdc-tooltip-surface::before {
  position: absolute;
  box-sizing: border-box;
  width: 100%;
  height: 100%;
  top: 0;
  left: 0;
  border: 1px solid transparent;
  border-radius: inherit;
  content: "";
  pointer-events: none;
}
.mdc-tooltip--multiline .mat-mdc-tooltip-surface {
  text-align: left;
}
[dir=rtl] .mdc-tooltip--multiline .mat-mdc-tooltip-surface {
  text-align: right;
}

.mat-mdc-tooltip-panel {
  line-height: normal;
}
.mat-mdc-tooltip-panel.mat-mdc-tooltip-panel-non-interactive {
  pointer-events: none;
}

@keyframes mat-mdc-tooltip-show {
  0% {
    opacity: 0;
    transform: scale(0.8);
  }
  100% {
    opacity: 1;
    transform: scale(1);
  }
}
@keyframes mat-mdc-tooltip-hide {
  0% {
    opacity: 1;
    transform: scale(1);
  }
  100% {
    opacity: 0;
    transform: scale(0.8);
  }
}
.mat-mdc-tooltip-show {
  animation: mat-mdc-tooltip-show 150ms cubic-bezier(0, 0, 0.2, 1) forwards;
}

.mat-mdc-tooltip-hide {
  animation: mat-mdc-tooltip-hide 75ms cubic-bezier(0.4, 0, 1, 1) forwards;
}
`],encapsulation:2})})()}return i})();var jt=(()=>{class i{static \u0275fac=function(e){return new(e||i)};static \u0275mod=_({type:i});static \u0275inj=f({imports:[ut,It,E,Mt]})}return i})();var L=class i{static{this.\u0275fac=function(t){return new(t||i)}}static{this.\u0275cmp=h({type:i,selectors:[["ejw-confirm-nav"]],decls:9,vars:1,consts:[["mat-dialog-title",""],["mat-dialog-actions",""],["mat-button","","mat-dialog-close","","cdkFocusInitial",""],["mat-button","",3,"mat-dialog-close"]],template:function(t,e){t&1&&(l(0,"h1",0),m(1,"You sure..."),r(),l(2,"p"),m(3,"This will end your current game and go back to the main page!"),r(),l(4,"div",1)(5,"button",2),m(6,"Keep playing"),r(),l(7,"button",3),m(8,"Ok"),r()()),t&2&&(g(7),P("mat-dialog-close",!0))},dependencies:[A,vt,N,Ot,Rt,Et],encapsulation:2})}};function ee(i,c){i&1&&(l(0,"a",10),b(1,"img",11),r())}var z=class i{constructor(c,t){this.router=c;this.dialog=t;this.isWeb=!0;this.appTitle=yt;this.unregisterStaleServiceWorkers()}unregisterStaleServiceWorkers(){typeof navigator<"u"&&"serviceWorker"in navigator&&navigator.serviceWorker.getRegistrations().then(c=>{c.length>0&&Promise.all(c.map(t=>t.unregister())).then(()=>{typeof caches<"u"&&caches.keys().then(t=>Promise.all(t.map(e=>caches.delete(e))))})})}navHome(){this.router.url==="/game"&&this.dialog.open(L).afterClosed().subscribe(t=>{t&&this.router.navigate(["/"])})}static{this.\u0275fac=function(t){return new(t||i)(F(pt),F(St))}}static{this.\u0275cmp=h({type:i,selectors:[["ejw-root"]],decls:18,vars:1,consts:[["id","app-container"],["color","primary"],[1,"home-link",3,"click"],[1,"griddin-icon"],[1,"logo"],[1,"spacer"],["matTooltip","Turbogeekbear website has been disabled","matTooltipPosition","left","target","_blank"],[1,"turbogeekbear-icon"],["href","https://github.com/daveteply/emoji-swap","matTooltip","Check out the code on GitHub!","matTooltipPosition","left","target","_blank",4,"ngIf"],[1,"footer-content"],["href","https://github.com/daveteply/emoji-swap","matTooltip","Check out the code on GitHub!","matTooltipPosition","left","target","_blank"],["src","assets/GitHub-Mark-32px.png","alt","image of GitHub-Mark"]],template:function(t,e){t&1&&(l(0,"div",0)(1,"header")(2,"mat-toolbar",1)(3,"div",2),D("click",function(){return e.navHome()}),b(4,"div",3)(5,"div",4),r(),b(6,"span",5),l(7,"a",6),b(8,"div",7),r(),J(9,ee,2,0,"a",8),r()(),l(10,"main"),b(11,"router-outlet"),r(),l(12,"footer")(13,"p",9),m(14,"Use the "),l(15,"b"),m(16,"Hint button"),r(),m(17," if you're stuck. Watch out--it'll cost you points!"),r()()()),t&2&&(g(9),P("ngIf",e.isWeb))},dependencies:[mt,lt,T,dt,Lt,kt,jt,$,wt,A,N],styles:['#app-container[_ngcontent-%COMP%]{background-color:#fff;height:100%;display:grid;grid-template-rows:4.5em auto 5em}@media screen and (min-width:600px){#app-container[_ngcontent-%COMP%]{margin:auto;max-width:600px}}#app-container[_ngcontent-%COMP%]   header[_ngcontent-%COMP%]   .home-link[_ngcontent-%COMP%]{background:none;border:none;color:inherit;display:flex;align-items:baseline}#app-container[_ngcontent-%COMP%]   header[_ngcontent-%COMP%]   .home-link[_ngcontent-%COMP%]   .logo[_ngcontent-%COMP%]{margin-top:.65em;width:12em;height:3em;background-image:url("./media/Griddin-logo-01-YYOUP3D3.webp");background-position:center center;background-repeat:no-repeat;background-size:contain}#app-container[_ngcontent-%COMP%]   header[_ngcontent-%COMP%]   .turbogeekbear-icon[_ngcontent-%COMP%]{width:2em;height:2em;background-image:url("./media/Turbogeekbear_bear_01s-LSKOFVSA.webp");background-position:center center;background-repeat:no-repeat;background-size:contain;padding-right:1em;filter:grayscale(1)}#app-container[_ngcontent-%COMP%]   header[_ngcontent-%COMP%]   .spacer[_ngcontent-%COMP%]{flex:1 1 auto}#app-container[_ngcontent-%COMP%]   footer[_ngcontent-%COMP%]{margin:.5em;border-radius:1em;max-width:600px;background-color:#d3d3d3}#app-container[_ngcontent-%COMP%]   footer[_ngcontent-%COMP%]   .footer-content[_ngcontent-%COMP%]{text-align:center;padding:.5em}.mat-toolbar[_ngcontent-%COMP%]{height:60px}@supports (padding: max(0px)){#app-container[_ngcontent-%COMP%]{box-sizing:border-box;padding-top:max(.5em,env(safe-area-inset-top));padding-bottom:max(.5em,env(safe-area-inset-bottom));background-image:linear-gradient(0deg,#fff 90%,#673ab7 10%)}}']})}};At.production&&void 0;ct(z,{providers:[rt({eventCoalescing:!0}),Q(k)]}).catch(i=>console.error(i));
