import figlet from "figlet"
import gradient from "gradient-string"
import { version } from "./version"

/**
 * A nice banner thanks to figlet and gradient-string
 * @param banner
 */
export const printBanner = (banner: string) => {
  console.log(
    gradient.rainbow(
      figlet.textSync(banner, {
        font: "Small"
      })
    )
  )

  console.log(`Version: ${version} 🍵\r\n`)
}
