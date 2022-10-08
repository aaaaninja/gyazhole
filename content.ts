import { finder } from "@medv/finder"
import querySelectorAllWithHas from "~core/polyfill-css-has"
import type { PlasmoContentScript } from "plasmo"

export const config: PlasmoContentScript = {
  matches: ["https://*.twitter.com/*"],
  all_frames: true
}

window.addEventListener("load", () => {
    let isPressingQ = false // 任意のキーコンビネーションをやるため。(shiftやctrlとかだったらEventに含まれてるんだけどね......)
    document.addEventListener("keydown", e => isPressingQ = (e.key === "q"))
    document.addEventListener("keyup", () => isPressingQ = false)

    document.addEventListener('click', (e) => {
        const target = e.target as HTMLElement
        if (!isPressingQ || target.tagName !== "IMG") { return }
        e.stopPropagation()
        e.preventDefault()

        const clickedElSelector = finder(target)
        const tweetSelector = `article:has(${clickedElSelector})`
        const tweet = querySelectorAllWithHas(tweetSelector)

        console.log(isPressingQ)
        console.log(e)
        console.log(target)
        console.log(tweetSelector)
        console.log(tweet)

    }, true)


  console.log("content script loaded")
})
