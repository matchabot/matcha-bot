import Handlebars from "handlebars";
import Ejs from "ejs";
import { registerHelpers, EjsContext } from "./register-helper";

type generatorType = "handlebars" | "ejs";

registerHelpers();

/**
 *
 * @param templateSpec
 * @param data
 */
export const executeTemplate = (
  templateSpec: string,
  data: Record<string, unknown>,
  generatorType: generatorType = "handlebars"
) => {
  switch (generatorType) {
    case "handlebars":
      return executeHandleBar(templateSpec, data);
    case "ejs":
      return executeEjs(templateSpec, data);
  }
};

const executeHandleBar = (
  templateSpec: string,
  data: Record<string, unknown>
) => {
  const template = Handlebars.compile(templateSpec);
  const output = template(data);
  return output;
};

const executeEjs = (templateSpec: string, data: Record<string, unknown>) => {
  const template = Ejs.compile(templateSpec);
  const output = template({ ...data, ...EjsContext });
  return output;
};
