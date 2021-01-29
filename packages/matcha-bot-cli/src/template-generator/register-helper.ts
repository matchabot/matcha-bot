import Handlebars from "handlebars"

import _ from "lodash"
import moment from "moment"

export interface HelperDelegate {
  (
    context?: any,
    arg1?: any,
    arg2?: any,
    arg3?: any,
    arg4?: any,
    arg5?: any
  ): any
}

export const registerHelper = function (name: string, fn: HelperDelegate) {
  Handlebars.registerHelper(name, fn)
}

export const registerHelpers = () => {
  registerHelper("camelCase", function (s) {
    return _.camelCase(s)
  })

  registerHelper("upperCamelCase", function (s) {
    return _.upperFirst(_.camelCase(s))
  })

  registerHelper("snakeCase", function (s) {
    return _.snakeCase(s)
  })

  registerHelper("kebabCase", function (s) {
    return _.kebabCase(s)
  })

  registerHelper("toLowerCase", function (s) {
    return s.toLowerCase()
  })

  registerHelper("toUpperCase", function (s) {
    return s.toUpperCase()
  })

  registerHelper("formatDate", function (d, format) {
    return moment(d).format(format)
  })

  registerHelper("currentDate", function () {
    return moment()
  })
}
