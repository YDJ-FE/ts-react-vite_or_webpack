import { useContext } from 'react'

import { RootContext } from '@shared/App/Provider'

export default function useRootStore() {
    return useContext(RootContext)
}
