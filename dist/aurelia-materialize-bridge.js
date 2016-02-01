import 'materialize';
import * as LogManager from 'aurelia-logging';
import {Aurelia} from 'aurelia-framework';
import {bindable,customAttribute,customElement,containerless,inlineView} from 'aurelia-templating';
import {bindingMode,ObserverLocator} from 'aurelia-binding';
import {inject} from 'aurelia-dependency-injection';

export class ClickCounter {
  count = 0;

  increment() {
    this.count++;
  }
}

/**
* Plugin configuration builder
*/
export class ConfigBuilder {

  useGlobalResources: boolean = true;
  globalResources = [];

  useAll(): ConfigBuilder {
    return this
      .useBox()
      .useButton()
      .useCard()
      .useCheckbox()
      .useCollapsible()
      .useColors()
      .useDropdown()
      .useNavbar()
      .useSelect()
      .useSidenav()
      .useSlider()
      .useSwitch()
      .useTabs()
      .useTooltip()
      .useTransitions()
      .useWaves()
      .useWell();
  }

  useBox(): ConfigBuilder {
    this.globalResources.push('./box/box');
    return this;
  }

  useButton(): ConfigBuilder {
    this.globalResources.push('./button/button');
    return this;
  }

  useCard(): ConfigBuilder {
    this.globalResources.push('./card/card');
    return this;
  }

  useCheckbox(): ConfigBuilder {
    this.globalResources.push('./checkbox/checkbox');
    return this;
  }

  /**
  * Use my control
  */
  useClickCounter(): ConfigBuilder {
    this.globalResources.push('./click-counter');
    return this;
  }

  useCollapsible(): ConfigBuilder {
    this.globalResources.push('./collapsible/collapsible');
    return this;
  }

  useColors() : ConfigBuilder {
    this.globalResources.push('./colors/md-colors.html');
    return this;
  }

  useDropdown() : ConfigBuilder {
    // this.globalResources.push('./dropdown/dropdown-element');
    this.globalResources.push('./dropdown/dropdown');
    return this;
  }

  useNavbar(): ConfigBuilder {
    this.globalResources.push('./navbar/navbar');
    return this;
  }

  useSelect(): ConfigBuilder {
    this.globalResources.push('./select/select');
    return this;
  }

  useSidenav(): ConfigBuilder {
    this.globalResources.push('./sidenav/sidenav');
    this.globalResources.push('./sidenav/sidenav-collapse');
    return this;
  }

  useSlider(): ConfigBuilder {
    this.globalResources.push('./slider/slider');
    this.globalResources.push('./slider/slide');
    return this;
  }

  useSwitch(): ConfigBuilder {
    this.globalResources.push('./switch/switch');
    return this;
  }

  /**
   * Use materialized tabs
   */
  useTabs(): ConfigBuilder {
    this.globalResources.push('./tabs/tabs');
    return this;
  }

  useTooltip(): ConfigBuilder {
    this.globalResources.push('./tooltip/tooltip');
    return this;
  }

  useTransitions(): ConfigBuilder {
    this.globalResources.push('./transitions/fadein-image');
    this.globalResources.push('./transitions/staggered-list');
    return this;
  }

  /**
   * Use ripple/waves effect
   */
  useWaves(): ConfigBuilder {
    this.globalResources.push('./waves/waves');
    return this;
  }

  useWell(): ConfigBuilder {
    this.globalResources.push('./well/md-well.html');
    return this;
  }

  /**
  * Don't globalize any resources
  * Allows you to import yourself via <require></require>
  */
  withoutGlobalResources(): ConfigBuilder {
    this.useGlobalResources = false;
    return this;
  }
}

export function configure(aurelia: Aurelia, configCallback?: (builder: ConfigBuilder) => void) {
  let builder = new ConfigBuilder();

  if (configCallback !== undefined && typeof(configCallback) === 'function') {
    configCallback(builder);
  }

  if (builder.useGlobalResources) {
    aurelia.globalResources(builder.globalResources);
  }
}

