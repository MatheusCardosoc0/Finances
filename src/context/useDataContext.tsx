import axios from "axios"
import React, { createContext, ReactNode, useContext, useEffect, useState } from "react"
import { InitialValue } from "./InitialValue"

interface EntradaProps {
  idValue: string
  value: string
}

type InitialValueProps = {
  Entradas: EntradaProps[]
  setEntradas: any
  Saidas: EntradaProps[]
  setSaidas: any
  TypeOfFinance: boolean
  setTypeOfFinance: any
  setValueEntrada: any
  limpar: any
  total: number,
  setTotal: any
  Calc: any
}



export const UserContext = createContext<InitialValueProps>(InitialValue)

export const UseContextProvider = ({ children }: { children: ReactNode }) => {

  const [Entradas, setEntradas] = useState<EntradaProps[]>([])
  const [Saidas, setSaidas] = useState<EntradaProps[]>([])
  const [TypeOfFinance, setTypeOfFinance] = useState<boolean>(false)
  const [total, setTotal] = useState(0)

  const setValueEntrada = () => {
    const arrayz = new Array
    const arrayx = new Array
    for (let index = 1; index <= Number(localStorage.getItem("IdIncrementFinance")); index++) {
      let value = JSON.parse(localStorage.getItem(`ValorEntrada${index}`))
      let valueX = JSON.parse(localStorage.getItem(`ValorSaida${index}`))

      arrayz.push(value)
      arrayx.push(valueX)


    }

    setEntradas(arrayz)
    setSaidas(arrayx)

  }

  function Calc() {
    setTotal(0)

    Entradas.map(entrada => {
      if (entrada != undefined) return setTotal((prev: number) => prev + Number(entrada?.value))
    })
    Saidas.map(entrada => {
      if (entrada != undefined) return setTotal((prev: number) => prev - Number(entrada?.value))
    })
  }




  useEffect(() => {
    setValueEntrada()
    Calc()
  }, [])

  function limpar() {
    localStorage.clear()
    setEntradas([])
    setSaidas([])
    setTotal(0)
  }



  return (
    <UserContext.Provider value={
      {
        Entradas,
        Saidas,
        setEntradas,
        setSaidas,
        setTypeOfFinance,
        TypeOfFinance,
        limpar,
        setValueEntrada,
        setTotal,
        total,
        Calc
      }
    }>
      {children}
    </UserContext.Provider>
  )
}

export const useDataContext = () => useContext(UserContext)