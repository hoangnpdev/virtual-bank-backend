import {render, screen} from '@testing-library/react'
import '@testing-library/jest-dom'

import TransferMoneyPage from '@/app/transfer/page'

/**
 * @jest-environment jsdom
 */
test('normal transfer, show popup', async() => {
    render(<TransferMoneyPage />)
    expect(screen.getByRole('heading')).toBeInTheDocument()
})