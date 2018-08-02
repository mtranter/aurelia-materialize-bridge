// the following two imports are needed for consumer TS projects
// without them types will not be found
import "./augmentation/element";
import "./augmentation/materialize";
import "./augmentation/aurelia-typed-observable";
import "./polyfills/append";
import "./polyfills/remove";
import { FrameworkConfiguration, autoinject } from "aurelia-framework";
import { ConfigBuilder } from "./config-builder";

export function configure(frameworkConfiguration: FrameworkConfiguration, configCallback) {
	const builder = frameworkConfiguration.container.get(ConfigBuilder);

	if (configCallback !== undefined && typeof (configCallback) === "function") {
		configCallback(builder);
	}

	if (builder.useGlobalResources) {
		frameworkConfiguration.globalResources(builder.globalResources);
	}
}

// build-index-remove start
export * from "./exports";
// build-index-remove end
