import { Button as AntdButton, ButtonProps } from 'antd'

export default function Button(props: ButtonProps) {
  return (
    <AntdButton className='tw-btn tw-btn-primary' {...props}>
      {props.children}
    </AntdButton>
  )
}
