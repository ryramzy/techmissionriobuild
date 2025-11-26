import type { Meta, StoryObj } from "@storybook/react"
import { Button } from "./Button"

const meta: Meta<typeof Button> = {
  title: "UI/Button",
  component: Button,
  args: {
    variant: "primary",
    children: "Button",
    size: "lg",
  },
  argTypes: {
    variant: {
      control: "select",
      options: ["primary", "secondary", "outline"],
    },
    size: {
      control: "select",
      options: ["sm", "default", "lg", "icon"],
    },
    disabled: {
      control: "boolean",
    },
  },
}

export default meta
type Story = StoryObj<typeof Button>

export const Default: Story = {}

export const Secondary: Story = {
  args: {
    variant: "secondary",
  },
}

export const Outline: Story = {
  args: {
    variant: "outline",
  },
}

export const Small: Story = {
  args: {
    size: "sm",
  },
}

export const DefaultSize: Story = {
  args: {
    size: "default",
  },
}

export const Disabled: Story = {
  args: {
    disabled: true,
  },
}
