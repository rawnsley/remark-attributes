import { Extension } from "mdast-util-from-markdown"

/**
 * Fully-configured extension to add Heading ID nodes to Markdown.
 **/
export function mdastAttributes(): Extension {
  return {
    enter: {
      attrs(token) {
        // @ts-expect-error Assume `token` is a `Token`.
        this.enter({type: 'attrs', value: null}, token)
        this.buffer()
      }
    },
    exit: {
      attrs(token) {
        const attrs = this.resume()
        const node = this.stack[this.stack.length - 1]
        this.exit(token)
        // @ts-expect-error Assume `node` is a `AttrsNode`.
        node.value = attrs
      }
    }
  }
}
