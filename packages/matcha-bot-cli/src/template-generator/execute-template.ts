import Handlebars from "handlebars"
import { registerHelpers } from "./register-helper"

registerHelpers()

/**
 *
 * @param templateSpec
 * @param data
 */
export const executeTemplate = (
  templateSpec: string,
  data: Record<string, unknown>
) => {
  const template = Handlebars.compile(templateSpec)
  const output = template(data)
  return output
}
