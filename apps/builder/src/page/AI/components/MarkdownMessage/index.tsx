import copy from "copy-to-clipboard"
import { FC } from "react"
import { useTranslation } from "react-i18next"
import ReactMarkdown from "react-markdown"
import remarkBreaks from "remark-breaks"
import remarkGfm from "remark-gfm"
import {
  CopyIcon,
  Heading,
  Link,
  Paragraph,
  Trigger,
  Typography,
  useMessage,
} from "@illa-design/react"
import { MarkdownMessageProps } from "@/page/AI/components/MarkdownMessage/interface"
import {
  hoverCopyStyle,
  markdownMessageStyle,
} from "@/page/AI/components/MarkdownMessage/style"
import Code from "./Code"
import { convertMarkdownTables } from "./utils"

export const MarkdownMessage: FC<MarkdownMessageProps> = (props) => {
  const { children, isOwnMessage } = props
  const { t } = useTranslation()
  const message = useMessage()

  return (
    <Trigger
      bdRadius="4px"
      content={
        <span
          css={hoverCopyStyle(isOwnMessage)}
          onClick={() => {
            copy(children ?? "")
            message.success({
              content: t("copied"),
            })
          }}
        >
          <CopyIcon />
        </span>
      }
      colorScheme="transparent"
      position={isOwnMessage ? "left-start" : "right-start"}
      showArrow={false}
      autoFitPosition={false}
      withoutPadding
      trigger="hover"
      withoutShadow
    >
      <div>
        <Typography>
          <ReactMarkdown
            css={markdownMessageStyle}
            disallowedElements={["table", "thead", "tbody", "tr", "th", "td"]}
            remarkPlugins={[remarkGfm, remarkBreaks]}
            components={{
              h1: ({ children }) => <Heading level="h1">{children}</Heading>,
              h2: ({ children }) => <Heading level="h2">{children}</Heading>,
              h3: ({ children }) => <Heading level="h3">{children}</Heading>,
              h4: ({ children }) => <Heading level="h4">{children}</Heading>,
              h5: ({ children }) => <Heading level="h5">{children}</Heading>,
              h6: ({ children }) => <Heading level="h6">{children}</Heading>,
              a: ({ href, children }) => (
                <Link href={href} target="_blank" colorScheme="blue">
                  {children}
                </Link>
              ),
              p: ({ children }) => <Paragraph>{children}</Paragraph>,
              code: (props) => <Code {...props} />,
            }}
          >
            {convertMarkdownTables(children ?? "", isOwnMessage)}
          </ReactMarkdown>
        </Typography>
      </div>
    </Trigger>
  )
}

MarkdownMessage.displayName = "MarkdownMessage"
export default MarkdownMessage
