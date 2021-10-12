import React, {useRef, useState} from 'react'
import {OverlayProps} from '../Overlay'
import {AnchoredOverlay} from '../AnchoredOverlay'
import {FocusTrapHookSettings} from '../hooks/useFocusTrap'
import {FocusZoneHookSettings} from '../hooks/useFocusZone'
import {DatePickerAnchor} from './DatePickerAnchor'
import {addDays} from 'date-fns'
import {Month} from './Month'

export interface DatePickerProps {
  /**
   * An override to the internal ref that will be spread on to the renderAnchor
   */
  anchorRef?: React.RefObject<HTMLElement>
  anchorVariant?: 'full' | 'iconOnly'
  /**
   * Settings to apply to the Focus Zone on the internal `Overlay` component.
   */
  focusTrapSettings?: Partial<FocusTrapHookSettings>

  /**
   * Settings to apply to the Focus Zone on the internal `Overlay` component.
   */
  focusZoneSettings?: Partial<FocusZoneHookSettings>
  initialValue?: 'today' | Date | string | null
  placeholder?: string
  /**
   * Determines whether the overlay portion of the component should be shown or not
   */
  open?: boolean

  /**
   * A callback which is called whenever the overlay is currently closed and an "open gesture" is detected.
   */
  onOpen?: (gesture: 'anchor-click' | 'anchor-key-press') => unknown

  /**
   * A callback which is called whenever the overlay is currently open and a "close gesture" is detected.
   */
  onClose?: (gesture: 'anchor-click' | 'click-outside' | 'escape') => unknown

  /**
   * Props to be spread on the internal `Overlay` component.
   */
  overlayProps?: Partial<OverlayProps>
  /**
   * A custom function component used to render the anchor element.
   * Will receive the selected text as `children` prop when an item is activated.
   */
  renderAnchor: <T extends React.HTMLAttributes<HTMLElement>>(props: T) => JSX.Element
  value?: Date | string | null
}

export const DatePicker: React.FC<DatePickerProps> = ({
  anchorRef: externalAnchorRef,
  focusTrapSettings,
  focusZoneSettings,
  onOpen: onOpenExternal,
  onClose: onCloseExternal,
  open,
  overlayProps,
  renderAnchor
}) => {
  const buttonRef = useRef<HTMLButtonElement>(null)
  const [isOpen, setIsOpen] = useState(false)

  const onOpen = (gesture: 'anchor-click' | 'anchor-key-press') => {
    setIsOpen(true)
    onOpenExternal?.(gesture)
  }

  const onClose = (gesture: 'anchor-click' | 'click-outside' | 'escape') => {
    setIsOpen(false)
    onCloseExternal?.(gesture)
  }

  const toggleIsOpen = () => {
    if (isOpen) {
      setIsOpen(false)
      onCloseExternal?.('anchor-click')
    } else {
      setIsOpen(true)
      onCloseExternal?.('anchor-click')
    }
  }

  return (
    <>
      <DatePickerAnchor
        ref={buttonRef}
        fromDate={new Date()}
        toDate={addDays(new Date(), 7)}
        dateFormat="short"
        onAction={toggleIsOpen}
      />
      <AnchoredOverlay
        anchorRef={externalAnchorRef ?? buttonRef}
        renderAnchor={renderAnchor}
        open={open ?? isOpen}
        onOpen={onOpen}
        onClose={onClose}
        overlayProps={overlayProps}
        focusTrapSettings={focusTrapSettings}
        focusZoneSettings={focusZoneSettings}
      >
        <Month month={new Date().getMonth()} year={new Date().getFullYear()} />
      </AnchoredOverlay>
    </>
  )
}