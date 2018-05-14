import * as au from "../aurelia";
import { shadeBlendConvert } from "../common/shade-blend-convert";

@au.customElement("md-colors")
export class MdColors {
	constructor(private cs: au.MdColorsService, private bindingEngine: au.BindingEngine) {

	}

	@au.bindable
	primaryColor: string = this.cs.primaryColor;
	primaryColorChanged() {
		this.cs.primaryColor = this.primaryColor;
	}

	@au.bindable
	accentColor: string = this.cs.accentColor;
	accentColorChanged() {
		this.cs.accentColor = this.accentColor;
	}

	@au.bindable
	errorColor: string = this.cs.errorColor;
	errorColorChanged() {
		this.cs.errorColor = this.errorColor;
	}

	@au.bindable
	successColor: string = this.cs.successColor;
	successColorChanged() {
		this.cs.successColor = this.successColor;
	}

	subscriptions: au.Disposable[] = [];

	attached() {
		this.subscriptions.push(this.bindingEngine.propertyObserver(this.cs, "primaryColor").subscribe(() => this.primaryColor = this.cs.primaryColor));
		this.subscriptions.push(this.bindingEngine.propertyObserver(this.cs, "accentColor").subscribe(() => this.accentColor = this.cs.accentColor));
		this.subscriptions.push(this.bindingEngine.propertyObserver(this.cs, "errorColor").subscribe(() => this.errorColor = this.cs.errorColor));
		this.subscriptions.push(this.bindingEngine.propertyObserver(this.cs, "successColor").subscribe(() => this.successColor = this.cs.successColor));
	}

	detached() {
		this.subscriptions.forEach(x => x.dispose());
	}
}
