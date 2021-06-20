import { Button as AntdButton, ButtonProps } from 'antd'

export default function Button(props: ButtonProps) {
  return (
    <AntdButton className='btn btn-primary' {...props}>
      {props.children}
    </AntdButton>
  )
}
