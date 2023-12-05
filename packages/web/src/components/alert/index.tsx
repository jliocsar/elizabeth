type TProps = {
  class: string
  type: 'success' | 'info' | 'warning' | 'error'
}

export function Alert({ class: className, type: alertType }: TProps) {
  const icons = {
    success: () => (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        class="alert-icon"
        fill="none"
        viewBox="0 0 24 24"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth="2"
          d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
        />
      </svg>
    ),
    error: () => (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        class="alert-icon"
        fill="none"
        viewBox="0 0 24 24"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth="2"
          d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z"
        />
      </svg>
    ),
    info: null,
    warning: null,
  }
  const Icon = icons[alertType]
  return (
    <div role="alert" class={`alerty alerty-${alertType}`}>
      {Icon ? <Icon /> : null}
      <div class={className} />
    </div>
  )
}
