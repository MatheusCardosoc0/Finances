import React, { FormEvent, useEffect, useState } from 'react'
import EntradasPage from './components/EntradasPage'
import SaidasPage from './components/SaidasPage'
import { useDataContext } from './context/useDataContext'



const App = () => {


  const { TypeOfFinance, setValueEntrada, Entradas, total, setTotal, Saidas, limpar } = useDataContext()




  function handleAddValue(e: FormEvent<HTMLFormElement>) {

    e.preventDefault()

    const formData = new FormData(e.target as HTMLFormElement)
    const data = Object.fromEntries(formData)

    if (localStorage.getItem("IdIncrementFinance")) {
      const inc = Number(localStorage.getItem("IdIncrementFinance")) + 1
      localStorage.setItem("IdIncrementFinance", (inc ? inc.toString() : '1'))
    } else {
      localStorage.setItem("IdIncrementFinance", "1")
    }

    localStorage.setItem(`${TypeOfFinance == false ? 'ValorEntrada' : 'ValorSaida'}${localStorage.getItem("IdIncrementFinance")}`, JSON.stringify(data))

    setValueEntrada()
    Calc()
  }



  function Calc() {
    setTotal(0)

    Entradas.map(entrada => {
      if (entrada != undefined) return setTotal(prev => prev + Number(entrada?.value))
    })
    Saidas.map(entrada => {
      if (entrada != undefined) return setTotal(prev => prev - Number(entrada?.value))
    })
  }

  useEffect(() => {
    Calc()
  }, [Saidas])

  console.log(total)

  return (
    <main className='flex flex-col items-center w-full h-screen gap-10'>

      <h1>App de finanças</h1>
      <h2>R$ {total}</h2>


      <EntradasPage handleAddValue={handleAddValue} />
      <SaidasPage handleAddValue={handleAddValue} />

      <button onClick={() => limpar()}>Limpar</button>
    </main>
  )
}

export default App