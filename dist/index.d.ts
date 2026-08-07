/**
 * ValiNum v2
 */
import { validateDRC } from "./countries/drc";
export * from "./types";
export * from "./core/normalize";
export * from "./core/parser";
export * from "./core/validator";
export * from "./core/formatter";
/**
 * Validate a Democratic Republic of the Congo
 * phone number.
 */
export declare const validate: typeof validateDRC;