@customAttribute('md-box')
@inject(Element)
export class MdBox {
  @bindable({
    defaultBindingMode: bindingMode.oneTome
  }) caption;
  constructor(element) {
    this.element = element;
    this.attributeManager = new AttributeManager(this.element);
  }

  attached() {
    this.attributeManager.addClasses('materialboxed');
    if (this.caption) {
      this.attributeManager.addAttributes({ 'data-caption': this.caption });
    }
    // FIXME: thwrows "Uncaught TypeError: Cannot read property 'css' of undefined", but so does the original
    $(this.element).materialbox();
  }

  detached() {
    this.attributeManager.removeAttributes('data-caption');
    this.attributeManager.removeClasses('materialboxed');
  }
}

@customAttribute('md-button')
@inject(Element)
export class MdButton {
  @bindable() disabled = false;
  @bindable() flat = false;
  @bindable() large = false;

  constructor(element) {
    this.attributeManager = new AttributeManager(element);
  }

  attached() {
    let classes = [];

    if (getBooleanFromAttributeValue(this.flat)) {
      classes.push('btn-flat');
    }
    if (getBooleanFromAttributeValue(this.large)) {
      classes.push('btn-large');
    }

    if (classes.length === 0) {
      classes.push('btn');
    }

    if (getBooleanFromAttributeValue(this.disabled)) {
      classes.push('disabled');
    }

    if (!getBooleanFromAttributeValue(this.flat)) {
      classes.push('accent');
    }
    this.attributeManager.addClasses(classes);
  }

  detached() {
    this.attributeManager.removeClasses(['accent', 'btn', 'btn-flat', 'btn-large', 'disabled']);
  }

  disabledChanged(newValue) {
    if (getBooleanFromAttributeValue(newValue)) {
      this.attributeManager.addClasses('disabled');
    } else {
      this.attributeManager.removeClasses('disabled');
    }
  }

  flatChanged(newValue) {
    if (getBooleanFromAttributeValue(newValue)) {
      this.attributeManager.removeClasses(['btn', 'accent']);
      this.attributeManager.addClasses('btn-flat');
    } else {
      this.attributeManager.removeClasses('btn-flat');
      this.attributeManager.addClasses(['btn', 'accent']);
    }
  }
}

@customElement('md-card')
@inject(Element)
export class MdCard {
  @bindable({
    defaultBindingMode: bindingMode.oneTime
  }) mdTitle;

  constructor(element) {

  }
}

@customElement('md-checkbox')
@inject(Element)
export class MdCheckbox {
  static id = 0;
  @bindable({
    defaultBindingMode: bindingMode.twoWay
  }) mdChecked;
  @bindable() mdDisabled;
  @bindable() mdFilledIn;

  constructor(element) {
    this.element = element;
    this.controlId = `md-checkbox-${MdCheckbox.id++}`;
    this.handleChange = this.handleChange.bind(this);
  }

  attached() {
    this.attributeManager = new AttributeManager(this.checkbox);
    if (getBooleanFromAttributeValue(this.mdFilledIn)) {
      this.attributeManager.addClasses('filled-in');
    }
    if (this.mdChecked === null) {
      this.checkbox.indeterminate = true;
    } else {
      this.checkbox.indeterminate = false;
    }
    if (getBooleanFromAttributeValue(this.mdDisabled)) {
      this.checkbox.disabled = true;
    }
    this.checkbox.checked = getBooleanFromAttributeValue(this.mdChecked);
    this.checkbox.addEventListener('change', this.handleChange);
  }

  detached() {
    this.attributeManager.removeClasses(['filled-in', 'disabled']);
    this.checkbox.removeEventListener('change', this.handleChange);
  }

  handleChange() {
    this.mdChecked = this.checkbox.checked;
  }

  mdCheckedChanged(newValue) {
    if (this.checkbox) {
      this.checkbox.checked = !!newValue;
    }
  }

  mdDisabledChanged(newValue) {
    if (this.checkbox) {
      this.checkbox.disabled = !!newValue;
    }
  }
}

