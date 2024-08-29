export type FormButtonProps = {
  type: 'submit' | 'button'
  onClick?: () => void
  isLoading: boolean
  loadingText: string
  text: string
  variant: 'primary' | 'danger'
  disabled?: boolean
}