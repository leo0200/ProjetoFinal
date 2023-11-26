import React, { useState, useEffect } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import axios from 'axios'
import '../../Styles/index.css'
import apiLocal from '../../API/apiLocal/api.js'


function Cambio() {
  const [amount, setAmount] = useState(1)
  const [fromCurrency, setFromCurrency] = useState('USD')
  const [toCurrency, setToCurrency] = useState('EUR')
  const [convertedAmount, setConvertedAmount] = useState(null)
  const navigation = useNavigate()
  
  function handleSair() {
    localStorage.removeItem('@tklogin2023');
    navigation('/')
  }

  const iToken = localStorage.getItem('@tklogin2023')
  const token = JSON.parse(iToken);

  const apiKey = '2b3e0b656fef7c70b4ac5031'
  const apiUrl =  'https://open.er-api.com/v6/latest'

  useEffect(() => {
    if (!token) {
      navigation('/');
    } else {
      async function verificaToken() {
        try {
          const resposta = await apiLocal.get('/ListarUsuarioToken', {
            headers: {
              Authorization: 'Bearer ' + `${token}`,
            },
          });

          if (resposta.data.dados) {
            navigation('/');
          } else if (resposta.data.id) {
            navigation('/Cambio');
          }
        } catch (error) {
          console.error('Erro ao verificar token:', error.message);
          
        }
      }
      verificaToken();
    }
  }, [token, navigation]);

  useEffect(() => {
    async function convertCurrency() {
      try {
        const response = await axios.get(`${apiUrl}?apikey=${apiKey}&base=${fromCurrency}`);
        const rates = response.data.rates;
        const rate = rates[toCurrency];

        if (!rate) {
          throw new Error(`Cotação não disponível para ${toCurrency}`);
        }

        const result = amount * rate;
        setConvertedAmount(result);
      } catch (error) {
        console.error('Erro ao obter cotações:', error.message);
        
      }
    }

    convertCurrency();
  }, [amount, fromCurrency, toCurrency, apiKey, apiUrl])

  return (
    <div className="App">
      <h1>Conversor de Moedas</h1>
      <div>
        <label>Valor:</label>
        <input type="number" value={amount} onChange={(e) => setAmount(e.target.value)} />
      </div>
      <div>
        <label>De:</label>
        <input value={fromCurrency} onChange={(e) => setFromCurrency(e.target.value)} />
      </div>
      <div>
        <label>Para:</label>
        <input value={toCurrency} onChange={(e) => setToCurrency(e.target.value)} />
      </div>
      <div>
        <p>
          {amount} {fromCurrency} equivalem a {convertedAmount} {toCurrency}
        </p>
      </div>
    </div>
  );
}

export default Cambio