@customAttribute('md-collapsible')
@bindable({ name: 'accordion', defaultValue: false })
@bindable({ name: 'popout', defaultValue: false })
@inject(Element)

export class MdCollapsible {
  constructor(element) {
    this.element = element;
    this.attributeManager = new AttributeManager(this.element);
  }

  attached() {
    this.attributeManager.addClasses('collapsible');
    if (getBooleanFromAttributeValue(this.popout)) {
      this.attributeManager.addClasses('popout');
    }
    this.refresh();
  }

  detached() {
    this.attributeManager.removeClasses(['collapsible', 'popout']);
    this.attributeManager.removeAttributes(['data-collapsible']);
  }

  refresh() {
    let accordion = getBooleanFromAttributeValue(this.accordion);
    if (accordion) {
      // this.element.setAttribute('data-collapsible', 'accordion');
      this.attributeManager.addAttributes({ 'data-collapsible': 'accordion' });
    } else {
      // this.element.setAttribute('data-collapsible', 'expandable');
      this.attributeManager.addAttributes({ 'data-collapsible': 'expandable' });
    }

    $(this.element).collapsible({
      accordion
    });
  }

  accordionChanged() {
    this.refresh();
  }
}

/* eslint-disable */
// http://stackoverflow.com/questions/5560248/programmatically-lighten-or-darken-a-hex-color-or-rgb-and-blend-colors
function shadeBlendConvert(p, from, to) {
    if(typeof(p)!="number"||p<-1||p>1||typeof(from)!="string"||(from[0]!='r'&&from[0]!='#')||(typeof(to)!="string"&&typeof(to)!="undefined"))return null; //ErrorCheck
    // if(!this.sbcRip)this.sbcRip=function(d){
    let sbcRip=function(d){
        var l=d.length,RGB=new Object();
        if(l>9){
            d=d.split(",");
            if(d.length<3||d.length>4)return null;//ErrorCheck
            RGB[0]=i(d[0].slice(4)),RGB[1]=i(d[1]),RGB[2]=i(d[2]),RGB[3]=d[3]?parseFloat(d[3]):-1;
        }else{
            switch(l){case 8:case 6:case 3:case 2:case 1:return null;} //ErrorCheck
            if(l<6)d="#"+d[1]+d[1]+d[2]+d[2]+d[3]+d[3]+(l>4?d[4]+""+d[4]:""); //3 digit
            d=i(d.slice(1),16),RGB[0]=d>>16&255,RGB[1]=d>>8&255,RGB[2]=d&255,RGB[3]=l==9||l==5?r(((d>>24&255)/255)*10000)/10000:-1;
        }
        return RGB;}
    var i=parseInt,r=Math.round,h=from.length>9,h=typeof(to)=="string"?to.length>9?true:to=="c"?!h:false:h,b=p<0,p=b?p*-1:p,to=to&&to!="c"?to:b?"#000000":"#FFFFFF",f=sbcRip(from),t=sbcRip(to);
    if(!f||!t)return null; //ErrorCheck
    if(h)return "rgb("+r((t[0]-f[0])*p+f[0])+","+r((t[1]-f[1])*p+f[1])+","+r((t[2]-f[2])*p+f[2])+(f[3]<0&&t[3]<0?")":","+(f[3]>-1&&t[3]>-1?r(((t[3]-f[3])*p+f[3])*10000)/10000:t[3]<0?f[3]:t[3])+")");
    else return "#"+(0x100000000+(f[3]>-1&&t[3]>-1?r(((t[3]-f[3])*p+f[3])*255):t[3]>-1?r(t[3]*255):f[3]>-1?r(f[3]*255):255)*0x1000000+r((t[0]-f[0])*p+f[0])*0x10000+r((t[1]-f[1])*p+f[1])*0x100+r((t[2]-f[2])*p+f[2])).toString(16).slice(f[3]>-1||t[3]>-1?1:3);
}
/* eslint-enable */

export class DarkenValueConverter {
  toView(value, steps) {
    return shadeBlendConvert(-0.3 * parseFloat(steps, 10), value);
  }
}

