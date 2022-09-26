import { finder } from "@medv/finder"
import querySelectorAllWithHas from "~polyfill-css-has"
import type { PlasmoContentScript } from "plasmo"

export const config: PlasmoContentScript = {
  matches: ["<all_urls>"],
  all_frames: true
}

window.addEventListener("load", () => {
    let isPressingQ = false // 任意のキーコンビネーションをやるため。
    document.addEventListener("keydown", e => isPressingQ = (e.key === "q"))
    document.addEventListener("keyup", e => isPressingQ = !(e.key === "q"))

    document.addEventListener('click', (e) => {
        const target = e.target as HTMLElement
        if (!isPressingQ || target.tagName !== "IMG") { return }

        const clickedElSelector = finder(target)
        const tweetSelector = `article:has(${clickedElSelector})`
        const tweet = querySelectorAllWithHas(tweetSelector)

        console.log(isPressingQ)
        console.log(e)
        console.log(target)
        console.log(tweetSelector)
        console.log(tweet)

    })


  console.log("content script loaded")
  document.body.style.background = "beige"
})