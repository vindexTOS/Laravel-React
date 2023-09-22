import { createContext, useContext, useState } from 'react'

type Cell = {
  user: any
  token: any
  tokenSet: (token: any) => void
  setUser: React.Dispatch<React.SetStateAction<{}>>
}

const StateContext = createContext<Cell | null>(null)

export const ContextProvider = ({
  children,
}: {
  children: React.ReactNode
}) => {
  const [user, setUser] = useState({})
  const [token, setToken] = useState(localStorage.getItem('ACCESS_TOKEN'))
  //
  const tokenSet = (token: any) => {
    setToken(token)
    if (token) {
      localStorage.setItem('ACCESS_TOKEN', token)
    } else {
      localStorage.removeItem('ACCESS_TOKEN')
    }
  }
  return (
    <StateContext.Provider value={{ user, token, setUser, tokenSet }}>
      {children}
    </StateContext.Provider>
  )
}

export const useStateContext = () => {
  const context = useContext(StateContext)

  if (!context) {
    throw new Error('Not wrapped')
  }

  return context
}