export class LightenValueConverter {
  toView(value, steps) {
    return shadeBlendConvert(0.3 * parseFloat(steps, 10), value);
  }
}

/**
 * Adds css classes to a given element only if these classes are not already
 * present. Keeps a record of css classes which actually have been added.
 * This way, they can also be removed in a way which keeps the original classes
 * set by the user.
 * Most useful in attached() and detached() handlers.
 */
export class AttributeManager {
  addedClasses = [];
  addedAttributes = {};

  constructor(element) {
    this.element = element;
  }

  addAttributes(attrs) {
    let keys = Object.keys(attrs);
    keys.forEach(k => {
      if (!this.element.getAttribute(k)) {
        this.addedAttributes[k] = attrs[k];
        this.element.setAttribute(k, attrs[k]);
      } else if (this.element.getAttribute(k) !== attrs[k]) {
        this.element.setAttribute(k, attrs[k]);
      }
    });
  }

  removeAttributes(attrs) {
    if (typeof attrs === 'string') {
      attrs = [attrs];
    }
    attrs.forEach(a => {
      if (this.element.getAttribute(a) && !!this.addedAttributes[a]) {
        this.element.removeAttribute(a);
        this.addedAttributes[a] = null;
        delete this.addedAttributes[a];
      }
    });
  }

  addClasses(classes) {
    if (typeof classes === 'string') {
      classes = [classes];
    }
    classes.forEach(c => {
      if (!this.element.classList.contains(c)) {
        this.addedClasses.push(c);
        this.element.classList.add(c);
      }
    });
  }

  removeClasses(classes) {
    if (typeof classes === 'string') {
      classes = [classes];
    }
    classes.forEach(c => {
      if (this.element.classList.contains(c) && this.addedClasses.indexOf(c) > -1) {
        this.element.classList.remove(c);
        this.addedClasses.splice(this.addedClasses.indexOf(c), 1);
      }
    });
  }
}

export function getBooleanFromAttributeValue(value) {
  return (value === true || value === 'true');
}

export const constants = {
  eventPrefix: 'md-on-',
  bindablePrefix: 'md-'
};

/**
* Fire DOM event on an element
* @param element The Element which the DOM event will be fired on
* @param name The Event's name
* @param data Addition data to attach to an event
*/
export function fireEvent(element: Element, name: string, data? = {}) {
  let event = new CustomEvent(name, {
    detail: data,
    bubbles: true
  });
  element.dispatchEvent(event);

  return event;
}

/**
* Fire DOM event on an element with the md-on prefix
* @param element The Element which the DOM event will be fired on
* @param name The Event's name, without md-on prefix
* @param data Addition data to attach to an event
*/
export function fireMaterializeEvent(element: Element, name: string, data? = {}) {
  return fireEvent(element, `${constants.eventPrefix}${name}`, data);
}

@customElement('md-dropdown')
@inject(Element)
export class MdDropdownElement {
  static id = 0;
  @bindable({
    defaultBindingMode: bindingMode.oneTime
  }) alignment = 'left';
  @bindable({
    defaultBindingMode: bindingMode.oneTime
  }) belowOrigin = false;
  @bindable({
    defaultBindingMode: bindingMode.oneTime
  }) constrainWidth = true;
  @bindable({
    defaultBindingMode: bindingMode.oneTime
  }) gutter = 0;
  @bindable({
    defaultBindingMode: bindingMode.oneTime
  }) hover = false;
  @bindable({
    defaultBindingMode: bindingMode.oneTime
  }) mdTitle;
  @bindable({
    defaultBindingMode: bindingMode.oneTime
  }) inDuration = 300;
  @bindable({
    defaultBindingMode: bindingMode.oneTime
  }) outDuration = 225;

  constructor(element) {
    this.element = element;
    this.controlId = `md-dropdown-${MdDropdown.id++}`;
  }
  attached() {
    $(this.element).dropdown({
      alignment: this.alignment,
      belowOrigin: getBooleanFromAttributeValue(this.belowOrigin),
      constrain_width: getBooleanFromAttributeValue(this.constrainWidth),
      gutter: parseInt(this.gutter, 10),
      hover: getBooleanFromAttributeValue(this.hover),
      inDuration: parseInt(this.inDuration, 10),
      outDuration: parseInt(this.outDuration, 10)
    });
  }
}

