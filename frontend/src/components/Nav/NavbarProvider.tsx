import React, { createContext, useState } from 'react'

type NavbarContextProviderProps = {
  children: React.ReactNode
}

type NavbarContextProviderType = {
  open: boolean
  setOpen: React.Dispatch<React.SetStateAction<boolean>>
}

export const NavbarContext = createContext<NavbarContextProviderType>(
  {} as NavbarContextProviderType,
)

export const NavbarContextProvider = ({
  children,
}: NavbarContextProviderProps) => {
  const [open, setOpen] = useState<boolean>(false)
  const contextValue = {
    open: open,
    setOpen: setOpen,
  }
  return (
    <NavbarContext.Provider value={contextValue}>
      {children}
    </NavbarContext.Provider>
  )
}
