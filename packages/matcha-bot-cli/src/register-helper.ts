import Handlebars from "handlebars"
import _ from "lodash"
import moment from "moment"

export const registerHelper = () => {
  Handlebars.registerHelper("camelCase", function (s) {
    return _.camelCase(s)
  })

  Handlebars.registerHelper("upperCamelCase", function (s) {
    return _.upperFirst(_.camelCase(s))
  })

  Handlebars.registerHelper("snakeCase", function (s) {
    return _.snakeCase(s)
  })

  Handlebars.registerHelper("toLowerCase", function (s) {
    return s.toLowerCase()
  })

  Handlebars.registerHelper("toUpperCase", function (s) {
    return s.toUpperCase()
  })

  Handlebars.registerHelper("formatDate", function (d, format) {
    return moment(d).format(format)
  })

  Handlebars.registerHelper("currentDate", function () {
    return moment()
  })
}