@customAttribute('md-dropdown')
@inject(Element)
export class MdDropdown {
  @bindable({
    defaultBindingMode: bindingMode.oneTime
  }) activates = '';
  @bindable({
    defaultBindingMode: bindingMode.oneTime
  }) alignment = 'left';
  @bindable({
    defaultBindingMode: bindingMode.oneTime
  }) belowOrigin = false;
  @bindable({
    defaultBindingMode: bindingMode.oneTime
  }) constrainWidth = true;
  @bindable({
    defaultBindingMode: bindingMode.oneTime
  }) gutter = 0;
  @bindable({
    defaultBindingMode: bindingMode.oneTime
  }) hover = false;
  @bindable({
    defaultBindingMode: bindingMode.oneTime
  }) mdTitle;
  @bindable({
    defaultBindingMode: bindingMode.oneTime
  }) inDuration = 300;
  @bindable({
    defaultBindingMode: bindingMode.oneTime
  }) outDuration = 225;

  constructor(element) {
    this.element = element;
    this.attributeManager = new AttributeManager(this.element);
  }

  attached() {
    this.contentAttributeManager = new AttributeManager(document.getElementById(this.activates));

    this.attributeManager.addClasses('dropdown-button');
    this.contentAttributeManager.addClasses('dropdown-content');
    this.attributeManager.addAttributes({ 'data-activates': this.activates });
    $(this.element).dropdown({
      alignment: this.alignment,
      belowOrigin: getBooleanFromAttributeValue(this.belowOrigin),
      constrain_width: getBooleanFromAttributeValue(this.constrainWidth),
      gutter: parseInt(this.gutter, 10),
      hover: getBooleanFromAttributeValue(this.hover),
      inDuration: parseInt(this.inDuration, 10),
      outDuration: parseInt(this.outDuration, 10)
    });
  }

  detached() {
    this.attributeManager.removeAttributes('data-activates');
    this.attributeManager.removeClasses('dropdown-button');
    this.contentAttributeManager.removeClasses('dropdown-content');
  }
}

@customElement('md-navbar')
@inject(Element)
export class MdNavbar {
  @bindable({
    defaultBindingMode: bindingMode.oneTime
  }) fixed;
  fixedAttributeManager;

  constructor(element) {
    this.element = element;
  }

  attached() {
    this.fixedAttributeManager = new AttributeManager(this.fixedAnchor);
    if (getBooleanFromAttributeValue(this.fixed)) {
      this.fixedAttributeManager.addClasses('navbar-fixed');
    }
  }

  detached() {
    if (getBooleanFromAttributeValue(this.fixed)) {
      this.fixedAttributeManager.removeClasses('navbar-fixed');
    }
  }
}

@inject(Element, LogManager)
@customAttribute('md-select')
export class MdSelect {
  @bindable({
    defaultBindingMode: bindingMode.twoWay
  }) selected;
  constructor(element, logManager) {
    this.element = element;
    this.changeHandler = this.handleChangeFromNativeSelect.bind(this);
    this.log = LogManager.getLogger('md-select');
    // this.log = getLogger('md-select');
  }
  attached() {
    $(this.element).material_select();
    $(this.element).on('change', this.changeHandler);
  }

  detached() {
    $(this.element).off('change', this.changeHandler);
    $(this.element).material_select('destroy');
  }

  /*
   * This handler is called when the native <select> changes.
   */
  handleChangeFromNativeSelect() {
    // this.selected = this.element.value;
    this.selected = $(this.element).val();
  }

  selectedChanged() {
    // this.element.value = this.selected;
    $(this.element).val(this.selected);
    $(this.element).material_select();
  }
}

@customAttribute('md-sidenav-collapse')
@inject(Element, ObserverLocator)
export class MdSidenavCollapse {
  @bindable() ref;
  constructor(element, observerLocator) {
    this.element = element;
    this.observerLocator = observerLocator;
  }

  attached() {
    // this.widthSubscription = this.observerLocator.getObserver(this.ref, 'mdWidth')
    //   .subscribe(this.widthChanged.bind(this));
    this.element.setAttribute('data-activates', this.ref.controlId);
    $(this.element).sideNav({
      edge: this.ref.edge || 'left',
      closeOnClick: this.ref.closeOnClick,
      menuWidth: parseInt(this.ref.mdWidth, 10)
    });
  }

  detached() {
    // this.widthSubscription.unsubscribe();
  }

  widthChanged() {
    $(this.element).sideNav({
      edge: this.ref.edge || 'left',
      closeOnClick: this.ref.closeOnClick,
      menuWidth: parseInt(this.ref.mdWidth, 10)
    });
  }
}

@customElement('md-sidenav')
@inject(Element)
export class MdSidenav {
  static id = 0;
  @bindable() closeOnClick = true;
  @bindable() edge = 'left';
  @bindable() fixed = false;
  @bindable() mdWidth = 250;

  constructor(element) {
    this.element = element;
    this.controlId = `md-sidenav-${MdSidenav.id++}`;
  }

  attached() {
    this.attributeManager = new AttributeManager(this.sidenav);
    if (getBooleanFromAttributeValue(this.fixed)) {
      this.attributeManager.addClasses('fixed');
    }
  }

  detached() {
    this.attributeManager.removeClasses('fixed');
  }

  fixedChanged(newValue) {
    if (this.attributeManager) {
      if (newValue) {
        this.attributeManager.addClasses('fixed');
      } else {
        this.attributeManager.removeClasses('fixed');
      }
    }
  }
}

@customElement('md-slide')
@inject(Element)
@containerless()
@inlineView(`
  <template>
  <li>
    <img src.bind="img" />
    <div class="caption" ref="caption">
      <content></content>
    </div>
  </li>
  </template>
`)
export class MdSlide {
  @bindable() captionAlign = 'left';
  @bindable() img;

  constructor(element) {
    this.element = element;
  }

  attached() {
    if (this.captionAlign) {
      let align = `${this.captionAlign}-align`;
      this.caption.classList.add(align);
    }
  }

  detached() {
    if (this.captionAlign) {
      let align = `${this.captionAlign}-align`;
      this.caption.classList.remove(align);
    }
  }
}

@customElement('md-slider')
@inject(Element)
@inlineView(`
  <template class="slider">
  <require from="./slider.css"></require>
  <ul class="slides">
    <content select="li"></content>
  </ul>
  </template>
`)
export class MdSlider {
  @bindable() mdFillContainer = false;
  @bindable() mdHeight = 400;
  @bindable() mdIndicators = true;
  @bindable() mdInterval = 6000;
  @bindable() mdTransition = 500;

  constructor(element) {
    this.element = element;
  }

  attached() {
    if (getBooleanFromAttributeValue(this.mdFillContainer)) {
      this.element.classList.add('fullscreen');
    }
    // $(this.element).slider({full_width: true});
    $(this.element).slider({
      height: parseInt(this.mdHeight, 10),
      indicators: getBooleanFromAttributeValue(this.mdIndicators),
      interval: parseInt(this.mdInterval, 10),
      transition: parseInt(this.mdTransition, 10)
    });
  }
}

@customElement('md-switch')
@inject(Element)
export class MdSwitch {
  @bindable({
    defaultBindingMode: bindingMode.twoWay
  }) mdChecked;
  @bindable() mdLabelOff = 'Off';
  @bindable() mdLabelOn = 'On';

  constructor(element) {
    this.element = element;
    this.handleChange = this.handleChange.bind(this);
  }

  attached() {
    this.checkbox.checked = getBooleanFromAttributeValue(this.mdChecked);
    this.checkbox.addEventListener('change', this.handleChange);
  }

  detached() {
    this.checkbox.removeEventListener('change', this.handleChange);
  }

  handleChange() {
    this.mdChecked = this.checkbox.checked;
  }

  mdCheckedChanged(newValue) {
    if (this.checkbox) {
      this.checkbox.checked = !!newValue;
    }
  }
}

@customAttribute('md-tabs')
@inject(Element)
export class MdTabs {
  constructor(element) {
    this.element = element;
    this.attributeManager = new AttributeManager(this.element);
    this.tabAttributeManagers = [];
  }
  attached() {
    this.attributeManager.addClasses('tabs');

    let children = this.element.querySelectorAll('li');
    [].forEach.call(children, child => {
      let setter = new AttributeManager(child);
      setter.addClasses(['tab', 'primary-text']);
      this.tabAttributeManagers.push(setter);
    });

    $(this.element).tabs();

    let childAnchors = this.element.querySelectorAll('li a');
    [].forEach.call(childAnchors, a => {
      a.addEventListener('click', this.fireTabSelectedEvent.bind(this));
    });
  }
  detached() {
    this.attributeManager.removeClasses('tabs');

    // no destroy handler in tabs

    this.tabAttributeManagers.forEach(setter => {
      setter.removeClasses('tab');
    });
    this.tabAttributeManagers = [];
    let childAnchors = this.element.querySelectorAll('li a');
    [].forEach.call(childAnchors, a => {
      a.removeEventListener('click', this.fireTabSelectedEvent.bind(this));
    });
  }
  fireTabSelectedEvent(e) {
    let href = $(e.target).attr('href');
    fireMaterializeEvent(this.element, 'selected', href);
  }
}

export class MdToastService {
  show(message, displayLength, className) {
    return new Promise((resolve, reject) => {
      Materialize.toast(message, displayLength, className, () => {
        resolve();
      });
    });
  }
}

// @customAttribute('md-tooltip')
@inject(Element)
export class MdTooltip {
  @bindable() position = 'bottom';
  @bindable() delay = 50;
  @bindable() text = '';

  constructor(element) {
    this.element = element;
    this.attributeManager = new AttributeManager(this.element);
  }

  attached() {
    this.attributeManager.addClasses('tooltipped');
    this.attributeManager.addAttributes({ 'data-position': this.position, 'data-tooltip': this.text });
    $(this.element).tooltip({ delay: parseInt(this.delay, 10) });
  }

  detached() {
    $(this.element).tooltip('remove');
    this.attributeManager.removeClasses('tooltipped');
    this.attributeManager.removeAttributes(['data-position', 'data-tooltip']);
  }
}

@customAttribute('md-fadein-image')
@inject(Element)
export class MdFadeinImage {
  @bindable() ref;

  constructor(element) {
    this.element = element;
    this.fadeInImage = this.fadeInImage.bind(this);
  }

  attached() {
    this.element.addEventListener('click', this.fadeInImage);
  }

  detached() {
    this.element.removeEventListener('click', this.fadeInImage);
  }

  fadeInImage() {
    Materialize.fadeInImage(this.ref);
  }
}

@customAttribute('md-staggered-list')
@inject(Element)
export class MdStaggeredList {
  @bindable() ref;

  constructor(element) {
    this.element = element;
    this.staggerList = this.staggerList.bind(this);
  }

  attached() {
    this.element.addEventListener('click', this.staggerList);
  }

  detached() {
    this.element.removeEventListener('click', this.staggerList);
  }

  staggerList() {
    Materialize.showStaggeredList(this.ref);
  }
}

@customAttribute('md-waves')
@inject(Element)
export class MdWaves {
  @bindable({
    defaultBindingMode: bindingMode.oneTime
  }) color;
  constructor(element) {
    this.element = element;
    this.attributeManager = new AttributeManager(this.element);
  }

  attached() {
    let classes = ['waves-effect'];
    if (this.color) {
      classes.push(`waves-${this.color}`);
    }

    this.attributeManager.addClasses(classes);
    Waves.attach(this.element);
  }

  detached() {
    let classes = ['waves-effect'];
    if (this.color) {
      classes.push(`waves-${this.color}`);
    }

    this.attributeManager.removeClasses(classes);
  }
}
